import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, CheckCircle2, Lock, Play } from "lucide-react";
import { Link } from "react-router-dom";

const lessonPeriods = [
  {
    id: "prehistory",
    title: "Thời Tiền sử và Văn hóa Đông Sơn",
    description: "Từ thời kỳ đồ đá đến nền văn minh đồng trống",
    color: "from-amber-600 to-orange-600",
    icon: "🏺",
    lessons: [
      { id: 1, title: "Thời kỳ đồ đá cũ và đồ đá mới", duration: "45 phút", completed: true, locked: false },
      { id: 2, title: "Văn hóa Đông Sơn và trống đồng", duration: "50 phút", completed: true, locked: false },
      { id: 3, title: "Nhà nước Văn Lang - Âu Lạc", duration: "40 phút", completed: false, locked: false },
      { id: 4, title: "Hùng Vương dựng nước", duration: "45 phút", completed: false, locked: false },
    ]
  },
  {
    id: "chinese-rule",
    title: "Bắc thuộc và Đấu tranh giành độc lập",
    description: "Hơn 1000 năm đấu tranh chống ngoại xâm",
    color: "from-red-600 to-rose-600",
    icon: "⚔️",
    lessons: [
      { id: 5, title: "Thời kỳ Bắc thuộc lần thứ nhất", duration: "45 phút", completed: false, locked: false },
      { id: 6, title: "Khởi nghĩa Hai Bà Trưng", duration: "40 phút", completed: false, locked: false },
      { id: 7, title: "Lý Bí và nhà nước Vạn Xuân", duration: "35 phút", completed: false, locked: true },
      { id: 8, title: "Ngô Quyền đánh Bạch Đằng 938", duration: "50 phút", completed: false, locked: true },
    ]
  },
  {
    id: "feudal",
    title: "Các triều đại phong kiến độc lập",
    description: "Lý - Trần - Lê - Nguyễn",
    color: "from-yellow-600 to-amber-700",
    icon: "👑",
    lessons: [
      { id: 9, title: "Nhà nước Đại Việt thời Lý", duration: "60 phút", completed: false, locked: true },
      { id: 10, title: "Trần Hưng Đạo và chiến thắng Nguyên Mông", duration: "55 phút", completed: false, locked: true },
      { id: 11, title: "Lê Lợi khởi nghĩa Lam Sơn", duration: "50 phút", completed: false, locked: true },
      { id: 12, title: "Triều Nguyễn - vương triều cuối cùng", duration: "45 phút", completed: false, locked: true },
    ]
  },
  {
    id: "modern",
    title: "Lịch sử cận đại và hiện đại",
    description: "Từ thực dân đến độc lập và thống nhất",
    color: "from-blue-600 to-indigo-600",
    icon: "🏛️",
    lessons: [
      { id: 13, title: "Pháp xâm lược và phong trào yêu nước", duration: "50 phút", completed: false, locked: true },
      { id: 14, title: "Chủ tịch Hồ Chí Minh và Cách mạng tháng Tám", duration: "60 phút", completed: false, locked: true },
      { id: 15, title: "Kháng chiến chống Pháp", duration: "55 phút", completed: false, locked: true },
      { id: 16, title: "Chiến tranh Việt Nam và thống nhất đất nước", duration: "65 phút", completed: false, locked: true },
    ]
  }
];

export default function LessonsPage() {
  const totalLessons = lessonPeriods.reduce((sum, period) => sum + period.lessons.length, 0);
  const completedLessons = lessonPeriods.reduce(
    (sum, period) => sum + period.lessons.filter(l => l.completed).length, 
    0
  );
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
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

      {/* Lesson Periods */}
      <div className="space-y-8">
        {lessonPeriods.map((period, periodIndex) => (
          <Card key={period.id} className="overflow-hidden border-2 border-amber-200 shadow-lg">
            <CardHeader className={`bg-gradient-to-r ${period.color} text-white`}>
              <div className="flex items-start gap-4">
                <span className="text-5xl">{period.icon}</span>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    Giai đoạn {periodIndex + 1}: {period.title}
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
                  <div
                    key={lesson.id}
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
                          Bài {lesson.id}: {lesson.title}
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
                          <Link to={`/hon-su-viet/lessons/${lesson.id}`}>
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
                ))}
              </div>
            </CardContent>
          </Card>
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
