import { useEffect, useState } from "react";
import type { LessonPeriod } from "../schemas/lesson.types";
import { lessonService } from "../services/lessonService";

interface UseGetLessonPeriodsReturn {
  periods: LessonPeriod[];
  isLoading: boolean;
  error: string | null;
}

export function useGetLessonPeriods(): UseGetLessonPeriodsReturn {
  const [periods, setPeriods] = useState<LessonPeriod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);

    lessonService
      .getLessonPeriods()
      .then((data) => {
        if (isMounted) {
          setPeriods(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Lỗi khi tải danh sách bài học");
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
  }, []);

  return { periods, isLoading, error };
}
