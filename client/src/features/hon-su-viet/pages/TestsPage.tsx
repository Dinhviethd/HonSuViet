import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trophy, Clock, Target, BarChart3, Sparkles } from "lucide-react";

const quizPlatforms = [
  {
    name: "Quizizz",
    icon: "🎯",
    color: "from-purple-600 to-purple-700",
    description: "Trắc nghiệm tương tác với hình ảnh và âm thanh sinh động",
    features: ["Thi đua theo thời gian thực", "Huy hiệu và phần thưởng", "Bảng xếp hạng"],
    link: "https://quizizz.com/admin/quiz/search/Vietnamese%20History",
  },
  {
    name: "Kahoot",
    icon: "🎮",
    color: "from-pink-600 to-rose-600",
    description: "Học qua chơi với bạn bè và cả lớp",
    features: ["Chế độ nhóm", "Câu hỏi đa dạng", "Thống kê chi tiết"],
    link: "https://create.kahoot.it/discover?query=Vietnamese%20History",
  },
  {
    name: "Wordwall",
    icon: "🧩",
    color: "from-blue-600 to-cyan-600",
    description: "Trò chơi học tập đa dạng và sáng tạo",
    features: ["Nhiều dạng trò chơi", "Tùy chỉnh linh hoạt", "In bài tập"],
    link: "https://wordwall.net/vi/community/vietnamese-history",
  }
];

const internalQuizzes = [
  {
    id: 1,
    title: "Kiểm tra: Văn hóa Đông Sơn",
    topic: "Thời Tiền sử",
    questions: 15,
    duration: "20 phút",
    difficulty: "Dễ",
    score: 85,
    completed: true
  },
  {
    id: 2,
    title: "Kiểm tra: Khởi nghĩa Hai Bà Trưng",
    topic: "Bắc thuộc",
    questions: 20,
    duration: "25 phút",
    difficulty: "Trung bình",
    score: null,
    completed: false
  },
  {
    id: 3,
    title: "Kiểm tra: Triều đại Lý - Trần",
    topic: "Phong kiến",
    questions: 25,
    duration: "30 phút",
    difficulty: "Khó",
    score: null,
    completed: false
  },
  {
    id: 4,
    title: "Tổng hợp: Lịch sử Việt Nam cổ đại",
    topic: "Tổng hợp",
    questions: 40,
    duration: "45 phút",
    difficulty: "Khó",
    score: null,
    completed: false
  }
];

const achievements = {
  totalTests: 24,
  completed: 8,
  averageScore: 82,
  bestScore: 95,
  streak: 5
};

export default function TestsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Kiểm tra & Đánh giá</h1>
        <p className="text-green-100 text-lg">
          Củng cố kiến thức qua các bài kiểm tra đa dạng và thú vị
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">{achievements.completed}</p>
            <p className="text-sm text-blue-100">Đã hoàn thành</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">{achievements.averageScore}%</p>
            <p className="text-sm text-green-100">Điểm trung bình</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-none">
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">{achievements.bestScore}%</p>
            <p className="text-sm text-yellow-100">Điểm cao nhất</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
          <CardContent className="p-6 text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">{achievements.streak}</p>
            <p className="text-sm text-purple-100">Ngày liên tiếp</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-none">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <p className="text-3xl font-bold">{achievements.totalTests}</p>
            <p className="text-sm text-pink-100">Tổng bài kiểm tra</p>
          </CardContent>
        </Card>
      </div>

      {/* External Quiz Platforms */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ExternalLink className="w-6 h-6 text-red-600" />
          Nền tảng học tập tương tác
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quizPlatforms.map((platform) => (
            <Card key={platform.name} className="border-2 border-amber-200 hover:shadow-xl transition-all overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${platform.color}`} />
              <CardHeader>
                <div className="text-5xl mb-3">{platform.icon}</div>
                <CardTitle className="text-2xl text-gray-800">{platform.name}</CardTitle>
                <CardDescription className="text-base">{platform.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {platform.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href={platform.link} target="_blank" rel="noopener noreferrer">
                  <Button className={`w-full bg-gradient-to-r ${platform.color} hover:opacity-90`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Truy cập {platform.name}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Internal Quizzes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-red-600" />
          Bài kiểm tra nội bộ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internalQuizzes.map((quiz) => (
            <Card key={quiz.id} className={`border-2 ${quiz.completed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-white'} hover:shadow-lg transition-all`}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-red-600 text-white">
                    {quiz.topic}
                  </Badge>
                  {quiz.completed && (
                    <Badge className="bg-green-600 text-white">
                      ✓ Đã hoàn thành
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-gray-800">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="text-gray-600">Câu hỏi</p>
                    <p className="font-bold text-blue-700">{quiz.questions}</p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <p className="text-gray-600">Thời gian</p>
                    <p className="font-bold text-purple-700">{quiz.duration}</p>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <p className="text-gray-600">Độ khó</p>
                    <p className="font-bold text-orange-700">{quiz.difficulty}</p>
                  </div>
                </div>

                {quiz.completed && quiz.score !== null ? (
                  <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                    <p className="text-sm text-green-700 mb-1">Điểm số của bạn</p>
                    <p className="text-3xl font-bold text-green-700">{quiz.score}%</p>
                  </div>
                ) : null}

                <Button 
                  className={`w-full ${quiz.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {quiz.completed ? '🔄 Làm lại' : '▶️ Bắt đầu kiểm tra'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

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
