export type Category = "Running" | "Lifestyle" | "Court" | "Training" | "Trail";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  tag?: string;
  color: string;
  colorHex: string;
  images: string[];
  description: string;
  story: string;
  upper: string;
  sole: string;
  drop: string;
  weight: string;
  stock: number;
  featured?: boolean;
};

export const SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"] as const;

export const SIZE_GUIDE = [
  { uk: "6", eu: "40", cm: "25.0", us: "7" },
  { uk: "7", eu: "41", cm: "25.7", us: "8" },
  { uk: "8", eu: "42", cm: "26.4", us: "9" },
  { uk: "9", eu: "43", cm: "27.1", us: "10" },
  { uk: "10", eu: "44.5", cm: "27.9", us: "11" },
  { uk: "11", eu: "46", cm: "28.6", us: "12" },
];

export const products = [
  { id: "nangloi-knit", name: "Nangloi Knit", category: "Running", price: 5499, color: "Ink / Chalk", description: "A breathable engineered-knit runner built for Delhi commutes and evening loops along the Outer Ring Road." },
  { id: "yamuna-court", name: "Yamuna Court", category: "Court", price: 6299, color: "Navy / Silver", description: "A low court shoe with a locked-in collar and a herringbone outsole." },
  { id: "chandni-low", name: "Chandni Low", category: "Lifestyle", price: 4999, color: "Cream / Olive", description: "A gum-soled everyday low. Quiet, not loud branding." },
  { id: "ridgewalk", name: "Ridgewalk", category: "Trail", price: 6999, color: "Charcoal / Lime", description: "A light trail shoe for monsoon ridges. Lugs that shed mud." },
  { id: "studio-flex", name: "Studio Flex", category: "Training", price: 5799, color: "Triple White", description: "A flat, stable trainer for gym floors and the walk home." },
  { id: "red-fort-pace", name: "Red Fort Pace", category: "Running", price: 5999, color: "Signal Red", description: "A tempo shoe for the occasional 10K." },
  { id: "lodhi-lane", name: "Lodhi Lane", category: "Lifestyle", price: 4699, color: "Ink Knit", description: "Soft collar, clean lines, a sole that does not mark pale floors." },
  { id: "hauz-khas-high", name: "Hauz Khas High", category: "Court", price: 6499, color: "Chalk / Navy", description: "A higher collar for hard cuts. Still light enough for a full game." },
  { id: "aravali-day", name: "Aravali Day", category: "Trail", price: 6599, color: "Sand / Olive", description: "A dry-trail walker, easier on tarmac between trailheads." },
  { id: "connaught-trainer", name: "Connaught Trainer", category: "Training", price: 5299, color: "Red / Chalk", description: "Built for circuits. Stable, not bulky." },
  { id: "civil-lines", name: "Civil Lines", category: "Lifestyle", price: 7299, color: "Triple White", description: "A clean leather low for dinners that start as walks." },
  { id: "metro-mile", name: "Metro Mile", category: "Running", price: 4499, color: "Navy Mesh", description: "The honest daily trainer. Enough cushion for 8 km." },
];
