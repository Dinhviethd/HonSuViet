import { useState } from "react";
import { ImageWithFallback } from "@/features/hon-su-viet/components/ImageWithFallback";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Sparkles, BookOpen, Trophy, Flame, Clock } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import Slider from "react-slick";
import { DragonPattern } from "@/features/hon-su-viet/components/DragonPattern";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Historical content frames
const historicalFrames = [
  {
    id: 1,
    type: "hero",
    title: "Hai Bà Trưng",
    subtitle: "Khởi nghĩa 40 TCN",
    image: "https://images.unsplash.com/photo-1759134461880-c951a672f3b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwaGlzdG9yaWNhbCUyMGhlcm8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzA1NDYxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Hai nữ tướng quân dũng cảm lãnh đạo cuộc khởi nghĩa chống Bắc thuộc, trở thành biểu tượng của tinh thần yêu nước và bất khuất.",
    period: "Thời Bắc thuộc",
    color: "from-red-600 to-orange-600"
  },
  {
    id: 2,
    type: "artifact",
    title: "Trống Đồng Đông Sơn",
    subtitle: "2500 năm trước",
    image: "https://images.unsplash.com/photo-1761150285529-4ddd7b40bd7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwYW5jaWVudCUyMGFydGlmYWN0JTIwYnJvbnplJTIwZHJ1bXxlbnwxfHx8fDE3NzA1NDYxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Di vật văn hóa quý giá với những họa tiết tinh xảo, phản ánh nền văn minh phát triển của người Việt cổ đại.",
    period: "Văn hóa Đông Sơn",
    color: "from-amber-600 to-yellow-600"
  },
  {
    id: 3,
    type: "architecture",
    title: "Chùa Thiên Mụ",
    subtitle: "Tháp 7 tầng",
    image: "https://images.unsplash.com/photo-1770149682562-488b758a84f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwYW5jaWVudCUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzA1NDYxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Ngôi chùa cổ kính nhất Huế, tháp Phước Duyên cao 21m với kiến trúc độc đáo, biểu tượng của cố đô.",
    period: "Triều Nguyễn",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 4,
    type: "hero",
    title: "Vua Lê Lợi",
    subtitle: "Khởi nghĩa Lam Sơn",
    image: "https://images.unsplash.com/photo-1764000667049-2199a9c904f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwd2FycmlvciUyMHN0YXR1ZXxlbnwxfHx8fDE3NzA1NDYxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Vị anh hùng dân tộc lãnh đạo cuộc khởi nghĩa Lam Sơn, đánh đuổi quân Minh, lập nên triều đại Lê.",
    period: "Thế kỷ 15",
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: 5,
    type: "artifact",
    title: "Di sản Hoàng Thành",
    subtitle: "Thăng Long - Hà Nội",
    image: "https://images.unsplash.com/photo-1770149683049-272c9d19bfaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMGFydGlmYWN0fGVufDF8fHx8MTc3MDU0NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Quần thể di tích lịch sử đặc biệt, chứng nhận Hà Nội là trung tâm chính trị liên tục trong hơn 1000 năm.",
    period: "Di sản UNESCO",
    color: "from-green-600 to-emerald-600"
  },
  {
    id: 6,
    type: "culture",
    title: "Nghệ thuật Rồng Việt",
    subtitle: "Biểu tượng dân tộc",
    image: "https://images.unsplash.com/photo-1652960414167-c41891b176e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwdHJhZGl0aW9uYWwlMjBkcmFnb24lMjBhcnR8ZW58MXx8fHwxNzcwNTQ2MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Hình ảnh rồng xuất hiện trong nghệ thuật Việt từ hàng nghìn năm, tượng trưng cho sức mạnh và quyền uy.",
    period: "Văn hóa truyền thống",
    color: "from-red-700 to-yellow-600"
  }
];

