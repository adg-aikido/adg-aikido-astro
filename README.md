# ADG Aikido Website

A modern, fast, and maintainable website for ADG Aikido built with [Astro](https://astro.build/).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and Bun package manager

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

The site will be available at `http://localhost:4321`

### Build for Production

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## 📁 Project Structure

```
src/
├── assets/              # Static images and media files
├── components/
│   ├── common/         # Reusable UI components (Button, Card, etc.)
│   └── sections/       # Page section components
│       └── homepage/   # Homepage-specific sections
├── data/               # YAML data collections
│   ├── activities.yaml
│   ├── events.yaml
│   ├── news.yaml
│   ├── prices.yaml
│   ├── dojos.yaml
│   ├── schema.yaml
│   └── media.yaml
├── layouts/            # Layout templates
├── pages/              # Page routes
│   ├── events/         # Dynamic event pages
│   └── [...].astro     # Other pages
├── styles/             # Global CSS
└── types/              # TypeScript type definitions
public/
├── assets/             # Built and optimized images
└── robots.txt
```

## 📝 Content Management

Content is organized in YAML collections in the `src/data/` directory. This approach makes it easy to manage content without touching component code.

### Available Collections

#### `activities.yaml`
Homepage activities/events with markdown descriptions
```yaml
activities:
  - date_start: "17 januari"
    date_end: "17 januari"
    time_start: "19:00"
    time_end: "20:30"
    title: Activity Title
    description: "Markdown **content** here"
    event_id: optional-event-id
```

#### `events.yaml`
Seminar and workshop events with dynamic page generation
```yaml
events:
  - id: dequiros2025
    name: Event Name
    eventDate: "2025-01-17"
    paymentDeadline: "2024-12-17"
    senseiInfo: "Markdown content"
    image: /assets/image.jpg
    schedule:
      saturday:
        - time: "09:00-11:00"
          title: Session Title
      sunday:
        - time: "09:00-11:00"
          title: Session Title
    prices:
      - name: "Price Option"
        amount: 500
```

#### `news.yaml`
Homepage news and announcements with optional images
```yaml
news:
  - title: News Title
    content: "Markdown **content**"
    images:
      - src: /assets/image.jpg
        alt: Image description
```

#### `prices.yaml`
Training prices organized by category
```yaml
priceCategories:
  - category: regularFees
    title: "Monthly Fees"
    heading: "Regular Training"
    prices:
      - title: Adult
        amount: 500
        unit: "per month"
```

#### `schema.yaml`
Training schedule with regular and summer variants
```yaml
schedule:
  enabled: true
  days:
    - day: Monday
      sessions:
        - startTime: "19:00"
          endTime: "20:30"
          title: "Aikido Training"
          instructors: ["LS", "MD"]

summer_schedule:
  enabled: false
  days: []

instructors:
  - initials: "LS"
    name: "Lewis DeQuiros"
    grade: "6. Dan"
```

#### `dojos.yaml`
Links to aikido dojos (Swedish, CAA, friends)
```yaml
dojoLinks:
  - section: "Aikido Friends"
    columns: 2
    links:
      - href: "https://example.com"
        label: "Dojo Name"
```

#### `media.yaml`
All media content: videos, documents, posters
```yaml
mediaSections:
  - section: traningsvideor
    title: "Training Videos"
    subtitle: "Optional description"
    id: traningsvideor
    gridCols: "grid-cols-1 md:grid-cols-3"
    items:
      - href: "https://youtube.com/..."
        title: "Video Title"
        thumbnail: "https://..."
        tags: [tag1, tag2]
        isYouTube: true
```

## 🎨 Components

Key reusable components:

- **CTAButton.astro** - Call-to-action button
- **MediaSection.astro** - Container for media items
- **MediaCard.astro** - Individual media card
- **ScheduleCard.astro** - Training schedule display
- **PriceCard.astro** - Price/fee card
- **LinkList.astro** - List of links

## 🔧 Configuration

### Astro Config
Main configuration in `astro.config.mjs`:
- Site URL: `http://localhost:4321`
- Build optimizations with Tailwind CSS and Vite
- YAML file support via Rollup plugin

### TypeScript
Project uses TypeScript for type safety. Type definitions are in `src/types/`.

## 🚢 Deployment

Build the project:
```bash
bun run build
```

The `dist/` directory contains the static site ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📦 Dependencies

Key libraries:
- **Astro** - Static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **marked** - Markdown parser for rendering content from YAML
- **@astrojs/mdx** - MDX support
- **@astrojs/sitemap** - Automatic sitemap generation

## 🎯 Development Tips

### Adding a New Page
1. Create a new `.astro` file in `src/pages/`
2. Import the Layout component
3. Add your content

### Adding Dynamic Content
1. Create a new YAML file in `src/data/`
2. Import it in your component: `import data from "../data/yourfile.yaml"`
3. Use the data in your template

### Creating Dynamic Routes
Use bracket notation for dynamic pages, e.g., `src/pages/events/[id].astro` with `getStaticPaths()`:

```astro
export async function getStaticPaths() {
  const events = (await import('../data/events.yaml')).default;
  return events.events.map(event => ({
    params: { id: event.id },
    props: { event }
  }));
}
```

### Markdown in YAML
Description fields support markdown and are rendered with `marked.parse()`:

```astro
<div set:html={marked.parse(item.description)} />
```

## 📸 Asset Management

Images in the `public/assets/` directory are served directly. 

## 🐛 Troubleshooting

### Port Already in Use
If port 4321 is in use, Astro will automatically use the next available port.

### Build Errors
- Check that all YAML files are valid (proper indentation)
- Verify all image paths exist in `public/assets/`
- Ensure imports use correct relative paths

## 📝 License

This project is maintained for ADG Aikido.

## 🤝 Contributing

When adding content:
1. Use the appropriate YAML collection
2. Follow the existing structure and naming conventions
3. Test locally with `bun run dev`
4. Build and verify with `bun run build`
