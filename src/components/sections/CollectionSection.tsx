import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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

const profileForState = (state: string) => Object.entries(STATE_PROFILES).find(([name]) => name.toLowerCase().replace(/&|and/g, "").replace(/[^a-z]/g, "") === state.toLowerCase().replace(/&|and/g, "").replace(/[^a-z]/g, ""))?.[1] ?? {
  tagline: `Culture, craft and living heritage of ${state}`,
  description: `${state} is part of India’s rich cultural landscape, shaped by distinctive traditions, skilled makers, regional foodways and enduring local heritage. Explore the current Indian Things collection while this state’s dedicated artisan catalogue is added.`,
  monumentImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
  bannerQuote: `Discover the stories, landscapes and living culture of ${state}.`,
};

export default function CollectionSection({ products, onSelectProduct }: CollectionSectionProps) {
  const [activeState, setActiveState] = useState("Jammu & Kashmir");
  const [activeTab, setActiveTab] = useState("Products");
  const detailsRef = useRef<HTMLElement>(null);
  const fromMap = useRef(false);
  const detail = profileForState(activeState);
  const stateProducts = useMemo(() => products.filter((product) => matchesState(product, activeState)), [activeState, products]);

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
        .bharat-explorer { background:#0c0f13; font-family:"DM Sans",sans-serif; }
        .bharat-explorer .explorer-hero { display:grid; grid-template-columns:1fr 1fr; align-items:stretch; background:radial-gradient(circle at 4% 78%,rgba(168,111,35,.17),transparent 40%),linear-gradient(115deg,#0b0e12,#18150e); }
        .bharat-explorer .explorer-copy { padding:20px 7vw 20px; display:flex; flex-direction:column; justify-content:center; }
        .bharat-explorer .explorer-map { min-height:0; padding:20px 5vw 20px 3vw; border-left:1px solid rgba(255,255,255,.1); position:relative; }
        .bharat-explorer .state-paper { background-color:#35120e; background-image:linear-gradient(rgba(53,18,14,.88),rgba(53,18,14,.94)),url('/images/indian-pattern.png'); background-size:auto,430px; color:#FFE600; padding:42px 7vw 60px; }
        .bharat-explorer .product-card { position:relative; min-height:260px; overflow:hidden; border-radius:5px; background:#151515; cursor:pointer; border:1px solid rgba(72,57,33,.45); text-align:left; padding:0; }
        .bharat-explorer .product-card img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
        .bharat-explorer .product-card:hover img { transform:scale(1.06); }
        .bharat-explorer .product-card:after { content:""; position:absolute; inset:0; background:linear-gradient(0deg,rgba(0,0,0,.9),transparent 62%); }
        .bharat-explorer .product-card__info { position:absolute; z-index:1; inset:auto 14px 13px; color:white; }
        .bharat-explorer .product-card__category { display:block; color:#f0d096; font-size:9px; letter-spacing:.15em; margin-bottom:7px; }
        .bharat-explorer .product-card__name { font-family:"Cormorant Garamond",serif; font-size:18px; font-weight:600; }
        .bharat-explorer .monument-frame { position:relative; min-height:295px; overflow:hidden; border-radius:22px; border:1.5px solid rgba(168,111,35,.55); box-shadow:0 18px 45px -18px rgba(0,0,0,.55), inset 0 0 0 1px rgba(247,244,237,.25); background:#e8dec9; }
        .bharat-explorer .monument-frame img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .bharat-explorer .monument-frame .tint { position:absolute; inset:0; background:linear-gradient(135deg, rgba(247,244,237,.28) 0%, rgba(247,244,237,0) 45%), linear-gradient(0deg, rgba(90,60,20,.18), rgba(90,60,20,0) 60%); }
        .bharat-explorer .monument-frame .quote { position:absolute; right:26px; top:22px; max-width:13rem; text-align:right; font-family:"Dancing Script",cursive; font-size:34px; line-height:.9; color:#f0c66e; text-shadow:0 2px 10px rgba(0,0,0,.65), 0 0 2px rgba(0,0,0,.85); }
        @media(max-width:900px) { .bharat-explorer .explorer-hero { grid-template-columns:1fr; } .bharat-explorer .explorer-copy { padding:16px 8vw 16px; } .bharat-explorer .explorer-map { padding:16px 7vw 24px; border-left:0; border-top:1px solid rgba(255,255,255,.1); } }
      `}</style>
      <div id="explore-section" className="explorer-hero">
        <div className="explorer-copy relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_5%_75%,rgba(168,111,35,.17),transparent_43%),linear-gradient(115deg,#0b0e12_10%,#18150e_100%)]" />
          <p className="relative mb-5 text-[10px] font-semibold uppercase tracking-[.3em] text-[#d6ac59]">Discover · Explore · Experience</p>
          <h2 className="relative font-['Cormorant_Garamond',serif] text-[clamp(52px,5.7vw,86px)] font-semibold leading-[.86] tracking-[-.035em] text-[#fffaf2]">
            One India.<br />
            <em className="not-italic text-[#d99f30] whitespace-nowrap">
              Infinite Treasures.
            </em>
          </h2>          <p className="relative mt-7 max-w-xl text-base leading-relaxed text-[#c9c7c2] sm:text-lg">Explore the rich diversity of India through its states and discover unique products, crafts, foods and traditions that make every region special.</p>
          <div className="relative mt-12 grid max-w-xl grid-cols-4 border-y border-white/10 py-6">
            {[['28', 'States'], ['8', 'Union Territories'], ['1000+', 'Unique Products'], ['One', 'Incredible India']].map(([value, label], index) => <div key={label} className={index === 0 ? 'pr-3' : 'border-l border-white/10 px-3'}><b className="font-['Cormorant_Garamond',serif] text-3xl text-[#f0c66e] sm:text-4xl">{value}</b><span className="mt-1 block text-[10px] leading-tight text-[#d2d0cb]">{label}</span></div>)}
          </div>
          <button onClick={() => detailsRef.current?.scrollIntoView({ behavior: "smooth" })} className="relative mt-12 flex w-fit items-center gap-3 text-left text-xs text-[#fffaf2] transition hover:text-[#e9bd63]"><span className="grid h-10 w-10 place-items-center rounded-full border border-[#d99f30]"><ArrowDown size={16} /></span><span><b className="block">Explore States</b><small className="text-[#b1b4bb]">Click a state or scroll down</small></span></button>
        </div>
        <div className="explorer-map">
          <div className="h-full p-5 sm:p-8 lg:p-10"><IndiaMap products={products} activeState={activeState} onStateSelect={(state) => selectState(state, true)} /></div>
        </div>
      </div>

      <section ref={detailsRef} id="state-details" className="state-paper scroll-mt-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-[#d69c35]/30 pb-4">
            <span className="text-xs font-semibold uppercase tracking-[.28em] text-[#d69c35]">Explore</span>
            <div className="flex gap-5 text-xs uppercase tracking-[.12em] text-[#f4efe9]">
              {['Overview', 'Products', 'Culture', 'Places'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? 'border-b-2 border-[#d69c35] pb-2 text-[#FFE600]' : 'pb-2'}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div><div className="flex items-center gap-5"><h2 className="font-['Cormorant_Garamond',serif] text-[clamp(50px,6vw,82px)] font-semibold leading-none text-[#FFE600]">{activeState}</h2><span className="h-px w-16 bg-[#d69c35]" /></div><p className="mt-3 font-['Cormorant_Garamond',serif] text-xl sm:text-2xl text-[#f4efe9]">{detail.tagline}</p><p className="mt-5 max-w-xl text-sm leading-relaxed text-[#f4efe9]/80">{detail.description}</p><button onClick={() => document.getElementById('explore-section')?.scrollIntoView({ behavior: "smooth" })} className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d69c35]/50 px-4 py-2 text-xs text-[#FFE600] hover:bg-[#d69c35]/20"><ArrowLeft size={14} /> Back to Map</button></div>
            <div className="monument-frame">
              <img src={detail.monumentImage} alt={`${activeState} landmark`} />
              <div className="tint" />
              <div className="quote">{detail.bannerQuote}</div>
            </div>
          </div>
          {activeTab === 'Products' ? <><div className="mt-14 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[.22em] text-[#d69c35]">Curated collection</p><h3 className="mt-1 flex items-center gap-3 font-['Cormorant_Garamond',serif] text-3xl font-semibold text-[#FFE600]"><span className="h-5 w-1 bg-[#d69c35]" /> Products from {activeState}</h3><p className="mt-1 text-xs text-[#f4efe9]/70">A glimpse of {activeState}'s finest creations</p></div><button className="inline-flex items-center gap-2 text-xs text-[#FFE600]">View All <ArrowRight size={14} /></button></div>{stateProducts.length > 0 ? <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{stateProducts.map((product) => <StateProductCard key={product.name} product={product} onSelect={onSelectProduct} />)}</div> : <div className="mt-5 border border-dashed border-[#d69c35]/30 bg-white/10 px-6 py-10 text-center text-sm text-[#f4efe9]/70">No products available for {activeState} yet.</div>}</> : <div className="mt-12 max-w-3xl border border-[#d69c35]/30 bg-white/10 p-7 text-sm leading-relaxed text-[#f4efe9]/80">{detail.description} The living traditions, landscapes and skilled makers of {activeState} shape every object in this regional collection.</div>}
        </div>
      </section>
    </section>
  );
}