const newsItems = [
  {
    id: 1,
    title: "Khai mạc triển lãm 'Văn hóa Đông Sơn - Nền tảng văn minh Việt'",
    date: "05/02/2026",
    category: "Sự kiện",
    image: "https://images.unsplash.com/photo-1761150285529-4ddd7b40bd7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwYW5jaWVudCUyMGFydGlmYWN0JTIwYnJvbnplJTIwZHJ1bXxlbnwxfHx8fDE3NzA1NDYxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "Phát hiện di tích thời Lý - Trần tại Thăng Long",
    date: "03/02/2026",
    category: "Khảo cổ",
    image: "https://images.unsplash.com/photo-1770149683049-272c9d19bfaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMGFydGlmYWN0fGVufDF8fHx8MTc3MDU0NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Kỷ niệm 76 năm Ngày toàn quốc kháng chiến",
    date: "19/12/2025",
    category: "Lịch sử",
    image: "https://images.unsplash.com/photo-1764000667049-2199a9c904f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtJTIwd2FycmlvciUyMHN0YXR1ZXxlbnwxfHx8fDE3NzA1NDYxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    title: "Ra mắt bộ sách 'Lịch sử Việt Nam qua tranh ảnh'",
    date: "15/01/2026",
    category: "Xuất bản",
    image: "https://images.unsplash.com/photo-1770149682562-488b758a84f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWV0bmFtZXNlJTIwYW5jaWVudCUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzA1NDYxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

// Historical Timeline Data
const historicalTimeline = [
  {
    year: "2879 TCN",
    title: "Vua Hùng dựng nước",
    description: "Khởi nguồn lịch sử dân tộc Việt Nam",
    period: "Thời Hồng Bàng",
    color: "from-orange-600 to-red-600"
  },
  {
    year: "257 TCN",
    title: "Thục Phán lập nước Âu Lạc",
    description: "Xây thành Cổ Loa, hình thành nhà nước đầu tiên",
    period: "Thời Thục",
    color: "from-yellow-600 to-orange-600"
  },
  {
    year: "111 TCN",
    title: "Bắc thuộc lần thứ nhất",
    description: "Bắt đầu 1000 năm Bắc thuộc và đấu tranh giành độc lập",
    period: "Bắc thuộc",
    color: "from-gray-600 to-gray-700"
  },
  {
    year: "40 - 43",
    title: "Khởi nghĩa Hai Bà Trưng",
    description: "Cuộc khởi nghĩa anh dũng chống ách thống trị phương Bắc",
    period: "Đấu tranh",
    color: "from-pink-600 to-red-600"
  },
  {
    year: "938",
    title: "Ngô Quyền đánh thắng sông Bạch Đằng",
    description: "Kết thúc nghìn năm Bắc thuộc, mở ra thời kỳ độc lập",
    period: "Độc lập",
    color: "from-blue-600 to-cyan-600"
  },
  {
    year: "1010",
    title: "Lý Thái Tổ dời đô về Thăng Long",
    description: "Khởi đầu thời kỳ phồn vinh của triều đại Lý",
    period: "Thời Lý",
    color: "from-purple-600 to-pink-600"
  },
  {
    year: "1225",
    title: "Trần Thủ Độ lập triều Trần",
    description: "Thời kỳ vàng son chống giặc ngoại xâm",
    period: "Thời Trần",
    color: "from-amber-600 to-yellow-600"
  },
  {
    year: "1428",
    title: "Lê Lợi lập triều Lê",
    description: "Khởi nghĩa Lam Sơn thành công, đuổi quân Minh",
    period: "Thời Lê",
    color: "from-green-600 to-emerald-600"
  },
  {
    year: "1802",
    title: "Nguyễn Ánh thống nhất đất nước",
    description: "Lập triều Nguyễn, đặt tên nước là Việt Nam",
    period: "Triều Nguyễn",
    color: "from-indigo-600 to-purple-600"
  },
  {
    year: "1945",
    title: "Tuyên ngôn Độc lập",
    description: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập",
    period: "Hiện đại",
    color: "from-red-600 to-yellow-500"
  }
];

// Custom Arrow Components
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-red-600 to-yellow-500 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-red-600 to-yellow-500 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

export function Home() {
  const [hoveredFrame, setHoveredFrame] = useState<number | null>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-red-50 to-yellow-50" />
        
        {/* Flying Dragon 1 - Top Left to Right */}
        <motion.div
          className="absolute w-48 h-48 opacity-20"
          initial={{ x: -200, y: 100 }}
          animate={{
            x: ["-200px", "100vw"],
            y: [100, 80, 120, 100],
            rotate: [0, 5, -5, 0],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <DragonPattern />
        </motion.div>

        {/* Flying Dragon 2 - Bottom Right to Left */}
        <motion.div
          className="absolute w-56 h-56 opacity-15 transform scale-x-[-1]"
          initial={{ x: "100vw", y: "60vh" }}
          animate={{
            x: ["100vw", "-200px"],
            y: ["60vh", "65vh", "55vh", "60vh"],
            rotate: [0, -8, 8, 0],
            scale: [0.7, 1.1, 0.7]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
        >
          <DragonPattern />
        </motion.div>

        {/* Flying Dragon 3 - Middle Cross */}
        <motion.div
          className="absolute w-40 h-40 opacity-18"
          initial={{ x: "-150px", y: "40vh" }}
          animate={{
            x: ["-150px", "100vw"],
            y: ["40vh", "35vh", "45vh", "40vh"],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
            delay: 12
          }}
        >
          <DragonPattern />
        </motion.div>

        {/* Flying Dragon 4 - Top Right to Left (higher) */}
        <motion.div
          className="absolute w-44 h-44 opacity-16 transform scale-x-[-1]"
          initial={{ x: "100vw", y: 50 }}
          animate={{
            x: ["100vw", "-180px"],
            y: [50, 30, 70, 50],
            rotate: [0, -12, 12, 0],
            scale: [0.9, 1.2, 0.9]
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
            delay: 18
          }}
        >
          <DragonPattern />
        </motion.div>

        {/* Floating Clouds */}
        <motion.div
          className="absolute top-40 left-1/4 w-32 h-16 opacity-20 bg-amber-300 rounded-full blur-xl"
          animate={{
            x: [0, 200, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-40 right-1/4 w-40 h-20 opacity-20 bg-red-300 rounded-full blur-xl"
          animate={{
            x: [0, -200, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Traditional Patterns */}
        <motion.div
          className="absolute top-1/3 right-10 text-8xl opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          ☯
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-10 text-8xl opacity-5"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          ⚛
        </motion.div>

        {/* Decorative fire elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-red-500 rounded-full opacity-20 blur-sm"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 20}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Title with Dragon Decoration */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 relative"
        >
          {/* Small decorative dragons flanking title */}
          <div className="absolute -left-20 top-0 w-16 h-16 opacity-30 hidden xl:block">
            <DragonPattern />
          </div>
          <div className="absolute -right-20 top-0 w-16 h-16 opacity-30 hidden xl:block transform scale-x-[-1]">
            <DragonPattern />
          </div>

          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-700 via-yellow-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl">
              HỒN SỬ VIỆT
            </h1>
          </motion.div>
          <p className="text-xl md:text-2xl text-amber-800 font-medium">
            Khám phá hành trình 4000 năm dựng nước và giữ nước
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Flame className="w-6 h-6 text-red-600" />
            </motion.div>
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Main Historical Frames Carousel */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-red-800 text-center mb-2">
              Di Sản Lịch Sử & Nhân Vật
            </h2>
            <p className="text-center text-gray-600 font-medium">
              Di chuột qua để xem thông tin chi tiết
            </p>
          </div>

          <div className="px-12">
            <Slider {...sliderSettings}>
              {historicalFrames.map((frame) => (
                <div key={frame.id} className="px-3">
                  <motion.div
                    className="relative aspect-square cursor-pointer"
                    onHoverStart={() => setHoveredFrame(frame.id)}
                    onHoverEnd={() => setHoveredFrame(null)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Frame Container with 3D Effect */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-600">
                      {/* Main Image */}
                      <ImageWithFallback
                        src={frame.image}
                        alt={frame.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          hoveredFrame === frame.id ? 'scale-110 blur-sm' : 'scale-100'
                        }`}
                      />

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${frame.color} transition-opacity duration-500 ${
                        hoveredFrame === frame.id ? 'opacity-95' : 'opacity-60'
                      }`} />

                      {/* Default Content */}
                      <div className={`absolute inset-0 p-6 flex flex-col justify-end text-white transition-opacity duration-500 ${
                        hoveredFrame === frame.id ? 'opacity-0' : 'opacity-100'
                      }`}>
                        <Badge className="bg-yellow-500 text-red-900 w-fit mb-3 font-bold shadow-lg">
                          {frame.period}
                        </Badge>
                        <h3 className="text-2xl font-black mb-1 drop-shadow-lg">{frame.title}</h3>
                        <p className="text-sm font-medium opacity-90">{frame.subtitle}</p>
                      </div>

                      {/* Hover Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredFrame === frame.id ? 1 : 0,
                          y: hoveredFrame === frame.id ? 0 : 20
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center text-white"
                      >
                        <motion.div
                          animate={hoveredFrame === frame.id ? { rotate: 360 } : {}}
                          transition={{ duration: 0.8 }}
                        >
                          <Sparkles className="w-12 h-12 mb-4" />
                        </motion.div>
                        <h3 className="text-3xl font-black mb-3 drop-shadow-lg">{frame.title}</h3>
                        <Badge className="bg-yellow-400 text-red-900 mb-4 font-bold shadow-lg">
                          {frame.period}
                        </Badge>
                        <p className="text-lg font-medium leading-relaxed drop-shadow-md">
                          {frame.description}
                        </p>
                      </motion.div>

                      {/* Decorative Corner Elements */}
                      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-yellow-400 opacity-80" />
                      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-yellow-400 opacity-80" />
                      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-yellow-400 opacity-80" />
                      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-yellow-400 opacity-80" />
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.section>

        {/* News Ticker Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-red-800 text-center mb-2 flex items-center justify-center gap-3">
              <Calendar className="w-8 h-8" />
              Tin Tức Lịch Sử
              <Calendar className="w-8 h-8" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsItems.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden border-2 border-amber-300 hover:border-red-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl h-full">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-600 text-white font-bold shadow-lg">
                        {news.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {news.date}
                    </div>
                    <h3 className="font-bold text-gray-800 line-clamp-2 hover:text-red-700 transition-colors">
                      {news.title}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Historical Timeline Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-red-800 mb-2 flex items-center justify-center gap-3">
              <Clock className="w-8 h-8" />
              Dòng Thời Gian Lịch Sử Việt Nam
              <Clock className="w-8 h-8" />
            </h2>
            <p className="text-gray-600 font-medium">
              Hành trình 4000 năm dựng nước và giữ nước
            </p>
          </div>

          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-yellow-500 to-red-600 hidden md:block" />
            
            <div className="space-y-8">
              {historicalTimeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <Card className={`bg-gradient-to-br ${event.color} text-white p-6 shadow-xl border-4 border-yellow-500 relative overflow-hidden`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.1) 20px, rgba(255,255,255,.1) 40px)`
                        }} />
                      </div>
                      
                      <div className="relative z-10">
                        <Badge className="bg-yellow-400 text-red-900 mb-3 font-bold">
                          {event.period}
                        </Badge>
                        <h3 className="text-2xl font-black mb-2">{event.title}</h3>
                        <p className="text-sm opacity-90 mb-2">{event.description}</p>
                        <p className="text-xl font-bold text-yellow-300 mt-3">
                          {event.year}
                        </p>
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-yellow-400 opacity-50" />
                      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-400 opacity-50" />
                    </Card>
                  </motion.div>

                  {/* Center Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-red-600 to-yellow-500 rounded-full border-4 border-white shadow-xl items-center justify-center z-10"
                  >
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  </motion.div>

                  {/* Year Display on opposite side */}
                  <div className={`hidden md:block w-5/12 ${
                    index % 2 === 0 ? 'text-left pl-12' : 'text-right pr-12'
                  }`}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="text-4xl font-black text-amber-700 drop-shadow-lg"
                    >
                      {event.year}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Year Display */}
            <div className="md:hidden mt-8 text-center">
              <p className="text-sm text-gray-600 italic">
                Cuộn xuống để khám phá toàn bộ dòng thời gian lịch sử
              </p>
            </div>
          </div>
        </motion.section>

        {/* Quick Access Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-red-700 via-red-600 to-yellow-600 border-4 border-yellow-500 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
              }} />
            </div>
            {/* Decorative dragons in corners */}
            <div className="absolute top-4 left-4 w-20 h-20 opacity-20">
              <DragonPattern />
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 opacity-20 transform scale-x-[-1]">
              <DragonPattern />
            </div>
            
            <div className="relative p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-white mb-3 drop-shadow-lg">
                  🔥 Sẵn sàng khám phá? 🔥
                </h2>
                <p className="text-xl text-yellow-100 font-medium">
                  Bắt đầu hành trình học tập lịch sử Việt Nam ngay hôm nay
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Link to="/lessons">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full h-24 bg-white text-red-700 hover:bg-yellow-100 font-bold text-lg shadow-xl border-4 border-yellow-400">
                      <BookOpen className="w-6 h-6 mr-2" />
                      Bài học
                    </Button>
                  </motion.div>
                </Link>
                
                <Link to="/games">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full h-24 bg-white text-red-700 hover:bg-yellow-100 font-bold text-lg shadow-xl border-4 border-yellow-400">
                      <Trophy className="w-6 h-6 mr-2" />
                      Trò chơi
                    </Button>
                  </motion.div>
                </Link>
                
                <Link to="/resources">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full h-24 bg-white text-red-700 hover:bg-yellow-100 font-bold text-lg shadow-xl border-4 border-yellow-400">
                      <Sparkles className="w-6 h-6 mr-2" />
                      Tư liệu
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}