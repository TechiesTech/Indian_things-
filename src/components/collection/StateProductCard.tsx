import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "../../types";

interface StateProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function StateProductCard({ product, onSelect }: StateProductCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const images = product.images ?? [];

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div
      className="product-card group relative"
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(product);
        }
      }}
      aria-label={`View details for ${product.name}`}
    >
      <AnimatePresence mode="popLayout">
        <motion.img
          key={images[activeImage]}
          src={images[activeImage]}
          alt={product.name}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Direct Enquire Button on Card */}
      <div className="absolute top-2.5 right-2.5 z-10">
        <a
          id={`card-enquire-${product.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
          href="https://indian-things-ecom-git-main-techiestechs-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 rounded-full bg-[#1c1710]/80 border border-[#d69c35]/60 px-2.5 py-1 text-[9px] font-semibold tracking-wider uppercase text-[#FFE600] backdrop-blur-sm transition-all duration-300 hover:bg-[#d69c35] hover:text-[#21170b] hover:border-[#d69c35] hover:scale-105 active:scale-95 shadow-md shadow-black/50"
          title={`Enquire about ${product.name}`}
          aria-label={`Enquire about ${product.name}`}
        >
          <span>Enquire</span>
          <ArrowUpRight size={10} />
        </a>
      </div>

      <span className="product-card__info">
        <span className="product-card__category">{product.category}</span>
        <span className="product-card__name">{product.name}</span>
      </span>
    </div>
  );
}
