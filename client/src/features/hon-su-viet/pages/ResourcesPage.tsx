import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { Image, Video, Map, BookText, FileText, ExternalLink, Download } from "lucide-react";

const imageGallery = [
  { id: 1, title: "Trống đồng Ngọc Lũ", category: "Hiện vật", period: "Đông Sơn", src: "https://images.unsplash.com/photo-1714073619284-b71674885558?w=400" },
  { id: 2, title: "Hoàng Thành Huế", category: "Di tích", period: "Triều Nguyễn", src: "https://images.unsplash.com/photo-1759508598711-a15d85b2ada0?w=400" },
  { id: 3, title: "Chùa Một Cột", category: "Kiến trúc", period: "Thời Lý", src: "https://images.unsplash.com/photo-1740476376215-22fc302da920?w=400" },
  { id: 4, title: "Phố cổ Hội An", category: "Di sản", period: "Thế kỷ 15-19", src: "https://images.unsplash.com/photo-1714073619284-b71674885558?w=400" },
  { id: 5, title: "Văn Miếu Quốc Tử Giám", category: "Giáo dục", period: "Thời Lý-Trần", src: "https://images.unsplash.com/photo-1740476376215-22fc302da920?w=400" },
  { id: 6, title: "Thành nhà Hồ", category: "Di tích", period: "Thời Hồ", src: "https://images.unsplash.com/photo-1759508598711-a15d85b2ada0?w=400" },
];

const videos = [
  { id: 1, title: "Văn hóa Đông Sơn - Bí ẩn trống đồng", duration: "15:30", views: "125K", link: "https://www.youtube.com/results?search_query=dong+son+culture+vietnam" },
  { id: 2, title: "Khởi nghĩa Hai Bà Trưng", duration: "12:45", views: "98K", link: "https://www.youtube.com/results?search_query=hai+ba+trung" },
  { id: 3, title: "Trận Bạch Đằng 938 - Ngô Quyền", duration: "18:20", views: "156K", link: "https://www.youtube.com/results?search_query=bach+dang+ngo+quyen" },
  { id: 4, title: "Trần Hưng Đạo đánh Nguyên Mông", duration: "22:10", views: "203K", link: "https://www.youtube.com/results?search_query=tran+hung+dao" },
  { id: 5, title: "Lê Lợi và khởi nghĩa Lam Sơn", duration: "16:40", views: "87K", link: "https://www.youtube.com/results?search_query=le+loi+lam+son" },
  { id: 6, title: "Cách mạng Tháng Tám 1945", duration: "25:15", views: "267K", link: "https://www.youtube.com/results?search_query=cach+mang+thang+tam" },
];

const historicalMaps = [
  { id: 1, title: "Bản đồ Đại Việt thời Lý - Trần", period: "Thế kỷ 11-14" },
  { id: 2, title: "Lãnh thổ Văn Lang - Âu Lạc", period: "Thời Tiền sử" },
  { id: 3, title: "Giao Châu thời Bắc thuộc", period: "Thế kỷ 1-10" },
  { id: 4, title: "Đại Việt thời Lê sơ", period: "Thế kỷ 15" },
  { id: 5, title: "Đàng Trong - Đàng Ngoài", period: "Thế kỷ 16-18" },
  { id: 6, title: "Việt Nam thời Pháp thuộc", period: "1858-1945" },
];

const folkStories = [
  { id: 1, title: "Truyền thuyết Thánh Gióng", era: "Hùng Vương", theme: "Anh hùng dân tộc" },
  { id: 2, title: "Sơn Tinh - Thủy Tinh", era: "Hùng Vương", theme: "Thiên nhiên" },
  { id: 3, title: "Bánh Chưng - Bánh Dày", era: "Hùng Vương", theme: "Truyền thống" },
  { id: 4, title: "Mị Châu - Trọng Thủy", era: "An Dương Vương", theme: "Tình yêu lịch sử" },
  { id: 5, title: "Chử Đồng Tử", era: "Thời Lý", theme: "Truyền thuyết" },
];

const pdfsAndLinks = [
  { title: "Giáo trình Lịch sử Việt Nam Cổ đại", type: "PDF", size: "12.5 MB", source: "Bộ Giáo dục và Đào tạo", link: "https://www.moet.gov.vn/" },
  { title: "Atlas Lịch sử Việt Nam", type: "PDF", size: "25.3 MB", source: "Nhà xuất bản Giáo dục", link: "https://nxbgd.vn/" },
  { title: "Bảo tàng Lịch sử Quốc gia", type: "Website", size: "-", source: "Bảo tàng Lịch sử Quốc gia", link: "https://baotanglichsu.vn/" },
  { title: "Người kể lịch", type: "Website", size: "-", source: "Nền tảng giáo dục", link: "https://nguoikelic.vn/" },
  { title: "Đại Việt Kỳ Nhân", type: "Website", size: "-", source: "Trang sơ đồ lịch sử", link: "https://daivietkynhan.vn/" },
];

export default function ResourcesPage() {
  const [_selectedImage, setSelectedImage] = useState<number | null>(null);

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
        <TabsList className="grid w-full grid-cols-5 bg-amber-100">
          <TabsTrigger value="images" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Image className="w-4 h-4 mr-2" />
            Hình ảnh
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Video className="w-4 h-4 mr-2" />
            Video
          </TabsTrigger>
          <TabsTrigger value="maps" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Map className="w-4 h-4 mr-2" />
            Bản đồ
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
            {imageGallery.map((image) => (
              <Card 
                key={image.id} 
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-2 border-amber-200"
                onClick={() => setSelectedImage(image.id)}
              >
                <ImageWithFallback
                  src={image.src}
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

        {/* Maps Tab */}
        <TabsContent value="maps" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {historicalMaps.map((map) => (
              <Card key={map.id} className="border-2 border-amber-200 hover:shadow-lg transition-all">
                <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <Map className="w-20 h-20 text-red-600 opacity-50" />
                </div>
                <CardHeader>
                  <Badge className="bg-yellow-500 text-red-900 w-fit mb-2">
                    {map.period}
                  </Badge>
                  <CardTitle className="text-lg">{map.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Folk Stories Tab */}
        <TabsContent value="stories" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {folkStories.map((story) => (
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
                  <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                    Đọc truyện
                  </Button>
                </CardContent>
              </Card>
            ))}
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
                          <span>Nguồn: {doc.source}</span>
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
    </div>
  );
}
