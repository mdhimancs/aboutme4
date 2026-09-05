# Web Security Configuration Guide

This document outlines the security measures, policies, and hardening 
configurations recommended for this cybersecurity executive portfolio 
application.

## 1. Application Layer Security

### Content Security Policy (CSP)
To strictly prevent Cross-Site Scripting (XSS) and data injection attacks, a 
strict CSP should be enforced in the `index.html` meta tags or via server 
headers. Whitelist only known domains (Google Analytics, Firebase, fonts).

```html
<!-- Example CSP Meta Tag -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  script-src 'self' https://www.google-analytics.com; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com; 
  img-src 'self' data: https://www.google-analytics.com; 
  connect-src 'self' https://www.google-analytics.com 
                     https://firestore.googleapis.com;
">
```

### Form Security & Honeypots
The "Get in Touch" contact form is a potential vector for automated spam.
- **Honeypot Field:** Implemented via an invisible, non-indexed input field (`honeypot`) in `ContactModal.tsx`. If filled by an automated bot, submission is silently rejected.
- **Client-Side Rate Limiting:** Enforced via `localStorage` tracking (`portfolio_contact_last_submitted`). Imposes a strict 5-minute cooldown (300,000 ms) with an active real-time countdown timer (`MM:SS`) and locked submission controls to prevent form flooding.
- **Server-Side API Throttling:** Enforced in `server.ts` using a rolling IP window limit (maximum 3 messages per 5-minute window per IP) returning `HTTP 429 Too Many Requests` with `Retry-After` header metadata.

### Dependency Auditing & Supply Chain Security
Ensure `npm audit` is clean. Lock down dependency versions in the lockfile 
(e.g., `bun.lock` or `package-lock.json`) to prevent supply-chain injections, 
stopping a malicious update in a minor library from compromising your site.

## 2. Infrastructure & Hosting Headers

All core production security headers are now actively generated and dispatched by the Express server entry point (`server.ts`):

- **Strict-Transport-Security (HSTS):** 
  `max-age=31536000; includeSubDomains; preload` (Forces HTTPS connections, preventing SSL stripping and protocol downgrade attacks).
- **X-Frame-Options:** 
  `SAMEORIGIN` paired with Content Security Policy `frame-ancestors 'self' https://ai.studio https://*.google.com https://*.run.app` (Thwarts Clickjacking and malicious embedding).
- **X-Content-Type-Options:** 
  `nosniff` (Prevents browsers from MIME-sniffing a response away from the declared content-type).
- **Permissions-Policy:** 
  `camera=(), microphone=(), geolocation=()` (Disables unnecessary device hardware access across all browsing contexts).
- **Referrer-Policy:** 
  `strict-origin-when-cross-origin` (Protects origin information across external hyperlinks).
- **Origin Obscurity:** 
  `app.disable('x-powered-by')` strips framework telemetry headers, mitigating automated signature reconnaissance.

## 3. SEO & Traffic Generation Strategies

To drive high-value traffic (recruiters, CISOs, board members) to your site, 
the following optimization strategies are recommended:

### Dynamic Meta Tags & Open Graph Protocol
Inject rich Open Graph and Twitter Card metadata in `index.html`. When you 
share your link on LinkedIn or X, it will unfurl into a high-quality preview 
card showing your name and a professional banner, increasing click rates.

```html
<meta property="og:title" content="Munish Dhiman | Security Architect">
<meta property="og:description" content="Cybersecurity & IAM • Data & AI.">
<meta property="og:image" content="https://yourdomain.com/preview.jpg">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### Semantic HTML & Accessibility (A11y) SEO
Search engines prioritize sites with perfect accessibility. 
- Ensure all images have descriptive `alt` tags.
- Keep heading structures (`H1` -> `H2` -> `H3`) strictly hierarchical in 
  sections like "Core Competencies" and "Case Studies".

### Schema.org Structured Data (JSON-LD)
Inject a script block into the head of your site containing the `Person` 
schema. This explicitly tells Google your name, job title, LinkedIn profile, 
and status, making you eligible for Rich Snippets (Google knowledge panels).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Munish Dhiman",
  "jobTitle": "Security Architect",
  "url": "https://yourdomain.com",
  "sameAs": [
    "https://linkedin.com/in/yourprofile",
    "https://github.com/yourprofile"
  ]
}
</script>
```

### Performance Optimization (Core Web Vitals)
Google's search algorithm heavily weights page speed. Ensure the large 
background gradients, animations, and icons are optimized so the site hits a 
95+ score on Google Lighthouse.

