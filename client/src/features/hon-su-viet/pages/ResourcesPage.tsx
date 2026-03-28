import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { Image, Video, BookText, FileText, ExternalLink, Download } from "lucide-react";
import mammoth from "mammoth";

const imageGallery = [
  { id: 1, title: "Phật hoàng Trần Nhân Tông", category: "Nhân vật", period: "Nhà Trần", src: "/img/Các nhân vật lịch sử/Phật hoàng Trần Nhân Tông.png" },
  { id: 2, title: "Hồ Quý Ly qua tranh sơn dầu", category: "Nhân vật", period: "Nhà Hồ", src: "/img/Các nhân vật lịch sử/Tranh sơn dầu vẽ Hồ Quý Ly bởi họa sĩ Hoàng Hoa Mai, 2012.jpg" },
  { id: 3, title: "Thành nhà Hồ, Thanh Hóa", category: "Kiến trúc", period: "Nhà Hồ", src: "/img/Kiến trúc - công trình/Thành nhà Hồ, Thanh Hóa.jfif" },
  { id: 4, title: "Đền Trần (Nam Định)", category: "Kiến trúc", period: "Nhà Trần", src: "/img/Kiến trúc - công trình/Đền Trần (Nam Định).png" },
  { id: 5, title: "Kháng chiến Mông - Nguyên lần 3", category: "Quân sự", period: "Nhà Trần", src: "/img/Quân sự - Các cuộc chiến/Kháng chiến quân Mông - Nguyên lần 3.png" },
  { id: 6, title: "Lược đồ Bạch Đằng 1288", category: "Quân sự", period: "Nhà Trần", src: "/img/Quân sự - Các cuộc chiến/Lược đồ Chiến thắng Bạch Đằng 1288.jpg" },
  { id: 7, title: "Thông bảo hội sao", category: "Kinh tế", period: "Nhà Hồ", src: "/img/Kinh tế - Xã hội/Tình hình kinh tế - xã hội thời Hồ/Thông bảo hội sao.jpg" },
  { id: 8, title: "Thương cảng cổ Vân Đồn", category: "Kinh tế", period: "Nhà Trần", src: "/img/Kinh tế - Xã hội/Tình hình kinh tế - xã hội thời Trần/Hoạt động buôn bán tại thương cảng Vân Đồn.webp" },
  { id: 9, title: "Chùa Phổ Minh", category: "Tôn giáo", period: "Nhà Trần", src: "/img/Tôn giáo - tín ngưỡng/Chùa Phổ Minh.jpg" },
  { id: 10, title: "Đền Trần Nam Định", category: "Tín ngưỡng", period: "Nhà Trần", src: "/img/Tôn giáo - tín ngưỡng/Đền Trần Nam Định.JPG" },
  { id: 11, title: "Gốm sứ nhà Trần", category: "Nghệ thuật", period: "Nhà Trần", src: "/img/Văn hóa - Nghệ thuật/Gốm sứ nhà Trần (2).jpg" },
  { id: 12, title: "Hoa văn đầu rồng thời Trần", category: "Nghệ thuật", period: "Nhà Trần", src: "/img/Văn hóa - Nghệ thuật/Hoa văn đầu rồng thời Trần.jpg" },
  { id: 13, title: "Đền An Sinh", category: "Kiến trúc", period: "Nhà Trần", src: "/img/Kiến trúc - công trình/Đền An Sinh.jpg" },
  { id: 14, title: "Thiền viện Trúc Lâm Yên Tử", category: "Kiến trúc", period: "Nhà Trần", src: "/img/Kiến trúc - công trình/Thiền Viện Trúc Lâm Yên Tử.webp" },
  { id: 15, title: "Tháp Phổ Minh", category: "Kiến trúc", period: "Nhà Trần", src: "/img/Kiến trúc - công trình/Tháp Phổ Minh trên tờ 100 đồng.jpg" },
  { id: 16, title: "Kháng chiến Mông - Nguyên lần 1", category: "Quân sự", period: "Nhà Trần", src: "/img/Quân sự - Các cuộc chiến/Kháng chiến quân Mông - Nguyên lần 1.png" },
  { id: 17, title: "Kháng chiến Mông - Nguyên lần 2", category: "Quân sự", period: "Nhà Trần", src: "/img/Quân sự - Các cuộc chiến/Kháng chiến quân Mông - Nguyên lần 2.png" },
  { id: 18, title: "Minh họa chiến thắng Bạch Đằng", category: "Quân sự", period: "Nhà Trần", src: "/img/Quân sự - Các cuộc chiến/Minh họa chiến thắng Bạch Đằng.jpg" },
  { id: 19, title: "Bến Cái Làng - Vân Đồn", category: "Kinh tế", period: "Nhà Trần", src: "/img/Kinh tế - Xã hội/Tình hình kinh tế - xã hội thời Trần/Bến Cái Làng - Trung tâm thương cảng cổ Vân Đồn. Nguồn_ Bảo tàng Quảng Ninh.jpg" },
  { id: 20, title: "Hình Mũ Quyển Vân thời Trần", category: "Kinh tế", period: "Nhà Trần", src: "/img/Kinh tế - Xã hội/Tình hình kinh tế - xã hội thời Trần/Hình 1. Ảnh Mũ Quyển Vân chụp từ Tam tài đồ hội.png" },
  { id: 21, title: "Chùa Bối Khê", category: "Tôn giáo", period: "Nhà Trần", src: "/img/Tôn giáo - tín ngưỡng/Chùa Bối Khê.JPG" },
  { id: 22, title: "Lễ hội đền Trần", category: "Tín ngưỡng", period: "Nhà Trần", src: "/img/Tôn giáo - tín ngưỡng/Lễ hội đền Trần Nam Định.JPG" },
  { id: 23, title: "Bình gốm hoa lam Chu Đậu", category: "Nghệ thuật", period: "Nhà Trần", src: "/img/Văn hóa - Nghệ thuật/Bình gốm hoa lam Chu Đậu thời Trần, thế kỷ XIV. Viện bảo tàng Mỹ thuật Metropolitan, New York.jpg" },
  { id: 24, title: "Rồng nhà Hồ", category: "Nghệ thuật", period: "Nhà Hồ", src: "/img/Văn hóa - Nghệ thuật/Rồng nhà Hồ.jpg" },
];

