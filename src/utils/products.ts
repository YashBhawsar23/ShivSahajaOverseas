import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type CategoryId } from '../content.config';

export type ProductEntry = CollectionEntry<'products'>;

export { categories };

export async function getAllProducts(): Promise<ProductEntry[]> {
  const products = await getCollection('products');
  return products.sort((a, b) => {
    // Featured first, then alphabetical
    if (a.data.featured && !b.data.featured) return -1;
    if (!a.data.featured && b.data.featured) return 1;
    return a.data.name.localeCompare(b.data.name);
  });
}

export async function getFeaturedProducts(limit = 6): Promise<ProductEntry[]> {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.data.featured);
  return featured.slice(0, limit);
}

export async function getProductsByCategory(category: CategoryId): Promise<ProductEntry[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.data.category === category);
}

export async function getProductBySlug(slug: string): Promise<ProductEntry | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.data.slug === slug);
}

export async function getRelatedProducts(currentSlug: string, category: CategoryId, limit = 4): Promise<ProductEntry[]> {
  const products = await getProductsByCategory(category);
  return products.filter((p) => p.data.slug !== currentSlug).slice(0, limit);
}

export function getCategoryDetails(id: string) {
  return categories.find((c) => c.id === id);
}
