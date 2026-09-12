// src/components/map/IndiaMap.tsx
import { useEffect, useMemo, useState } from "react";
import { MapContainer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Product } from "../../types";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface IndiaMapProps {
  products: Product[];
}

interface StateProductData {
  state: string;
  products: Product[];
  coordinates: [number, number];
}

const INDIA_GEOJSON_URL =
  "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";

// India's geographic bounds: roughly lat 6.5 → 37.5, lng 68 → 97.5
// Center chosen to visually balance the shape inside a 460px tall container
const INDIA_CENTER: [number, number] = [22.5, 79.5];
const INDIA_ZOOM = 4;

const STATE_DATA: Omit<StateProductData, "products">[] = [
  { state: "Jammu & Kashmir", coordinates: [33.7782, 76.5762] },
  { state: "Kerala", coordinates: [10.8505, 76.2711] },
  { state: "West Bengal", coordinates: [22.9868, 87.855] },
  { state: "Goa", coordinates: [15.2993, 74.124] },
];

const normalizeStateName = (name: string) =>
  name.toLowerCase().replace(/&|and/g, "").replace(/[^a-z]/g, "");

const createOriginIcon = (stateName: string, isActive: boolean) =>
  L.divIcon({
    className: `origin-marker${isActive ? " is-active" : ""}`,
    html: `
      <span class="origin-marker-core"></span>
      <span class="origin-marker-label">${stateName}</span>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

function FitIndiaBounds({ geoData }: { geoData: any }) {
  const map = useMap();
  useEffect(() => {
    if (!geoData) return;
    const layer = L.geoJSON(geoData);
    const bounds = layer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [24, 24] });
    }
  }, [geoData, map]);
  return null;
}

export default function IndiaMap({ products }: IndiaMapProps) {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(INDIA_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setGeoData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load India GeoJSON:", err);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const mapData = useMemo<StateProductData[]>(() => {
    return STATE_DATA.map((stateData) => {
      const stateProducts = products.filter((product) => {
        const origin = product.origin?.toLowerCase() || "";
        if (stateData.state === "Jammu & Kashmir")
          return origin.includes("kashmir");
        if (stateData.state === "Kerala") return origin.includes("kerala");
        if (stateData.state === "West Bengal")
          return origin.includes("sundarbans") || origin.includes("bengal");
        if (stateData.state === "Goa") return origin.includes("goa");
        return origin.includes(stateData.state.toLowerCase());
      });
      return { ...stateData, products: stateProducts };
    });
  }, [products]);

  const stateStyle = (feature: any) => {
    const name = (
      feature.properties.NAME_1 ||
      feature.properties.name ||
      ""
    ).toLowerCase();
    const hasProducts = mapData.some(
      (s) =>
        normalizeStateName(s.state) === normalizeStateName(name) &&
        s.products.length > 0
    );
    const isActive =
      activeState && normalizeStateName(activeState) === normalizeStateName(name);

    return {
      fillColor: isActive || hasProducts ? "#FFE600" : "#e8dfd3",
      weight: isActive ? 2.5 : 1,
      opacity: 1,
      color: isActive ? "#833220" : "#a89488",
      fillOpacity: isActive ? 0.9 : hasProducts ? 0.95 : 0.85,
      dashArray: "",
    };
  };

  const onEachState = (feature: any, layer: any) => {
    const stateName = feature.properties.NAME_1 || feature.properties.name;
    const stateEntry = mapData.find(
      (s) =>
        normalizeStateName(s.state) === normalizeStateName(stateName || "")
    );
    const hasProducts = stateEntry && stateEntry.products.length > 0;

    layer.on({
      mouseover: (e: any) => {
        e.target.setStyle({
          fillColor: hasProducts ? "#FFE600" : "#ddd2c2",
          fillOpacity: 0.95,
          weight: 2,
          color: "#833220",
        });
      },
      mouseout: (e: any) => e.target.setStyle(stateStyle(feature)),
      click: () => {
        if (hasProducts && stateEntry) setActiveState(stateEntry.state);
      },
    });
  };

  const activeEntry = mapData.find(
    (s) =>
      activeState && normalizeStateName(s.state) === normalizeStateName(activeState)
  );

  return (
    <div className="relative flex w-full flex-col gap-4">
      {/* Leaflet internal overrides — only styles Tailwind can't express */}
      <style>{`
        .india-map-surface .leaflet-container {
          background: #f4efe9 !important;
          font-family: inherit;
          z-index: 1;
        }
        .india-map-surface .leaflet-control-attribution {
          padding: 3px 7px;
          background: rgba(43, 36, 33, 0.75);
          color: rgba(255, 253, 249, 0.75);
          font-size: 8px;
          letter-spacing: .04em;
        }
        .india-map-surface .leaflet-control-attribution a {
          color: var(--gold-light);
        }
        .india-map-surface .leaflet-interactive:focus { outline: none; }

        .india-map-surface .leaflet-popup-content-wrapper,
        .india-map-surface .leaflet-popup-tip {
          background: #2a0f0c;
          color: #fffdf9;
          border: 1px solid rgba(230, 203, 140, 0.4);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
        }
        .india-map-surface .leaflet-popup-content-wrapper {
          border-radius: 10px;
        }
        .india-map-surface .leaflet-popup-content {
          margin: 12px 14px;
          min-width: 180px;
        }
        .india-map-surface .leaflet-popup-close-button {
          color: #e6cb8c !important;
        }

        /* Custom origin marker (divIcon) */
        .origin-marker {
          position: relative;
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          cursor: pointer;
        }
        .origin-marker-core {
          position: relative;
          z-index: 2;
          display: block;
          width: 12px;
          height: 12px;
          border: 2px solid #5b2119;
          border-radius: 50%;
          background: #FFE600;
          box-shadow:
            0 0 0 3px rgba(255, 230, 0, .3),
            0 0 18px rgba(255, 230, 0, .6);
          transition: transform .25s ease, background-color .25s ease;
        }
        .origin-marker-label {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          padding: 5px 8px;
          border-left: 1px solid rgba(131, 50, 32, .55);
          color: #2b2421;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: .13em;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: .92;
          text-shadow: 0 1px 4px rgba(255, 253, 249, .9);
          transition: color .25s ease, opacity .25s ease;
        }
        .origin-marker:hover .origin-marker-core,
        .origin-marker.is-active .origin-marker-core {
          background: #fffdf9;
          transform: scale(1.22);
        }
        .origin-marker:hover .origin-marker-label,
        .origin-marker.is-active .origin-marker-label {
          color: #833220;
          opacity: 1;
        }
        .origin-marker.is-active::before {
          content: "";
          position: absolute;
          inset: 1px;
          border: 1px solid #833220;
          border-radius: 50%;
          animation: originMarkerPulse 2s ease-out infinite;
        }
        @keyframes originMarkerPulse {
          0%   { opacity: .8; transform: scale(.7); }
          100% { opacity: 0;  transform: scale(2.2); }
        }
      `}</style>

      {/* Header */}
      <div className="relative z-10">
        <p className="m-0 mb-2 text-left text-[10px] uppercase tracking-[0.27em] text-[#e6cb8c]">
          Origin Map
        </p>
        <h3 className="m-0 font-['Cormorant_Garamond',serif] text-[clamp(28px,3.5vw,48px)] font-medium leading-[0.9] tracking-[0.02em] text-[#fffdf9]">
          SOURCED FROM <em className="not-italic text-[#FFE600]">INDIA.</em>
        </h3>
      </div>

      {/* Map surface */}
      <div
        className="india-map-surface relative w-full overflow-hidden rounded-2xl border border-[#c9a45b]/40 shadow-[0_24px_70px_rgba(18,5,3,0.32)]"
        style={{
          height: "460px",
          minHeight: "460px",
          background: "#f4efe9",
        }}
      >
        {loading && (
          <div className="absolute inset-0 z-20 grid place-items-center bg-[#2a0f0c] text-xs uppercase tracking-[0.25em] text-[#e6cb8c]">
            Loading map…
          </div>
        )}

        <MapContainer
          center={INDIA_CENTER}
          zoom={INDIA_ZOOM}
          minZoom={3}
          maxZoom={7}
          zoomSnap={0.25}
          zoomDelta={0.25}
          zoomControl={false}
          attributionControl
          scrollWheelZoom={false}
          style={{ height: "460px", width: "100%", background: "transparent" }}
        >
          {geoData && <FitIndiaBounds geoData={geoData} />}
          {geoData && (
            <GeoJSON
              data={geoData}
              style={stateStyle}
              onEachFeature={onEachState}
            />
          )}

          {mapData.map((stateData) => {
            if (stateData.products.length === 0) return null;
            const isActive = activeState === stateData.state;

            return (
              <Marker
                key={stateData.state}
                position={stateData.coordinates}
                icon={createOriginIcon(stateData.state, isActive)}
                eventHandlers={{
                  click: () => setActiveState(stateData.state),
                }}
              >
                <Popup className="custom-popup">
                  <div className="text-[#fffdf9]">
                    <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FFE600]">
                      {stateData.state}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {stateData.products.map((product) => (
                        <div key={product.name} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFE600]" />
                          <div>
                            <p className="m-0 text-sm font-semibold text-white">
                              {product.name}
                            </p>
                            <p className="m-0 text-[11px] text-neutral-400">
                              {product.origin}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-[22px] gap-y-2.5 text-[9px] uppercase tracking-[0.12em] text-[#fffdf9]/70">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-[9px] w-[9px] rounded-full border border-[#e6cb8c] bg-[#e6cb8c] shadow-[0_0_10px_rgba(230,203,140,0.6)]" />
          Products Available
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-[9px] w-[9px] rounded-full border border-[#fffdf9]/40 bg-[#fffdf9]/10" />
          No Products
        </span>

        {activeEntry && activeEntry.products.length > 0 && (
          <div className="ml-auto border-l border-[#e6cb8c]/30 pl-[18px] text-right">
            <p className="m-0 text-[8px] uppercase tracking-[0.15em] text-[#e6cb8c]">
              Active Origin
            </p>
            <p className="m-0 mt-[3px] font-['Cormorant_Garamond',serif] text-xl tracking-[0.04em] text-[#fffdf9]">
              {activeEntry.state}
            </p>
            <p className="m-0 text-[8px] tracking-[0.08em] text-[#fffdf9]/50">
              {activeEntry.products.length} product
              {activeEntry.products.length > 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}