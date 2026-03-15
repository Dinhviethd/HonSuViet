import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/stores/authStore";
import type { AchievementStats, InternalQuiz } from "../schemas/tests.types";
import { testsService } from "../services/tests.service";

const DIFFICULTY_MAP: Record<string, InternalQuiz["difficulty"]> = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
};

const EMPTY_ACHIEVEMENTS: AchievementStats = {
  totalTests: 0,
  completed: 0,
  averageScore: 0,
  bestScore: 0,
  streak: 0,
};

interface UseGetTestsReturn {
  achievements: AchievementStats;
  internalQuizzes: InternalQuiz[];
  isLoading: boolean;
  error: string | null;
}

export function useGetTests(): UseGetTestsReturn {
  const user = useAuth((state) => state.user);
  const [achievements, setAchievements] = useState<AchievementStats>(EMPTY_ACHIEVEMENTS);
  const [internalQuizzes, setInternalQuizzes] = useState<InternalQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const userId = user?.idUser ? String(user.idUser) : null;

    Promise.all([
      testsService.getQuizzesWithStats(),
      testsService.getTotalQuizzes(),
      userId ? testsService.getUserAttempts(userId) : Promise.resolve([]),
      userId ? testsService.getUserQuizStats(userId) : Promise.resolve(null),
    ])
      .then(([quizzes, totalTests, attempts, stats]) => {
        if (!isMounted) return;

        // Group completed attempts by quiz id for score/completion lookup
        const completedByQuiz = new Map<string, number[]>();
        for (const a of attempts) {
          if (a.status === "completed") {
            const key = a.quiz?.idQuiz ?? "";
            if (!completedByQuiz.has(key)) completedByQuiz.set(key, []);
            completedByQuiz.get(key)!.push(a.scorePercentage);
          }
        }

        const mapped: InternalQuiz[] = quizzes.map((q) => {
          const scores = completedByQuiz.get(q.idQuiz) ?? [];
          const completed = scores.length > 0;
          return {
            id: q.idQuiz,
            title: q.title,
            topic: q.topicTag ?? "Chung",
            questions: q.questionCount,
            duration: `${q.timeLimitMinutes} phút`,
            difficulty: DIFFICULTY_MAP[q.difficulty] ?? "Trung bình",
            score: completed ? Math.max(...scores) : null,
            completed,
          };
        });

        setInternalQuizzes(mapped);
        setAchievements({
          totalTests,
          completed: stats?.distinctCompletedQuizzes ?? 0,
          averageScore: stats?.averageScore ?? 0,
          bestScore: stats?.highestScore ?? 0,
          streak: 0,
        });
      })
      .catch(() => {
        if (isMounted) setError("Lỗi khi tải dữ liệu bài kiểm tra");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user?.idUser]);

  return { achievements, internalQuizzes, isLoading, error };
}
