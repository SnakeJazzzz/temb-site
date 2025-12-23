# **TEMB Website SRS** 

# **1\. Purpose**

Build a **luxury, minimal, high-converting ecommerce website** for a premium table book:

* Product: **“THE ELECTRONIC MUSIC BOOK”**

* Project: **TEMB**

* Price point: **$699 USD**

* Audience: small niche; website must act as a **quality filter** (high-end editorial feel)

The site must convey: **simplicity, confidence, elegance** — with minimal copy and immaculate typography.

---

## **2\. Scope**

### **In scope (MVP)**

* 3 public pages:

  * **Main** (Landing)

  * **Artists**

  * **Shop**

* Stripe Checkout payment flow (1 edition now, extensible)

* Two flat shipping regions:

  * **Mexico** (flat rate)

  * **Worldwide** (flat rate)

* Taxes **included** in price messaging (for now)

* Purchase confirmation:

  * Stripe receipt (Stripe-managed)

    * a TEMB “thank you” email (sent by our system via webhook)

* Vercel deployment with a temporary staging domain until approval

### **Out of scope (for now)**

* Multi-account revenue splitting (Stripe Connect)

* Admin dashboard / CMS (unless needed later)

* Complex cart / multi-item orders

* Multiple currencies

* Advanced tax calculation logic (VAT/GST by region)

---

## **3\. Target Users & User Journeys**

### **Personas**

1. **Collector / Enthusiast**

   * Wants prestige \+ reassurance of quality

2. **Industry professional**

   * Wants credibility and “who’s included”

3. **Gift buyer**

   * Wants certainty (shipping time, trust, refund clarity)

### **Primary journey**

Landing → absorbs vibe → sees substance → clicks **Get it** → chooses shipping region → Stripe Checkout → confirmation

Secondary journey

Landing → Artists → confirms artists included → Shop → Checkout

---

## **4\. Design & Brand Requirements**

### **Visual style**

* **Color palette:** black / white / gray only

* **Tone:** minimal editorial, gallery/museum-like

* **Layout:** lots of negative space; deliberate rhythm

* **Imagery:** few images, high impact, no clutter

### **Typography**

* Primary typeface: **Condor** (web-licensed)

* Fallback stack until Condor is implemented:

  * system-ui, \-apple-system, "Helvetica Neue", Arial, sans-serif

* Typography rules:

  * Strong hierarchy

  * Generous spacing

  * Avoid decorative UI elements

### **Motion / 3D**

* Optional 3D (Spline) hero on landing

* Must respect:

  * prefers-reduced-motion

  * Mobile performance constraints

* Must have a static fallback image

---

## **5\. Information Architecture**

### **Global navigation**

* Minimal top nav:

  * **Artists**

  * **Shop**

* Persistent CTA:

  * **Get it** → Shop page (or directly checkout from Shop)

### **Page 1: Main (Landing)**

**Goal:** emotional \+ editorial journey, minimal text, clear CTA.

**Sections (recommended MVP):**

1. Hero (3D book OR still cover)

2. One powerful statement (“From the underground to the main stage.”)

3. The object (short: format/weight/edition)

4. 2–4 spreads (images) with tiny captions (optional)

5. Price \+ edition note (“Numbered 1–1000”)

6. CTA: **Get it** → Shop

**Acceptance criteria**

* Loads fast, looks premium on desktop \+ mobile

* CTA visible without heavy scrolling

* No “template-ish” UI patterns

---

### **Page 2: Artists**

**Goal:** show scale \+ credibility, extremely minimal.

**Layout requirements**

* Black background, white text

* Desktop: **two columns**

  * Left column: artists 1–N/2

  * Right column: artists (N/2+1)–N

* Mobile: single column

* Optional: light “search” overlay (nice-to-have)

**Content requirements**

* Artist names sourced from:

  * a JSON file in repo (MVP), or

  * later: CMS/data pipeline

**Acceptance criteria**

* Can handle up to \~500 artists smoothly

* No layout shift while rendering

---

### **Page 3: Shop**

**Goal:** pick edition \+ shipping region quickly, then checkout.

**Edition model**

* Start with **1 edition**:

  * Name: THE ELECTRONIC MUSIC BOOK

  * Description includes: “Numbered 1–1000”

  * Price: $699 USD

* Must support adding future editions (limited, XL, etc.) with minimal code changes:

  * Add object in lib/editions.ts

  * Add Stripe price ID in env

**Shipping**

* Must allow user to choose:

  * Mexico (flat rate)

  * Worldwide (flat rate)

* The shipping selection must map to Stripe Checkout shipping options.

**Taxes**

* Display copy: “Taxes included” (configurable later)

**Checkout**

* “Buy” button triggers:

  * create Stripe Checkout session (server-side)

  * redirect to Stripe hosted checkout

**Acceptance criteria**

* Checkout works in test mode end-to-end

* Shipping region correctly affects shipping option & allowed countries

* Success page confirms order

---

## **6\. Functional Requirements (Detailed)**

### **FR-1 Navigation**

* Header present on all pages

