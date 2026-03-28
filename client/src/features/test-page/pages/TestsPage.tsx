import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AchievementBoard } from "../components/AchievementBoard";
import { ExternalPlatforms } from "../components/ExternalPlatforms";
import { InternalQuizList } from "../components/InternalQuizList";
import { useGetTests } from "../hooks/useGetTests";
import { quizPlatforms } from "../stores/testsData";

export default function TestsPage() {
  const { achievements, internalQuizzes, isLoading, error } = useGetTests();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Kiểm tra & Đánh giá</h1>
        <p className="text-green-100 text-lg">
          Củng cố kiến thức qua các bài kiểm tra đa dạng và thú vị
        </p>
      </div>

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <AchievementBoard achievements={achievements} />
      )}

      <ExternalPlatforms quizPlatforms={quizPlatforms} />

      {isLoading ? (
        <p className="text-center text-gray-500">Đang tải bài kiểm tra...</p>
      ) : (
        <InternalQuizList internalQuizzes={internalQuizzes} />
      )}

      {/* Tips Section */}
      <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            💡 Mẹo làm bài kiểm tra hiệu quả
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">1.</span>
              <span>Ôn tập kỹ nội dung bài học trước khi làm bài kiểm tra</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">2.</span>
              <span>Đọc kỹ đề bài và suy nghĩ cẩn thận trước khi chọn đáp án</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">3.</span>
              <span>Quản lý thời gian hợp lý cho từng câu hỏi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">4.</span>
              <span>Làm lại các bài kiểm tra để củng cố kiến thức</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
