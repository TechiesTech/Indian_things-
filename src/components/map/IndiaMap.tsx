import { useEffect, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Product } from "../../types";
import { STATE_PROFILES } from "../../data/stateProfiles";

interface IndiaMapProps {
  products: Product[];
  activeState?: string | null;
  onStateSelect?: (state: string) => void;
}

type Position = [number, number];
type Geometry = { type: "Polygon" | "MultiPolygon"; coordinates: Position[][] | Position[][][] };
type Feature = { properties: { st_nm?: string }; geometry: Geometry };
type GeoData = { features: Feature[] };

const normalize = (value: string) =>
  value.toLowerCase().replace(/&|and/g, "").replace(/[^a-z]/g, "");

const x = (lng: number) => (lng - 67) * 22.2;
const y = (lat: number) => (38.2 - lat) * 22.2;

const LABELS: Record<string, [number, number]> = {
  Ladakh: [260, 75],
  "Jammu & Kashmir": [250, 135],
  Himachal: [315, 170],
  Punjab: [245, 200],
  Haryana: [280, 235],
  Rajasthan: [225, 305],
  Delhi: [330, 255],
  Uttarakhand: [345, 205],
  "Uttar Pradesh": [380, 290],
  Gujarat: [165, 375],
  "Madhya Pradesh": [335, 385],
  Bihar: [500, 320],
  "West Bengal": [545, 410],
  Maharashtra: [270, 490],
  Telangana: [360, 505],
  Karnataka: [280, 590],
  Kerala: [300, 680],
  "Tamil Nadu": [350, 675],
  Odisha: [475, 465],
  Assam: [625, 305],
  Sikkim: [570, 270],
  Meghalaya: [610, 355],
  Goa: [235, 550],
  Chhattisgarh: [410, 415],
  Jharkhand: [485, 380],
  Andhra: [405, 550],
  "Andaman & Nicobar": [650, 600],
  Lakshadweep: [155, 685],
};

const positionsFor = (geometry: Geometry): Position[] =>
  geometry.type === "Polygon"
    ? (geometry.coordinates as Position[][]).flat()
    : (geometry.coordinates as Position[][][]).flat(2);

function geometryPath(geometry: Geometry) {
  const rings =
    geometry.type === "Polygon"
      ? (geometry.coordinates as Position[][])
      : (geometry.coordinates as Position[][][]).flat();
  return rings
    .map(
      (ring) =>
        ring
          .map(
            ([lng, lat], index) =>
              `${index === 0 ? "M" : "L"}${x(lng).toFixed(1)} ${y(lat).toFixed(1)}`
          )
          .join(" ") + " Z"
    )
    .join(" ");
}

const craftsFor = (state: string) => {
  const tagline =
    STATE_PROFILES[state]?.tagline ??
    `Heritage crafts · regional treasures · artisan stories of ${state}`;
  return tagline.replace(/^The |^A /i, "");
};

