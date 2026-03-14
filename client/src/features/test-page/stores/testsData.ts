import type {
  AchievementStats,
  InternalQuiz,
  QuizPlatform,
} from "../schemas/tests.types";

export const quizPlatforms: QuizPlatform[] = [
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
  },
];

export const internalQuizzes: InternalQuiz[] = [
  {
    id: 1,
    title: "Kiểm tra: Văn hóa Đông Sơn",
    topic: "Thời Tiền sử",
    questions: 15,
    duration: "20 phút",
    difficulty: "Dễ",
    score: 85,
    completed: true,
  },
  {
    id: 2,
    title: "Kiểm tra: Khởi nghĩa Hai Bà Trưng",
    topic: "Bắc thuộc",
    questions: 20,
    duration: "25 phút",
    difficulty: "Trung bình",
    score: null,
    completed: false,
  },
  {
    id: 3,
    title: "Kiểm tra: Triều đại Lý - Trần",
    topic: "Phong kiến",
    questions: 25,
    duration: "30 phút",
    difficulty: "Khó",
    score: null,
    completed: false,
  },
  {
    id: 4,
    title: "Tổng hợp: Lịch sử Việt Nam cổ đại",
    topic: "Tổng hợp",
    questions: 40,
    duration: "45 phút",
    difficulty: "Khó",
    score: null,
    completed: false,
  },
];

export const achievements: AchievementStats = {
  totalTests: 24,
  completed: 8,
  averageScore: 82,
  bestScore: 95,
  streak: 5,
};
