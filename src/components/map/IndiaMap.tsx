import { useEffect, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Product } from "../../types";

interface IndiaMapProps {
  products: Product[];
  activeState?: string | null;
  onStateSelect?: (state: string) => void;
}

type Position = [number, number];
type Geometry = { type: "Polygon" | "MultiPolygon"; coordinates: Position[][] | Position[][][] };
type Feature = { properties: { st_nm?: string }; geometry: Geometry };
type GeoData = { features: Feature[] };

const normalize = (value: string) => value.toLowerCase().replace(/&|and/g, "").replace(/[^a-z]/g, "");
const x = (lng: number) => (lng - 67) * 22.2;
const y = (lat: number) => (38.2 - lat) * 22.2;

const LABELS: Record<string, [number, number]> = {
  Ladakh: [260, 75], "Jammu & Kashmir": [250, 135], Himachal: [315, 170], Punjab: [245, 200], Haryana: [280, 235], Rajasthan: [225, 305], Delhi: [330, 255], Uttarakhand: [345, 205], "Uttar Pradesh": [380, 290], Gujarat: [165, 375], "Madhya Pradesh": [335, 385], Bihar: [500, 320], "West Bengal": [545, 410], Maharashtra: [270, 490], Telangana: [360, 505], Karnataka: [280, 590], Kerala: [300, 680], "Tamil Nadu": [350, 675], Odisha: [475, 465], Assam: [625, 305], Sikkim: [570, 270], Meghalaya: [610, 355], Goa: [235, 550], Chhattisgarh: [410, 415], Jharkhand: [485, 380], Andhra: [405, 550], "Andaman & Nicobar": [650, 600], Lakshadweep: [155, 685],
};

const positionsFor = (geometry: Geometry): Position[] => geometry.type === "Polygon"
  ? (geometry.coordinates as Position[][]).flat()
  : (geometry.coordinates as Position[][][]).flat(2);

const stateHasProducts = (state: string, products: Product[]) => products.some((product) => {
  const origin = product.origin?.toLowerCase() ?? "";
  if (normalize(state) === normalize("Jammu & Kashmir")) return origin.includes("kashmir");
  if (normalize(state) === normalize("West Bengal")) return origin.includes("sundarbans") || origin.includes("bengal");
  return origin.includes(state.toLowerCase());
});

function geometryPath(geometry: Geometry) {
  const rings = geometry.type === "Polygon" ? geometry.coordinates as Position[][] : (geometry.coordinates as Position[][][]).flat();
  return rings.map((ring) => ring.map(([lng, lat], index) => `${index === 0 ? "M" : "L"}${x(lng).toFixed(1)} ${y(lat).toFixed(1)}`).join(" ") + " Z").join(" ");
}

