import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, CircleCheckBig, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuizAttempt } from "../hooks/useQuizAttempt";

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
};

export default function TestAttemptPage() {
  const { id } = useParams();
  const {
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
  } = useQuizAttempt(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">Đang tải đề thi...</p>
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <Link to="/tests">
          <Button>Quay lại danh sách bài kiểm tra</Button>
        </Link>
      </div>
    );
  }

  if (!quiz || !currentItem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p className="text-gray-600 text-lg">Bài kiểm tra chưa có câu hỏi.</p>
        <Link to="/tests">
          <Button>Quay lại</Button>
        </Link>
      </div>
    );
  }

  const question = currentItem.question;
  const picked = selectedAnswers[question.idQuestion];
  const totalQuestions = questionItems.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/tests">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{quiz.title}</h1>
            <p className="text-gray-500">Hoàn thành toàn bộ câu hỏi và nộp bài để xem điểm.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-orange-100 text-orange-800 border border-orange-300">
            {DIFFICULTY_LABEL[quiz.difficulty] ?? "Trung bình"}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1">
            <Timer className="w-3 h-3" />
            {quiz.timeLimitMinutes} phút
          </Badge>
        </div>
      </div>

      {isSubmitted ? (
        <Card className="border-2 border-emerald-300 bg-emerald-50">
          <CardHeader>
            <CardTitle className="text-emerald-800 flex items-center gap-2">
              <CircleCheckBig className="w-5 h-5" />
              Bạn đã hoàn thành bài kiểm tra
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-700">
              Số câu đúng: <span className="font-bold">{correctCount}/{totalQuestions}</span>
            </p>
            <p className="text-gray-700">
              Điểm số: <span className="font-bold text-emerald-700">{scorePercentage}%</span>
            </p>
            <Link to="/tests">
              <Button className="mt-3 bg-emerald-600 hover:bg-emerald-700">Quay lại trang kiểm tra</Button>
            </Link>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid md:grid-cols-[1fr_280px] gap-6">
        <Card className="border-2 border-red-100">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              Câu {currentIndex + 1}: {question.content}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentItem.answers.map((answer, idx) => {
              const option = String.fromCharCode(65 + idx);
              const selected = picked === answer.idAnswer;
              return (
                <button
                  key={answer.idAnswer}
                  type="button"
                  onClick={() => selectAnswer(question.idQuestion, answer.idAnswer)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    selected
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300 hover:bg-red-50/40"
                  }`}
                >
                  <span className="font-semibold mr-2">{option}.</span>
                  {answer.content}
                </button>
              );
            })}

            <div className="pt-4 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Câu trước
              </Button>

              {currentIndex < totalQuestions - 1 ? (
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => setCurrentIndex(Math.min(totalQuestions - 1, currentIndex + 1))}
                >
                  Câu tiếp
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={answeredCount < totalQuestions || isSubmitting}
                  onClick={submit}
                >
                  {isSubmitting ? "Đang nộp bài..." : "Nộp bài"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit border-2 border-orange-100">
          <CardHeader>
            <CardTitle className="text-lg">Tiến độ làm bài</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Đã chọn đáp án: <span className="font-semibold">{answeredCount}/{totalQuestions}</span>
            </p>
            <div className="grid grid-cols-5 gap-2">
              {questionItems.map((item, idx) => {
                const qid = item.question.idQuestion;
                const answered = Boolean(selectedAnswers[qid]);
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={qid}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-md text-sm font-semibold border ${
                      isCurrent
                        ? "border-red-600 bg-red-600 text-white"
                        : answered
                          ? "border-emerald-500 bg-emerald-100 text-emerald-800"
                          : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500">
              Bạn cần trả lời hết câu hỏi để mở nút nộp bài.
            </p>
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