## 4. Origin Obscurity & Professional Identity

As part of standard professional deployment, do not broadcast the origin 
tools used to develop the site. 

### AI Generation Clean-up
Clean up all default templates, generator footprints, and metadata that hint 
at automated scaffolding (e.g., removing "Built with Google AI Studio" or 
"Good Studio AI" boilerplate from `README.md`, `package.json`, and meta tags). 
This prevents attackers from mapping the site's default dependencies based on 
the generator framework and maintains a polished, executive-level footprint.

## 5. Zero-Trust Access Control & Allowlist Administration

When implementing passwordless authentication (Email Magic Link) for selective high-sensitivity sections (such as Confidential Case Studies, Patent Blueprints, and private publications), utilize a Zero-Trust Authorization Model.

### UI Integration & Entry Points
1. **Dynamic Security Badge:**
   - Both the desktop sidebar and mobile navigation drawer include an **Identity Clearance Portal** button showing real-time authorization status (**Request Clearance** with a lock or **Clearance Verified** with a green unlocked shield).
2. **Selective Asset Protection:**
   - Gated publications (e.g., *Quantitative FAIR Framework Integration*, *Risk Assessment of GenAI Models*) are visually badged as **Invite Only** with a secure padlock. Clicking them intercepts unauthenticated actions and opens the Magic Link gate.
   - High-sensitivity case studies (such as *Out-of-Band Crisis Communication*, *Cloud & Non-Human Identity Governance*, and *M&A Cyber Integration*) are sealed behind the same authorization flow.
   - The entire **Archives & Executive Blueprints** tabbed inspections, strategic playbooks, and external source code repositories are walled off behind the clearance check, preventing unapproved downloads or inspections.

### Identity Allowlisting Strategy
Rather than permitting access to anyone who completes email authentication, enforce a strict allowlist layer. Authentication only verifies identity (authenticity of email possession); authorization determines permission.