export default function IndiaMap({ products, activeState = "Jammu & Kashmir", onStateSelect }: IndiaMapProps) {
  const [data, setData] = useState<GeoData | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [popupPosition, setPopupPosition] = useState({ x: 52, y: 30 });

  useEffect(() => {
    fetch("/india.geojson").then((response) => response.json()).then((value: GeoData) => setData(value)).catch(() => setData({ features: [] }));
  }, []);

  const states = useMemo(() => data?.features.map((feature) => ({ state: feature.properties.st_nm ?? "", d: geometryPath(feature.geometry) })).filter((item) => item.state) ?? [], [data]);
  const calculatedLabels = useMemo(() => {
    const groups = new Map<string, Position[]>();
    data?.features.forEach((feature) => {
      const state = feature.properties.st_nm ?? "";
      groups.set(state, [...(groups.get(state) ?? []), ...positionsFor(feature.geometry)]);
    });
    return Object.fromEntries([...groups].map(([state, points]) => {
      const longitudes = points.map(([lng]) => lng);
      const latitudes = points.map(([, lat]) => lat);
      return [state, [(x(Math.min(...longitudes)) + x(Math.max(...longitudes))) / 2, (y(Math.min(...latitudes)) + y(Math.max(...latitudes))) / 2] as [number, number]];
    })) as Record<string, [number, number]>;
  }, [data]);
  const focusState = hovered ?? activeState;
  const labelPositions = { ...LABELS, ...calculatedLabels };
  const focusLabel = labelPositions[focusState] ?? [330, 370];
  const placePopupForState = (state: string) => {
    const [labelX, labelY] = labelPositions[state] ?? [330, 370];
    setPopupPosition({
      x: Math.max(26, Math.min(74, (labelX / 700) * 100)),
      y: Math.max(19, Math.min(76, (labelY / 730) * 100)),
    });
  };

  useEffect(() => { placePopupForState(activeState); }, [activeState, calculatedLabels]);

  return (
    <div className="relative z-10 h-full w-full min-h-[360px] overflow-visible bg-transparent">
      <svg viewBox="0 0 700 730" className="h-full w-full transition-transform duration-300" style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }} aria-label="Interactive map of India">
        <defs><radialGradient id="map-glow"><stop stopColor="#d99f30" stopOpacity=".5" /><stop offset="1" stopColor="#d99f30" stopOpacity="0" /></radialGradient><linearGradient id="map-gold" x1="0" x2="1"><stop stopColor="#efc268" /><stop offset="1" stopColor="#b87a21" /></linearGradient></defs>
        <circle cx={focusLabel[0]} cy={focusLabel[1]} r="100" fill="url(#map-glow)" opacity=".35" />
        <g>{states.map(({ state, d }, index) => { const selected = normalize(state) === normalize(activeState); const isHover = normalize(state) === normalize(hovered ?? ""); return <path key={`${state}-${index}`} d={d} fill={selected ? "url(#map-gold)" : isHover ? "#d69c35" : "#202631"} stroke={selected ? "#f6dc9e" : "#3b4554"} strokeWidth={selected ? 1.2 : .45} className="cursor-pointer transition-[fill] duration-200" onMouseEnter={() => setHovered(state)} onMouseLeave={() => setHovered(null)} onClick={() => { placePopupForState(state); onStateSelect?.(state); }} />; })}</g>
        <g pointerEvents="none">{Object.entries(labelPositions).map(([state, [labelX, labelY]]) => <text key={state} x={labelX} y={labelY} textAnchor="middle" fill={normalize(state) === normalize(activeState) ? "#1c1710" : "#aeb5bf"} fontSize={normalize(state) === normalize(activeState) ? "10" : "7.5"} fontWeight={normalize(state) === normalize(activeState) ? "700" : "500"}>{state}</text>)}</g>
      </svg>
      <div className="pointer-events-none absolute z-10 w-[min(280px,58%)] border border-[#6a5b43] bg-[#151a21]/95 p-4 shadow-2xl transition-[left,top] duration-150" style={{ left: `${popupPosition.x}%`, top: `${popupPosition.y}%`, transform: "translate(-50%, -50%)" }}><div className="flex items-center justify-between"><strong className="font-['Cormorant_Garamond',serif] text-xl text-[#fff7e9]">{focusState}</strong><span className="grid h-8 w-8 place-items-center rounded-full bg-[#d69c35] text-[#21170b]">→</span></div><p className="mt-2 text-xs leading-relaxed text-[#aeb6c3]">Heritage crafts · regional treasures · artisan stories</p><div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-[10px] uppercase tracking-[.1em] text-[#d9a642]"><span>Click to explore</span><span>Products</span></div></div>
      <div className="absolute bottom-6 right-5 z-10 flex flex-col overflow-hidden rounded border border-white/20"><button onClick={() => setZoom((value) => Math.min(1.28, value + .1))} className="grid h-9 w-9 place-items-center border-b border-white/15 text-white"><Plus size={15} /></button><button onClick={() => setZoom((value) => Math.max(1, value - .1))} className="grid h-9 w-9 place-items-center text-white"><Minus size={15} /></button></div>
    </div>
  );
}