# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ADG Aikido Website is a static website for Aikido Dojo Gamlestaden (Swedish aikido training club) built with Astro. The site uses a data-driven architecture with YAML collections for content management, enabling non-developers to maintain content easily.

**Tech Stack:**
- Astro 5.16+ (Static Site Generator)
- TypeScript (strict mode)
- Tailwind CSS 4.1 (utility-first styling)
- Bun package manager (required)

## Essential Commands

### Development
```bash
bun install                # Install dependencies (always run first)
bun run dev                # Start dev server at http://localhost:4321
bun run build              # Build production site to dist/
bun run preview            # Preview production build locally
```

### Build Validation
The build process includes three automatic checks that must pass:
1. **Broken Links Check** - Validates all internal HTML links (fails build if broken)
2. **Sitemap Generation** - Creates sitemap-0.xml and sitemap-index.xml
3. **TypeScript Check** - Strict type checking from Astro preset

Always run `bun run build` before committing to ensure no broken links or type errors.

## Architecture Patterns

### Data-Driven Content Model

All content lives in `src/data/*.yaml` files, not in component code. This separation enables content updates without touching components.

**Key Data Files:**
- `activities.yaml` - Homepage activities with markdown descriptions
- `events.yaml` - Seminar/workshop events (generates dynamic pages at `/events/[id]`)
- `news.yaml` - Homepage news items with optional images
- `prices.yaml` - Training fee categories
- `schema.yaml` - Training schedules (regular + summer variants) with instructor data
- `dojos.yaml` - Links to related aikido dojos
- `media.yaml` - All media content (videos, documents, posters)

**Pattern for importing YAML data:**
```astro
---
import data from "../data/filename.yaml";
---

{data.collection.map(item => (
  <Component {...item} />
))}
```

### Dynamic Page Generation

Use `getStaticPaths()` for dynamic routes. Example from `src/pages/events/[id].astro`:

```astro
export async function getStaticPaths() {
  const events = (await import('../../data/events.yaml')).default;
  return events.events.map(event => ({
    params: { id: event.id },
    props: { event }
  }));
}
```

New events automatically generate pages when added to `events.yaml` with unique `id` field.

### Markdown in YAML

Description fields support markdown and are rendered with `marked.parse()`:

```astro
---
import { marked } from "marked";
---

<div set:html={marked.parse(item.description)} />
```

### Font System

The site uses a runtime font switcher that allows users to customize both heading and body fonts:

**Architecture:**
- **Font Configuration**: `src/utils/fontConfig.ts` defines available fonts
  - `SERIF_FONTS`: 5 serif options for headings (Playfair Display, Merriweather, Lora, Crimson Text, EB Garamond)
  - `SANS_SERIF_FONTS`: 5 sans-serif options for body text (Poppins, Inter, Open Sans, Roboto, Montserrat)
  - `DEFAULT_FONTS`: Playfair Display (heading) and Poppins (body)

**Implementation:**
- Fonts loaded dynamically via Google Fonts API at runtime
- User preferences stored in localStorage with keys: `font-heading`, `font-body`
- Fonts applied by overriding CSS custom properties: `--font-serif`, `--font-sans`
- FontChooser component uses Alpine.js for state management
- Changes apply instantly without page reload

**CSS Integration:**
```css
/* In adg.css */
@theme {
  --font-sans: 'Poppins', sans-serif;
  --font-serif: 'Playfair Display', serif;
}
```

These custom properties are overridden at runtime via `document.documentElement.style.setProperty()` when users select different fonts. All components using `font-sans` or `font-serif` Tailwind utilities automatically inherit the user's font choice.

### Layout System

Two layouts with different purposes:

1. **`Layout.astro`** - Traditional layout for content pages
   - Standard header with logo and navigation images
   - Footer with copyright
   - Background image overlay
   - Used by most pages

2. **`Layout.astro`** - Conversion-focused landing page
   - Sticky header that shrinks on scroll (with JavaScript)
   - Optimized for lead generation
   - Same header/footer structure but with scroll interaction
   - Fixed background overlay with z-index layering

Both layouts accept props: `title` and `description` for SEO meta tags.

### Component Variant System

Components use a variant/size pattern for consistent styling:

**Example from `Button.astro`:**
```astro
export interface Props {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
}

const variantClasses = {
  primary: "bg-accent-600 text-white hover:opacity-90",
  secondary: "border-2 border-gray-300 text-gray-800 hover:bg-gray-50",
  ghost: "text-primary-600 hover:underline"
};

const sizeClasses = {
  small: "px-4 py-2 text-sm",
  medium: "px-6 py-3",
  large: "px-8 py-4 text-lg"
};
```

When creating new components, follow this pattern for variants and sizes.

### Tailwind Color System

Colors are defined in `tailwind.config.js`:
- `primary` - Sky blue palette (main brand color)
- `secondary` - Emerald palette
- `accent` - Amber palette (for CTAs)
- `gray` - Slate palette (for text/borders)
- `error`, `ok`, `info` - Semantic colors

