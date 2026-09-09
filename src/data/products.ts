import type { Product } from "../types";
import saffron1 from "../assets/images/saffron/saffron1.jpg";
import saffron2 from "../assets/images/saffron/saffron2.jpg";
import saffron3 from "../assets/images/saffron/saffron3.jpg";
import honey1 from "../assets/images/Sundarbans Honey/Honey1.jpg";
import honey2 from "../assets/images/Sundarbans Honey/Honey2.jpg";
import honey3 from "../assets/images/Sundarbans Honey/Honey3.jpg";
import KeralaOil1 from "../assets/images/Kerala Oil/KeralaOil1.jpg";
import KeralaOil2 from "../assets/images/Kerala Oil/KeralaOil2.jpg";
import KeralaOil3 from "../assets/images/Kerala Oil/KeralaOil3.jpg";
import pepper1 from "../assets/images/TellicherryBoldPepper/Tellicherry Bold Pepper1.jpg";
import pepper2 from "../assets/images/TellicherryBoldPepper/Tellicherry Bold Pepper2.jpg";
import pepper3 from "../assets/images/TellicherryBoldPepper/Tellicherry Bold Pepper3.jpg";
import cardamom1 from "../assets/images/GreenCardamom/GreenCardamom1.jpg";
import cardamom2 from "../assets/images/GreenCardamom/GreenCardamom2.jpg";
import cardamom3 from "../assets/images/GreenCardamom/GreenCardamom3.jpg";
import nutmeg1 from "../assets/images/WholeNutmeg/WholeNutmeg1.jpg";
import nutmeg2 from "../assets/images/WholeNutmeg/WholeNutmeg2.jpg";
import nutmeg3 from "../assets/images/WholeNutmeg/WholeNutmeg3.jpg";

export const products: Product[] = [
  {
    name: "Kashmir Mongra Saffron",
    category: "PULWAMA / SINDOOR FLOWER",
    type: "gold",
    speed: 70,
    images: [
      saffron1,
      saffron2,
      saffron3,
    ],
    origin: "Pampore, Kashmir Valley",
    grade: "ISO 3632 Category I (100% Pure Mongra)",
    harvest: "Dawn-Plucked Autumn Bloom",
    materialNotes:
      "Original Grade-A Mongra saffron hand-harvested from the crimson stigmas of dawn-blooming purple Crocus sativus (Sindoor flower). Unadulterated with exceptional crocin coloring power (>250), honeyed aroma, and vivid crimson infusions.",
    dimensions: "1g, 5g & 10g In UV Miron Glass",
    year: "Autumn 2025 Reserve",
  },
  {
    name: "Sundarbans Raw Honey",
    category: "RAW NECTAR / UNHEATED",
    type: "clay",
    speed: -55,
    images: [
      honey1,
      honey2,
      honey3,
    ],
    origin: "Sundarbans Mangrove Canopy",
    grade: "100% Raw Wildcomb Harvest (Unfiltered)",
    harvest: "Apis Dorsata Wild Bee Gathering",
    materialNotes:
      "Wild, dark amber multifloral nectar gathered by native honey hunters from deep mangrove blossoms. Unfiltered, unpasteurized, and rich in natural bee pollen, royal propolis, and living enzymes.",
    dimensions: "350g Glazed Ceramic Crock",
    year: "Spring Wild Harvest",
  },
  {
    name: "Kerala Virgin Coconut Oil",
    category: "MALABAR COAST / WOOD-MILLED",
    type: "ivory",
    speed: 45,
    images: [
      KeralaOil1,
      KeralaOil2,
      KeralaOil3,
    ],
    origin: "Calicut, Malabar Coast, Kerala",
    grade: "Cold-Pressed Extra Virgin / Raw Food Grade",
    harvest: "Heirloom Coastal Palm Groves",
    materialNotes:
      "Expeller cold-pressed within 48 hours of plucking organically nurtured Malabar coconuts using traditional stone vagai wood expellers. Crystal-clear, zero refining, retaining >50% lauric acid and delicate coconut blossom aroma.",
    dimensions: "500ml Heavy Apothecary Bottle",
    year: "Fresh Expeller Batch",
  },
  {
    name: "Tellicherry Bold Pepper",
    category: "KERALA HIGHLANDS / TGSEB",
    type: "coal",
    speed: 60,
    images: [
      pepper1,
      pepper2,
      pepper3,
    ],
    origin: "Thalassery & Wayanad, Kerala",
    grade: "TGSEB (Special Extra Bold 4.75mm+)",
    harvest: "Vine-Ripened Crimson Berries",
    materialNotes:
      "Tellicherry Garbled Special Extra Bold (TGSEB), picked exclusively when peppercorn berries turn ripe ruby on high hill vines. Sun-cured on woven bamboo mats to release bright citrus-camphor top notes and deep lingering warmth.",
    dimensions: "200g Airtight Matte Tin",
    year: "Grade-A Export Selection",
  },
  {
    name: "Wayanad Green Cardamom",
    category: "WESTERN GHATS / JUMBO 8MM+",
    type: "terracotta",
    speed: -35,
    images: [
      cardamom1,
      cardamom2,
      cardamom3,
    ],
    origin: "Wayanad Cloud Forest, Kerala",
    grade: "Grade-A Jumbo Extra Bold (8mm - 8.5mm)",
    harvest: "Monsoon Hand Selection",
    materialNotes:
      "Selected from high-altitude estates blanketed in morning mist. Pods are hand-plucked at peak ripeness and cured in gentle eucalyptus kilns to seal their vivid jade green color and intensely sweet, resinous cineole aroma.",
    dimensions: "150g Aroma-Vault Canister",
    year: "Estate Vintage Reserve",
  },
  {
    name: "Goa Mace & Whole Nutmeg",
    category: "PONDA SPICE FOOTHILLS / WHOLE ARIL",
    type: "wood",
    speed: -45,
    images: [
      nutmeg1,
      nutmeg2,
      nutmeg3,
    ],
    origin: "Ponda Spice Valleys, Goa",
    grade: "Grade-A Crimson Flower Lace Aril",
    harvest: "Summer Orchard Splitting",
    materialNotes:
      "Whole fragrant nutmeg encased in intact scarlet mace aril blades. Hand-separated immediately upon orchard splitting and sun-cured under shaded palm thatched roofs to protect rare, volatile myristicin and elemicin aromatics.",
    dimensions: "100g Hand-Carved Teak Box",
    year: "Single Plantation Harvest",
  },
];
