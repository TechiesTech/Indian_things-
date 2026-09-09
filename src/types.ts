export interface Product {
  name: string;
  category: string;
  type: "terracotta" | "wood" | "ivory" | "clay" | "coal" | "gold";
  speed: number;
  images?: string[];
  origin?: string;
  materialNotes?: string;
  dimensions?: string;
  year?: string;
  grade?: string;
  harvest?: string;
}
