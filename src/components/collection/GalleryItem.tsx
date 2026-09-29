import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "../../types";

export interface GalleryItemProps {
  key?: string;
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}

export default function GalleryItem({ product, index, onSelect }: GalleryItemProps) {
  const ref = useRef<HTMLElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const images = product.images ?? [];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [product.speed, -product.speed]
  );

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <motion.article
      ref={ref}
      id={`gallery-item-${product.type}`}
      className={`gallery-item ${product.type}`}
      initial={{
        opacity: 0,
        scale: 0.94,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1,
        delay: index * 0.08,
      }}
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
      <motion.div
        className="product-image"
        style={{ y }}
      >
        {images.length > 0 && (
          <AnimatePresence mode="popLayout">
            <motion.img
              key={images[activeImage]}
              src={images[activeImage]}
              alt={`${product.name} production detail`}
              className="product-photo"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        )}

        {images.length === 0 && <div className="product-glow" />}

        {images.length === 0 && (
          <div className="product-shape">
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
        )}

        {images.length > 0 && (
          <span className="product-photo-index">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </motion.div>

      <div className="product-info">
        <span>{product.category}</span>
        <div className="flex items-center justify-between gap-3">
          <h3>{product.name}</h3>
          <div className="flex items-center gap-2">
            <a
              href="https://indian-things-ecom-git-main-techiestechs-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1 rounded-full border border-[#d69c35]/50 bg-[#d69c35]/15 text-[#FFE600] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#d69c35] hover:text-[#21170b] transition-all"
              aria-label={`Enquire about ${product.name}`}
            >
              Enquire
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#d69c35]/50 bg-[#d69c35]/20 text-[#d69c35] transition-all hover:bg-[#d69c35] hover:text-[#21170b]"
              aria-label="View product details"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
