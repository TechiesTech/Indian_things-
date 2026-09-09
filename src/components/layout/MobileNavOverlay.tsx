import { type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileNavOverlayProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  scrollToSection: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export default function MobileNavOverlay({
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
}: MobileNavOverlayProps) {
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          id="mobile-nav-overlay"
          className="mobile-nav-overlay"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            className="mobile-nav-close"
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            title="Close navigation menu"
          >
            <X aria-hidden="true" />
          </button>

          <a href="#story" onClick={(e) => scrollToSection(e, "story")}>
            01. Story
          </a>
          <a href="#collection" onClick={(e) => scrollToSection(e, "collection")}>
            02. Collection
          </a>
          <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
            03. Contact
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
