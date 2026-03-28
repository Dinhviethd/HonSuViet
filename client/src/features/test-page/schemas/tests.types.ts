export interface QuizPlatform {
  name: string;
  color: string;
  description: string;
  features: string[];
  link: string;
}

export interface InternalQuiz {
  id: string;
  title: string;
  topic: string;
  questions: number;
  duration: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  score: number | null;
  completed: boolean;
}

export interface ApiQuizWithStats {
  idQuiz: string;
  title: string;
  topicTag?: string;
  difficulty: string;
  timeLimitMinutes: number;
  questionCount: number;
}

export interface ApiQuiz {
  idQuiz: string;
  title: string;
  topicTag?: string;
  difficulty: string;
  timeLimitMinutes: number;
}

export interface ApiQuestion {
  idQuestion: string;
  content: string;
  explanation?: string;
}

export interface ApiAnswer {
  idAnswer: string;
  content: string;
  isCorrect: boolean;
}

export interface QuizQuestionWithAnswers {
  question: ApiQuestion;
  answers: ApiAnswer[];
}

export interface ApiAttemptAnswer {
  idQuestion: string;
  idAnswer: string | null;
}

export interface ApiQuizAttempt {
  idAttempt: string;
  quiz: {
    idQuiz: string;
    title?: string;
  };
  answersData?: ApiAttemptAnswer[];
  scorePercentage: number;
  correctAnswersCount?: number;
  status: string;
  startedAt?: string;
  completedAt?: string | null;
}

export interface ApiUserQuizStats {
  distinctCompletedQuizzes: number;
  averageScore: number;
  highestScore: number;
}

export interface AchievementStats {
  totalTests: number;
  completed: number;
  averageScore: number;
  bestScore: number;
  streak: number;
}