const IMAGES_PER_PAGE = 6;
const STORIES_PER_PAGE = 6;

const videos = [
  { id: 1, title: "Tóm tắt: Nhà Trần (1225 - 1400) | 3 lần chiến thắng quân Nguyên Mông", duration: "1:02:30", views: "566K", link: "https://www.youtube.com/watch?v=t3ID4gc7LVE" },
  { id: 2, title: "12 VỊ VUA NHÀ TRẦN - TRIỀU ĐẠI NHIỀU CHIẾN CÔNG NHẤT LỊCH SỬ VIỆT NAM", duration: "12:45", views: "129K", link: "https://www.youtube.com/watch?si=ahrbO-4vdK0sKWc1&v=8Ex6CZulTKw&feature=youtu.be" },
  { id: 3, title: "Thái Tông Trần Cảnh – Gánh nặng Đế Vương", duration: "18:20", views: "156K", link: "https://youtu.be/ZC4RN1NBRbQ?si=3zdkqqejIA-lEZPl" },
  { id: 4, title: "VÂN ĐỒN 1288 – nhấn chìm 17 vạn lương, định đoạt lịch sử đưa TRẦN KHÁNH DƯ vào ngôi đền huyền thoại", duration: "22:10", views: "203K", link: "https://youtu.be/xhpyp63pqJc?si=CsIAKR1YfrrFpKE3" },
  { id: 5, title: "Trần Quang Khải - Vị hoàng tử tài ba văn võ song toàn", duration: "16:40", views: "87K", link: "https://youtu.be/Drq3dXmlBso?si=pSVwHfJuww9yoCYe" },
  { id: 6, title: "Kình ngư của Đại Việt - Danh tướng Yết Kiêu", duration: "25:15", views: "267K", link: "https://youtu.be/pCLUrSjsAkY?si=iDLEcSKBGkbVdF-A" },
];


const storyFiles = [
  "An Tư công chúa hiến thân cứu nước.docx",
  "Chu Văn An và người học trò thủy thần.docx",
  "Huyền tích nàng Bình Khương kêu oan.docx",
  "Kế hoạch mưu sát Hồ Quý Ly và cái chết của Trần Khát Chân.docx",
  "Phạm Ngũ Lão - Đức thánh Phạm.docx",
  "Phật Hoàng Trần Nhân Tông bỏ ngai đi tu.docx",
  "Sự tích Huyền Trân Công Chúa_ Nước non ngàn dặm.docx",
  "Sự tích Yết Kiêu.docx",
  "Tiền giấy Thông bảo hội sao của Hồ Quý Ly.docx",
  "Trần Khánh Dư_Từ kẻ bán than đến danh tướng cứu nước.docx",
  "Trần Khát Chân tiêu diệt Chế Bồng Nga.docx",
  "Trần Quốc Toản bóp nát quả cam.docx",
];

