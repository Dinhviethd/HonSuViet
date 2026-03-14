import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TimelineEvent } from "../schemas/home.types";

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export function TimelineSection({ events }: TimelineSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
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
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-col`}
            >
              {/* Content Card */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                } transition-transform duration-300 hover:scale-105`}
              >
                <Card
                  className={`bg-gradient-to-br ${event.color} text-white p-6 shadow-xl border-4 border-yellow-500 relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.1) 20px, rgba(255,255,255,.1) 40px)`,
                      }}
                    />
                  </div>

                  <div className="relative z-10">
                    <Badge className="bg-yellow-400 text-red-900 mb-3 font-bold">
                      {event.period}
                    </Badge>
                    <h3 className="text-2xl font-black mb-2">{event.title}</h3>
                    <p className="text-sm opacity-90 mb-2">
                      {event.description}
                    </p>
                    <p className="text-xl font-bold text-yellow-300 mt-3">
                      {event.year}
                    </p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-yellow-400 opacity-50" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-400 opacity-50" />
                </Card>
              </div>

              {/* Center: Year + Dot stacked vertically */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-10">
                <div
                  className="text-4xl font-black text-amber-700 drop-shadow-lg"
                >
                  {event.year}
                </div>


         


                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-yellow-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
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
  );
}