import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const categories = [
  { id: 'cotton', name: 'Cotton', description: 'Raw cotton bales, carded, combed, and Bengal Deshi varieties for global textile mills.' },
  { id: 'spices', name: 'Spices', description: 'Pure Indian whole and ground spices processed under strict FSSAI and Spices Board hygiene benchmarks.' },
  { id: 'grains-flour', name: 'Grains, Millets & Flour', description: 'Premium food grains, milled flours, and staple cereals sourced directly from farm cooperatives.' },
  { id: 'seeds-pulses', name: 'Seeds & Pulses', description: 'High-germination agricultural seeds, protein-rich pulses, guar seeds, and soybeans.' },
  { id: 'vegetables', name: 'Fresh Vegetables', description: 'Farm-fresh onions, garlic, chillies, tomatoes, and ginger packed in temperature-controlled reefer containers.' },
  { id: 'fruits', name: 'Fresh Fruits', description: 'GI-tagged Indian mangoes, Cavendish bananas, fresh pomegranates, and sapota sorted to export grading.' },
] as const;

export type CategoryId = typeof categories[number]['id'];

const productsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.enum(['cotton', 'spices', 'grains-flour', 'seeds-pulses', 'vegetables', 'fruits']),
    description: z.string(),
    shortDescription: z.string(),
    image: z.string(),
    gallery: z.array(z.string()).default([]),
    hsCode: z.string().optional(),
    tradeType: z.enum(['import', 'export', 'both']).default('export'),
    origin: z.string().default('India'),
    grade: z.string().optional(),
    specifications: z.record(z.string(), z.string()).default({}),
    packaging: z.string().optional(),
    moq: z.string().optional(),
    featured: z.boolean().default(false),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

export const collections = {
  products: productsCollection,
};
