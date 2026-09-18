import { motion, AnimatePresence } from "framer-motion";
import { saffronRotatingTitles } from "../../constants/heroConstants";

interface HeroSlideKashmirSaffronProps {
  key?: string;
  saffronTitleIndex: number;
  setSaffronTitleIndex: (index: number) => void;
}

export default function HeroSlideKashmirSaffron({
  saffronTitleIndex,
  setSaffronTitleIndex,
}: HeroSlideKashmirSaffronProps) {
  return (
    <motion.div
      key="slide-3-saffron"
      className="w-full flex flex-col items-center justify-center text-center min-w-0"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.p
        className="eyebrow text-center mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        VALLEY OF PAMPORE · GRADE-A MONGRA
      </motion.p>

      {/* 4 Titles Scrolling Animation Container (Smaller Compact Heading) */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[85px] md:min-h-[105px] overflow-hidden my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`saffron-title-${saffronTitleIndex}`}
            className="saffron-title flex flex-col items-center justify-center text-center w-full"
            initial={{
              opacity: 0,
              y: 28,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -28,
              filter: "blur(6px)",
            }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex justify-center items-center overflow-hidden">
              <span className="saffron-title-solid">
                {saffronRotatingTitles[saffronTitleIndex].line1}
              </span>
            </div>

            <div className="flex justify-center items-center overflow-hidden mt-0.5">
              <span className="saffron-title-outline">
                {saffronRotatingTitles[saffronTitleIndex].line2}
              </span>
            </div>

            <div className="text-[10px] md:text-[11px] font-sans tracking-[0.24em] text-[#e6cb8c] uppercase mt-1 font-light">
              {saffronRotatingTitles[saffronTitleIndex].accent}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrolling 4-Titles Marquee Ribbon */}
      <div className="saffron-ticker-wrap">
        <div className="saffron-ticker text-[10px] tracking-[0.24em] uppercase text-[#e6cb8c]">
          <span>✦ 01. KASHMIR MONGRA SAFFRON</span>
          <span>✦ 02. SINDOOR FLOWER BLOSSOM</span>
          <span>✦ 03. VALE OF PAMPORE GOLD</span>
          <span>✦ 04. GRADE-A CRIMSON THREADS</span>
          <span>✦ 01. KASHMIR MONGRA SAFFRON</span>
          <span>✦ 02. SINDOOR FLOWER BLOSSOM</span>
          <span>✦ 03. VALE OF PAMPORE GOLD</span>
          <span>✦ 04. GRADE-A CRIMSON THREADS</span>
        </div>
      </div>

      {/* Interactive 4-Title Indicators */}
      <div className="w-full flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mt-4">
        {saffronRotatingTitles.map((item, idx) => (
          <button
            key={`saffron-pill-${idx}`}
            onClick={() => setSaffronTitleIndex(idx)}
            className={`px-3 py-1 text-[9px] tracking-[0.18em] uppercase rounded-full transition-all cursor-pointer border ${
              saffronTitleIndex === idx
                ? "bg-[#e6cb8c] border-[#e6cb8c] text-[#1a0705] font-semibold shadow-md shadow-[#e6cb8c]/20 scale-105"
                : "bg-black/30 border-white/15 text-white/70 hover:text-white hover:border-[#e6cb8c]/50"
            }`}
            title={`Select title: ${item.line1} ${item.line2}`}
            aria-label={`Select title: ${item.line1} ${item.line2}`}
          >
            {idx + 1}. {item.line1} {item.line2}
          </button>
        ))}
      </div>

      <motion.p
        className="max-w-[580px] mx-auto text-[11px] sm:text-xs md:text-sm mt-7 font-light leading-relaxed tracking-widest text-center text-[#d9cbb5]/90"
        initial={{
          opacity: 0,
          scale: 0.35,
          y: 20,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          scale: [0.35, 1.04, 1],
          y: 0,
          filter: ["blur(10px)", "blur(2px)", "blur(0px)"],
        }}
        transition={{
          duration: 3.4,
          delay: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformOrigin: "center center",
          textShadow: "0 1px 12px rgba(0,0,0,1), 0 0 50px rgba(0,0,0,1), 0 0 4px rgba(230,203,140,0.3)",
          letterSpacing: "0.03em",
        }}
      >
        Hand-harvested at dawn from purple Crocus sativus blossoms on the misty plateaus
        of Pampore, Kashmir. Revered as the world's most potent Mongra saffron—celebrated
        for its deep crimson stigmas, crocin coloring power (&gt;250), and intoxicating honeyed aroma.
      </motion.p>
    </motion.div>
  );
}
