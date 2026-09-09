import { type MouseEvent } from "react";
import FlipText from "../common/FlipText";

interface StorySectionProps {
  scrollToSection: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export default function StorySection({ scrollToSection }: StorySectionProps) {
  return (
    <section id="story" className="story">
      <div className="story-number">02</div>

      <div className="story-content">
        <p className="eyebrow dark">THE PROVENANCE OF PURITY</p>

        <h2>
          <FlipText delay={0.05}>ROOTED</FlipText>{" "}
          <FlipText delay={0.12}>IN</FlipText>
          <br />
          <FlipText delay={0.2}>ORIGIN.</FlipText>
        </h2>

        <p className="description">
          From the dawn-blooming saffron fields of Kashmir to the rain-nourished
          spice slopes of Kerala and Goa. Pure single-estate botanicals, sun-cured
          spices, and raw unheated wildcomb nectar.
        </p>

        <a
          id="story-discover-link"
          href="#collection"
          className="gold-link"
          onClick={(e) => scrollToSection(e, "collection")}
        >
          EXPLORE GRADE-A <span className="text-[var(--maroon)] font-semibold">HARVESTS</span> ↗
        </a>
      </div>

      <div className="story-symbol" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />

        <div className="symbol-center">
          <img
            className="story-logo"
            src="/images/IndianThingsLogo.png"
            alt="Indian Things"
          />
        </div>
      </div>
    </section>
  );
}