const folkStories = storyFiles.map((fileName, index) => ({
  id: index + 1,
  fileName,
  title: fileName.replace(/\.[^/.]+$/, ""),
  era: "Trần - Hồ",
  theme: "Truyện dân gian, danh nhân",
}));

const bookFiles = [
  "Các triều đại Việt Nam.pdf",
  "Cải cách Hồ Quý Ly.pdf",
  "Nam Dược Thần Hiệu.pdf",
  "TRẦN THỦ ĐỘ – DANH NHÂN TRUYỆN KÝ.pdf",
  "Truyện danh nhân thời Trần-Lê.pdf",
  "Đại Việt sử kí.pdf",
];

const pdfsAndLinks = bookFiles.map((fileName) => ({
  title: fileName.replace(/\.[^/.]+$/, ""),
  type: "PDF",
  size: "-",
  link: encodeURI(`/book/${fileName}`),
}));

export default function ResourcesPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImagePage, setCurrentImagePage] = useState(1);
  const [currentStoryPage, setCurrentStoryPage] = useState(1);
  const [selectedStory, setSelectedStory] = useState<(typeof folkStories)[number] | null>(null);
  const [storyContent, setStoryContent] = useState("");
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  const [storyError, setStoryError] = useState<string | null>(null);

  const totalImagePages = Math.ceil(imageGallery.length / IMAGES_PER_PAGE);
  const currentImageItems = imageGallery.slice(
    (currentImagePage - 1) * IMAGES_PER_PAGE,
    currentImagePage * IMAGES_PER_PAGE,
  );
  const selectedImageData = imageGallery.find((image) => image.id === selectedImage) ?? null;
  const totalStoryPages = Math.ceil(folkStories.length / STORIES_PER_PAGE);
  const currentStoryItems = folkStories.slice(
    (currentStoryPage - 1) * STORIES_PER_PAGE,
    currentStoryPage * STORIES_PER_PAGE,
  );

  const handleReadStory = async (story: (typeof folkStories)[number]) => {
    setSelectedStory(story);
    setIsStoryLoading(true);
    setStoryError(null);
    setStoryContent("");

    try {
      const storyPath = encodeURI(`/Truyên dân gian, danh nhân/${story.fileName}`);
      const response = await fetch(storyPath);

      if (!response.ok) {
        throw new Error("Không thể tải file truyện.");
      }

      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const normalizedText = result.value
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      setStoryContent(normalizedText || "Không có nội dung văn bản để hiển thị.");
    } catch {
      setStoryError("Đọc truyện thất bại. Vui lòng thử lại.");
    } finally {
      setIsStoryLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Kho Tư Liệu Lịch Sử</h1>
        <p className="text-blue-100 text-lg">
          Tổng hợp tranh ảnh, video, bản đồ và tài liệu lịch sử phong phú
        </p>
      </div>

      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-amber-100">
          <TabsTrigger value="images" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Image className="w-4 h-4 mr-2" />
            Hình ảnh
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Video className="w-4 h-4 mr-2" />
            Video
          </TabsTrigger>
          <TabsTrigger value="stories" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <BookText className="w-4 h-4 mr-2" />
            Truyện dân gian
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            Tài liệu
          </TabsTrigger>
        </TabsList>

        {/* Images Tab */}
        <TabsContent value="images" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentImageItems.map((image) => (
              <Card 
                key={image.id} 
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-2 border-amber-200"
                onClick={() => setSelectedImage(image.id)}
              >
                <ImageWithFallback
                  src={encodeURI(image.src)}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader className="pb-3">
                  <div className="flex gap-2 mb-2">
                    <Badge className="bg-red-600 text-white text-xs">
                      {image.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {image.period}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{image.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Trang {currentImagePage}/{totalImagePages} - Hiển thị {currentImageItems.length} ảnh
            </p>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Button
                variant="outline"
                className="border-amber-300"
                onClick={() => setCurrentImagePage((prev) => Math.max(prev - 1, 1))}
                disabled={currentImagePage === 1}
              >
                Trước
              </Button>

              {Array.from({ length: totalImagePages }, (_, idx) => idx + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentImagePage === page ? "default" : "outline"}
                  className={currentImagePage === page ? "bg-red-600 hover:bg-red-700" : "border-amber-300"}
                  onClick={() => setCurrentImagePage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                className="border-amber-300"
                onClick={() => setCurrentImagePage((prev) => Math.min(prev + 1, totalImagePages))}
                disabled={currentImagePage === totalImagePages}
              >
                Sau
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="border-2 border-amber-200 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
                      <div className="flex gap-3 text-sm text-gray-600">
                        <span>⏱️ {video.duration}</span>
                        <span>👁️ {video.views} lượt xem</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <a href={video.link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Xem video
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            * Video từ nguồn giáo dục YouTube và các kênh uy tín
          </p>
        </TabsContent>

        {/* Folk Stories Tab */}
        <TabsContent value="stories" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentStoryItems.map((story) => (
              <Card key={story.id} className="border-l-4 border-yellow-500 bg-gradient-to-r from-amber-50 to-white hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-4xl">📖</span>
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        <Badge className="bg-red-600 text-white text-xs">
                          {story.era}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {story.theme}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{story.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    Truyện dân gian Việt Nam gắn liền với lịch sử và truyền thống văn hóa dân tộc.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => void handleReadStory(story)}
                  >
                    Đọc truyện
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Trang {currentStoryPage}/{totalStoryPages} - Hiển thị {currentStoryItems.length} truyện
            </p>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Button
                variant="outline"
                className="border-amber-300"
                onClick={() => setCurrentStoryPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentStoryPage === 1}
              >
                Trước
              </Button>

              {Array.from({ length: totalStoryPages }, (_, idx) => idx + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentStoryPage === page ? "default" : "outline"}
                  className={currentStoryPage === page ? "bg-red-600 hover:bg-red-700" : "border-amber-300"}
                  onClick={() => setCurrentStoryPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                className="border-amber-300"
                onClick={() => setCurrentStoryPage((prev) => Math.min(prev + 1, totalStoryPages))}
                disabled={currentStoryPage === totalStoryPages}
              >
                Sau
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-6">
          <div className="space-y-4">
            {pdfsAndLinks.map((doc, index) => (
              <Card key={index} className="border-2 border-amber-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        doc.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {doc.type === 'PDF' ? (
                          <FileText className="w-6 h-6 text-red-600" />
                        ) : (
                          <ExternalLink className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{doc.title}</h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <Badge variant="secondary" className="text-xs">
                            {doc.type}
                          </Badge>
                          {doc.size !== '-' && <span>📦 {doc.size}</span>}
                        </div>
                      </div>
                    </div>
                    <a href={doc.link} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-red-600 hover:bg-red-700">
                        {doc.type === 'PDF' ? (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Tải về
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Truy cập
                          </>
                        )}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
            <CardHeader>
              <CardTitle className="text-red-800">📚 Nguồn trích dẫn hợp lý</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">
                Tất cả tài liệu được tổng hợp từ các nguồn uy tín:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Bộ Giáo dục và Đào tạo</li>
                <li>Bảo tàng Lịch sử Quốc gia Việt Nam</li>
                <li>Nhà xuất bản Giáo dục Việt Nam</li>
                <li>Các nền tảng giáo dục lịch sử uy tín</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={selectedStory !== null} onOpenChange={(isOpen) => !isOpen && setSelectedStory(null)}>
        <DialogContent className="max-w-5xl p-4 sm:p-6">
          {selectedStory && (
            <>

              <div className="mt-2 max-h-[70vh] overflow-y-auto rounded-lg border border-amber-200 bg-white p-4">
                {isStoryLoading && <p className="text-sm text-gray-600">Đang tải nội dung truyện...</p>}
                {!isStoryLoading && storyError && <p className="text-sm text-red-600">{storyError}</p>}
                {!isStoryLoading && !storyError && (
                  <p className="whitespace-pre-wrap text-[15px] leading-7 text-gray-800">{storyContent}</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={selectedImage !== null} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-4 sm:p-6">
          {selectedImageData && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedImageData.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 pt-1">
                  <Badge className="bg-red-600 text-white text-xs">{selectedImageData.category}</Badge>
                  <Badge variant="secondary" className="text-xs">{selectedImageData.period}</Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-2 overflow-hidden rounded-lg border border-amber-200 bg-black/5">
                <ImageWithFallback
                  src={encodeURI(selectedImageData.src)}
                  alt={selectedImageData.title}
                  className="h-[65vh] w-full object-contain"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
