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
   * Verified Corporate Contact & Registered Office Address
   */
  contact: {
    email: 'enquiry@shivsahajaoverseas.com',
    address: {
      building: 'Maa Bhagwati Kripa Building',
      street: 'Mandir Chowk, Bistan',
      locality: 'Bistan',
      city: 'Khargone',
      state: 'Madhya Pradesh',
      postalCode: '451441',
      country: 'India',
      countryCode: 'IN',
      lines: [
        'Maa Bhagwati Kripa Building,',
        'Mandir Chowk, Bistan,',
        'Khargone, Madhya Pradesh, 451441, India',
      ],
    },
  },
  
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
     * Global Trade Page Feature Flag:
     * -------------------------------------------------------------
     * Set to `false` to temporarily disable the /trade ("Global Trade") page.
     * 
     * When `false`:
     *  - "Global Trade" link in Header (desktop & mobile) is hidden.
     *  - "Global Trade Operations" link in the Footer is hidden.
     *  - Direct visits to /trade (plus /export and disabled /import) redirect cleanly to / (302).
     *  - /trade and /export are excluded from the generated sitemap.
     * 
     * To RE-ENABLE in the future:
     *  Simply set `enableGlobalTrade: true`.
     */
    enableGlobalTrade: false,

    /**
     * Product Live Search Bar Feature Flag:
     * -------------------------------------------------------------
     * Set to `false` when the client wants to temporarily disable/hide
     * the search input box on the products catalogue page.
     * 
     * When `false`:
     *  - The search input and counter card on /products are hidden.
     *  - Category navigation pills continue to function seamlessly.
     * 
     * To RE-ENABLE in the future:
     *  Simply set `enableProductSearch: true`.
     */
    enableProductSearch: false,

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

export interface CertificateItem {
  id: string;
  slotNumber: string;
  title: string;
  subtitle: string;
  /** Path under /images/certificates/ (leave empty string '' while frame is awaiting upload). */
  image: string;
  alt: string;
}

/**
 * Official Company Certificates (slots with an uploaded `image` display automatically on /certifications;
 * pending slots remain hidden until their high-resolution image is added to `public/images/certificates/`).
 */
export const CERTIFICATE_SLOTS: CertificateItem[] = [
  {
    id: 'dgft-iec',
    slotNumber: '01',
    title: 'DGFT Importer-Exporter Code (IEC)',
    subtitle: 'IEC No: CMYPN3521R • Govt. of India',
    image: '/images/certificates/dgft-iec-certificate.webp',
    alt: 'DGFT Importer-Exporter Code (IEC CMYPN3521R) certificate issued to Shivsahaja Overseas by the Ministry of Commerce and Industry, Government of India',
  },
  {
    id: 'fssai-license',
    slotNumber: '02',
    title: 'FSSAI Central License (Form C)',
    subtitle: 'License No: 11426999000622 • Exporter',
    image: '/images/certificates/fssai-central-license.webp',
    alt: 'FSSAI Central Food Safety License Form C (License Number 11426999000622) issued to Shivsahaja Overseas by Food Safety and Standards Authority of India',
  },
  {
    id: 'gst-registration',
    slotNumber: '03',
    title: 'GST Registration (Form REG-06)',
    subtitle: 'GSTIN: 23CMYPN3521R1Z8 • Regular',
    image: '/images/certificates/gst-registration-certificate.webp',
    alt: 'Goods and Services Tax Registration Certificate Form GST REG-06 (GSTIN 23CMYPN3521R1Z8) issued to Shivsahaja Overseas, Khargone, Madhya Pradesh',
  },
  {
    id: 'apeda-certificate',
    slotNumber: '04',
    title: 'APEDA Registration',
    subtitle: 'Agricultural & Processed Food Products Export Development Authority',
    image: '',
    alt: 'APEDA — Agricultural & Processed Food Products Export Development Authority Certificate — Shivsahaja Overseas',
  },
  {
    id: 'spices-board',
    slotNumber: '05',
    title: 'SPICES BOARD Certification',
    subtitle: 'Spices Board of India Compliance Standards',
    image: '',
    alt: 'SPICES BOARD — Spices Board of India Compliance Standards Certificate — Shivsahaja Overseas',
  },
];