* Logo/title returns to /

* Artists → /artists

* Shop → /shop

### **FR-2 Editions (Extensible)**

* System supports multiple editions, but UI shows the configured set (1 now)

* Each edition includes:

  * id, name, description, price, Stripe price ID, status (active/inactive)

### **FR-3 Checkout Session Creation**

* Server route (API endpoint) accepts:

  * editionId

  * shippingRegion \= MX or INTL

* Validates:

  * edition exists

  * active

  * shipping region valid

* Creates Stripe Checkout session:

  * line item price ID for edition

  * shipping address collection

  * shipping options based on region

  * metadata: editionId \+ shippingRegion

* Returns session URL (redirect)

### **FR-4 Payment Completion Webhook**

* Webhook endpoint listens for:

  1. checkout.session.completed

* Verifies Stripe signature

* Extracts:

  1. customer email

  2. shipping address

  3. editionId, shippingRegion

* Triggers:

  1. order record creation

  2. TEMB confirmation email (Option A)

  3. logs for monitoring/debug

### **FR-5 Order Record (MVP storage)**

* Store order data in a simple DB (recommended: Postgres via Neon/Supabase, or Vercel Postgres)

* Minimum fields:

  * id, createdAt

  * stripeSessionId

  * stripePaymentIntentId (if available)

  * email

  * name

  * shipping address

  * editionId

  * amountTotal

  * currency

  * shippingRegion

  * status (paid, refunded, etc.)

### **FR-6 Confirmation Email (Option A)**

* After webhook confirmation:

  * send branded TEMB “Thank you” email

  * includes:

    * edition name

    * shipping estimate text (“arrives in X–Y days/weeks”)

    * support email

* Stripe receipt remains enabled (Stripe default)

---

## **7\. Non‑Functional Requirements**

### **NFR-1 Performance**

* Target: fast load, minimal JS

* Lighthouse goals (rough):

  * Performance 90+

  * Accessibility 95+

### **NFR-2 Accessibility**

* Keyboard navigable

* Proper contrast (white on black)

* prefers-reduced-motion respected

### **NFR-3 SEO**

* Descriptive titles/meta

* Open Graph image

* Clean URLs

### **NFR-4 Security**

* Webhook signature verification required

* No secrets in client

* Rate limit checkout endpoint (basic protection)

### **NFR-5 Reliability**

* Vercel deploy on push

* Environment variables set per environment (preview vs production)

---

## **8\. Tech Stack & Environments**

### **Stack (locked)**

* Next.js (App Router) \+ TypeScript

* Tailwind

* shadcn/ui primitives

* Stripe Checkout

* Vercel hosting

### **Environments**

* **Local**: localhost:3000

* **Staging**: Vercel preview domain (current: https://temb-siteon.vercel.app/)

* **Production**: later mapped to final domain(s) after approval

### **Environment Variables (MVP)**

Local: .env.local

Vercel: Project Settings → Environment Variables

Minimum:

* NEXT\_PUBLIC\_STRIPE\_PUBLISHABLE\_KEY

* STRIPE\_SECRET\_KEY

Soon:

* STRIPE\_WEBHOOK\_SECRET

* STRIPE\_SHIPPING\_RATE\_MX

* STRIPE\_SHIPPING\_RATE\_INTL

* email provider keys (later)

* database connection string (later)

---

# **Current State Summary**

### **✅ Completed**

* Repo cloned from template

* New GitHub origin set (SnakeJazzzz/temb-site)

* Pushed main

* Deployed to Vercel (staging): https://temb-siteon.vercel.app/

* Local dev runs (pnpm dev)

* Base template pages working

### **⚠️ Issue observed (local only)**

* Clicking checkout locally throws Stripe init error:

  * Likely missing NEXT\_PUBLIC\_STRIPE\_PUBLISHABLE\_KEY in .env.local

---

# **Next Steps (Tomorrow’s plan, in the right order)**

## **Step 1 — Fix local Stripe env**

* Add Stripe keys to .env.local

* Restart dev server

* Confirm checkout page loads without crash

## **Step 2 — Lock TEMB design foundation**

* Implement:

  * global layout (header/nav)

  * color tokens (black/white/gray)

  * typography system (Condor placeholder if needed)

  * spacing rhythm (luxury feel)

## **Step 3 — Create TEMB routes**

* Build:

  * / landing skeleton

  * /artists minimal list skeleton

  * /shop edition card skeleton

## **Step 4 — Wire real product config**

* Add lib/editions.ts and switch template to use it

* Create Stripe product \+ price ($699) and set price ID in env

## **Step 5 — Shipping logic (MX vs Worldwide)**

* Create two shipping rates in Stripe dashboard

* Add a shipping selector UI in Shop

* Checkout session uses the correct shipping option

## **Step 6 — Webhook \+ email (after UI is stable)**

* Add webhook route

* Add order storage

* Send TEMB confirmation email

## **Step 7 — 3D hero (Spline)**

* After landing is visually correct:

  * create Spline book

  * embed with fallback

  * ensure motion/accessibility

