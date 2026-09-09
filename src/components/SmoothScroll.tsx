import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = prefersReducedMotion
      ? null
      : new Lenis({
          duration: 1,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          lerp: 0.1,
        });

    lenis?.on("scroll", () => {
      window.dispatchEvent(new Event("smooth-scroll"));
    });

    const scrollToSection = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const element = document.getElementById(id);

      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { offset: -76, immediate: false });
        } else {
          const targetTop = element.getBoundingClientRect().top + window.scrollY - 76;
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("smooth-scroll-to", scrollToSection);

    if (!lenis) {
      return () => window.removeEventListener("smooth-scroll-to", scrollToSection);
    }

    let animationFrame: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("smooth-scroll-to", scrollToSection);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
