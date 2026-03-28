import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LessonCard } from "@/features/lesson/components/LessonCard";
import type { LessonPeriod } from "../schemas/lesson.types";

interface LessonPeriodCardProps {
  period: LessonPeriod;
}

export function LessonPeriodCard({ period }: LessonPeriodCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-amber-200 shadow-lg">
      <CardHeader className={`bg-gradient-to-r ${period.color} text-white`}>
        <div className="flex items-start gap-4">
          <span className="text-5xl">{period.icon}</span>
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">
              {period.title}
            </CardTitle>
            <CardDescription className="text-white/90 text-base">
              {period.description}
            </CardDescription>
            <div className="mt-4 flex items-center gap-2">
              <Badge className="bg-white/20 text-white border-white/30">
                {period.lessons.length} bài học
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                {period.lessons.filter(l => l.completed).length} đã hoàn thành
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {period.lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
