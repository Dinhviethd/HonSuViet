import { motion } from "motion/react";
import { BookOpen, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FloatingDecoration } from "@/features/hon-su-viet/components/DragonPattern";

export function QuickAccess() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <Card className="bg-gradient-to-br from-red-700 via-red-600 to-yellow-600 border-4 border-yellow-500 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
            }}
          />
        </div>
        {/* Decorative dragons in corners */}
        <div className="absolute top-4 left-4 w-20 h-20 opacity-20">
          <FloatingDecoration
            src="/smallDragon.png"
            className="top-10 right-10 w-32 h-auto z-0 opacity-50"
            duration={8}
          />
        </div>
        <div className="absolute top-4 right-4 w-20 h-20 opacity-20 transform scale-x-[-1]">
          <FloatingDecoration
            src="/smallDragon.png"
            className="bottom-10 left-10 w-24 h-auto z-0 opacity-50 scale-x-[-1]"
            duration={7}
            yOffset={10}
          />
        </div>

        <div className="relative p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-3 drop-shadow-lg">
              Sẵn sàng khám phá?
            </h2>
            <p className="text-xl text-yellow-100 font-medium">
              Bắt đầu hành trình học tập lịch sử Việt Nam ngay hôm nay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/lessons">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full h-24 bg-white text-red-700 hover:bg-yellow-100 font-bold text-lg shadow-xl border-4 border-yellow-400">
                  <BookOpen className="w-6 h-6 mr-2" />
                  Bài học
                </Button>
              </motion.div>
            </Link>

            <Link to="/games">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full h-24 bg-white text-red-700 hover:bg-yellow-100 font-bold text-lg shadow-xl border-4 border-yellow-400">
                  <Trophy className="w-6 h-6 mr-2" />
                  Trò chơi
                </Button>
              </motion.div>
            </Link>

            <Link to="/resources">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
  );
}