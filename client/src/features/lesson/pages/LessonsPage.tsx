import { Card, CardContent } from "@/components/ui/card";
import { LessonProgress } from "../components/LessonProgress";
import { LessonPeriodCard } from "../components/LessonPeriodCard";
import { useGetLessonPeriods } from "../hooks/useGetLessonPeriods";

export default function LessonsPage() {
  const { periods, isLoading, error } = useGetLessonPeriods();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">Đang tải danh sách bài học...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <LessonProgress lessonPeriods={periods} />

      <div className="space-y-8">
        {periods.map((period) => (
          <LessonPeriodCard key={period.id} period={period}  />
        ))}
      </div>

      {/* Achievement Section */}
      <Card className="bg-gradient-to-br from-yellow-400 to-orange-400 border-none text-red-900">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Tiếp tục học tập để nhận thưởng! 🏆</h3>
          <p className="text-red-800">
            Hoàn thành mỗi giai đoạn để mở khóa huy hiệu đặc biệt và tăng cấp độ của bạn
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
