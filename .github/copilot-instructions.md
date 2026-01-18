# Copilot Instructions for adg-aikido-astro

## Repository Overview

**ADG Aikido Website** - A modern static website for Aikido Dojo Gamlestaden (Swedish aikido training club) built with Astro. The site provides information about training, pricing, schedules, events, and news. It features both a traditional homepage and a modern conversion-focused landing page variant.

### Key Facts

- **Type**: Static Site Generator (Astro)
- **Language**: TypeScript + Astro components (.astro files)
- **Build System**: Astro with Vite
- **Package Manager**: Bun (required)
- **Node Version**: 18+
- **Bun Version**: 1.3.6+
- **Repository Size**: Small (~10 pages)
- **Styling**: Tailwind CSS 4.1 + **daisyUI 5** (component library with 30+ themes)
- **JavaScript**: **Alpine.js 3.x** (lightweight reactivity for theme management)
- **Content Model**: YAML data collections in `src/data/`
- **Build Time**: ~800ms for clean build, ~1s with all checks
- **Output**: Static HTML files to `dist/` directory
- **Languages Supported**: Swedish + English
- **Page Variants**: Multiple variants per page (e.g., `priser.astro`, `priser--student.astro`)

## Directory Structure

```
src/
├── assets/                  # SVG and image assets
├── components/
│   ├── common/             # Reusable UI components (Button, Card, etc.)
│   └── sections/
│       ├── homepage/       # Homepage-specific sections (4 components)
│       └── conversion/     # Conversion landing page sections (7 components)
├── data/                   # YAML content collections
│   ├── activities.yaml     # Homepage activities with markdown descriptions
│   ├── events.yaml         # Dynamic event pages (2 events)
│   ├── news.yaml           # News with category, description, date, icon, content, images
│   ├── prices.yaml         # Training fee categories
│   ├── dojos.yaml          # Links to related dojos
│   ├── schema.yaml         # Training schedules and instructor info
│   └── media.yaml          # Videos, documents, posters
├── layouts/
│   ├── Layout.astro        # Main layout with header/nav/footer
│   └── Layout.astro  # Alternative layout for conversion page
├── pages/                  # Static routes and dynamic pages
│   ├── index.astro         # Homepage
│   ├── index--conversion.astro  # Conversion landing page variant
│   ├── aikido.astro        # Info page
│   ├── priser.astro        # Pricing page
│   ├── priser--student.astro  # Student pricing variant
│   ├── priser--senior.astro  # Senior pricing variant
│   ├── schema.astro        # Schedule page
│   ├── schema--sommar.astro  # Summer schedule variant
│   ├── media.astro         # Media page
│   ├── klubben.astro       # Club info page
│   ├── kontakt.astro       # Contact page
│   └── events/[id].astro   # Dynamic event detail pages
├── styles/
│   ├── adg.css             # Global styles
│   ├── adg-dark.css        # Dark theme custom styles
│   ├── adg-light.css       # Light theme custom styles
│   └── elements.css        # Element-specific styles
└── types/
    └── activity.d.ts, event.d.ts, news.d.ts, prices.d.ts  # TypeScript types

Configuration Files:
├── astro.config.mjs        # Astro configuration with integrations
├── tsconfig.json           # TypeScript strict mode from Astro preset
├── tailwind.config.js      # Tailwind CSS color theme
└── package.json            # Dependencies and scripts
```

## Build & Development Workflow

### Prerequisites (Always Required)

- Bun package manager installed (`/home/vlad/.bun/bin/bun`)
- Node.js 18+ (v22.21.0 used in repo)
- No prior setup needed - dependencies auto-installed

### Branching Strategy

- Main branch: `main` (production-ready)
- Feature branches for variants of layout, content or themes. While developing,
  there will be many switches between branches, always keep track of which branch is current.

### Install Dependencies

```bash
bun install
```

- Always run this first before any development
- Creates `node_modules/` and updates `bun.lock`
- Required after `package.json` changes

### Development Server

```bash
bun run dev
```

- Starts Astro dev server on `http://localhost:4321`
- Hot module reloading enabled
- Watches file changes in `src/`
- Dev server startup: ~214ms
- Press Ctrl+C to stop
- If port 4321 is in use, will automatically use next available port

### Production Build

```bash
bun run build
```

- Builds static site to `dist/` directory
- Build time: ~800-1000ms for clean build
- Runs three validation checks (in order):
  1. **Broken Links Check** - astro-broken-links-checker plugin validates all internal HTML links (~17-19ms)
     - Throws error and fails build if broken links found
     - Does NOT check external links
  2. **Sitemap Generation** - Creates `sitemap-0.xml` and `sitemap-index.xml`
  3. **TypeScript Compilation** - Strict type checking from Astro preset
