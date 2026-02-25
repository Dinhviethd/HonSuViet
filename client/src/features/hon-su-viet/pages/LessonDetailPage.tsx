import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Video, FileText, CheckCircle2, Award } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";

// Mock data - trong thực tế sẽ load từ database
const lessonData: Record<string, any> = {
  "2": {
    title: "Văn hóa Đông Sơn và trống đồng",
    period: "Khoảng 1000 TCN - 100 SCN",
    duration: "50 phút",
    content: {
      introduction: "Văn hóa Đông Sơn là nền văn hóa đỉnh cao của thời đại đồ đồng ở Việt Nam và Đông Nam Á, nổi bật với nghệ thuật chế tác trống đồng tinh xảo.",
      sections: [
        {
          title: "1. Địa điểm và thời gian",
          content: "Văn hóa Đông Sơn phát triển chủ yếu ở vùng châu thổ sông Hồng, tập trung tại Thanh Hóa (di chỉ Đông Sơn). Thời kỳ phát triển từ khoảng 1000 TCN đến 100 SCN."
        },
        {
          title: "2. Trống đồng Đông Sơn",
          content: "Trống đồng là biểu tượng đặc sắc nhất của văn hóa Đông Sơn. Mặt trống được trang trí bằng các hoa văn hình học tinh xảo, hình ảnh con người, thuyền, chim, thú. Trống đồng không chỉ là nhạc cụ mà còn là vật dụng trong nghi lễ tôn giáo, biểu tượng quyền lực."
        },
        {
          title: "3. Đời sống kinh tế - xã hội",
          content: "Người Đông Sơn đã biết trồng lúa nước, chăn nuôi gia súc, nghề rèn đồng phát triển cao. Xã hội có sự phân hóa giai cấp rõ rệt, đã hình thành nhà nước sơ khai."
        },
        {
          title: "4. Ý nghĩa lịch sử",
          content: "Văn hóa Đông Sơn là nền tảng của nền văn minh Việt cổ, đánh dấu sự phát triển vượt bậc về kinh tế, xã hội và nghệ thuật, tạo tiền đề cho sự hình thành nhà nước Văn Lang - Âu Lạc."
        }
      ],
      keyPoints: [
        "Trống đồng Đông Sơn là biểu tượng văn hóa Việt Nam",
        "Kỹ thuật rèn đồng đạt trình độ cao",
        "Đời sống kinh tế dựa vào nông nghiệp lúa nước",
        "Đã hình thành tổ chức nhà nước sơ khai"
      ]
    }
  }
};

export default function LessonDetailPage() {
  const { id } = useParams();
  const lesson = lessonData[id || "2"] || lessonData["2"];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/hon-su-viet/lessons">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <Badge className="bg-yellow-500 text-red-900 mb-2">
            {lesson.period}
          </Badge>
          <h1 className="text-3xl font-bold text-gray-800">{lesson.title}</h1>
          <p className="text-gray-600 mt-1">Thời lượng: {lesson.duration}</p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-red-100">
          <TabsTrigger value="content" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <BookOpen className="w-4 h-4 mr-2" />
            Nội dung
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Video className="w-4 h-4 mr-2" />
            Video & Hình ảnh
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            Ghi chú
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 mt-6">
          {/* Introduction */}
          <Card className="border-2 border-amber-300 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-red-800">📚 Giới thiệu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">
                {lesson.content.introduction}
              </p>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="space-y-4">
            {lesson.content.sections.map((section: any, index: number) => (
              <Card key={index} className="bg-white border-l-4 border-red-600">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Points */}
          <Card className="bg-gradient-to-br from-yellow-400 to-orange-400 border-none">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                Điểm cần ghi nhớ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {lesson.content.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-red-900 font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link to="/hon-su-viet/tests" className="flex-1">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Award className="w-4 h-4 mr-2" />
                Làm bài kiểm tra
              </Button>
            </Link>
            <Link to="/hon-su-viet/lessons" className="flex-1">
              <Button variant="outline" className="w-full">
                Hoàn thành bài học
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-800">🎥 Video bài giảng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Video className="w-16 h-16 mx-auto mb-2" />
                  <p>Video bài giảng sẽ được cập nhật</p>
                  <p className="text-sm mt-1">(Tích hợp từ YouTube hoặc nguồn giáo dục)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-800">🖼️ Hình ảnh minh họa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1714073619284-b71674885558?w=400"
                    alt="Trống đồng Đông Sơn"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600 text-center">Trống đồng Đông Sơn</p>
                </div>
                <div className="space-y-2">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1740476376215-22fc302da920?w=400"
                    alt="Di tích khảo cổ"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600 text-center">Di tích khảo cổ Đông Sơn</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-800">📝 Ghi chú của bạn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                className="w-full min-h-[200px] p-4 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                placeholder="Viết ghi chú của bạn về bài học này..."
              />
              <Button className="bg-red-600 hover:bg-red-700">
                Lưu ghi chú
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
