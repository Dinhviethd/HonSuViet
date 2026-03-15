import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/features/auth/stores/authStore";
import type { ApiQuiz, QuizQuestionWithAnswers } from "../schemas/tests.types";
import { testsService } from "../services/tests.service";

interface UseQuizAttemptReturn {
  quiz: ApiQuiz | null;
  questionItems: QuizQuestionWithAnswers[];
  currentIndex: number;
  selectedAnswers: Record<string, string>;
  isLoading: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  scorePercentage: number;
  correctCount: number;
  error: string | null;
  currentItem: QuizQuestionWithAnswers | null;
  selectAnswer: (questionId: string, answerId: string) => void;
  setCurrentIndex: (index: number) => void;
  submit: () => Promise<void>;
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function useQuizAttempt(quizId: string | undefined): UseQuizAttemptReturn {
  const user = useAuth((state) => state.user);

  const [quiz, setQuiz] = useState<ApiQuiz | null>(null);
  const [questionItems, setQuestionItems] = useState<QuizQuestionWithAnswers[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!quizId) {
      setError("Không tìm thấy mã bài kiểm tra");
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    setIsLoading(true);
    setError(null);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScorePercentage(0);
    setCorrectCount(0);

    Promise.all([
      testsService.getQuizById(quizId),
      testsService.getQuizQuestionsWithAnswers(quizId),
    ])
      .then(([quizData, items]) => {
        if (!isMounted) return;
        setQuiz(quizData);
        setQuestionItems(items);
      })
      .catch(() => {
        if (isMounted) {
          setError("Lỗi khi tải bài kiểm tra");
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
  }, [quizId]);

  const currentItem = useMemo(
    () => (questionItems.length > 0 ? questionItems[currentIndex] : null),
    [questionItems, currentIndex],
  );

  const selectAnswer = (questionId: string, answerId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const submit = async () => {
    if (!quizId || questionItems.length === 0) return;

    setIsSubmitting(true);
    setError(null);

    try {
      let totalCorrect = 0;

      for (const item of questionItems) {
        const pickedAnswerId = selectedAnswers[item.question.idQuestion];
        const correct = item.answers.find((answer) => answer.isCorrect);
        if (pickedAnswerId && correct && pickedAnswerId === correct.idAnswer) {
          totalCorrect += 1;
        }
      }

      const percentage = Math.round((totalCorrect / questionItems.length) * 100);
      setCorrectCount(totalCorrect);
      setScorePercentage(percentage);
      setIsSubmitted(true);

      const userId = String(user?.idUser ?? "");
      if (UUID_REGEX.test(userId)) {
        await testsService.submitAttempt({
          idUser: userId,
          idQuiz: quizId,
          answersData: questionItems.map((item) => ({
            idQuestion: item.question.idQuestion,
            idAnswer: selectedAnswers[item.question.idQuestion] ?? null,
          })),
          scorePercentage: percentage,
          correctAnswersCount: totalCorrect,
        });
      }
    } catch {
      setError("Không thể nộp bài kiểm tra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    quiz,
    questionItems,
    currentIndex,
    selectedAnswers,
    isLoading,
    isSubmitting,
    isSubmitted,
    scorePercentage,
    correctCount,
    error,
    currentItem,
    selectAnswer,
    setCurrentIndex,
    submit,
  };
}
