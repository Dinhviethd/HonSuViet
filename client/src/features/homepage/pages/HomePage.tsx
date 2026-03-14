import { lazy, Suspense } from "react";
import { BackgroundEffect } from "../components/BackgroundEffect";
import { HeroSection } from "../components/HeroSection";
import { HistoricalCarousel } from "../components/HistoricalCarousel";
import type { HistoricalFrame, NewsItem, TimelineEvent } from "../schemas/home.types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lazy load below-fold components — they won't be in the initial bundle
const NewsTicker = lazy(() =>
  import("../components/NewsTicker").then((m) => ({ default: m.NewsTicker }))
);
const TimelineSection = lazy(() =>
  import("../components/TimelineSection").then((m) => ({ default: m.TimelineSection }))
);
const QuickAccess = lazy(() =>
  import("../components/QuickAccess").then((m) => ({ default: m.QuickAccess }))
);

function SectionSkeleton() {
  return <div className="h-48 rounded-2xl bg-amber-100/50 animate-pulse" />;
}

const historicalFrames: HistoricalFrame[] = [
  {
    id: 1,
    type: "hero",
    title: "Hai Bà Trưng",
    subtitle: "Khởi nghĩa 40 TCN",
    image: "https://images.unsplash.com/photo-1759134461880-c951a672f3b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwaGlzdG9yaWNhbCUyMGhlcm8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzA1NDYxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Hai nữ tướng quân dũng cảm lãnh đạo cuộc khởi nghĩa chống Bắc thuộc, trở thành biểu tượng của tinh thần yêu nước và bất khuất.",
    period: "Thời Bắc thuộc",
    color: "from-red-600 to-orange-600",
  },
  {
    id: 2,
    type: "artifact",
    title: "Trống Đồng Đông Sơn",
    subtitle: "2500 năm trước",
    image: "https://images.unsplash.com/photo-1761150285529-4ddd7b40bd7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwYW5jaWVudCUyMGFydGlmYWN0JTIwYnJvbnplJTIwZHJ1bXxlbnwxfHx8fDE3NzA1NDYxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Di vật văn hóa quý giá với những họa tiết tinh xảo, phản ánh nền văn minh phát triển của người Việt cổ đại.",
    period: "Văn hóa Đông Sơn",
    color: "from-amber-600 to-yellow-600",
  },
  {
    id: 3,
    type: "architecture",
    title: "Chùa Thiên Mụ",
    subtitle: "Tháp 7 tầng",
    image: "https://images.unsplash.com/photo-1770149682562-488b758a84f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwYW5jaWVudCUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzA1NDYxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Ngôi chùa cổ kính nhất Huế, tháp Phước Duyên cao 21m với kiến trúc độc đáo, biểu tượng của cố đô.",
    period: "Triều Nguyễn",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 4,
    type: "hero",
    title: "Vua Lê Lợi",
    subtitle: "Khởi nghĩa Lam Sơn",
    image: "https://images.unsplash.com/photo-1764000667049-2199a9c904f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwd2FycmlvciUyMHN0YXR1ZXxlbnwxfHx8fDE3NzA1NDYxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Vị anh hùng dân tộc lãnh đạo cuộc khởi nghĩa Lam Sơn, đánh đuổi quân Minh, lập nên triều đại Lê.",
    period: "Thế kỷ 15",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 5,
    type: "artifact",
    title: "Di sản Hoàng Thành",
    subtitle: "Thăng Long - Hà Nội",
    image: "https://images.unsplash.com/photo-1770149683049-272c9d19bfaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMGFydGlmYWN0fGVufDF8fHx8MTc3MDU0NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Quần thể di tích lịch sử đặc biệt, chứng nhận Hà Nội là trung tâm chính trị liên tục trong hơn 1000 năm.",
    period: "Di sản UNESCO",
    color: "from-green-600 to-emerald-600",
  },
  {
    id: 6,
    type: "culture",
    title: "Nghệ thuật Rồng Việt",
    subtitle: "Biểu tượng dân tộc",
    image: "https://images.unsplash.com/photo-1652960414167-c41891b176e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwdHJhZGl0aW9uYWwlMjBkcmFnb24lMjBhcnR8ZW58MXx8fHwxNzcwNTQ2MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Hình ảnh rồng xuất hiện trong nghệ thuật Việt từ hàng nghìn năm, tượng trưng cho sức mạnh và quyền uy.",
    period: "Văn hóa truyền thống",
    color: "from-red-700 to-yellow-600",
  },
];

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Khai mạc triển lãm 'Văn hóa Đông Sơn - Nền tảng văn minh Việt'",
    date: "05/02/2026",
    category: "Sự kiện",
    image: "https://images.unsplash.com/photo-1761150285529-4ddd7b40bd7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwYW5jaWVudCUyMGFydGlmYWN0JTIwYnJvbnplJTIwZHJ1bXxlbnwxfHx8fDE3NzA1NDYxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    title: "Phát hiện di tích thời Lý - Trần tại Thăng Long",
    date: "03/02/2026",
    category: "Khảo cổ",
    image: "https://images.unsplash.com/photo-1770149683049-272c9d19bfaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMGFydGlmYWN0fGVufDF8fHx8MTc3MDU0NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    title: "Kỷ niệm 76 năm Ngày toàn quốc kháng chiến",
    date: "19/12/2025",
    category: "Lịch sử",
    image: "https://images.unsplash.com/photo-1764000667049-2199a9c904f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwd2FycmlvciUyMHN0YXR1ZXxlbnwxfHx8fDE3NzA1NDYxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    title: "Ra mắt bộ sách 'Lịch sử Việt Nam qua tranh ảnh'",
    date: "15/01/2026",
    category: "Xuất bản",
    image: "https://images.unsplash.com/photo-1770149682562-488b758a84f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwYW5jaWVudCUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzA1NDYxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const historicalTimeline: TimelineEvent[] = [
  {
    year: "2879 TCN",
    title: "Vua Hùng dựng nước",
    description: "Khởi nguồn lịch sử dân tộc Việt Nam",
    period: "Thời Hồng Bàng",
    color: "from-orange-600 to-red-600",
  },
  {
    year: "257 TCN",
    title: "Thục Phán lập nước Âu Lạc",
    description: "Xây thành Cổ Loa, hình thành nhà nước đầu tiên",
    period: "Thời Thục",
    color: "from-yellow-600 to-orange-600",
  },
  {
    year: "111 TCN",
    title: "Bắc thuộc lần thứ nhất",
    description: "Bắt đầu 1000 năm Bắc thuộc và đấu tranh giành độc lập",
    period: "Bắc thuộc",
    color: "from-gray-600 to-gray-700",
  },
  {
    year: "40 - 43",
    title: "Khởi nghĩa Hai Bà Trưng",
    description: "Cuộc khởi nghĩa anh dũng chống ách thống trị phương Bắc",
    period: "Đấu tranh",
    color: "from-pink-600 to-red-600",
  },
  {
    year: "938",
    title: "Ngô Quyền đánh thắng sông Bạch Đằng",
    description: "Kết thúc nghìn năm Bắc thuộc, mở ra thời kỳ độc lập",
    period: "Độc lập",
    color: "from-blue-600 to-cyan-600",
  },
  {
    year: "1010",
    title: "Lý Thái Tổ dời đô về Thăng Long",
    description: "Khởi đầu thời kỳ phồn vinh của triều đại Lý",
    period: "Thời Lý",
    color: "from-purple-600 to-pink-600",
  },
  {
    year: "1225",
    title: "Trần Thủ Độ lập triều Trần",
    description: "Thời kỳ vàng son chống giặc ngoại xâm",
    period: "Thời Trần",
    color: "from-amber-600 to-yellow-600",
  },
  {
    year: "1428",
    title: "Lê Lợi lập triều Lê",
    description: "Khởi nghĩa Lam Sơn thành công, đuổi quân Minh",
    period: "Thời Lê",
    color: "from-green-600 to-emerald-600",
  },
  {
    year: "1802",
    title: "Nguyễn Ánh thống nhất đất nước",
    description: "Lập triều Nguyễn, đặt tên nước là Việt Nam",
    period: "Triều Nguyễn",
    color: "from-indigo-600 to-purple-600",
  },
  {
    year: "1945",
    title: "Tuyên ngôn Độc lập",
    description: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập",
    period: "Hiện đại",
    color: "from-red-600 to-yellow-500",
  },
];

export function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundEffect />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <HeroSection />
        <HistoricalCarousel frames={historicalFrames} />
        <Suspense fallback={<SectionSkeleton />}>
          <NewsTicker items={newsItems} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TimelineSection events={historicalTimeline} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <QuickAccess />
        </Suspense>
      </div>
    </div>
  );
}