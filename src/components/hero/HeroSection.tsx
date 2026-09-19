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
    <section ref={heroRef} id="hero" className="relative h-[90svh] min-h-[580px] grid place-items-center overflow-hidden bg-[#35120e]">
      {/* Backgrounds with Crossfade */}
      <AnimatePresence mode="wait">
        {currentSlide === 0 ? (
          <motion.div
            key="hero-slide-1-bg"
            className="absolute -inset-[10%] bg-[linear-gradient(rgba(53,18,14,.3),rgba(53,18,14,.3)),url('/images/indian-pattern.png')] bg-[length:620px_auto] bg-center"
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
            className="absolute -inset-[5%] bg-[linear-gradient(rgba(40,12,8,0.45),rgba(25,6,4,0.65)),url('/images/spices-hero-slide-2.jpg')] bg-cover bg-center"
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
            className="absolute -inset-[5%] bg-[linear-gradient(rgba(32,8,5,0.50),rgba(18,4,3,0.72)),url('https://i.pinimg.com/1200x/3c/70/b9/3c70b9b77c6d379f197b9504fb0148f1.jpg')] bg-cover bg-center"
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(30,8,4,.35)_55%,rgba(20,5,3,.88)_100%)] pointer-events-none" />

      <motion.div
        className="relative mx-auto flex max-w-[min(1100px,calc(100%-32px))] min-w-0 flex-col items-center justify-center text-center"
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
        <div className="mx-auto mt-[65px] grid max-w-[440px] grid-cols-[1fr_90px_1fr] items-center gap-5 text-[9px] tracking-[.17em] text-white/70">
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

          <div className="h-px bg-white/25 overflow-hidden">
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
