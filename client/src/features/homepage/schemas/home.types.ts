export interface HistoricalFrame {
  id: number;
  type: "hero" | "artifact" | "architecture" | "culture";
  title: string;
  subtitle: string;
  image: string;
  description: string;
  period: string;
  color: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  period: string;
  color: string;
}