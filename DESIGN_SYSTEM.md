# Design System - Aikido Dojo Gamlestaden

## Overview

This document defines the standardized spacing, shadow, and layout patterns used across the site. All values are defined in `/src/utils/constants.ts` for consistent usage.

---

## Spacing Scale

### Section Padding (Vertical)

Use these for vertical padding on major page sections:

- **Small**: `py-8` (32px) - Compact sections, sidebar content
- **Medium**: `py-12` (48px) - Standard sections (default)
- **Large**: `py-16` (64px) - Hero sections, featured content
- **XLarge**: `py-20` (80px) - Landing pages, major dividers

**Usage:**
```astro
import { SPACING } from '../utils/constants';

<section class={SPACING.section.medium}>
  <!-- Content -->
</section>
```

### Gap (Between Elements)

Use these for spacing between flex/grid items:

- **XSmall**: `gap-2` (8px) - Inline elements, tight grouping
- **Small**: `gap-4` (16px) - Form fields, list items
- **Medium**: `gap-6` (24px) - Card grids, feature sections (default)
- **Large**: `gap-8` (32px) - Major content blocks
- **XLarge**: `gap-12` (48px) - Wide spacing, hero elements

**Usage:**
```astro
<div class="grid grid-cols-2 gap-6">
  <!-- Cards -->
</div>
```

### Margins (Bottom)

Use these for bottom margins on headings and sections:

- **Section**: `mb-12` (48px) - Between major sections
- **Subsection**: `mb-8` (32px) - Between subsections
- **Element**: `mb-4` (16px) - Between paragraphs, form fields

**Usage:**
```astro
<div class="mb-12">
  <h2 class="mb-8">Section Title</h2>
  <p class="mb-4">Content...</p>
</div>
```

---

## Shadow Scale

### Standard Shadows

Use these for elevation and depth:

- **None**: `shadow-none` - Flat elements, no depth
- **Small**: `shadow-sm` - Subtle lift (buttons, inputs)
- **Medium**: `shadow-md` - Moderate depth (secondary cards)
- **Large**: `shadow-lg` - Prominent depth (primary cards, modals)
- **XLarge**: `shadow-xl` - Maximum depth (hero sections, popovers)

### Semantic Shadows

Use these for specific component types:

- **Card**: `shadow-lg` - Standard card elevation
- **Elevated**: `shadow-xl` - Hero cards, featured content

**Usage:**
```astro
import { SHADOWS } from '../utils/constants';

<div class={`card ${SHADOWS.card}`}>
  <!-- Card content -->
</div>
```

---

## Container Widths

### Content Containers

Use these max-widths for different content types:

- **Reading**: `max-w-5xl` (1024px) - Text-heavy content, articles
- **Standard**: `max-w-6xl` (1152px) - Standard page sections (default)
- **Grid**: `max-w-7xl` (1280px) - Grid layouts, wide content
- **Full**: `max-w-full` - Edge-to-edge content

**Usage:**
```astro
import { CONTAINER } from '../utils/constants';

<div class={`container mx-auto ${CONTAINER.reading}`}>
  <!-- Text content -->
</div>
```

**Layout Strategy (from PLAN_JANUARY.md):**
- Reading content (aikido.astro): `max-w-5xl` for text
- Standard sections: `max-w-6xl`
- Grid layouts (cards, images): `max-w-7xl`

---

## Common Patterns

### Page Section Structure

Standard pattern for page sections:

```astro
<section class="py-12 px-4">
  <div class="container mx-auto max-w-6xl">
    <h2 class="text-3xl font-bold mb-8">Section Title</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Content -->
    </div>
  </div>
</section>
```

### Card Grid

Standard pattern for card grids:

```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div class="card card-border bg-base-100 shadow-lg">
      <div class="card-body">
        <!-- Card content -->
      </div>
    </div>
  ))}
</div>
```

### Hero Section

Standard pattern for hero sections:

```astro
<section class="py-16 px-4">
  <div class="container mx-auto max-w-7xl">
    <div class="hero bg-base-200 rounded-2xl shadow-xl">
      <div class="hero-content flex-col lg:flex-row gap-8">
        <!-- Hero content -->
      </div>
    </div>
  </div>
</section>
```

---

## Migration Guide

### Before (Inconsistent)

```astro
<!-- Old: Mixed spacing values -->
<div class="mt-3">
  <div class="mb-5 space-y-1">
    <div class="p-2 shadow-md">
      <!-- Content -->
    </div>
  </div>
</div>
```

### After (Standardized)

```astro
<!-- New: Using design system constants -->
import { SPACING, SHADOWS } from '../utils/constants';

<div class={SPACING.margin.subsection}>
  <div class={`${SPACING.margin.element} space-y-2`}>
    <div class={`p-2 ${SHADOWS.medium}`}>
      <!-- Content -->
    </div>
  </div>
</div>
```

---

## Current State Audit

### Spacing Patterns Found (from grep search)

**Frequent patterns:**
- `mt-3`, `mb-4`, `mt-8`, `mb-6`, `mt-12` - Should standardize to `mb-4`, `mb-8`, `mb-12`
- `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8` - Should standardize to `gap-2`, `gap-4`, `gap-6`, `gap-8`
- `py-6`, `py-8`, `py-2` - Should standardize to `py-8`, `py-12`, `py-16`

**Recommendation:**
- Migrate `mt-3` → `mb-4` (element margin)
- Migrate `mt-8` → `mb-8` (subsection margin)
- Migrate `mt-12` → `mb-12` (section margin)
- Migrate `gap-3` → `gap-4` (small gap)

### Shadow Patterns Found

**Frequent patterns:**
- `shadow-sm` - Instructor cards, timeline items
- `shadow-md` - Images, secondary cards
- `shadow-lg` - Primary cards, alerts, hero QR codes
- `shadow-xl` - Hero sections, elevated cards

**Current usage is mostly consistent.**

---

## Next Steps (Phase 3.3)

1. **Refactor pages to use constants:**
   - Import spacing/shadow constants
   - Replace hardcoded values
   - Test build after each page

2. **Update components:**
   - PaymentInfo, ContactCTA, etc.
   - Use SPACING and SHADOWS constants

3. **Verify consistency:**
   - Visual regression testing
   - Check all page variants
   - Ensure theme compatibility

---

## Notes

- All design system values are theme-aware (work with daisyUI themes)
- Spacing uses Tailwind's default scale (1 unit = 0.25rem = 4px)
- Shadows use Tailwind's default shadow scale
- Container widths align with Tailwind's max-width utilities
