import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Lock, BookOpen, Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { Lesson } from "@/features/lesson/schemas/lesson.types";

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all ${
        lesson.locked
          ? "border-gray-300 bg-gray-50 opacity-60"
          : lesson.completed
          ? "border-green-300 bg-green-50 hover:shadow-md"
          : "border-amber-300 bg-white hover:shadow-md hover:border-yellow-400"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${lesson.locked ? "text-gray-400" : lesson.completed ? "text-green-600" : "text-red-600"}`}>
          {lesson.locked ? (
            <Lock className="w-5 h-5" />
          ) : lesson.completed ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <BookOpen className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1">
          <h4 className={`font-semibold mb-2 ${lesson.locked ? "text-gray-500" : "text-gray-800"}`}>
            Bài {lesson.orderIndex}: {lesson.title}
          </h4>

          <div className="flex items-center gap-4 text-sm mb-3">
            <span className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              {lesson.duration}
            </span>
            {lesson.completed && (
              <Badge className="bg-green-600 text-white">
                Đã hoàn thành
              </Badge>
            )}
            {lesson.locked && (
              <Badge variant="secondary" className="bg-gray-300 text-gray-700">
                Chưa mở khóa
              </Badge>
            )}
          </div>

          {!lesson.locked && (
            <Link to={`/lessons/${lesson.id}`}>
              <Button
                size="sm"
                className={lesson.completed ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
              >
                <Play className="w-4 h-4 mr-2" />
                {lesson.completed ? "Ôn tập lại" : "Bắt đầu học"}
              </Button>
            </Link>
          )}
          {lesson.locked && (
            <Button size="sm" disabled variant="secondary">
              <Lock className="w-4 h-4 mr-2" />
              Hoàn thành bài trước
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
