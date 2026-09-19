import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronRight } from "lucide-react";
import type { Product } from "../../types";

interface ProductDetailModalProps {
  selectedProduct: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  selectedProduct,
  onClose,
}: ProductDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const images = selectedProduct?.images || [];

  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
  };

  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl max-h-[80vh] bg-[#2a0f0c] rounded-2xl shadow-2xl overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left side - Image gallery */}
              <div className="relative flex bg-[#1a0806] p-4">
                {/* Thumbnail sidebar */}
                {images.length > 1 && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
                    {images.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleThumbnailClick(idx)}
                        className={`h-16 w-16 overflow-hidden rounded-md border-2 transition-all ${
                          idx === activeImage
                            ? "border-[#d69c35] opacity-100"
                            : "border-white/20 opacity-50 hover:border-white/40 hover:opacity-80"
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.name} thumbnail ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main image with frame */}
                <div className="flex-1 pl-20 md:pl-24">
                  {images.length > 0 && (
                    <div className="relative w-full h-full">
                      {/* Premium frame */}
                      <div className="absolute inset-0 border-4 border-[#d69c35]/30 rounded-lg pointer-events-none" />
                      <div className="absolute inset-0 border border-[#d69c35]/10 rounded-lg pointer-events-none m-2" />
                      <img
                        src={images[activeImage]}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover min-h-[400px] md:min-h-[500px] rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right side - Product details */}
              <div className="p-8 md:p-12 flex flex-col">
                {/* Category */}
                <span className="text-[10px] tracking-[0.3em] text-[#d69c35] uppercase mb-2">
                  {selectedProduct.category}
                </span>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-serif text-[#fffdf9] mb-2">
                  {selectedProduct.name}
                </h2>

                {/* Subtitle */}
                <p className="text-sm text-[#aeb6c3] mb-6">
                  Authentic Heritage Craft
                </p>

                {/* Description */}
                <p className="text-sm text-[#f4efe9]/80 leading-relaxed mb-8">
                  {selectedProduct.materialNotes}
                </p>

                {/* Details grid */}
                <div className="space-y-4 mb-8">
                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-[10px] tracking-[0.2em] text-[#d69c35] uppercase mb-1">
                      Material
                    </h4>
                    <p className="text-sm text-[#f4efe9]/90">
                      {selectedProduct.grade || "Premium Quality"}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-[10px] tracking-[0.2em] text-[#d69c35] uppercase mb-1">
                      Origin
                    </h4>
                    <p className="text-sm text-[#f4efe9]/90">
                      {selectedProduct.origin}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-[10px] tracking-[0.2em] text-[#d69c35] uppercase mb-1">
                      Use
                    </h4>
                    <p className="text-sm text-[#f4efe9]/90">
                      {selectedProduct.harvest || "Culinary & Decorative"}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-sm italic text-[#d69c35] font-serif">
                    "A perfect blend of tradition, art and elegance."
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#d69c35] text-[#21170b] px-6 py-3 rounded-lg font-medium text-sm tracking-wide hover:bg-[#e6cb8c] transition-colors">
                    Enquire Now
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-medium text-sm tracking-wide hover:bg-white/20 transition-colors"
                  >
                    Close Details
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
