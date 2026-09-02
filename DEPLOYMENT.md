# Deployment Guide

This project is configured as a high-performance Single Page Application (SPA) built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It is fully optimized for static hosting platforms (such as GitHub Pages, Vercel, Netlify, and Cloudflare Pages) as well as containerized cloud environments.

---

## 1. Local Development & Testing

Before deploying your changes, you can run the project locally to verify everything works correctly.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser at `http://localhost:3000`.

---

## 2. Production Build Verification

To verify that the application compiles correctly without any TypeScript or bundling errors:
```bash
npm run build
```
This generates an optimized production bundle in the `dist/` directory.

---

## 3. Hosting on GitHub & GitHub Pages

### Step A: Push to GitHub
1. Initialize Git (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio release v1.0"
   ```
2. Link your remote GitHub repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repository-name>.git
   git branch -M main
   git push -u origin main
   ```

### Step B: Deploying to GitHub Pages (Automated via GitHub Actions)
Create a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm ci

      - name: Build Application
        run: npm run build

      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

Then in your GitHub repository:
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Push a commit to `main`, and GitHub Actions will automatically build and publish your site!

---

## 4. Alternative Hosting Platforms (Vercel / Netlify)

- **Vercel**: Import your GitHub repository. Vercel automatically detects Vite and configures:
  - Build Command: `npm run build`
  - Output Directory: `dist`
- **Netlify**: Import your GitHub repository. Netlify automatically detects Vite with:
  - Build Command: `npm run build`
  - Publish directory: `dist`

---

## 5. Security & Content Protection (Anti-Copy / Anti-Save Tools)

To protect intellectual property, executive architecture blueprints, case studies, and proprietary narratives from casual scraping, copying, and saving, the application includes a multi-layered client-side content defense suite:

### A. Architectural Security Layers
1. **Mouse Text-Selection Shield (`user-select: none`)**:
   - Disables cursor text highlighting and drag-selection across headers, body narratives, badges, and blueprint cards via CSS (`user-select: none; -webkit-user-select: none;`).
   - Explicit exceptions are maintained for form fields (`input`, `textarea`, `.selectable-text`), preserving seamless user interaction in the Contact modal.
2. **Context Menu / Right-Click Interception (`contextmenu`)**:
   - Prevents the default browser right-click context menu to block *"Save Image As..."*, *"Save Page As..."*, *"Copy"*, and *"Inspect"*.
3. **Asset & Image Drag-and-Drop Blocker (`dragstart`)**:
   - Stops visitors from clicking and dragging images, diagrams, or links onto the desktop or secondary browser windows (`user-drag: none;` and `dragstart` event prevention).
4. **Clipboard & Copy Event Guards (`copy` / `cut`)**:
   - Intercepts unauthorized mouse/DOM clipboard copy operations while preserving dedicated programmatic action buttons (such as the one-click email copy button in the Contact dialog).
5. **Browser Save & Source Keyboard Shortcuts Interceptor**:
   - Suppresses browser page-save (`Ctrl+S`, `Cmd+S`) and source inspection (`Ctrl+U`, `Cmd+U`) shortcuts.

### B. Production HTTP Security Headers (Recommended for Custom Domain / CDN)
When hosting on Cloudflare, Nginx, Vercel, or AWS CloudFront, configure the following response headers:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://esm.town https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://img.youtube.com; frame-src https://www.youtube.com; object-src 'none';
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

