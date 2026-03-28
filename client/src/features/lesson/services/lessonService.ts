import api from "@/lib/api";
import axios from "axios";
import type {
  ApiChapter,
  ApiLesson,
  ApiUserLessonProgress,
  ApiResponse,
  Lesson,
  LessonDetail,
  LessonPeriod,
  LessonSection,
} from "../schemas/lesson.types";

const periodThemes = [
  { color: "from-amber-600 to-orange-600", icon: "Ⅰ." },
  { color: "from-red-600 to-rose-600", icon: "Ⅱ." },
  { color: "from-yellow-600 to-amber-700", icon: "Ⅲ." },
  { color: "from-blue-600 to-indigo-600", icon: "🏛️" },
] as const;

const defaultTheme = { color: "from-emerald-600 to-teal-600", icon: "📜" };

function formatDuration(minutes?: number): string {
  if (!minutes || minutes <= 0) {
    return "Chưa rõ";
  }

  return `${minutes} phút`;
}

function normalizeLessonTitle(title: string): string {
  return title.replace(/^Bài\s*\d+\s*:\s*/i, "").trim();
}

function mapLessonToCard(lesson: ApiLesson, completedLessonIds: Set<string>): Lesson {
  return {
    id: lesson.idLesson,
    orderIndex: lesson.orderIndex ?? 0,
    title: normalizeLessonTitle(lesson.title),
    duration: formatDuration(lesson.durationMinutes),
    completed: completedLessonIds.has(lesson.idLesson),
    locked: false,
  };
}

function extractLessonContent(contentBody: ApiLesson["contentBody"]) {
  const blocks = contentBody?.blocks ?? [];
  let introduction = "Nội dung bài học đang được cập nhật.";
  const sections: LessonSection[] = [];
  let currentSection: LessonSection | null = null;
  const keyPoints: string[] = [];
  let hasCapturedIntro = false;

  for (const block of blocks) {
    if (block.type === "paragraph" && block.data?.text) {
      if (!hasCapturedIntro) {
        introduction = block.data.text;
        hasCapturedIntro = true;
        continue;
      }

      if (currentSection) {
        currentSection.content = currentSection.content
          ? `${currentSection.content} ${block.data.text}`
          : block.data.text;
      }
      continue;
    }

    if (block.type === "header" && block.data?.text) {
      const title = block.data.text;
      const level = block.data.level ?? 0;
      if (/điểm cần ghi nhớ/i.test(title)) {
        currentSection = null;
        continue;
      }

      if (level >= 4 || /^\d+[.)]/.test(title.trim())) {
        currentSection = { title, content: "" };
        sections.push(currentSection);
      }
      continue;
    }

    if (block.type === "list" && Array.isArray(block.data?.items)) {
      keyPoints.push(...block.data.items);
    }
  }

  return {
    introduction,
    sections,
    keyPoints,
  };
}

export const lessonService = {
  async getLessonPeriods(idUser?: string): Promise<LessonPeriod[]> {
    const progressRequest: Promise<{ data: ApiResponse<ApiUserLessonProgress[]> }> = idUser
      ? api.get<ApiResponse<ApiUserLessonProgress[]>>(`/lesson/progress/user/${idUser}`)
      : Promise.resolve({
          data: {
            success: true,
            data: [],
          },
        });

    const [chapterResponse, lessonResponse, progressResponse] = await Promise.all([
      api.get<ApiResponse<ApiChapter[]>>("/lesson/chapters"),
      api.get<ApiResponse<ApiLesson[]>>("/lesson/lessons"),
      progressRequest,
    ]);

    const chapters = chapterResponse.data.data ?? [];
    const lessons = lessonResponse.data.data ?? [];
    const progresses = progressResponse.data.data ?? [];
    const completedLessonIds = new Set<string>(
      progresses
        .filter((progress) => progress.status === "completed" && progress.lesson?.idLesson)
        .map((progress) => progress.lesson!.idLesson),
    );

    const lessonsByChapter = lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
      const chapterId = lesson.chapter?.idChapter;
      if (!chapterId) {
        return acc;
      }

      if (!acc[chapterId]) {
        acc[chapterId] = [];
      }

      acc[chapterId].push(mapLessonToCard(lesson, completedLessonIds));
      return acc;
    }, {});

    Object.values(lessonsByChapter).forEach((chapterLessons) => {
      chapterLessons.sort((a, b) => a.orderIndex - b.orderIndex);
    });

    return [...chapters]
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((chapter, index) => {
        const theme = periodThemes[index % periodThemes.length] ?? defaultTheme;
        return {
          id: chapter.idChapter,
          title: chapter.title,
          description: chapter.description ?? "Nội dung đang cập nhật",
          color: theme.color,
          icon: theme.icon,
          lessons: lessonsByChapter[chapter.idChapter] ?? [],
        };
      });
  },

  async getLessonDetail(id: string): Promise<LessonDetail | null> {
    const response = await api.get<ApiResponse<ApiLesson>>(`/lesson/lessons/${id}`);
    const lesson = response.data.data;

    if (!lesson) {
      return null;
    }

    return {
      id: lesson.idLesson,
      title: normalizeLessonTitle(lesson.title),
      period: lesson.timeTag ?? lesson.chapter?.title ?? "Chưa rõ giai đoạn",
      duration: formatDuration(lesson.durationMinutes),
      content: extractLessonContent(lesson.contentBody),
    };
  },

  async markLessonCompleted(idUser: string, idLesson: string): Promise<void> {
    try {
      const existingResponse = await api.get<ApiResponse<{ idProgress: string }>>(
        `/lesson/progress/user/${idUser}/lesson/${idLesson}`,
      );

      const progressId = existingResponse.data.data?.idProgress;
      if (!progressId) {
        throw new Error("Tiến độ học không hợp lệ");
      }

      await api.put(`/lesson/progress/${progressId}`, {
        status: "completed",
        completedAt: new Date().toISOString(),
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        await api.post("/lesson/progress", {
          idUser,
          idLesson,
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        return;
      }

      throw error;
    }
  },
};
