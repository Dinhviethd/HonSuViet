import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { ImageWithFallback } from "@/features/hon-su-viet/components/ImageWithFallback";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "../schemas/home.types";

interface NewsTickerProps {
  items: NewsItem[];
}

export function NewsTicker({ items }: NewsTickerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
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
        {items.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
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
  );
}