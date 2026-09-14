import { useState, useEffect, type MouseEvent } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileNavOverlay from "./components/layout/MobileNavOverlay";
import HeroSection from "./components/hero/HeroSection";
import StorySection from "./components/sections/StorySection";
import CollectionSection from "./components/sections/CollectionSection";
import ClosingSection from "./components/sections/ClosingSection";
import ProductDetailModal from "./components/modal/ProductDetailModal";
import { products } from "./data/products";
import { saffronRotatingTitles } from "./constants/heroConstants";
import type { Product } from "./types";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0); // 0 = Indian Things, 1 = Sacred Spices, 2 = Kashmir Saffron
  const [saffronTitleIndex, setSaffronTitleIndex] = useState(0);

  // Automatic 16-second cinematic crossfade between the 3 slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((curr) => (curr + 1) % 3);
    }, 16000);

    return () => clearInterval(timer);
  }, []);

  // 4 titles scrolling animation effect: cycles every 3.2 seconds
  useEffect(() => {
    if (currentSlide !== 2) return;
    const titleTimer = setInterval(() => {
      setSaffronTitleIndex((prev) => (prev + 1) % saffronRotatingTitles.length);
    }, 3200);

    return () => clearInterval(titleTimer);
  }, [currentSlide]);

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    void e;
    setMobileMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent("navbar-theme", {
        detail: { light: id === "story" || id === "contact" },
      }),
    );
  };

  return (
    <SmoothScroll>
      <main id="main-content">
        <Navbar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          scrollToSection={scrollToSection}
        />

        <MobileNavOverlay
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          scrollToSection={scrollToSection}
        />

        <HeroSection
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          saffronTitleIndex={saffronTitleIndex}
          setSaffronTitleIndex={setSaffronTitleIndex}
        />

        <StorySection scrollToSection={scrollToSection} />

        <CollectionSection
          products={products}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        <ClosingSection />
        
        <Footer />
        

        <ProductDetailModal
          selectedProduct={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </main>
    </SmoothScroll>
  );
}
