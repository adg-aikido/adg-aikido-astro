import events from "../data/events.yaml";
import news from "../data/news.yaml";
import activities from "../data/activities.yaml";

// Transform to common format for display
const allItems = [
  ...events.events.map((e) => ({
    type: "event" as const,
    date: e.eventDate,
    title: e.name,
    ...e,
  })),
  ...news.news.map((n) => ({
    type: "news" as const,
    date: n.date,
    ...n,
  })),
  ...activities.activities.map((a) => ({
    type: "activity" as const,
    ...a,
  })),
].sort((a, b) => new Date(b.date) - new Date(a.date));

export default allItems;
