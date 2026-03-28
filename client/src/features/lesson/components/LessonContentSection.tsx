import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import type { LessonSection } from "@/features/lesson/schemas/lesson.types";

interface LessonContentSectionProps {
  introduction: string;
  sections: LessonSection[];
  keyPoints: string[];
}

export function LessonContentSection({ introduction, sections, keyPoints }: LessonContentSectionProps) {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-2 border-amber-300 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-red-800">Giới thiệu</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed">
            {introduction}
          </p>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card key={index} className="bg-white border-l-4 border-red-600">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Points */}
      <Card className="bg-gradient-to-br from-yellow-400 to-orange-400 border-none">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Điểm cần ghi nhớ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-red-900 font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