- Output: 10 HTML page files + assets in `dist/`
- No minification warnings - CSS/JS minified automatically by Vite
- **ALWAYS verify build succeeds before committing** - broken links cause immediate failure

### Preview Production Build

```bash
bun run preview
```

- Serves `dist/` locally on port `4321` for testing
- Use this to verify build output before deployment
- Requires successful `bun run build` first

## Key Build Details & Gotchas

### YAML Data Collections

- All content in `src/data/*.yaml` is statically imported and must be valid YAML
- Supports nested objects, arrays, and markdown in string fields
- Parsed at build time - syntax errors cause build failure
- Markdown content is rendered with `marked.parse()` in templates
- **Important**: Maintain consistent indentation in YAML files

### TypeScript Configuration

- Uses Astro's strict TypeScript config (`"extends": ["astro/tsconfigs/strict"]`)
- Type checking runs during build
- Types for YAML modules are declared in `src/types/activity.d.ts` etc.
- `.astro/types.d.ts` auto-generated during build - never edit directly

### Astro Integrations (Critical for Build)

Three integrations run during `bun run build`:

1. **@astrojs/mdx** - Enables MDX support in Astro files
2. **@astrojs/sitemap** - Auto-generates XML sitemaps
3. **astro-broken-links-checker** - Validates all links in built HTML
   - Most common build failure source
   - Validates: internal paths, anchors, relative links
   - Errors like "broken-links.log" indicate link issues

### Vite Configuration

- Tailwind CSS included via `@tailwindcss/vite` plugin
- YAML files parsed via `@rollup/plugin-yaml`
- Both run during build - ordering matters
- Source maps enabled for debugging

### Color System (daisyUI + Tailwind)

- **daisyUI Semantic Colors**: Use theme-aware classes for all UI components
  - `base-100`, `base-200`, `base-300` - Background colors
  - `base-content` - Text color (auto-adjusts for light/dark themes)
  - `primary`, `secondary`, `accent` - Brand colors
  - `info`, `success`, `warning`, `error` - Status colors
- **Theme Management**: 30+ built-in themes + custom `adg` theme
  - User-selected theme stored in localStorage via Alpine.js
  - Theme persists across sessions
  - Controlled by `ThemeChooser.astro` component
- **IMPORTANT**: Always use daisyUI semantic colors instead of hardcoded Tailwind colors
  - ❌ Bad: `text-gray-800`, `bg-blue-100`
  - ✅ Good: `text-base-content`, `bg-base-200`
- Changing colors requires rebuilding

### Development Watching

- Watches `src/` directory for changes
- Auto-rebuilds on save
- If build fails due to syntax errors, fix and save again
- No need to restart dev server for most changes

### Page Variants System

- **Multiple variants per page** using double-dash naming convention
- Example: `priser.astro` (default), `priser--student.astro`, `priser--senior.astro`
- Base page serves as default, variants provide alternate content/layout
- Navigation dropdown shows all variants for discovery
- Variants discovered at build time via `discoverPageVariants()` utility
- Implementation:
  - Base page: `pages/priser.astro` → `/priser/`
  - Variant: `pages/priser--student.astro` → `/priser--student/`
  - Utility: `src/utils/navigationBuilder.ts` handles discovery and navigation
- **Navigation shows variants** in dropdown when hovering over base page link
- Conversion page variant: `index--conversion.astro` provides alternate homepage layout

## Page Structure & Routing

### Static Pages

- `index.astro` → `/` (homepage)
- `index--conversion.astro` → `/index--conversion/` (conversion landing page variant)
- `aikido.astro` → `/aikido/`
- `priser.astro` → `/priser/` (pricing in Swedish)
- `priser--student.astro` → `/priser--student/` (student pricing variant)
- `priser--senior.astro` → `/priser--senior/` (senior pricing variant)
- `schema.astro` → `/schema/` (schedule in Swedish)
- `schema--sommar.astro` → `/schema--sommar/` (summer schedule variant)
- `media.astro` → `/media/`
- `klubben.astro` → `/klubben/` (club info in Swedish)
- `kontakt.astro` → `/kontakt/` (contact in Swedish)

### Dynamic Pages

- `events/[id].astro` - Generates pages for each event in `data/events.yaml`
  - Must define `getStaticPaths()` function
  - Events with IDs: `dequiros2025`, `hendricks2025`
  - Routes: `/events/dequiros2025/`, `/events/hendricks2025/`
