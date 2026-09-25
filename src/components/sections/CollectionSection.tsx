import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "../../types";
import { STATE_PROFILES } from "../../data/stateProfiles";
import IndiaMap from "../map/IndiaMap";
import StateProductCard from "../collection/StateProductCard";

interface CollectionSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const matchesState = (product: Product, state: string) => {
  const origin = product.origin?.toLowerCase() ?? "";
  if (state === "Jammu & Kashmir") return origin.includes("kashmir");
  if (state === "West Bengal") return origin.includes("sundarbans") || origin.includes("bengal");
  return origin.includes(state.toLowerCase());
};

const profileForState = (state: string) =>
  Object.entries(STATE_PROFILES).find(
    ([name]) =>
      name.toLowerCase().replace(/&|and/g, "").replace(/[^a-z]/g, "") ===
      state.toLowerCase().replace(/&|and/g, "").replace(/[^a-z]/g, "")
  )?.[1] ?? {
    tagline: `Culture, craft and living heritage of ${state}`,
    description: `${state} is part of India's rich cultural landscape, shaped by distinctive traditions, skilled makers, regional foodways and enduring local heritage. Explore the current Indian Things collection while this state's dedicated artisan catalogue is added.`,
    monumentImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    bannerQuote: `Discover the stories, landscapes and living culture of ${state}.`,
  };

