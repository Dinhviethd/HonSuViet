import { Progress } from "@/components/ui/progress";
import type { LessonPeriod } from "@/features/lesson/schemas/lesson.types";

interface LessonProgressProps {
  lessonPeriods: LessonPeriod[];
}

export function LessonProgress({ lessonPeriods }: LessonProgressProps) {
  const totalLessons = lessonPeriods.reduce((sum, period) => sum + period.lessons.length, 0);
  const completedLessons = lessonPeriods.reduce(
    (sum, period) => sum + period.lessons.filter(l => l.completed).length,
    0
  );
  const progressPercentage = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  return (
    <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-2xl p-8 text-white shadow-xl">
      <h1 className="text-4xl font-bold mb-4">Bài học Lịch sử Việt Nam</h1>
      <p className="text-red-100 text-lg mb-6">
        Khám phá hành trình 4000 năm lịch sử dựng nước và giữ nước của dân tộc Việt Nam
      </p>

      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold">Tiến độ học tập của bạn</span>
          <span className="font-bold text-xl">{completedLessons}/{totalLessons} bài</span>
        </div>
        <Progress value={progressPercentage} className="h-3 bg-red-900/50" />
        <p className="text-sm text-red-100 mt-2">{progressPercentage}% hoàn thành</p>
      </div>
    </div>
  );
}
