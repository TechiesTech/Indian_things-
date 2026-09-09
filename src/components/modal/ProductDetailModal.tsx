import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Sparkles } from "lucide-react";
import type { Product } from "../../types";

interface ProductDetailModalProps {
  selectedProduct: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  selectedProduct,
  onClose,
}: ProductDetailModalProps) {
  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          id="detail-modal-backdrop"
          className="detail-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            id="detail-modal-container"
            className="detail-modal"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-6 border-b border-[#c9a45b]/30">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-[#e6cb8c] uppercase">
                  {selectedProduct.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-normal font-serif text-[#fffdf9] mt-1">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                id="close-modal-button"
                onClick={onClose}
                className="text-[#e6cb8c] hover:text-white p-2 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] text-[#c9a45b] uppercase mb-1">
                    Regional Provenance
                  </h4>
                  <p className="text-sm text-[#f4efe9]/90 font-light">
                    {selectedProduct.origin}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] tracking-[0.2em] text-[#c9a45b] uppercase mb-1">
                    Quality Grade
                  </h4>
                  <p className="text-sm text-[#f4efe9]/90 font-light">
                    {selectedProduct.grade}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.2em] text-[#c9a45b] uppercase mb-1">
                  Purity & Terroir Profile
                </h4>
                <p className="text-sm text-[#f4efe9]/80 font-light leading-relaxed">
                  {selectedProduct.materialNotes}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#c9a45b]/20">
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] text-[#c9a45b] uppercase mb-1">
                    Packaging & Volume
                  </h4>
                  <p className="text-xs text-[#f4efe9]/70">
                    {selectedProduct.dimensions}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] text-[#c9a45b] uppercase mb-1">
                    Harvest Release
                  </h4>
                  <p className="text-xs text-[#f4efe9]/70">
                    {selectedProduct.harvest || selectedProduct.year}
                  </p>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <span className="text-[10px] md:text-[11px] text-[#e6cb8c] tracking-widest flex items-center gap-1.5 font-medium">
                  <Sparkles size={13} />
                  100% PURE A-GRADE
                </span>
                <a
                  href={`mailto:curator@indianthings.studio?subject=Harvest%20Inquiry:%20${encodeURIComponent(selectedProduct.name)}`}
                  className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[#fffdf9] hover:text-[#e6cb8c] flex items-center gap-1 transition-colors"
                >
                  Inquire Harvest Lot <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