1. **Firestore Allowlist Document Store:**
   Store authorized email addresses inside a dedicated Firebase Firestore collection named `allowlist`.
   Each entry is a unique document (where document ID = user's email address) with custom fields:
   * `authorized`: `true`
   * `role`: `"viewer"` or `"admin"`
   * `addedBy`: Email address of the admin who granted access
   * `addedAt`: Timestamp of authorization

2. **Allowlist Administration Options:**
   To maintain administrative agility and professional control, two secure maintenance channels are established:

   * **Option A: Built-In Admin Dashboard (On-Screen Control)**
     Securely accessible only to the principal Super Admin (`munish.world@gmail.com`). 
     * **Real-time Enrollment:** Enter a prospective reviewer's email address (e.g., `recruiter@targetcorp.com`) and click "Grant Access" to dynamically add them to the document store.
     * **Dynamic Revocation:** Revoke access instantly with a single click, immediately changing `authorized` to `false` or deleting the document. This invalidates active sessions instantly on their next route change.
   
   * **Option B: Google Cloud Console / Firebase Console (Out-of-Band Control)**
     Direct administrative access to the Firebase Firestore console. This allows the administrator to add, edit, or terminate database entries directly from Google Cloud without using any client-side website elements. Useful for quick out-of-band updates, emergency revocations, or database schema audits.

## 6. Advanced Cookie Security & State Management

Cookies are structured data payloads transmitted automatically in the HTTP headers between the browser and web servers to address HTTP's stateless design.

### Core Architectural Functions
1. **Session & Authentication State:** Saves cryptographic session tokens upon successful validation, ensuring users remain recognized across routes without re-transmitting passwords.
2. **Personalization Engine:** Saves stateful client preferences such as dark-mode flags, locale keys, or component settings.
3. **Telemetry & Audience Segmentation:** Used by tracking agents (like Google Analytics) to safely compile session duration and content interactions.

### Cookie Hardening & Mitigation Checklist
To secure cookies from exposure, ensure the following parameters are enforced in production environments:
* **`HttpOnly` Parameter:** Explicitly prevents client-side execution (JavaScript) from reading the cookie values. This forms the absolute defense line against token interception via Cross-Site Scripting (XSS).
* **`Secure` Parameter:** Instructs the browser to only transmit cookies over encrypted TLS/HTTPS channels, disabling transport over cleartext HTTP to prevent eavesdropping/MITM attacks.
* **`SameSite` Parameter:** Restricts cross-site cookie transmission to defend against Cross-Site Request Forgery (CSRF). 
  * Enforce `SameSite=Lax` for typical user navigations.
  * Enforce `SameSite=Strict` for sensitive actions and administrative portals.

---

## 7. Production Hardening & Infrastructure Recommendations

Prior to deploying this portfolio application to a live public-facing domain, review the status of the following four primary security hardening recommendations:

### A. Strict Content Security Policy (CSP) & Infrastructure Headers
* **Status:** **Implemented** in `server.ts` and `index.html`.
* **Execution:** Enforced on both server-level Express responses and browser HTML headers. Covers script domains, Google Analytics, Firebase Identity/Firestore, Google Accounts popup frames, strict transport security (`HSTS`), frame-ancestors, clickjacking (`SAMEORIGIN`), and `nosniff` MIME protections.
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://img.youtube.com https://*.google-analytics.com https://*.googletagmanager.com https://lh3.googleusercontent.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firestore.googleapis.com https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://accounts.google.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.firebaseapp.com https://accounts.google.com; frame-ancestors 'self' https://ai.studio https://*.google.com https://*.run.app https://*.googleusercontent.com;
```

### B. Client-Side & Server-Side Form Rate Limiting
* **Status:** **Implemented** in `ContactModal.tsx` and `server.ts`.
* **Execution:** 
  * **Client Layer:** Tracks `portfolio_contact_last_submitted` in browser `localStorage`. Imposes a strict 5-minute cooldown (300,000 ms) with a live countdown display (`MM:SS`) and disabled submission button.
  * **Server Layer:** Rolling-window IP throttle in `server.ts` permitting a maximum of 3 inquiries per 5-minute window per IP, responding with `HTTP 429 Too Many Requests` and `Retry-After` header.

### C. Offline Content Caching via Service Workers (PWA)
* **Status:** **Pending Recommendation**.
* **Recommendation:** Recruiters and executive reviewers frequently evaluate research material or credentials during transit or low-connectivity flights. Integrating a progressive offline caching service worker will store static executive summaries, styles, and portfolio assets locally inside the browser's CacheStorage.
* **Prerequisites:** Service worker script registration (`/sw.js`) and precaching lifecycle handler.

### D. SPF, DKIM, and DMARC Email Configuration
* **Status:** **Pending External DNS Configuration**.
* **Recommendation:** Since the portfolio acts as your professional identity beacon, verify that your custom sending domain has strict mail protection records configured on your DNS provider (e.g., Cloudflare, Route53, Namecheap):
  * **SPF (Sender Policy Framework):** `v=spf1 include:resend.com ~all`
  * **DKIM (DomainKeys Identified Mail):** Public key TXT record provisioned via Resend domain verification.
  * **DMARC (Domain-based Message Authentication):** `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@yourdomain.com`

---

## 8. Identity Lifecycles, Token Management & Access Expiration Dynamics

A common executive inquiry is how access duration, inactivity timeouts, and session limits behave once a user authenticates via Firebase.

### A. Dual-Token Architecture (Authentication Layer)
Firebase Authentication uses a dual-token mechanism:
1. **Short-Lived ID Token (JWT):**
   * **Lifetime:** Exactly **1 hour (3,600 seconds)**.
   * **Payload:** Cryptographically signed by Google; carries identity (`uid`, `email`), authentication time, and custom security claims.
   * **Expiration:** Cannot be modified directly. Once expired, it is invalid for direct API requests.
2. **Long-Lived Refresh Token:**
   * **Storage:** Persisted securely by the Firebase Web SDK in client-side storage (`IndexedDB` / `localStorage`) using the default `browserLocalPersistence` mode.
   * **Automatic Token Rotation:** The Firebase SDK maintains an internal timer. Every ~50–55 minutes, it transparently uses the refresh token in the background to issue a fresh 1-hour ID token without prompting the user.

### B. Inactive Session Logout
* **Default Behavior:** By default, Firebase Client SDK **does NOT** log users out due to idle time or inactivity. As long as the browser retains the refresh token, returning visitors remain signed in.
* **Configurable Persistence Alternatives:**
  * `browserLocalPersistence` *(Current)*: Survives browser and tab restarts indefinitely until manual sign-out or cache clearing.
  * `browserSessionPersistence`: Clears the authentication state as soon as the tab or window is closed (recommended for high-security ephemeral workstations).
  * `inMemoryPersistence`: Clears auth state immediately upon page reload.
* **Client-Side Inactivity Watchdog (Optional):** A 15–30 minute mouse/keyboard idle timer can be attached to dispatch `auth.signOut()` upon prolonged inactivity.

### C. The 48-Hour Overall Access Window & Real-Time Revocation
In standard Firebase Auth, there is no automatic 48-hour hard ceiling. However, in this portfolio application, **Authentication is strictly decoupled from Authorization**:

```
+--------------------------+          +----------------------------------+
|   Firebase Authentication|          |       Firestore Allowlist        |
|  (Confirms Who You Are)  |  ----->  | (Confirms What You Can Access)   |
|   user.email == valid    |          | status, role, scope, allowedItems|
+--------------------------+          +----------------------------------+
```

1. **Decoupled Zero-Trust Verification:**
   * Even if a user remains continuously authenticated in Firebase, **every single access check** to locked items (Publications, Case Studies, Historical Archives) verifies their authorization status against the Firestore `allowlist` collection (`allowlist/{email}`).
2. **Instant Administrative Revocation:**
   * If the administrator removes a user from the allowlist or toggles their entry to `authorized: false` via the on-screen Admin Portal or Firebase Console, their access to all locked resources is revoked **immediately** on their next navigation or modal open.
3. **Time-Bound Temporary Passes (48-Hour / 7-Day Access):**
   * To provide recruiters or partners with a finite 48-hour access window, the `allowlist` schema supports an `expiresAt` timestamp attribute:
   * When `request.time > resource.data.expiresAt`, access is rejected in both client security rules and UI gates, automatically expiring the pass after 48 hours without needing manual administrative intervention.

---

## 9. Security Implementation Audit Status Matrix

Below is the verification summary of the 21 architectural security measures evaluated against this codebase:

| # | Specification / Feature | Category | Status | Enforcement Location |
| :- | :--- | :--- | :--- | :--- |
| 1 | **Content Security Policy (CSP)** | Application | **Implemented** | `index.html` & `server.ts` |
| 2 | **Form Honeypot Field** | Application | **Implemented** | `ContactModal.tsx` |
| 3 | **Client-Side Form Rate Limiting** | Application | **Implemented** | `ContactModal.tsx` (`localStorage`) |
| 4 | **Server-Side API Throttling** | Infrastructure | **Implemented** | `server.ts` (IP Rolling Window) |
| 5 | **Strict-Transport-Security (HSTS)** | Infrastructure | **Implemented** | `server.ts` (`max-age=31536000`) |
| 6 | **Clickjacking Defense (X-Frame-Options)** | Infrastructure | **Implemented** | `server.ts` (`SAMEORIGIN` + CSP) |
| 7 | **MIME-Type Sniffing Protection** | Infrastructure | **Implemented** | `server.ts` (`nosniff`) |
| 8 | **Sensor & Device Hardware Policy** | Infrastructure | **Implemented** | `server.ts` (`Permissions-Policy`) |
| 9 | **Referrer Privacy Policy** | Infrastructure | **Implemented** | `server.ts` (`strict-origin...`) |
| 10 | **Origin Obscurity / Header Stripping** | Infrastructure | **Implemented** | `server.ts` (`x-powered-by: off`) |
| 11 | **Supply Chain & Lockfile Integrity** | Supply Chain | **Implemented** | `bun.lock` / `package.json` |
| 12 | **Open Graph & Social Cards** | SEO & Identity | **Implemented** | `index.html` |
| 13 | **JSON-LD Schema.org Metadata** | SEO & Identity | **Implemented** | `index.html` (Schema `Person`) |
| 14 | **Semantic Accessibility & Headings** | SEO & Design | **Implemented** | Component hierarchy |
| 15 | **Origin Obscurity (Boilerplate Cleaned)** | Identity | **Implemented** | `README.md` & config manifests |
| 16 | **Zero-Trust Resource Gate Modals** | Access Control | **Implemented** | `GateModal.tsx`, `BlogPostModal.tsx` |
| 17 | **Firestore Allowlist Document Store** | Access Control | **Implemented** | Firestore collection `allowlist` |
| 18 | **Role-Based Admin Console** | Access Control | **Implemented** | `GateModal.tsx` (`munish.world...`) |
| 19 | **Granular Single-Resource Clearance** | Access Control | **Implemented** | `AuthContext.tsx` & `GateModal.tsx` |
| 20 | **Offline Caching Service Worker (PWA)** | Performance/PWA | **Pending** | Service worker script caching |
| 21 | **Domain Email DNS (SPF/DKIM/DMARC)** | Email Identity | **Pending** | External DNS Registrar Setup |