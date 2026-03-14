export interface Lesson {
  id: string;
  orderIndex: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

export interface LessonPeriod {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  lessons: Lesson[];
}

export interface LessonSection {
  title: string;
  content: string;
}

export interface LessonContent {
  introduction: string;
  sections: LessonSection[];
  keyPoints: string[];
}

export interface LessonDetail {
  id: string;
  title: string;
  period: string;
  duration: string;
  content: LessonContent;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiChapter {
  idChapter: string;
  title: string;
  description?: string;
  orderIndex: number;
}

export interface ApiLesson {
  idLesson: string;
  title: string;
  timeTag?: string;
  durationMinutes?: number;
  contentBody?: {
    blocks?: Array<{
      type?: string;
      data?: {
        text?: string;
        level?: number;
        style?: string;
        items?: string[];
      };
    }>;
  };
  orderIndex: number;
  chapter?: ApiChapter;
}
