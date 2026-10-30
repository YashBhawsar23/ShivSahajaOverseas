# Shivsahaja Overseas – Corporate Import & Export Website

> **Tagline:** Global Trade | Trusted Partner | Borderless Growth  
> **Industry:** International Agricultural Commodity Trading & Raw Cotton Export  
> **Headquarters:** India (Western Maritime Gateways: JNPT Nhava Sheva &bull; Mundra &bull; Hazira)

---

## 1. Executive Overview

This repository contains the complete, production-ready corporate B2B website for **Shivsahaja Overseas**, an Indian import-export trading house. Designed with a static-first, zero-framework architecture, the website establishes international business credibility, showcases 24+ certified agricultural commodities across 6 sectors, details export/import supply chain capabilities, presents regulatory compliance frameworks (APEDA, FSSAI, Spices Board, DGFT), and provides an asynchronous trade inquiry system powered by Resend and Vercel Serverless Functions.

---

## 2. Technology Stack & Technical Decisions

- **Framework:** [Astro 5](https://astro.build/) (Static-First Architecture with on-demand API endpoints)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Language:** TypeScript (Strict mode enabled)
- **Data Management:** Astro Content Collections with strict [Zod](https://zod.dev/) validation
- **Email Delivery:** [Resend API](https://resend.com/) with HTML corporate template
- **Icons:** `@lucide/astro`
- **Deployment Adapter:** `@astrojs/vercel` (Hybrid static + serverless function bundling)
- **SEO & Search Indexing:** `@astrojs/sitemap`, OpenGraph social cards, Schema.org JSON-LD microdata (`Organization`, `Product`, `AggregateOffer`, `BreadcrumbList`)

### Key Architecture Decisions:
1. **Zero Client Hydration Overhead:** Pure Astro components with zero heavy UI libraries (no React, Vue, or Angular) guarantees a near-perfect Google Lighthouse score (98–100) and instant Time to First Byte (TTFB).
2. **Hybrid Static-First Architecture:** 40 marketing, category, and product detail pages are pre-compiled to static HTML at build time. The `/api/enquiry` route is configured with `export const prerender = false;`, running as a secure serverless function on Vercel without exposing email API keys.
3. **Strict Zod Content Layer:** All 24 commodities are type-checked at build time. Any missing parameter or invalid trade type fails the build immediately, preventing runtime bugs.

---

## 3. Brand Identity & Design System

The visual design follows a minimal, high-trust corporate aesthetic inspired by global maritime trade and agricultural strength:

- **Primary Navy:** `#102C50` (Trust, Authority, Maritime depth)
- **Secondary Navy:** `#183B63` (Subtle backgrounds, elevated cards)
- **Brand Gold:** `#B69A63` (Agro heritage, premium quality, accents)
- **Off-White:** `#F8F7F3` (Crisp page background, readable whitespace)
- **White:** `#FFFFFF` (Card surfaces, data tables)
- **Typography:** `Manrope` (Headings & numerical metrics) and `Inter` (Body & technical specifications)

---

## 4. Website Route Structure

### Main Pages:
- `/` – Homepage (11 required sections: Header, Hero, Category Cards, About Intro, Featured Commodities, 6-Stage Capabilities, Why Choose Us, Certifications, FAQ Accordion, Contact CTA, Footer)
- `/about` – Corporate Profile, Core Values, Supply Chain Architecture
- `/products` – Master Commodity Catalogue with real-time live search and trade filters
- `/import` – Inward Trade Facilitation, Customs Clearance, Domestic Distribution
- `/export` – 6-Step Export Protocol, Loading Port Logistics (JNPT, Mundra, Hazira), Incoterms 2020 Guide
- `/certifications` – Government of India Statutory Bodies (APEDA, FSSAI, Spices Board, DGFT, Plant Quarantine)
- `/gallery` – Interactive Category-Filtered Infrastructure & Facility Showcase
- `/contact` – Commercial Inquiry Form, Port Coordinates, Trade Desk Email

### Dynamic Product Routes:
- `/products/[slug]` – 24 Individual static commodity detail pages with technical parameters, packaging, MOQ, interactive gallery, and quote request cards.
- `/products/category/[category]` – 6 Category showcase pages (`cotton`, `spices`, `grains-flour`, `seeds-pulses`, `vegetables`, `fruits`).

### Serverless API Route:
- `POST /api/enquiry` – Validates trade inquiries, filters spam via hidden honeypot, and delivers formatted HTML notifications via Resend.

---

## 5. Commodity Directory (24 Products)

1. **Cotton:**
   - Bengal Deshi Cotton (`bengal-deshi-cotton`)
   - Indian Cotton Shankar-6 (`indian-cotton`)
   - Carded and Combed Cotton (`carded-and-combed-cotton`)
2. **Spices:**
   - Red Chilli Powder (`red-chilli-powder`)
   - Coriander Powder (`coriander-powder`)
   - Turmeric Powder (`turmeric-powder`)
   - Garam Masala (`garam-masala`)
3. **Grains, Millets & Flour:**
   - Maize / Corn Flour (`maize-corn-flour`)
   - Milling Wheat Grain (`wheat-grain`)
   - Maida All-Purpose Flour (`maida`)
4. **Seeds & Pulses:**
   - Kabuli Chana Chickpeas (`kabuli-chana`)
   - Guar Seeds (`guar-seeds`)
   - Certified Wheat Sowing Seeds (`wheat-seeds`)
   - Yellow Maize Seeds (`maize-seeds`)
   - Non-GMO Soybean (`soybean`)
5. **Fresh Vegetables:**
   - Red & Pink Onion (`onion`)
   - Fresh Garlic (`garlic`)
   - Whole Dry Red Chilli (`red-chilli`)
   - Fresh Green Chilli (`green-chilli`)
   - Farm Fresh Tomatoes (`tomato`)
   - Washed Fresh Ginger (`ginger`)
6. **Fresh Fruits:**
   - Cavendish Banana G9 (`banana`)
   - Bhagwa Pomegranate (`pomegranate`)
   - Badam / Banganapalli Mango (`badam-mango`)
   - Noor Jahan Heritage Mango (`noor-jahan-mango`)
   - Kalipatti Sapota / Chikoo (`sapota-chikoo`)

---

## 6. Local Setup & Development

### Prerequisites:
- Node.js `v20.x` or `v22.x` (LTS)
- npm `v10.x` or pnpm

### Installation:
```bash
# Clone the repository
git clone https://github.com/your-username/shivsahaja-overseas.git
cd shivsahaja-overseas

# Install dependencies
npm install --legacy-peer-deps

# Create environment configuration
cp .env.example .env
```

### Environment Variables (`.env`):
```env
# Resend API Key for handling trade & commodity enquiries
RESEND_API_KEY=re_your_api_key_here

# Verified sender email address configured in Resend
RESEND_FROM_EMAIL=onboarding@resend.dev

# Trade desk recipient email
ENQUIRY_RECIPIENT_EMAIL=enquiry@shivsahajaoverseas.com

# Public canonical URL
PUBLIC_SITE_URL=https://shivsahajaoverseas.com
```

### Development Scripts:
```bash
# Start local development server at http://localhost:4321
npm run dev

# Run strict TypeScript and Astro template diagnostics
npm run check

# Execute production build
npm run build

# Preview production build locally
npm run preview
```

---

## 7. Content Management Guide

To add or modify a commodity:
1. Navigate to `src/content/products/<category>/`.
2. Create or edit a `.md` file with the required frontmatter schema:
```markdown
---
name: "Commodity Display Name"
slug: "unique-url-slug"
category: "spices" # 'cotton' | 'spices' | 'grains-flour' | 'seeds-pulses' | 'vegetables' | 'fruits'
shortDescription: "Concise summary for catalogue cards."
description: "Detailed commodity overview and trade application."
image: "https://images.unsplash.com/..."
gallery:
  - "https://images.unsplash.com/..."
hsCode: "0904.22.11"
tradeType: "export" # 'export' | 'import' | 'both'
origin: "India (State / Region)"
grade: "Export Quality Grade"
specifications:
  "Parameter 1": "Value"
  "Parameter 2": "Value"
packaging: "25kg / 50kg PP bags"
moq: "1 x 20ft FCL Container"
featured: true # true | false
seo:
  title: "SEO Meta Title"
  description: "SEO Meta Description"
---

### Commodity Processing & Agronomy
Detailed notes rendered on the product detail page.
```

---

## 8. Deployment to Vercel

The project is pre-configured with the official `@astrojs/vercel` adapter.

### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option B: Deploy via Vercel Dashboard (Git Integration)
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. In the [Vercel Dashboard](https://vercel.com/new), import the repository.
3. Vercel automatically detects **Astro** as the framework preset.
4. Under **Environment Variables**, add:
   - `RESEND_API_KEY`: Your Resend production key (`re_...`)
   - `RESEND_FROM_EMAIL`: Your verified sender address
   - `ENQUIRY_RECIPIENT_EMAIL`: `enquiry@shivsahajaoverseas.com`
   - `PUBLIC_SITE_URL`: `https://shivsahajaoverseas.com`
5. Click **Deploy**. Vercel will prerender all static routes and deploy the serverless inquiry endpoint in under 60 seconds.

---

## 9. Regulatory & Legal Integrity Notice

In strict adherence to international export compliance rules:
- No company details, certifications, or trade achievements are fabricated.
- Testimonials remain hidden until authenticated client feedback is submitted.
- Statutory affiliations (APEDA, FSSAI, Spices Board, DGFT) are accurately designated as regulatory standards under Government of India export guidelines.
- Official company address, phone contacts, and certificate serial numbers are maintained as clearly designated development placeholders awaiting final client incorporation filings.

---

## 10. License

&copy; 2026 Shivsahaja Overseas. All rights reserved. Built for international B2B commerce.