- Adding new events: Add to `data/events.yaml` with unique `id` field
  - Rebuilds automatically will generate new page

## Common Tasks & Code Patterns

### Adding a New Page

1. Create `.astro` file in `src/pages/`
2. Import Layout: `import Layout from "../layouts/Layout.astro"`
3. Wrap content: `<Layout>...</Layout>`
4. File name becomes route (e.g., `about.astro` → `/about/`)

### Importing Data from YAML

```astro
---
import events from "../data/events.yaml";
---

{events.events.map(event => (
  <div>{event.name}</div>
))}
```

### Rendering Markdown from YAML

```astro
---
import { marked } from "marked";
---

<div set:html={marked.parse(description)} />
```

### Creating Dynamic Routes

- Use bracket notation: `src/pages/events/[id].astro`
- Define `getStaticPaths()`:

```astro
export async function getStaticPaths() {
  const events = (await import('../data/events.yaml')).default;
  return events.events.map(event => ({
    params: { id: event.id },
    props: { event }
  }));
}
```

### Component Imports

- Always use relative paths: `import Foo from "../components/Foo.astro"`
- Path is relative from importing file's location
- File names are case-sensitive

### Using daisyUI Components

- **Always use daisyUI classes** for UI components instead of custom Tailwind
- Common daisyUI components:

  ```astro
  <!-- Card -->
  <div class="card card-border bg-base-100 shadow-lg">
    <div class="card-body">
      <h2 class="card-title">Title</h2>
      <p>Content</p>
    </div>
  </div>

  <!-- Button -->
  <button class="btn btn-primary">Click me</button>

  <!-- Badge -->
  <span class="badge badge-primary">New</span>

  <!-- Menu -->
  <ul class="menu">
    <li><a>Item 1</a></li>
  </ul>
  ```

- **Theme-aware colors**: Use semantic color variants
  - Buttons: `btn-primary`, `btn-secondary`, `btn-accent`, `btn-ghost`, `btn-neutral`
  - Cards: `bg-base-100`, `bg-base-200`, `bg-primary`, `text-primary-content`
  - Badges: `badge-primary`, `badge-secondary`, `badge-info`, `badge-success`
- Avoid hardcoded Tailwind colors - they don't adapt to theme changes

### <frontend_aesthetics>

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. 
Avoid this: make creative, distinctive frontends that surprise and delight. Focus on: Typography: Choose fonts that are beautiful, unique, and interesting. 
Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. 
Dominant colors with sharp accents outperform timid, evenly-distributed palettes. 
Draw from IDE themes and cultural aesthetics for inspiration. 

Motion: Use animations for effects and micro-interactions. 
Prioritize CSS-only solutions for HTML. Use Motion library for React when available. 
Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. 

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors.
Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic. 

Avoid generic AI-generated aesthetics:
  - Overused font families (Inter, Roboto, Arial, system fonts)
  - Clichéd color schemes (particularly purple gradients on white backgrounds)
  - Predictable layouts and component patterns
  - Cookie-cutter design that lacks context-specific character 

Interpret creatively and make unexpected choices that feel genuinely designed for the context.
Vary between light and dark themes, different fonts, different aesthetics.
You still tend to converge on common choices (Space Grotesk, for example) across generations. 
Avoid this: it is critical that you think outside the box!</frontend_aesthetics>

### Alpine.js Patterns

- **Alpine.js is loaded via CDN** in Layout.astro
- Used for client-side interactivity and state management
- Current usage: Theme persistence in `ThemeChooser.astro`
  ```astro
  <div x-data="{
    theme: localStorage.getItem('theme') || 'dark',
    setTheme(newTheme) {
      this.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }">
    <!-- Component content -->
  </div>
  ```
- Use Alpine.js for:
  - LocalStorage persistence
  - Interactive UI elements (dropdowns, modals)
  - Client-side state without full framework overhead
  - Theme switching and persistence

### Working with News Data

- **News data structure** in `news.yaml` includes:
  - `title` - Headline text
  - `category` - Category label (e.g., "KOMMANDE EVENT", "GRADERINGAR")
  - `description` - Short summary for card display
  - `date` - ISO format date (YYYY-MM-DD)
  - `icon` - Emoji for visual representation
  - `content` - Full markdown content
  - `images` - Optional array of image objects
