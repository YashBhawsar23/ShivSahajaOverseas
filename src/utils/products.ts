import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type CategoryId } from '../content.config';

export type ProductEntry = CollectionEntry<'products'>;

export { categories };

const categoryOrder = new Map<string, number>(
  categories.map((cat, index) => [cat.id, index])
);

export async function getAllProducts(): Promise<ProductEntry[]> {
  const products = await getCollection('products');
  return products.sort((a, b) => {
    // Primary sort: match site-wide category order
    const orderA = categoryOrder.get(a.data.category) ?? Number.MAX_SAFE_INTEGER;
    const orderB = categoryOrder.get(b.data.category) ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;

    // Secondary sort within category: featured first, then alphabetical
    if (a.data.featured && !b.data.featured) return -1;
    if (!a.data.featured && b.data.featured) return 1;
    return a.data.name.localeCompare(b.data.name);
  });
}

export async function getFeaturedProducts(limit = 6): Promise<ProductEntry[]> {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.data.featured);

  // Pick round-robin across categories so featured commodities showcase sectors in client order
  const buckets = categories.map((cat) =>
    featured.filter((p) => p.data.category === cat.id)
  );

  const selected: ProductEntry[] = [];
  let round = 0;
  while (selected.length < limit) {
    let addedInRound = false;
    for (const bucket of buckets) {
      if (round < bucket.length && selected.length < limit) {
        selected.push(bucket[round]);
        addedInRound = true;
      }
    }
    if (!addedInRound) break;
    round++;
  }

  return selected;
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
