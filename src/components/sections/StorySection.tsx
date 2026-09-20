import { type MouseEvent } from "react";
import FlipText from "../common/FlipText";

interface StorySectionProps {
  scrollToSection: (
    e: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => void;
}

export default function StorySection({
  scrollToSection,
}: StorySectionProps) {
  return (
    <section
      id="story"
      className="
        relative
        min-h-[70svh]
        grid
        grid-cols-1
        lg:grid-cols-[80px_1.2fr_.8fr]
        items-center
        gap-10
        lg:gap-[5vw]
        px-6
        py-16
        sm:px-10
        sm:py-20
        md:px-12
        lg:px-[8vw]
        lg:py-[5vw]
        bg-[#f7f4ed]
        text-[#35120e]
        overflow-hidden
      "
    >
      {/* Section Number */}
      <div
        className="
          text-[#d69c35]
          text-[11px]
          tracking-[.2em]
          justify-self-start
          lg:self-start
        "
      >
        02
      </div>

      {/* Content */}
      <div
        className="
          story-content
          w-full
          max-w-[700px]
          mx-auto
          lg:mx-0
          text-center
          lg:text-left
        "
      >
        {/* Small Heading */}
        <p
          className="
            text-[#8b4513]
            text-[10px]
            sm:text-[11px]
            tracking-[.22em]
            sm:tracking-[.27em]
            mb-5
            sm:mb-6
          "
        >
          THE PROVENANCE OF PURITY
        </p>

        {/* Main Heading */}
        <h2
          className="
            m-0
            mb-8
            sm:mb-10
            font-['Cormorant_Garamond',serif]
            text-[clamp(58px,13vw,140px)]
            sm:text-[clamp(65px,10vw,120px)]
            lg:text-[clamp(65px,9vw,140px)]
            leading-[.78]
            tracking-[-.055em]
            font-medium
            perspective-[900px]
          "
        >
          <FlipText delay={0.05}> 
            <span
              className="
                inline-block
                origin-center-bottom
                flip-text
                whitespace-nowrap
              "
            >
              ROOTED IN
            </span>
          </FlipText>

          <br />

          <FlipText delay={0.2}>
            <span
              className="
                inline-block
                origin-center-bottom
                flip-text
              "
            >
              ORIGIN.
            </span>
          </FlipText>
        </h2>

        {/* Description */}
        <p
          className="
            w-full
            max-w-[400px]
            mx-auto
            lg:mx-0
            text-[#725d56]
            text-[13px]
            sm:text-[14px]
            leading-[1.8]
            mb-7
            sm:mb-8
          "
        >
          From the dawn-blooming saffron fields of Kashmir to the rain-nourished
          spice slopes of Kerala and Goa. Pure single-estate botanicals,
          sun-cured spices, and raw unheated wildcomb nectar.
        </p>

        {/* Link */}
        <a
          id="story-discover-link"
          href="#collection"
          className="
            inline-block
            pb-[7px]
            border-b
            border-[#d69c35]
            text-[#35120e]
            text-[10px]
            tracking-[.15em]
            transition-all
            duration-300
            cursor-pointer
            hover:text-[#8b4513]
            hover:border-[#8b4513]
            hover:translate-x-1
          "
          onClick={(e) => scrollToSection(e, "collection")}
        >
          EXPLORE GRADE-A{" "}
          <span className="text-[#35120e] font-semibold">
            HARVESTS
          </span>{" "}
          ↗
        </a>
      </div>

      {/* Logo / Video */}
{/* Logo / Orbit */}
<div
  className="
    relative
    w-[85vw]
    max-w-[380px]
    aspect-square
    mx-auto
    grid
    place-items-center
    translate-y-10
    sm:translate-y-10
    md:translate-y-6
    lg:translate-y-0
  "
  aria-hidden="true"
>
  {/* Outer Orbit */}
  <div
    className="
      absolute
      inset-[5%]
      z-10
      rounded-full
      border
      border-[rgba(91,33,25,.25)]
      animate-[rotateOrbit_18s_linear_infinite]
      pointer-events-none
    "
  />

  {/* Inner Orbit */}
  <div
    className="
      absolute
      inset-[20%]
      z-10
      rounded-full
      border
      border-[rgba(201,164,91,.7)]
      animate-[rotateOrbit_12s_reverse_linear_infinite]
      pointer-events-none
    "
  />

  {/* Logo */}
  <div
    className="
      absolute
      left-1/2
      top-1/2
      z-20
      w-[65%]
      lg:w-[75%]
      aspect-square
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      overflow-hidden
      shadow-[0_30px_80px_rgba(53,18,14,.25)]
    "
  >
    <video
      className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        object-center
      "
      src="/images/IndianThingsLogo.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
</div>
    </section>
  );
}