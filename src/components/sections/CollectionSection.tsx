import type { Product } from "../../types";
import GalleryItem from "../collection/GalleryItem";

interface CollectionSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function CollectionSection({
  products,
  onSelectProduct,
}: CollectionSectionProps) {
  return (
    <section id="collection" className="collection">
      <div className="collection-heading">
        <div>
          <p className="eyebrow collection-eyebrow">03 — THE HARVEST REGISTRY</p>
          <h2>
            GRADE-A
            <br />
            <em className="text-[#FFE600] not-italic">HARVESTS.</em>
          </h2>
        </div>

        <p className="collection-description">
          Single-origin spices, raw wild honey, and stone wood-milled oils. Hand-harvested
          with absolute chemical non-intervention. Click any harvest to inspect lab-certified
          purity and provenance.
        </p>
      </div>

      <div className="gallery">
        {products.map((product, index) => (
          <GalleryItem
            key={product.name}
            product={product}
            index={index}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
}
