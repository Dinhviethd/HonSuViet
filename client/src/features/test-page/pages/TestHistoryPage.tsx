import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Clock3, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/auth/stores/authStore";
import { cn } from "@/lib/utils";
import type { ApiAttemptAnswer, ApiQuiz, ApiQuizAttempt, QuizQuestionWithAnswers } from "../schemas/tests.types";
import { testsService } from "../services/tests.service";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function toLocalDateTime(value?: string | null): string {
  if (!value) return "Không rõ thời gian";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Không rõ thời gian";
  return new Intl.DateTimeFormat("vi-VN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getAnswerMap(answersData?: ApiAttemptAnswer[]): Map<string, string | null> {
  const map = new Map<string, string | null>();
  for (const item of answersData ?? []) {
    map.set(item.idQuestion, item.idAnswer);
  }
  return map;
}

export default function TestHistoryPage() {
  const { id } = useParams();
  const user = useAuth((state) => state.user);

  const [quiz, setQuiz] = useState<ApiQuiz | null>(null);
  const [questionItems, setQuestionItems] = useState<QuizQuestionWithAnswers[]>([]);
  const [attempts, setAttempts] = useState<ApiQuizAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!id) {
      setError("Không tìm thấy mã bài kiểm tra");
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    const userId = String(user?.idUser ?? "");
    if (!UUID_REGEX.test(userId)) {
      setError("Bạn cần đăng nhập để xem lịch sử làm bài");
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    setIsLoading(true);
    setError(null);

    Promise.all([
      testsService.getQuizById(id),
      testsService.getQuizQuestionsWithAnswers(id),
      testsService.getUserAttempts(userId),
    ])
      .then(([quizData, items, userAttempts]) => {
        if (!isMounted) return;

        const quizAttempts = userAttempts
          .filter((attempt) => attempt.quiz?.idQuiz === id && attempt.status === "completed")
          .sort((a, b) => {
            const timeA = new Date(a.completedAt ?? a.startedAt ?? 0).getTime();
            const timeB = new Date(b.completedAt ?? b.startedAt ?? 0).getTime();
            return timeB - timeA;
          });

        setQuiz(quizData);
        setQuestionItems(items);
        setAttempts(quizAttempts);
      })
      .catch(() => {
        if (isMounted) {
          setError("Không thể tải lịch sử làm bài");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, user?.idUser]);

  const totalQuestions = questionItems.length;

  const questionCorrectAnswerMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of questionItems) {
      const correct = item.answers.find((answer) => answer.isCorrect);
      if (correct) {
        map.set(item.question.idQuestion, correct.idAnswer);
      }
    }
    return map;
  }, [questionItems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">Đang tải lịch sử làm bài...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <Link to="/tests">
          <Button>Quay lại danh sách bài kiểm tra</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/tests">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Lịch sử làm bài</h1>
          <p className="text-gray-500">{quiz?.title ?? "Bài kiểm tra"}</p>
        </div>
      </div>

      {attempts.length === 0 ? (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="py-8 text-center space-y-3">
            <p className="text-lg font-semibold text-orange-800">Bạn chưa có lần nộp bài nào</p>
            <p className="text-orange-700">Hãy làm bài trước để xem lịch sử và đáp án đúng.</p>
            <Link to={id ? `/tests/${id}` : "/tests"}>
              <Button className="bg-red-600 hover:bg-red-700">Bắt đầu làm bài</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        attempts.map((attempt, attemptIndex) => {
          const pickedAnswerMap = getAnswerMap(attempt.answersData);
          const fallbackCorrectCount = questionItems.reduce((acc, item) => {
            const picked = pickedAnswerMap.get(item.question.idQuestion) ?? null;
            const correct = questionCorrectAnswerMap.get(item.question.idQuestion);
            return picked && correct && picked === correct ? acc + 1 : acc;
          }, 0);
          const correctCount = attempt.correctAnswersCount ?? fallbackCorrectCount;

          return (
            <Card key={attempt.idAttempt} className="border-2 border-emerald-200">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-lg text-gray-800">
                    Lần làm #{attempts.length - attemptIndex}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {attempt.scorePercentage}%
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 border border-blue-300">
                      {correctCount}/{totalQuestions} câu đúng
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1">
                      <Clock3 className="w-3 h-3" />
                      {toLocalDateTime(attempt.completedAt ?? attempt.startedAt)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {questionItems.map((item, idx) => {
                  const pickedAnswerId = pickedAnswerMap.get(item.question.idQuestion) ?? null;
                  const correctAnswerId = questionCorrectAnswerMap.get(item.question.idQuestion);

                  return (
                    <div key={item.question.idQuestion} className="rounded-xl border border-gray-200 p-4 bg-white">
                      <p className="font-semibold text-gray-800 mb-3">
                        Câu {idx + 1}: {item.question.content}
                      </p>

                      <div className="space-y-2">
                        {item.answers.map((answer, answerIdx) => {
                          const optionLabel = String.fromCharCode(65 + answerIdx);
                          const isPicked = pickedAnswerId === answer.idAnswer;
                          const isCorrect = correctAnswerId === answer.idAnswer;

                          return (
                            <div
                              key={answer.idAnswer}
                              className={cn(
                                "p-3 rounded-lg border text-sm md:text-base",
                                isCorrect
                                  ? "border-emerald-400 bg-emerald-50"
                                  : isPicked
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-200 bg-gray-50",
                              )}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <p className="text-gray-800">
                                  <span className="font-semibold mr-2">{optionLabel}.</span>
                                  {answer.content}
                                </p>
                                <div className="shrink-0 flex items-center gap-2">
                                  {isCorrect ? (
                                    <Badge className="bg-emerald-600 text-white flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Đáp án đúng
                                    </Badge>
                                  ) : null}
                                  {isPicked ? (
                                    isCorrect ? (
                                      <Badge className="bg-blue-600 text-white">Bạn đã chọn</Badge>
                                    ) : (
                                      <Badge className="bg-red-600 text-white flex items-center gap-1">
                                        <XCircle className="w-3 h-3" />
                                        Bạn chọn (sai)
                                      </Badge>
                                    )
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {pickedAnswerId === null ? (
                        <p className="text-xs text-amber-700 mt-3 flex items-center gap-1">
                          <Circle className="w-3 h-3" />
                          Bạn đã bỏ trống câu này.
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