Use color names with weight: `primary-600`, `accent-500`, etc. Changing colors requires rebuild.

### Component Organization

**`src/components/common/`** - Reusable UI components:
- `Button.astro` - Link button with variants (primary/secondary/ghost) and sizes
- `ContentSection.astro` - Standard content container
- `SectionHeading.astro` - Consistent section titles
- `PriceCard.astro` - Price display cards
- `ScheduleCard.astro` - Training schedule display
- `MediaCard.astro` - Media item cards (videos, documents)
- `MediaSection.astro` - Container for media items
- `EventScheduleCard.astro` - Event schedule with time slots
- `Navigation.astro` - Main site navigation
- `CTAButton.astro` - Call-to-action button
- `ThemeChooser.astro` - Dark/light theme switcher with localStorage persistence
- `FontChooser.astro` - Runtime font switcher for heading and body fonts

**`src/components/sections/`** - Page-specific sections organized by page type:
- `sections/homepage/` - Homepage-specific sections
- `sections/conversion/` - Conversion landing page sections

### TypeScript Type Definitions

Type definitions in `src/types/*.d.ts` declare module types for YAML imports:

```typescript
declare module "../data/events.yaml" {
  const events: { events: Event[] };
  export default events;
}
```

When adding new YAML files, create corresponding type definitions following this pattern.

## Critical Build Requirements

### YAML Syntax
- Must be valid YAML with proper indentation (2 spaces, not tabs)
- Build fails on syntax errors
- Markdown content is supported in string fields
- Arrays and nested objects are supported

### Link Validation
The `astro-broken-links-checker` plugin validates all internal HTML links during build:
- Checks internal paths, anchors, relative links
- Does NOT check external links
- Throws error and fails build if broken links found
- Check `broken-links.log` for details when build fails

Common causes of broken links:
- Typo in href attribute
- Missing file in `src/pages/`
- Incorrect relative paths in component imports

### Astro Configuration
`astro.config.mjs` includes three integrations that must not be removed:
1. `@astrojs/mdx` - MDX support in Astro files
2. `@astrojs/sitemap` - Auto-generates XML sitemaps
3. `astro-broken-links-checker` - Link validation (throwError: true)

Vite plugins (Tailwind CSS and YAML) run during build - ordering matters.

## Routing Structure

**Static Routes:**
- `/` - Homepage (index.astro)
- `/index-conversion/` - Conversion landing page (index-conversion.astro)
- `/aikido/` - Aikido information page
- `/priser/` - Pricing page (Swedish: "prices")
- `/schema/` - Training schedule page (Swedish: "schedule")
- `/media/` - Media gallery page
- `/klubben/` - Club information page (Swedish: "the club")
- `/kontakt/` - Contact page (Swedish: "contact")

**Dynamic Routes:**
- `/events/[id]/` - Generated from `events.yaml` (e.g., `/events/dequiros2025/`)

## Development Workflow

**For any change:**
1. Run `bun run dev` to test locally at `http://localhost:4321`
2. Verify pages render correctly in browser
3. Run `bun run build` to validate (must complete without errors)
4. Check for broken links, type errors, YAML syntax errors
5. Commit only after successful build

**Branching Strategy:**
- Main branch: `main` (production-ready)
- Feature branches for layout variants, content, or themes
- Frequent branch switching during development - always verify current branch

## No Testing/Linting Framework
- No ESLint, Prettier, or Jest configured
- No pre-commit hooks
- Code formatting is manual
- Type safety provided by TypeScript strict mode + Astro

## Key Implementation Notes from Copilot Instructions

### Schedule System
`schema.yaml` contains two schedule variants:
- `schedule` - Regular training schedule (enabled/disabled via flag)
- `summer_schedule` - Summer training schedule (separate enabled flag)
- Toggle between variants using the `enabled` field
- Each schedule has days with sessions (startTime, endTime, title, instructors)
- Instructor data stored in `instructors` array with initials, name, grade

### Event Structure
Events in `events.yaml` have detailed structure:
- `id` - Unique identifier for dynamic routing
- `name` - Event title
- `eventDate` - Display date
- `paymentDeadline` - Payment deadline text
- `senseiInfo` - Markdown content about instructor
- `image` - Path to event image in `/assets/`
- `schedule` - Nested object with `saturday`/`sunday` arrays
  - Each session: `timeStart`, `timeEnd`, `activity`, optional `subdued` flag
- `prices` - Array of price options with `name` and `amount`

### Media System
`media.yaml` organizes all media content:
- `mediaSections` - Array of sections (videos, documents, posters)
- Each section has: `section`, `title`, `subtitle`, `id`, `gridCols`
- Items array with: `href`, `title`, `thumbnail`, `tags`, `isYouTube` flag
- Grid columns controlled via Tailwind classes (e.g., `grid-cols-1 md:grid-cols-3`)

### Font System
Uses Google Fonts loaded in layout head:
- **Alegreya** (600, 700) - Display font for headings
- **Inter** (300-700) - Body text font
- Fonts preconnected for performance
