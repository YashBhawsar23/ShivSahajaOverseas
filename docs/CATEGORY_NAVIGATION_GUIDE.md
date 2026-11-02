# Category Navigation Configuration & Disabling Guide

This guide explains how to toggle or disable either the **Native Mobile Dropdown Selector** or the **Enhanced Horizontal Touch Pill Strip** on the Product Catalogue (`/products` and `/products/category/[category]`).

---

## 1. Overview of the Two UI Components

In [`src/components/products/ProductCategoryNavigation.astro`](../src/components/products/ProductCategoryNavigation.astro), two complementary category selection interfaces are provided:

1. **Native Mobile Dropdown Selector (`showMobileDropdown`):**
   - **Target screens:** Small mobile screens only (`sm:hidden`, phones `< 640px` wide).
   - **UI:** A native select dropdown (`Filter by Category: [ All Commodities (26) ▾ ]`) that opens the mobile device's native bottom-sheet / wheel picker without any horizontal text cut-off.

2. **Enhanced Horizontal Touch Pill Strip (`showPillStrip`):**
   - **Target screens:** All screens (with smooth touch-pan swipe on mobile and mouse on desktop).
   - **UI:** Rounded pill buttons (`[ All Commodities 26 ] [ Cotton 3 ] [ Spices 4 ] ...`) featuring edge fade gradients, instant in-place filtering, and auto-scroll centering.

---

## 2. Method 1: The 1-Line Central Switch (Recommended)

You can toggle either component globally without touching any HTML/JSX markup.

Open [`src/config/site.ts`](../src/config/site.ts) and locate `categoryNavigation`:

```typescript
export const SITE_CONFIG = {
  // ...
  features: {
    enableImport: false,

    categoryNavigation: {
      showMobileDropdown: true, // <-- Toggle Dropdown
      showPillStrip: true,      // <-- Toggle Pill Strip
    },
  },
} as const;
```

### Scenario A: Disable the Native Mobile Dropdown Selector
If you want only the horizontal swipeable pills on mobile (no dropdown):

```typescript
categoryNavigation: {
  showMobileDropdown: false, // ❌ Mobile dropdown is completely disabled
  showPillStrip: true,       // ✅ Horizontal pills remain active
},
```

### Scenario B: Disable the Horizontal Pill Strip
If you want only the clean dropdown selector on mobile:

```typescript
categoryNavigation: {
  showMobileDropdown: true,  // ✅ Mobile dropdown remains active
  showPillStrip: false,      // ❌ Horizontal pill strip is completely disabled
},
```

---

## 3. Method 2: Per-Page Component Props

If you want different behaviors on different pages (e.g. show dropdown on `/products`, but hide it on category pages), you can pass props directly to `<ProductCategoryNavigation />`:

```astro
---
import ProductCategoryNavigation from '../components/products/ProductCategoryNavigation.astro';
---

<!-- Disable only the mobile dropdown on this specific page -->
<ProductCategoryNavigation
  activeCategory="all"
  showMobileDropdown={false}
/>

<!-- Disable only the pill strip on this specific page -->
<ProductCategoryNavigation
  activeCategory="all"
  showPillStrip={false}
/>
```

---

## 4. Method 3: Direct Component Modification (Manual Code Removal)

If you prefer to permanently remove either section from the source code:

Open [`src/components/products/ProductCategoryNavigation.astro`](../src/components/products/ProductCategoryNavigation.astro):

### To remove the Mobile Dropdown block:
Delete or comment out the section starting with:
```astro
{showMobileDropdown && (
  <!-- Mobile Category Selector Dropdown -->
  <div class="sm:hidden mb-4">
    ...
  </div>
)}
```

### To remove the Horizontal Pill Strip block:
Delete or comment out the section starting with:
```astro
{showPillStrip && (
  <!-- Horizontal Category Pill Strip -->
  <div class="relative w-full">
    ...
  </div>
)}
```

> [!NOTE]
> The internal script in `ProductCategoryNavigation.astro` safely checks `if (!nav && !mobileSelect) return;`. Disabling either component will never throw a JavaScript error.

---

## 5. How to Test Your Changes

1. Run the local development server:
   ```bash
   npm run dev
   ```
2. Open [http://127.0.0.1:4321/products](http://127.0.0.1:4321/products) in your browser.
3. Open Developer Tools (`F12` or `Ctrl+Shift+I`) and toggle **Device Mode** (`Ctrl+Shift+M`) to simulate a mobile screen (e.g. iPhone SE, iPhone 14, or Pixel 7).
4. Verify that only the desired navigation control is rendered.
