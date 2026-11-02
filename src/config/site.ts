/**
 * Site Configuration & Feature Flags
 * 
 * Central control panel for Shivsahaja Overseas.
 * Use this file to easily toggle business capabilities on or off as operations evolve.
 */

export const SITE_CONFIG = {
  name: 'Shivsahaja Overseas',
  legalName: 'Shivsahaja Overseas',
  tagline: 'Global Trade | Trusted Partner | Borderless Growth',
  siteUrl: 'https://shivsahajaoverseas.com',
  
  /**
   * Business Operations Feature Flags
   */
  features: {
    /**
     * Import Operations Feature Flag:
     * -------------------------------------------------------------
     * Set to `false` when the enterprise is strictly focused on outbound export trade.
     * 
     * When `false`:
     *  - "Import" links in Header (desktop & mobile) are hidden.
     *  - "Import Capabilities" in the Footer is hidden.
     *  - The "Import" trade filter on the /products page is hidden.
     *  - Product trade badges display as "Global Export" / "Export Ready".
     *  - Any direct visit to /import gracefully redirects to /trade (302).
     *  - Headings and marketing copy focus 100% on export excellence.
     * 
     * To RE-ENABLE in the future:
     *  Simply flip this boolean from `false` to `true`. Everything will
     *  automatically restore across all menus, pages, and filters!
     */
    enableImport: false,

    /**
     * Product Category Navigation UI Options:
     * -------------------------------------------------------------
     * Toggle the category navigation elements on the Product Catalogue:
     * 
     * - showMobileDropdown:
     *   Enables the native select dropdown on mobile phones (< 640px).
     *   Set to `false` to disable the mobile dropdown.
     * 
     * - showPillStrip:
     *   Enables the horizontal pill buttons with touch scrolling.
     *   Set to `false` to disable the horizontal pill strip.
     */
    categoryNavigation: {
      showMobileDropdown: true,
      showPillStrip: true,
    },
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
