import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <button
      className="product-card"
      onClick={() => onSelect(product)}
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
      <span className="product-card__info">
        <span className="product-card__category">{product.category}</span>
        <span className="product-card__name">{product.name}</span>
      </span>
    </button>
  );
}
