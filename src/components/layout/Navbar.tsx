import { useEffect, useState, type MouseEvent } from "react";

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  scrollToSection: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export default function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
}: NavbarProps) {
  const [lightBackground, setLightBackground] = useState(false);

  useEffect(() => {
    let frame = 0;
    const lightSectionIds = ["story", "contact"];

    const applyRequestedTheme = (event: Event) => {
      const light = (event as CustomEvent<{ light: boolean }>).detail?.light;
      setLightBackground(Boolean(light));
    };

    const updateNavbarTheme = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const isLightBackground = lightSectionIds.some((sectionId) => {
          const section = document.getElementById(sectionId);
          if (!section) return false;

          const bounds = section.getBoundingClientRect();
          return bounds.top <= 76 && bounds.bottom > 76;
        });

        setLightBackground(isLightBackground);
      });
    };

    const observer = new IntersectionObserver(updateNavbarTheme, {
      rootMargin: "-76px 0px 0px 0px",
      threshold: [0, 0.01],
    });

    lightSectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    updateNavbarTheme();
    window.addEventListener("scroll", updateNavbarTheme, { passive: true });
    window.addEventListener("smooth-scroll", updateNavbarTheme);
    window.addEventListener("navbar-theme", applyRequestedTheme);
    window.addEventListener("hashchange", updateNavbarTheme);
    window.addEventListener("resize", updateNavbarTheme);

    return () => {
      window.removeEventListener("scroll", updateNavbarTheme);
      window.removeEventListener("smooth-scroll", updateNavbarTheme);
      window.removeEventListener("navbar-theme", applyRequestedTheme);
      window.removeEventListener("hashchange", updateNavbarTheme);
      window.removeEventListener("resize", updateNavbarTheme);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav id="main-navbar" className={`navbar ${lightBackground ? "is-light" : ""}`}>
      <a href="#" className="logo" aria-label="Indian Things Home">
  <img
    className="logo-mark"
    src="/images/IndianThingsLogo.png"
    // alt="Indian Things"
    aria-hidden="true"
  />
  <span className="logo-name" style={{ color: "#FFE600" }}>
    INDIAN THINGS
  </span>
</a>

      <div className="nav-links">
        <a href="#story" onClick={(e) => scrollToSection(e, "story")}>
          Story
        </a>
        <a href="#collection" onClick={(e) => scrollToSection(e, "collection")}>
          Collection
        </a>
        <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
          Contact
        </a>
      </div>

      <button
        id="mobile-menu-button"
        className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        <span />
        <span />
      </button>
    </nav>
  );
}