export default function IndiaMap({
  products: _products,
  activeState = "Jammu & Kashmir",
  onStateSelect,
}: IndiaMapProps) {
  const [data, setData] = useState<GeoData | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1.12);

  useEffect(() => {
    fetch("/india.geojson")
      .then((response) => response.json())
      .then((value: GeoData) => setData(value))
      .catch(() => setData({ features: [] }));
  }, []);

  const states = useMemo(
    () =>
      data?.features
        .map((feature) => ({
          state: feature.properties.st_nm ?? "",
          d: geometryPath(feature.geometry),
        }))
        .filter((item) => item.state) ?? [],
    [data]
  );

  const calculatedLabels = useMemo(() => {
    const groups = new Map<string, Position[]>();
    data?.features.forEach((feature) => {
      const state = feature.properties.st_nm ?? "";
      groups.set(state, [
        ...(groups.get(state) ?? []),
        ...positionsFor(feature.geometry),
      ]);
    });
    return Object.fromEntries(
      [...groups].map(([state, points]) => {
        const longitudes = points.map(([lng]) => lng);
        const latitudes = points.map(([, lat]) => lat);
        return [
          state,
          [
            (x(Math.min(...longitudes)) + x(Math.max(...longitudes))) / 2,
            (y(Math.min(...latitudes)) + y(Math.max(...latitudes))) / 2,
          ] as [number, number],
        ];
      })
    ) as Record<string, [number, number]>;
  }, [data]);

  // ✅ FIX: force focusState to always be a string
  const focusState: string = hovered ?? activeState ?? "Jammu & Kashmir";

  const labelPositions = { ...LABELS, ...calculatedLabels };
  const focusLabel = labelPositions[focusState] ?? [330, 370];

  const pin = {
    x: Math.max(10, Math.min(90, (focusLabel[0] / 700) * 100)),
    y: Math.max(12, Math.min(86, (focusLabel[1] / 730) * 100)),
  };

  const popup = {
    x: Math.max(4, Math.min(58, pin.x - 26)),
    y: Math.max(8, Math.min(72, pin.y - 16)),
  };

  return (
    <div className="relative z-10 flex h-full w-full items-center justify-center overflow-visible bg-transparent">
      <svg
        viewBox="20 20 660 700"
        className="h-full w-full max-h-[96vh] transition-transform duration-300"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        aria-label="Interactive map of India"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="map-gold" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#efc268" />
            <stop offset="1" stopColor="#b87a21" />
          </linearGradient>
        </defs>

        <g>
          {states.map(({ state, d }, index) => {
            const selected = normalize(state) === normalize(activeState ?? "");
            const isHover = normalize(state) === normalize(hovered ?? "");
            return (
              <path
                key={`${state}-${index}`}
                d={d}
                fill={
                  selected ? "url(#map-gold)" : isHover ? "#8d6a2d" : "#1b1917"
                }
                fillOpacity={selected ? 0.92 : isHover ? 0.7 : 0.42}
                stroke={selected ? "#f6dc9e" : "#d4c19a"}
                strokeWidth={selected ? 1.35 : 0.65}
                className="cursor-pointer transition-[fill,fill-opacity] duration-200"
                onMouseEnter={() => setHovered(state)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onStateSelect?.(state)}
              />
            );
          })}
        </g>

        <g pointerEvents="none">
          {Object.entries(labelPositions).map(([state, [labelX, labelY]]) => {
            const selected = normalize(state) === normalize(activeState ?? "");
            return (
              <text
                key={state}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fill={selected ? "#1c1710" : "#e7d7b0"}
                fontSize={selected ? "11" : "8.5"}
                fontWeight={selected ? "700" : "500"}
              >
                {state}
              </text>
            );
          })}
        </g>
      </svg>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <line
          x1={`${popup.x + 18}%`}
          y1={`${popup.y + 4}%`}
          x2={`${pin.x}%`}
          y2={`${pin.y}%`}
          stroke="#d4af67"
          strokeWidth="1.4"
        />
      </svg>

      <span
        className="pointer-events-none absolute z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1c1710] bg-[#fff8ea] shadow-[0_0_0_4px_rgba(212,175,103,.28)]"
        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
      />

      <div
        className="pointer-events-none absolute z-20 w-[min(250px,68%)] rounded-lg border border-[#d4af67]/40 bg-[#1c1710]/55 px-4 py-3 backdrop-blur-[2px]"
        style={{ left: `${popup.x}%`, top: `${popup.y}%` }}
      >
        <div className="flex items-center justify-between gap-3">
          <strong className="font-['Cormorant_Garamond',serif] text-lg leading-tight text-[#fff7e9]">
            {focusState}
          </strong>
          <button
            onClick={() => onStateSelect?.(focusState)}
            className="pointer-events-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#d69c35] text-[#21170b] transition-colors hover:bg-[#e6b84a]"
            aria-label={`Explore ${focusState}`}
          >
            →
          </button>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-[#d8cbb0]">
          {craftsFor(focusState)}
        </p>
      </div>

      <div className="absolute bottom-4 right-8 z-20 flex flex-col overflow-hidden rounded border border-white/15 bg-black/20">
        <button
          onClick={() => setZoom((value) => Math.min(1.28, value + 0.1))}
          className="pointer-events-auto grid h-9 w-9 place-items-center border-b border-white/15 text-white transition-colors hover:bg-white/10"
          aria-label="Zoom in"
        >
          <Plus size={15} />
        </button>
        <button
          onClick={() => setZoom((value) => Math.max(1.02, value - 0.1))}
          className="pointer-events-auto grid h-9 w-9 place-items-center text-white transition-colors hover:bg-white/10"
          aria-label="Zoom out"
        >
          <Minus size={15} />
        </button>
      </div>
    </div>
  );
}