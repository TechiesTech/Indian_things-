import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import HeroSlideIndianThings from "./HeroSlideIndianThings";
import HeroSlideSacredSpices from "./HeroSlideSacredSpices";
import HeroSlideKashmirSaffron from "./HeroSlideKashmirSaffron";
import saffronHeroImage from "../../assets/images/saffron/saffron1.jpg";

interface HeroSectionProps {
  currentSlide: number;
  setCurrentSlide: (slide: number | ((prev: number) => number)) => void;
  saffronTitleIndex: number;
  setSaffronTitleIndex: (index: number) => void;
}

export default function HeroSection({
  currentSlide,
  setCurrentSlide,
  saffronTitleIndex,
  setSaffronTitleIndex,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "30%"]
  );

  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.1]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );

  return (
    <section ref={heroRef} id="hero" className="hero">
      {/* Backgrounds with Crossfade */}
      <AnimatePresence mode="wait">
        {currentSlide === 0 ? (
          <motion.div
            key="hero-slide-1-bg"
            className="hero-pattern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{
              y: heroY,
              scale: heroScale,
            }}
          />
        ) : currentSlide === 1 ? (
          <motion.div
            key="hero-slide-2-bg"
            className="hero-image-bg"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.95, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              y: heroY,
            }}
          />
        ) : (
          <motion.div
            key="hero-slide-3-bg"
            className="hero-saffron-bg"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.96, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              y: heroY,
              backgroundImage: `linear-gradient(rgba(30, 8, 5, 0.50), rgba(16, 4, 3, 0.72)), url('${saffronHeroImage}')`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="hero-overlay" />

      <motion.div
        className="hero-content mx-auto flex flex-col items-center justify-center text-center"
        style={{
          opacity: heroOpacity,
        }}
      >
        <AnimatePresence mode="wait">
          {currentSlide === 0 ? (
            <HeroSlideIndianThings key="slide-1-content" />
          ) : currentSlide === 1 ? (
            <HeroSlideSacredSpices key="slide-2-content" />
          ) : (
            <HeroSlideKashmirSaffron
              key="slide-3-saffron"
              saffronTitleIndex={saffronTitleIndex}
              setSaffronTitleIndex={setSaffronTitleIndex}
            />
          )}
        </AnimatePresence>

        {/* CLEAN LUXURY HERO SCROLL INDICATOR (CENTERED WITH 3-SLIDE NAVIGATION) */}
        <div className="hero-scroll mx-auto">
          <button
            onClick={() => setCurrentSlide((curr) => (curr + 1) % 3)}
            className="text-left hover:text-[#e6cb8c] transition-colors cursor-pointer"
            title="Click to cycle next slide"
            aria-label="Next slide"
          >
            {currentSlide === 0 ? (
              <span>
                01 — <span className="text-[#FFE600] font-semibold">HARVEST</span>
              </span>
            ) : currentSlide === 1 ? (
              "02 — PROVENANCE"
            ) : (
              "03 — KASHMIR SAFFRON"
            )}
          </button>

          <div className="scroll-track">
            <div />
          </div>

          <div className="flex items-center justify-end gap-2">
            {[0, 1, 2].map((idx) => (
              <button
                key={`hero-slide-nav-${idx}`}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all rounded-full cursor-pointer ${currentSlide === idx
                    ? "w-6 bg-[#e6cb8c]"
                    : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