- **NewsSection** (conversion page): Displays first 3 news items in card format
- **HomepageNewsSection** (homepage): Displays all news items with full content
- Both components use the same data source from `news.yaml`
- Date formatting uses Swedish locale: `date.toLocaleDateString('sv-SE')`

## Validation & Quality Checks

### Automatic Build Checks

- **Link Validation**: `astro-broken-links-checker` validates all HTML links
  - Fails build if any broken links found
  - Check `broken-links.log` for details
  - Common issue: typos in href paths or missing files

- **TypeScript Checking**: Runs during build with strict mode
  - Type errors prevent build completion
  - Check terminal output for specific errors

- **Sitemap Generation**: Automatic, no action needed

### Manual Validation Before Committing

1. **Run development server**: `bun run dev`
   - Verify pages load without errors
   - Check visual layout on multiple screen sizes
   - Test interactive elements

2. **Clean build test**:

   ```bash
   rm -rf dist/
   bun run build
   ```

   - Ensures no stale files cause issues
   - Typical time: ~1000ms
   - Must complete without errors

3. **Preview build locally**:

   ```bash
   bun run preview
   ```

   - Serves `dist/` to verify production output
   - Check that all pages render correctly

4. **Check for YAML syntax errors**:
   - Validate indentation in `src/data/*.yaml`
   - Build will fail if YAML is malformed

## No Linting or Testing Framework

- **No ESLint, Prettier, or Jest** configured
- No pre-commit hooks
- Code formatting is manual
- Type safety via TypeScript + Astro strict mode

## Important Files to Know

- `astro.config.mjs` - Integrations and build configuration (includes daisyUI)
- `src/layouts/Layout.astro` - Main layout with Alpine.js integration
- `src/components/common/ThemeChooser.astro` - daisyUI theme selector with Alpine.js
- `src/components/common/Navigation.astro` - Main navigation with variant dropdown support
- `src/components/common/Button.astro` - Standard button component (uses daisyUI)
- `src/components/sections/conversion/NewsSection.astro` - News cards for conversion page
- `src/components/sections/homepage/HomepageNewsSection.astro` - Full news list for homepage
- `src/utils/navigationBuilder.ts` - Page variant discovery and navigation logic
- `src/data/news.yaml` - News content with category, description, date, icon, content, images
- `src/data/events.yaml` - Controls dynamic event pages
- `src/types/news.d.ts` - TypeScript interface for news data structure
- `tailwind.config.js` - Tailwind + daisyUI configuration with custom themes
- `package.json` - Scripts and dependency versions (includes daisyUI, Alpine.js)
- `dist/` - Build output directory (auto-generated, git-ignored)

## Debugging Tips

### Build Fails with Broken Links Error

1. Check `broken-links.log` in repo root for link details
2. Common causes:
   - Typo in href attribute: `href="/priser"` but file is in `priser.astro`
   - Missing file in `src/pages/`
   - Incorrect relative paths in imports
3. Fix links and rebuild

### Dev Server Won't Start

1. Check if port 4321 is in use: `lsof -i :4321`
2. Kill process or use different port: `bun run dev -- --port 3000`
3. Verify `node_modules/` exists - run `bun install`

### Styling Not Applied

1. Verify Tailwind classes exist in `tailwind.config.js`
2. Restart dev server after tailwind.config.js changes
3. Check for typos in class names (Tailwind is strict)

### Type Errors in Components

1. Check import paths are correct (case-sensitive)
2. Verify YAML type declarations exist in `src/types/`
3. Run `bun run build` to see full error messages

### Component Not Found

1. Check file exists and path is correct
2. Verify relative import path: `../` for parent directory
3. Check file extension is `.astro`
4. Astro imports are case-sensitive

### daisyUI Theme Issues

1. **Colors not changing with theme**: Likely using hardcoded Tailwind colors instead of daisyUI semantic colors
   - Replace `text-gray-800` with `text-base-content`
   - Replace `bg-blue-100` with `bg-base-200` or `bg-primary/10`
2. **Theme not persisting**: Check Alpine.js console errors and localStorage
3. **Component not styled**: Verify daisyUI class names (e.g., `btn`, `card`, `badge`)
4. **Testing themes**: Use ThemeChooser dropdown in navigation to switch between 30+ themes

## Workflow Summary

**For any change:**

1. Run `bun run dev` to test locally
2. Verify in browser at `http://localhost:4321`
3. Run `bun run build` to validate
4. Check no errors in build output
5. Commit with confidence

**Trust these instructions** - they've been validated against the actual repository. Only perform additional searches if you encounter errors not covered here or if instructions are found to be incomplete.
