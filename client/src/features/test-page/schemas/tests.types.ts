export interface QuizPlatform {
  name: string;
  icon: string;
  color: string;
  description: string;
  features: string[];
  link: string;
}

export interface InternalQuiz {
  id: number;
  title: string;
  topic: string;
  questions: number;
  duration: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  score: number | null;
  completed: boolean;
}

export interface AchievementStats {
  totalTests: number;
  completed: number;
  averageScore: number;
  bestScore: number;
  streak: number;
}