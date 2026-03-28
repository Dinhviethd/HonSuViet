import type {
  QuizPlatform,
} from "../schemas/tests.types";

export const quizPlatforms: QuizPlatform[] = [
  {
    name: "Quizizz",
    color: "from-purple-600 to-purple-700",
    description: "Trắc nghiệm tương tác với hình ảnh và âm thanh sinh động",
    features: ["Thi đua theo thời gian thực", "Huy hiệu và phần thưởng", "Bảng xếp hạng"],
    link: "https://quizizz.com/admin/quiz/search/Vietnamese%20History",
  },
  {
    name: "Kahoot",
    color: "from-pink-600 to-rose-600",
    description: "Học qua chơi với bạn bè và cả lớp qua nền tảng Kahoot",
    features: ["Chế độ nhóm", "Câu hỏi đa dạng", "Thống kê chi tiết"],
    link: "https://create.kahoot.it/discover?query=Vietnamese%20History",
  },
  {
    name: "Wordwall",
    color: "from-blue-600 to-cyan-600",
    description: "Trò chơi học tập đa dạng và sáng tạo: Đố vui, nối từ, game với chữ cái và nhiều loại khác",
    features: ["Nhiều dạng trò chơi", "Tùy chỉnh linh hoạt", "In bài tập"],
    link: "https://wordwall.net/vi/community/vietnamese-history",
  },
];

