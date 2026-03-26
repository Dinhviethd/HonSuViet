import { memo } from "react";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { FloatingDecoration } from "@/features/hon-su-viet/components/DragonPattern";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const HeroSection = memo(function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-4 relative"
    >
      {/* Small decorative dragons flanking title */}
      {!reduced && (
        <>
          <div className="absolute -left-20 top-0 w-16 h-16 opacity-30 hidden xl:block">
            <FloatingDecoration
              src="/smallDragon.png"
              className="top-10 right-10 w-32 h-auto z-0 opacity-50"
              duration={8}
            />
          </div>
          <div className="absolute -right-20 top-0 w-16 h-16 opacity-30 hidden xl:block transform scale-x-[-1]">
            <FloatingDecoration
              src="/smallDragon.png"
              className="bottom-10 left-10 w-24 h-auto z-0 opacity-50 scale-x-[-1]"
              duration={7}
              yOffset={10}
            />
          </div>
        </>
      )}

      {/* Title pulse: CSS animation instead of framer-motion infinite loop */}
      <div className="animate-title-pulse">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-700 via-yellow-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl py-3">
          HỒN SỬ VIỆT
        </h1>
      </div>
      <div className="max-w-5xl mx-auto text-amber-900 font-medium text-base md:text-lg leading-relaxed md:leading-8 space-y-4 px-2 md:px-6">
        <p>
          Chào mừng các bạn đến với Hồn Sử Việt, nơi chúng ta cùng nhập vai
          <span className="font-bold text-red-700"> "Ngược dòng thời gian, khám phá lịch sử"</span>.
        </p>
        <p>
          Lịch sử không chỉ là những con số hay sự kiện khô khan trên trang giấy; đó là dòng chảy của cha ông, là linh hồn của dân tộc.
          Hồn Sử Việt là dự án nghiên cứu khoa học tâm huyết từ các bạn sinh viên Sư phạm Lịch sử - Địa lý, khoa Sử - Địa - Chính trị,
          Trường Đại học Sư phạm - Đại học Đà Nẵng.
        </p>
        <p>
          Với mong muốn mang đến một cái nhìn mới mẻ, sinh động và đầy cuốn hút, chúng mình xây dựng nền tảng này như một người bạn đồng
          hành cùng các bạn học sinh THCS và là trợ thủ đắc lực cho quý thầy cô giáo trong hành trình đổi mới dạy học Lịch sử. Hãy cùng
          chúng mình mở cánh cửa thời gian để thấu hiểu và tự hào hơn về nguồn cội Việt Nam!
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-line-scale" />
        <div className="animate-spin" style={{ animationDuration: "3s" }}>
          <Flame className="w-6 h-6 text-red-600" />
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-line-scale" />
      </div>
    </motion.div>
  );
});