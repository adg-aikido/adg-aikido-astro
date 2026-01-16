# Conversion-Focused Landing Page

This directory contains a new conversion-optimized landing page design for ADG Aikido built with a narrative flow structure.

## Files Created

### Layout
- **`src/layouts/Layout.astro`** - New sticky header layout with navigation always visible

### Components (Conversion Funnel Sections)
- **`src/components/sections/conversion/ConversionHeroSection.astro`** - Hero section with dual CTA
- **`src/components/sections/conversion/ConversionBenefitsSection.astro`** - "What Will You Gain?" benefits showcase
- **`src/components/sections/conversion/ConversionHowItWorksSection.astro`** - 4-step onboarding process
- **`src/components/sections/conversion/ConversionCommunitySection.astro`** - Instructors, social proof, testimonials
- **`src/components/sections/conversion/ConversionPricingSection.astro`** - 3-tier pricing with highlights
- **`src/components/sections/conversion/ConversionNewsSection.astro`** - News, events, and partners
- **`src/components/sections/conversion/ConversionFinalCtaSection.astro`** - Final conversion CTA

### Pages
- **`src/pages/index-conversion.astro`** - The new conversion-focused homepage

### Updated Components
- **`src/components/common/Button.astro`** - Enhanced with variants (primary/secondary/ghost) and sizes (small/medium/large)

## How to Use

### View the Conversion Landing Page
Currently, the conversion landing page is at `/index-conversion.astro`. To make it the main homepage:

```bash
# Option 1: Replace the current index.astro
mv src/pages/index.astro src/pages/index-original.astro
mv src/pages/index-conversion.astro src/pages/index.astro

# Option 2: Keep both and access via URL
# Original: http://localhost:3000/
# New: http://localhost:3000/index-conversion
```

## Design Principles

### Conversion Funnel Structure
1. **Hero** (60vh) - Emotional hook with primary CTA
2. **Benefits** (40vh) - Answer "What's in it for me?"
3. **How It Works** (45vh) - Remove friction with step-by-step process
4. **Community** (50vh) - Build trust with instructors & social proof
5. **Pricing** (40vh) - Simple options, highlight free tier
6. **News** (35vh) - FOMO & community engagement
7. **Final CTA** (30vh) - Last chance conversion push

### Key Features
- **Sticky Header** - Navigation always accessible
- **Conversion Metrics** - Each section has clear micro-conversions
- **Mobile Optimized** - Section heights reduce on mobile
- **Visual Hierarchy** - CTAs use color and size to guide attention
- **Social Proof** - Ratings, member count, class frequency prominent
- **Risk Reduction** - Free trial emphasized throughout

## Conversion Tracking Points

To implement analytics, track these events:

| Event | Section | Purpose |
|-------|---------|---------|
| `hero_click_trial` | Hero | Primary conversion attempt |
| `hero_click_schedule` | Hero | Alternative path (members) |
| `benefits_view` | Benefits | Engagement milestone |
| `how_scroll_complete` | How It Works | Interest confirmation |
| `community_video_play` | Community | Content engagement |
| `pricing_section_view` | Pricing | Purchase decision point |
| `pricing_click_*` | Pricing | Plan selection |
| `news_click_event` | News | FOMO engagement |
| `final_cta_click` | Final CTA | Last conversion attempt |
| `scroll_depth` | All | Engagement metric |

## Styling Notes

- Uses Tailwind CSS (existing project utilities)
- Color scheme: Primary blue (#3b82f6) for CTAs
- Typography: Serif for headings (Alegreya), Sans-serif for body (Inter)
- Spacing: 20px padding on sections for breathing room
- Shadows: Progressive shadow depth for visual hierarchy

## SEO Metadata

- Title: "Aikido Dojo Gamlestaden i Göteborg - Discover Your Strength"
- Description: "Learn aikido from expert instructors. Join 200+ members in Göteborg. Free trial for all ages. Start your transformation today."

## Next Steps

1. **Add Real Content**
   - Replace instructor placeholder names/bios with actual data
   - Add instructor photos
   - Link news items to actual events

2. **Implement Analytics**
   - Add GTM/GA events for conversion tracking
   - Monitor scroll depth and CTA clicks
   - A/B test CTA copy

3. **Optimize Images**
   - Extract inline SVG logo to separate file
   - Add WebP versions of background images
   - Optimize instructor photos

4. **Test Conversions**
   - Run Lighthouse audit
   - Test on mobile devices
   - User testing with new visitors

## File Structure

```
src/
├── layouts/
│   ├── Layout.astro (original)
│   └── Layout.astro (new - sticky header)
├── pages/
│   ├── index.astro (original)
│   └── index-conversion.astro (new conversion-focused)
└── components/
    ├── common/
    │   └── Button.astro (enhanced with variants)
    └── sections/
        └── conversion/ (all new)
            ├── ConversionHeroSection.astro
            ├── ConversionBenefitsSection.astro
            ├── ConversionHowItWorksSection.astro
            ├── ConversionCommunitySection.astro
            ├── ConversionPricingSection.astro
            ├── ConversionNewsSection.astro
            └── ConversionFinalCtaSection.astro
```

## Performance Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Page Size**: < 2MB total

## Browser Compatibility

Designed for:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)
