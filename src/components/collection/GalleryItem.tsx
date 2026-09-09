import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
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
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={images[activeImage]}
                src={images[activeImage]}
                alt={`${product.name} production detail`}
                className="product-photo"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 1, scale: 1.04, x: 18 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 1, scale: 0.98, x: -18 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
        <h3>{product.name}</h3>
      </div>
    </motion.article>
  );
}
