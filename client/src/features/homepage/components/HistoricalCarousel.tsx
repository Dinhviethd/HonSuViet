import { useState, useCallback } from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import { motion } from "motion/react";
import { Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { ImageWithFallback } from "@/features/hon-su-viet/components/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import type { HistoricalFrame } from "../schemas/home.types";

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-red-600 to-yellow-500 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-red-600 to-yellow-500 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

const sliderSettings: Settings = {
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
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface HistoricalCarouselProps {
  frames: HistoricalFrame[];
}

export function HistoricalCarousel({ frames }: HistoricalCarouselProps) {
  const [hoveredFrame, setHoveredFrame] = useState<number | null>(null);

  const onHoverStart = useCallback((id: number) => setHoveredFrame(id), []);
  const onHoverEnd = useCallback(() => setHoveredFrame(null), []);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
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
          {frames.map((frame) => (
            <div key={frame.id} className="px-3">
              <motion.div
                className="relative aspect-square cursor-pointer"
                onHoverStart={() => onHoverStart(frame.id)}
                onHoverEnd={onHoverEnd}
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
                      hoveredFrame === frame.id
                        ? "scale-110 blur-sm"
                        : "scale-100"
                    }`}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${frame.color} transition-opacity duration-500 ${
                      hoveredFrame === frame.id ? "opacity-95" : "opacity-60"
                    }`}
                  />

                  {/* Default Content */}
                  <div
                    className={`absolute inset-0 p-6 flex flex-col justify-end text-white transition-opacity duration-500 ${
                      hoveredFrame === frame.id ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <Badge className="bg-yellow-500 text-red-900 w-fit mb-3 font-bold shadow-lg">
                      {frame.period}
                    </Badge>
                    <h3 className="text-2xl font-black mb-1 drop-shadow-lg">
                      {frame.title}
                    </h3>
                    <p className="text-sm font-medium opacity-90">
                      {frame.subtitle}
                    </p>
                  </div>

                  {/* Hover Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredFrame === frame.id ? 1 : 0,
                      y: hoveredFrame === frame.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center text-white"
                  >
                    <motion.div
                      animate={
                        hoveredFrame === frame.id ? { rotate: 360 } : {}
                      }
                      transition={{ duration: 0.8 }}
                    >
                      <Sparkles className="w-12 h-12 mb-4" />
                    </motion.div>
                    <h3 className="text-3xl font-black mb-3 drop-shadow-lg">
                      {frame.title}
                    </h3>
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
  );
}