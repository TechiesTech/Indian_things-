import { type MouseEvent } from "react";
import FlipText from "../common/FlipText";

interface StorySectionProps {
  scrollToSection: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export default function StorySection({ scrollToSection }: StorySectionProps) {
  return (
 <section id="story" className="relative min-h-[70svh] grid grid-cols-[80px_1.2fr_.8fr] items-center gap-[5vw] p-[5vw_8vw] bg-[#f7f4ed] text-[#35120e] overflow-hidden">
  <div className="text-[#d69c35] text-[11px] tracking-[.2em] self-start">02</div>

  <div className="story-content">
    <p className="text-[#8b4513] text-[10px] tracking-[.27em] mb-6 text-center">THE PROVENANCE OF PURITY</p>

    <h2 className="m-0 mb-10 font-['Cormorant_Garamond',serif] text-[clamp(65px,9vw,140px)] leading-[.76] tracking-[-.055em] font-medium perspective-[900px]">
      <FlipText delay={0.05}>
        <span className="inline-block origin-center-bottom flip-text whitespace-nowrap">ROOTED IN</span>
      </FlipText>
      <br />
      <FlipText delay={0.2}>
        <span className="inline-block origin-center-bottom flip-text">ORIGIN.</span>
      </FlipText>
    </h2>

    <p className="max-w-[400px] text-[#725d56] text-[14px] leading-[1.8] mb-8">
      From the dawn-blooming saffron fields of Kashmir to the rain-nourished
      spice slopes of Kerala and Goa. Pure single-estate botanicals, sun-cured
      spices, and raw unheated wildcomb nectar.
    </p>

    <a
      id="story-discover-link"
      href="#collection"
      className="inline-block pb-[7px] border-b border-[#d69c35] text-[#35120e] text-[10px] tracking-[.15em] transition-all duration-300 cursor-pointer hover:text-[#8b4513] hover:border-[#8b4513] hover:translate-x-1"
      onClick={(e) => scrollToSection(e, "collection")}
    >
      EXPLORE GRADE-A{" "}
      <span className="text-[#35120e] font-semibold">
        HARVESTS
      </span>{" "}
      ↗
    </a>
  </div>

  <div className="relative w-[min(30vw,380px)] aspect-square grid place-items-center" aria-hidden="true">
    <div className="absolute inset-[5%] rounded-full border border-[rgba(91,33,25,.25)] animate-[rotateOrbit_18s_linear_infinite]" />
    <div className="absolute inset-[20%] rounded-full border border-[rgba(201,164,91,.7)] animate-[rotateOrbit_12s_reverse_linear_infinite]" />

    <div className="relative w-[60%] aspect-square rounded-full grid place-items-center shadow-[0_30px_80px_rgba(53,18,14,.25)] select-none">
        

      <div className="symbol-center">
        <video
          className="story-logo"
          src="/images/IndianThingsLogo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  </div>
</section>
  );
}
