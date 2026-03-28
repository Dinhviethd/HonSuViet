import { lazy, Suspense } from "react";
import { BackgroundEffect } from "../components/BackgroundEffect";
import { HeroSection } from "../components/HeroSection";
import { HistoricalCarousel } from "../components/HistoricalCarousel";
import type { HistoricalFrame, NewsItem } from "../schemas/home.types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lazy load below-fold components — they won't be in the initial bundle
const NewsTicker = lazy(() =>
  import("../components/NewsTicker").then((m) => ({ default: m.NewsTicker }))
);
// const TimelineSection = lazy(() =>
//   import("../components/TimelineSection").then((m) => ({ default: m.TimelineSection }))
// );
const QuickAccess = lazy(() =>
  import("../components/QuickAccess").then((m) => ({ default: m.QuickAccess }))
);

function SectionSkeleton() {
  return <div className="h-48 rounded-2xl bg-amber-100/50 animate-pulse" />;
}

const historicalFrames: HistoricalFrame[] = [
  {
    id: 1,
    type: "culture",
    title: "Dấu ấn người Việt cổ",
    subtitle: "40 - 30 vạn năm trước",
    image: "/img/Carousel Main Page/Picture1.jpg",
    description: "Dấu ấn đầu tiên của con người trên đất Việt tại Núi Đọ (Thanh Hóa), Sơn Vi (Phú Thọ)...",
    period: "Thời nguyên thủy",
    color: "from-amber-700 to-orange-900",
  },
  {
    id: 2,
    type: "architecture",
    title: "Văn Lang - Âu Lạc",
    subtitle: "Thế kỉ VII - II TCN",
    image: "/img/Carousel Main Page/Picture2.jpg",
    description: "Thành Cổ Loa, kinh đô Âu Lạc của An Dương Vương – di tích thực tế còn tồn tại đến nay.",
    period: "Thời kỳ Hùng Vương",
    color: "from-green-600 to-emerald-800",
  },
  {
    id: 3,
    type: "artifact",
    title: "Bắc thuộc lần thứ nhất",
    subtitle: "Năm 111 TCN",
    image: "/img/Carousel Main Page/Picture3.jpg",
    description: "Triệu Đà thôn tính Âu Lạc, mở ra thời kỳ Bắc thuộc kéo dài hơn 1000 năm. Bản đồ Nam Việt năm 200 TCN.",
    period: "Thời Bắc thuộc",
    color: "from-red-800 to-orange-700",
  },
  {
    id: 4,
    type: "hero",
    title: "Chiến thắng Bạch Đằng",
    subtitle: "Năm 938",
    image: "/img/Carousel Main Page/Picture4.jpg",
    description: "Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng, chấm dứt hơn 1000 năm ách đô hộ.",
    period: "Nhà Ngô",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 5,
    type: "hero",
    title: "Đinh Bộ Lĩnh",
    subtitle: "Năm 968",
    image: "/img/Carousel Main Page/Picture5.jpg",
    description: "Dẹp loạn 12 sứ quân, thống nhất đất nước, đặt quốc hiệu là Đại Cồ Việt, đóng đô ở Hoa Lư.",
    period: "Nhà Đinh",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 6,
    type: "hero",
    title: "Lê Hoàn lên ngôi",
    subtitle: "Năm 980",
    image: "/img/Carousel Main Page/Picture6.jpg",
    description: "Lê Đại Hành (Lê Hoàn) lên ngôi vua với sự ủng hộ của Dương Vân Nga, đánh bại quân xâm lược Tống.",
    period: "Nhà Tiền Lê",
    color: "from-red-600 to-red-800",
  },
  {
    id: 7,
    type: "hero",
    title: "Lý Thái Tổ lên ngôi",
    subtitle: "Năm 1009",
    image: "/img/Carousel Main Page/Picture7.jpg",
    description: "Lý Công Uẩn lên ngôi, lấy hiệu là Lý Thái Tổ, mở ra một vương triều phát triển rực rỡ.",
    period: "Nhà Lý",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: 8,
    type: "culture",
    title: "Dời đô về Thăng Long",
    subtitle: "Năm 1010",
    image: "/img/Carousel Main Page/Picture8.jpg",
    description: "Lý Thái Tổ ban Chiếu dời đô, chuyển kinh đô từ Hoa Lư về Thăng Long (Hà Nội ngày nay).",
    period: "Nhà Lý",
    color: "from-indigo-500 to-blue-700",
  },
  {
    id: 9,
    type: "culture",
    title: "Nhà Trần thành lập",
    subtitle: "Năm 1226",
    image: "/img/Carousel Main Page/Picture9.jpg",
    description: "Trần Cảnh (Trần Thái Tông) nhận ngôi từ Lý Chiêu Hoàng, đánh dấu sự chuyển giao quyền lực từ nhà Lý sang nhà Trần.",
    period: "Nhà Trần",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: 10,
    type: "hero",
    title: "Kháng chiến lần thứ 1",
    subtitle: "Năm 1258",
    image: "/img/Carousel Main Page/Picture10.jpg",
    description: "Quân dân nhà Trần giành thắng lợi vẻ vang trong cuộc kháng chiến chống quân xâm lược Nguyên - Mông lần thứ nhất.",
    period: "Nhà Trần",
    color: "from-red-700 to-orange-600",
  },
  {
    id: 11,
    type: "hero",
    title: "Kháng chiến lần thứ 2",
    subtitle: "Năm 1285",
    image: "/img/Carousel Main Page/Picture11.jpg",
    description: "Nhà Trần tiếp tục đánh bại cuộc xâm lược quy mô lớn lần thứ hai của đế quốc Nguyên Mông.",
    period: "Nhà Trần",
    color: "from-red-600 to-rose-800",
  },
  {
    id: 12,
    type: "hero",
    title: "Kháng chiến lần thứ 3",
    subtitle: "Năm 1287 - 1288",
    image: "/img/Carousel Main Page/Picture12.jpg",
    description: "Chiến thắng vĩ đại lần thứ ba, đỉnh cao là trận thủy chiến lịch sử trên sông Bạch Đằng năm 1288.",
    period: "Nhà Trần",
    color: "from-orange-600 to-red-600",
  },
  {
    id: 13,
    type: "culture",
    title: "Công chúa Huyền Trân",
    subtitle: "Năm 1306",
    image: "/img/Carousel Main Page/Picture13.jpg",
    description: "Công chúa Huyền Trân gả cho vua Chế Mân đổi lấy hai châu Ô, châu Lý (khu vực Quảng Trị, Thừa Thiên Huế).",
    period: "Nhà Trần",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 14,
    type: "culture",
    title: "Nhà Hồ thành lập",
    subtitle: "Năm 1400",
    image: "/img/Carousel Main Page/Picture14.jpg",
    description: "Hồ Quý Ly lên ngôi lập ra nhà Hồ, đặt tên nước là Đại Ngu và tiến hành nhiều cải cách.",
    period: "Nhà Hồ",
    color: "from-stone-600 to-gray-800",
  },
  {
    id: 15,
    type: "culture",
    title: "Quân Minh xâm lược",
    subtitle: "Năm 1406",
    image: "/img/Carousel Main Page/Picture15.jpg",
    description: "Nhà Minh (Trung Quốc) mượn cớ 'Phù Trần diệt Hồ' để đem quân sang xâm lược nước Đại Ngu.",
    period: "Nhà Hồ",
    color: "from-gray-700 to-zinc-900",
  },
  {
    id: 16,
    type: "culture",
    title: "Bắc thuộc lần thứ 4",
    subtitle: "Năm 1407",
    image: "/img/Carousel Main Page/Picture16.jpg",
    description: "Nhà Hồ sụp đổ, nước ta lại rơi vào thời kỳ Bắc thuộc lần thứ 4 dưới ách cai trị tàn bạo của nhà Minh.",
    period: "Thời thuộc Minh",
    color: "from-slate-800 to-black",
  },
  {
    id: 17,
    type: "hero",
    title: "Khởi nghĩa Lam Sơn",
    subtitle: "Năm 1428",
    image: "/img/Carousel Main Page/Picture17.jpg",
    description: "Lê Lợi lãnh đạo nghĩa quân đánh đuổi hoàn toàn quân Minh, lên ngôi vua, lập nên nhà Hậu Lê.",
    period: "Nhà Hậu Lê",
    color: "from-yellow-600 to-amber-700",
  },
  {
    id: 18,
    type: "culture",
    title: "Trịnh - Nguyễn phân tranh",
    subtitle: "1533 - 1777",
    image: "/img/Carousel Main Page/Picture18.jpg",
    description: "Đất nước bị chia cắt thành Đàng Trong và Đàng Ngoài do cuộc xung đột kéo dài giữa chúa Trịnh và chúa Nguyễn.",
    period: "Lê Trung Hưng",
    color: "from-violet-700 to-purple-900",
  },
  {
    id: 19,
    type: "hero",
    title: "Khởi nghĩa Tây Sơn",
    subtitle: "Năm 1778",
    image: "/img/Carousel Main Page/Picture19.jpg",
    description: "Ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ lãnh đạo phong trào khởi nghĩa, từng bước thống nhất đất nước.",
    period: "Nhà Tây Sơn",
    color: "from-red-600 to-red-800",
  },
  {
    id: 20,
    type: "hero",
    title: "Vua Gia Long",
    subtitle: "Năm 1802",
    image: "/img/Carousel Main Page/Picture20.jpg",
    description: "Nguyễn Ánh đánh bại vương triều Tây Sơn, lên ngôi hoàng đế, lập ra nhà Nguyễn - triều đại phong kiến cuối cùng.",
    period: "Nhà Nguyễn",
    color: "from-yellow-700 to-orange-800",
  },
  {
    id: 21,
    type: "culture",
    title: "Pháp xâm lược",
    subtitle: "Năm 1858",
    image: "/img/Carousel Main Page/Picture21.jpg",
    description: "Thực dân Pháp nổ súng tấn công bán đảo Sơn Trà, mở đầu cuộc chiến tranh xâm lược Việt Nam.",
    period: "Thời Pháp thuộc",
    color: "from-gray-600 to-slate-800",
  }
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

// const historicalTimeline: TimelineEvent[] = [
//   {
//     year: "Tháng 1/1226",
//     title: "Nhà Trần thành lập",
//     description: "Lý Chiêu Hoàng nhường ngôi cho Trần Cảnh.",
//     period: "Thời Trần",
//     color: "from-amber-600 to-yellow-600",
//   },
//   {
//     year: "1258",
//     title: "Kháng chiến chống Nguyên - Mông lần I",
//     description: "Thắng lợi tại Đông Bộ Đầu, giải phóng Thăng Long.",
//     period: "Thời Trần",
//     color: "from-orange-600 to-red-600",
//   },
//   {
//     year: "1285",
//     title: "Kháng chiến chống Nguyên - Mông lần II",
//     description: "Thắng lớn tại Hàm Tử, Chương Dương.",
//     period: "Thời Trần",
//     color: "from-red-600 to-rose-700",
//   },
//   {
//     year: "1287 - 1288",
//     title: "Kháng chiến chống Nguyên - Mông lần III",
//     description: "Chiến thắng oanh liệt trên sông Bạch Đằng (1288).",
//     period: "Thời Trần",
//     color: "from-red-700 to-red-900",
//   },
//   {
//     year: "1299",
//     title: "Sáng lập Thiền phái Trúc Lâm",
//     description: "Dòng thiền Trần Nhân Tông sáng lập.",
//     period: "Thời Trần",
//     color: "from-emerald-600 to-teal-600",
//   },
//   {
//     year: "1306",
//     title: "Công chúa Huyền Trân lấy Chế Mân",
//     description: "Thu nhận hai châu Ô, Lý.",
//     period: "Thời Trần",
//     color: "from-pink-500 to-rose-500",
//   },
//   {
//     year: "1400",
//     title: "Nhà Hồ thành lập",
//     description: "Hồ Quý Ly lên ngôi vua, đặt quốc hiệu Đại Ngu.",
//     period: "Thời Hồ",
//     color: "from-blue-600 to-indigo-600",
//   },
//   {
//     year: "1401",
//     title: "Thay đổi ngôi vị nhà Hồ",
//     description: "Hồ Quý Ly nhường ngôi cho Hồ Hán Thương.",
//     period: "Thời Hồ",
//     color: "from-indigo-600 to-purple-600",
//   },
//   {
//     year: "1406",
//     title: "Nhà Minh xâm lược",
//     description: 'Lấy cớ "Phù Trần diệt Hồ" để tràn sang xâm lược.',
//     period: "Thời Hồ",
//     color: "from-gray-500 to-gray-700",
//   },
//   {
//     year: "1407",
//     title: "Nhà Hồ sụp đổ",
//     description: "Cha con Hồ Quý Ly bị bắt, đất nước bị đô hộ.",
//     period: "Thời Hồ",
//     color: "from-slate-700 to-gray-900",
//   },
// ];

export function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundEffect />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <HeroSection />
        <HistoricalCarousel frames={historicalFrames} />
        <Suspense fallback={<SectionSkeleton />}>
          <QuickAccess />
        </Suspense>
        {/* <Suspense fallback={<SectionSkeleton />}>
          <TimelineSection events={historicalTimeline} />
        </Suspense> */}
                <Suspense fallback={<SectionSkeleton />}>
          <NewsTicker items={newsItems} />
        </Suspense>
      </div>
    </div>
  );
}