import { useEffect, useState } from "react";
import type { LessonDetail } from "../schemas/lesson.types";
import { lessonService } from "../services/lessonService";

interface UseGetLessonDetailReturn {
  lesson: LessonDetail | null;
  isLoading: boolean;
  error: string | null;
}

export function useGetLessonDetail(id: string | undefined): UseGetLessonDetailReturn {
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!id) {
      if (isMounted) {
        setLesson(null);
        setIsLoading(false);
        setError("Không có mã bài học");
      }
      return () => {
        isMounted = false;
      };
    }

    setIsLoading(true);
    setLesson(null);
    setError(null);

    lessonService
      .getLessonDetail(id)
      .then((data) => {
        if (isMounted) {
          setLesson(data);
          if (!data) {
            setError("Không tìm thấy bài học");
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Lỗi khi tải bài học");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { lesson, isLoading, error };
}
