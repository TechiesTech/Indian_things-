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
    <nav id="main-navbar" className={`fixed top-0 left-0 w-full h-[76px] z-100 px-[clamp(12px,3vw,48px)] py-0 flex items-center justify-between transition-colors duration-300 ease-in-out`} style={{ color: lightBackground ? "#2b2421" : "#FFE600" }}>
      <a href="#" className="h-[46px] inline-flex items-center gap-2.5 leading-none whitespace-nowrap" aria-label="Indian Things Home">
  <img
    className="w-[75px] h-[75px] flex-[3_0_44px] rounded-full object-cover transition-all duration-300"
    src="/images/IndianThingsLogo.png"
    alt=""
    aria-hidden="true"
    style={{ filter: lightBackground ? "brightness(0.5)" : "brightness(1)" }}
  />
  <span className="inline-flex items-center leading-none font-serif text-[20px] font-semibold tracking-[.14em]" style={{ color: lightBackground ? "#2b2421" : "#FFE600" }}>
    INDIAN THINGS
  </span>
</a>

      <div className="hidden sm:flex gap-[35px] text-[10px] uppercase tracking-[.18em]">
        <a href="#story" onClick={(e) => scrollToSection(e, "story")} className="relative transition-colors duration-400 ease-in-out hover:text-gold-light after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold-light after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
          Story
        </a>
        <a href="#collection" onClick={(e) => scrollToSection(e, "collection")} className="relative transition-colors duration-400 ease-in-out hover:text-gold-light after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold-light after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
          Collection
        </a>
        <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="relative transition-colors duration-400 ease-in-out hover:text-gold-light after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold-light after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
          Contact
        </a>
      </div>

      <button
        id="mobile-menu-button"
        className={`sm:hidden border-0 bg-none cursor-pointer p-2 ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        <span className="block w-[30px] h-[1px] my-[7px] transition-all duration-300 ease-in-out" style={{ backgroundColor: lightBackground ? "#2b2421" : "#FFE600" }} />
        <span className="block w-[30px] h-[1px] my-[7px] transition-all duration-300 ease-in-out" style={{ backgroundColor: lightBackground ? "#2b2421" : "#FFE600" }} />
      </button>
    </nav>
  );
}
