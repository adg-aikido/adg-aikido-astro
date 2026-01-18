import { defineCollection, z } from 'astro:content';

// Events collection schema
const eventsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    senseiId: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    paymentDeadline: z.string().optional(),
    schedule: z.object({
      saturday: z.array(z.object({
        timeStart: z.string(),
        timeEnd: z.string().optional(),
        activity: z.string(),
        subdued: z.boolean().optional(),
      })).optional(),
      sunday: z.array(z.object({
        timeStart: z.string(),
        timeEnd: z.string().optional(),
        activity: z.string(),
        subdued: z.boolean().optional(),
      })).optional(),
    }).optional(),
    prices: z.array(z.object({
      title: z.string(),
      price: z.string(),
      note: z.string().optional(),
    })).optional(),
  }),
});

// News collection schema
const newsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    categoryId: z.string(),
    description: z.string(),
    date: z.string(),
    icon: z.string(),
    content: z.string(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),
  }),
});

// Media collection schema
const mediaCollection = defineCollection({
  type: 'data',
  schema: z.object({
    section: z.string(),
    title: z.string(),
    id: z.string(),
    gridCols: z.string().optional(),
    items: z.array(z.object({
      href: z.string(),
      title: z.string(),
      thumbnail: z.string().optional(),
      tags: z.array(z.string()).optional(),
      isYouTube: z.boolean().optional(),
    })),
  }),
});

// Senseis collection schema
const senseisCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    rank: z.string(),
    title: z.string(),
    image: z.string().optional(),
    bio: z.string(),
  }),
});

// Aikido sections collection schema
const aikidoSectionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    videoUrl: z.string().optional(),
    videoThumbnail: z.string().optional(),
    externalLink: z.string().optional(),
    externalLinkText: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
});

// Activities collection schema
const activitiesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    timeStart: z.string().nullable(),
    timeEnd: z.string().nullable(),
    description: z.string(),
  }),
});

// Instructors collection schema
const instructorsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    initials: z.string(),
    name: z.string(),
    rank: z.string(),
    groups: z.array(z.string()),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
});

// Prices collection schema
const pricesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    category: z.string(),
    title: z.string(),
    heading: z.string(),
    id: z.string(),
    prices: z.array(z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      amount: z.string(),
      unit: z.string(),
    })),
  }),
});

export const collections = {
  'events': eventsCollection,
  'news': newsCollection,
  'media': mediaCollection,
  'senseis': senseisCollection,
  'aikido-sections': aikidoSectionsCollection,
  'activities': activitiesCollection,
  'instructors': instructorsCollection,
  'prices': pricesCollection,
};