export default function CollectionSection({
  products,
  onSelectProduct,
}: CollectionSectionProps) {
  const [activeState, setActiveState] = useState("Jammu & Kashmir");
  const [activeTab, setActiveTab] = useState("Products");
  const detailsRef = useRef<HTMLElement>(null);
  const fromMap = useRef(false);
  const detail = profileForState(activeState);
  const stateProducts = useMemo(
    () => products.filter((product) => matchesState(product, activeState)),
    [activeState, products]
  );

  useEffect(() => {
    if (!fromMap.current) return;
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    fromMap.current = false;
  }, [activeState]);

  const selectState = (state: string, scroll = false) => {
    fromMap.current = scroll;
    setActiveState(state);
    setActiveTab("Products");
  };

  return (
    <section id="collection" className="bharat-explorer">
      <style>{`
        .bharat-explorer { background: transparent; font-family:"DM Sans",sans-serif; }
        .bharat-explorer .explorer-hero {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          isolation: isolate;
          background-color: #35120e;
          background-image:
            linear-gradient(rgba(53,18,14,.88),rgba(35,12,8,.96)),
            url('/images/indian-pattern.png');
          background-size: auto, 500px;
        }
        .bharat-explorer .explorer-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background:
            radial-gradient(ellipse 55% 25% at 50% 0%,   rgba(10,3,2,.92) 0%, transparent 100%),
            radial-gradient(ellipse 55% 28% at 50% 100%, rgba(10,3,2,.95) 0%, transparent 100%),
            radial-gradient(ellipse 22% 80% at 0%   50%, rgba(10,3,2,.88) 0%, transparent 100%),
            radial-gradient(ellipse 22% 80% at 100% 50%, rgba(10,3,2,.88) 0%, transparent 100%),
            radial-gradient(ellipse 28% 28% at 0%   0%,  rgba(10,3,2,.96) 0%, transparent 80%),
            radial-gradient(ellipse 28% 28% at 100% 0%,  rgba(10,3,2,.96) 0%, transparent 80%),
            radial-gradient(ellipse 28% 28% at 0%   100%,rgba(10,3,2,.96) 0%, transparent 80%),
            radial-gradient(ellipse 28% 28% at 100% 100%,rgba(10,3,2,.96) 0%, transparent 80%);
        }
        .bharat-explorer .explorer-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: transparent;
        }
        .bharat-explorer .explorer-hero-bg:after {
          content: "";
          position: absolute;
          inset: 0;
          background: transparent;
        }
        .bharat-explorer .explorer-copy {
          position: relative;
          z-index: 2;
          width: min(36%, 480px);
          min-height: 100svh;
          padding: 110px 2vw 48px 5vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: transparent;
        }
        .bharat-explorer .explorer-map {
          position: absolute;
          inset: 0 -2% 0 37%;
          z-index: 1;
          padding: 36px 0 8px;
          background: transparent;
          pointer-events: none;
        }
        .bharat-explorer .explorer-map > * { pointer-events: auto; }
        .bharat-explorer .state-paper {
          background-color:#35120e;
          background-image:linear-gradient(rgba(53,18,14,.88),rgba(53,18,14,.94)),url('/images/indian-pattern.png');
          background-size:auto,430px;
          color:#FFE600;
          padding:42px 7vw 60px;
        }
        .bharat-explorer .product-card {
          position:relative;
          min-height:260px;
          overflow:hidden;
          border-radius:5px;
          background:#151515;
          cursor:pointer;
          border:1px solid rgba(72,57,33,.45);
          text-align:left;
          padding:0;
        }
        .bharat-explorer .product-card img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
        .bharat-explorer .product-card:hover img { transform:scale(1.06); }
        .bharat-explorer .product-card:after { content:""; position:absolute; inset:0; background:linear-gradient(0deg,rgba(0,0,0,.9),transparent 62%); }
        .bharat-explorer .product-card__info { position:absolute; z-index:1; inset:auto 14px 13px; color:white; }
        .bharat-explorer .product-card__category { display:block; color:#f0d096; font-size:9px; letter-spacing:.15em; margin-bottom:7px; }
        .bharat-explorer .product-card__name { font-family:"Cormorant Garamond",serif; font-size:18px; font-weight:600; }
        .bharat-explorer .monument-frame {
          position:relative;
          min-height:320px;
          overflow:visible;
          background:transparent;
          border:none;
          box-shadow:none;
          display:flex;
          align-items:center;
          justify-content:center;
          padding: 16px 8px;
        }
        .bharat-explorer .monument-frame .wc-img-wrap {
          position:relative;
          width:100%;
          min-height:300px;
          filter: drop-shadow(0 22px 55px rgba(0,0,0,.72)) drop-shadow(0 4px 20px rgba(160,110,30,.22));
        }
        .bharat-explorer .monument-frame .wc-img-wrap svg {
          width:100%;
          height:auto;
          display:block;
        }
        .bharat-explorer .monument-frame .tint { display:none; }
        .bharat-explorer .monument-frame .quote {
          position:absolute;
          right:22px;
          bottom:32px;
          z-index:2;
          max-width:12rem;
          text-align:right;
          font-family:"Great Vibes",cursive;
          font-size:30px;
          line-height:.95;
          color:#f0c66e;
          text-shadow:0 2px 14px rgba(0,0,0,.95), 0 0 3px rgba(0,0,0,1);
          pointer-events:none;
        }
        @media(max-width:900px) {
          .bharat-explorer .explorer-hero { min-height:auto; }
          .bharat-explorer .explorer-copy { width:100%; min-height:auto; padding:100px 8vw 12px; }
          .bharat-explorer .explorer-map { position:relative; inset:auto; padding:0 4vw 36px; min-height:560px; }
        }
      `}</style>

      <div id="explore-section" className="explorer-hero">
        <div className="explorer-hero-bg" aria-hidden="true" />

        <div className="explorer-copy">
          <p className="mb-4 text-[9px] font-semibold uppercase tracking-[.28em] text-[#d6ac59]">
            Discover · Explore · Experience
          </p>
          <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(38px,4.2vw,64px)] font-semibold leading-[.9] tracking-[-.035em] text-[#fffaf2]">
            One India.<br />
            <em className="not-italic text-[#e6c06a] whitespace-nowrap">
              Infinite Treasures.
            </em>
          </h2>
          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-[#d5d1c8] sm:text-sm">
            Explore the rich diversity of India through its states and discover unique products, crafts, foods and traditions that make every region special.
          </p>
          <div className="mt-8 grid max-w-md grid-cols-4 border-y border-white/15 py-4">
            {[
              ["28", "States"],
              ["8", "Union Territories"],
              ["1000+", "Unique Products"],
              ["One", "Incredible India"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={index === 0 ? "pr-2" : "border-l border-white/15 px-2"}
              >
                <b className="font-['Cormorant_Garamond',serif] text-2xl text-[#f0c66e] sm:text-[28px]">
                  {value}
                </b>
                <span className="mt-1 block text-[9px] leading-tight text-[#d2d0cb]">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              detailsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 flex w-fit items-center gap-3 text-left text-[11px] text-[#fffaf2] transition hover:text-[#e9bd63]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d99f30]">
              <ArrowDown size={14} />
            </span>
            <span>
              <b className="block">Explore States</b>
              <small className="text-[#b1b4bb]">
                Click a state or scroll down
              </small>
            </span>
          </button>
        </div>

        <div className="explorer-map">
          <IndiaMap
            products={products}
            activeState={activeState}
            onStateSelect={(state) => selectState(state, true)}
          />
        </div>
      </div>

      <section ref={detailsRef} id="state-details" className="state-paper scroll-mt-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-[#d69c35]/30 pb-4">
            <span className="text-xs font-semibold uppercase tracking-[.28em] text-[#d69c35]">
              Explore
            </span>
            <div className="flex gap-5 text-xs uppercase tracking-[.12em] text-[#f4efe9]">
              {["Overview", "Products", "Culture", "Places"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={
                    activeTab === tab
                      ? "border-b-2 border-[#d69c35] pb-2 text-[#FFE600]"
                      : "pb-2"
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="flex items-center gap-5">
                <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(50px,6vw,82px)] font-semibold leading-none text-[#FFE600]">
                  {activeState}
                </h2>
                <span className="h-px w-16 bg-[#d69c35]" />
              </div>
              <p className="mt-3 font-['Cormorant_Garamond',serif] text-xl sm:text-2xl text-[#f4efe9]">
                {detail.tagline}
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#f4efe9]/80">
                {detail.description}
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById("explore-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d69c35]/50 px-4 py-2 text-xs text-[#FFE600] hover:bg-[#d69c35]/20"
              >
                <ArrowLeft size={14} /> Back to Map
              </button>
            </div>
            <div className="monument-frame">
              <div className="wc-img-wrap">
                {/* Watercolor edge effect:
                    1. Erode the image boundary inward (creates margin)
                    2. Blur the eroded alpha mask (soft feathering)
                    3. Displace the soft edge with turbulence (organic irregular edges)
                    → Result: clean sharp center + painted irregular edges only at borders */}
                <svg
                  viewBox="0 0 800 480"
                  preserveAspectRatio="xMidYMid slice"
                  aria-label={`${activeState} landmark`}
                >
                  <defs>
                    <filter
                      id="watercolor-edge"
                      x="-14%" y="-14%" width="128%" height="128%"
                      colorInterpolationFilters="sRGB"
                    >
                      {/* Turbulence noise used for displacement only — NOT as alpha mask */}
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.012 0.016"
                        numOctaves="4"
                        seed="5"
                        result="noise"
                      />
                      {/* Shrink the solid image rect inward to create an edge zone */}
                      <feMorphology
                        operator="erode"
                        radius="12"
                        in="SourceAlpha"
                        result="eroded"
                      />
                      {/* Blur the eroded mask to create soft, wide feathering at edges */}
                      <feGaussianBlur
                        stdDeviation="28"
                        in="eroded"
                        result="softMask"
                      />
                      {/* Displace the soft edge mask with turbulence → irregular organic shape */}
                      <feDisplacementMap
                        in="softMask"
                        in2="noise"
                        scale="55"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="organicMask"
                      />
                      {/* Cut the source image through the organic mask */}
                      <feComposite in="SourceGraphic" in2="organicMask" operator="in" />
                    </filter>
                  </defs>
                  <image
                    href={detail.monumentImage}
                    x="0" y="0"
                    width="800"
                    height="480"
                    preserveAspectRatio="xMidYMid slice"
                    style={{ filter: "url(#watercolor-edge)" }}
                  />
                </svg>
                <div className="quote">{detail.bannerQuote}</div>
              </div>
            </div>
          </div>

          {activeTab === "Products" ? (
            <>
              <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[.22em] text-[#d69c35]">
                    Curated collection
                  </p>
                  <h3 className="mt-1 flex items-center gap-3 font-['Cormorant_Garamond',serif] text-3xl font-semibold text-[#FFE600]">
                    <span className="h-5 w-1 bg-[#d69c35]" /> Products from{" "}
                    {activeState}
                  </h3>
                  <p className="mt-1 text-xs text-[#f4efe9]/70">
                    A glimpse of {activeState}'s finest creations
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 text-xs text-[#FFE600]">
                  View All <ArrowRight size={14} />
                </button>
              </div>
              {stateProducts.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {stateProducts.map((product) => (
                    <StateProductCard
                      key={product.name}
                      product={product}
                      onSelect={onSelectProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-5 border border-dashed border-[#d69c35]/30 bg-white/10 px-6 py-10 text-center text-sm text-[#f4efe9]/70">
                  No products available for {activeState} yet.
                </div>
              )}
            </>
          ) : (
            <div className="mt-12 max-w-3xl border border-[#d69c35]/30 bg-white/10 p-7 text-sm leading-relaxed text-[#f4efe9]/80">
              {detail.description} The living traditions, landscapes and skilled
              makers of {activeState} shape every object in this regional
              collection.
            </div>
          )}
        </div>
      </section>
    </section>
  );
}