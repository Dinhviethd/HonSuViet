import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, BookMarked, History } from "lucide-react";

const historicalTerms = [
  {
    term: "Bách Việt",
    category: "Dân tộc",
    definition: "Tên gọi chung các bộ lạc người Việt cổ sinh sống ở vùng lưu vực sông Trường Giang và phía Nam Trung Quốc từ thời tiền sử.",
    era: "Tiền sử",
    related: ["Âu Việt", "Lạc Việt", "Văn Lang"]
  },
  {
    term: "Bắc thuộc",
    category: "Thời kỳ",
    definition: "Thời kỳ Việt Nam bị các triều đại phong kiến phương Bắc (chủ yếu là Trung Quốc) thống trị, kéo dài hơn 1000 năm từ năm 179 TCN đến năm 938.",
    era: "Thời kỳ Bắc thuộc",
    related: ["Quận Giao Chỉ", "Đô Hộ Phủ", "Khởi nghĩa"]
  },
  {
    term: "Chiêu Văn",
    category: "Văn bản",
    definition: "Văn bản kêu gọi nhân dân khởi nghĩa chống giặc ngoại xâm, nổi tiếng nhất là Bình Ngô Đại Cáo của Nguyễn Trãi.",
    era: "Thời Lê",
    related: ["Bình Ngô Đại Cáo", "Nguyễn Trãi", "Lê Lợi"]
  },
  {
    term: "Đại Cồ Việt",
    category: "Quốc hiệu",
    definition: "Quốc hiệu của Việt Nam dưới thời vua Lý Thánh Tông (1054-1072), thể hiện ý chí tự chủ và sự phát triển mạnh mẽ của đất nước.",
    era: "Thời Lý",
    related: ["Lý Thánh Tông", "Đại Việt", "Nhà Lý"]
  },
  {
    term: "Đại Việt",
    category: "Quốc hiệu",
    definition: "Tên nước Việt Nam từ thời Lý Anh Tông (1075) cho đến triều Nguyễn. Đây là quốc hiệu được sử dụng lâu dài nhất trong lịch sử.",
    era: "Phong kiến",
    related: ["Đại Cồ Việt", "An Nam", "Việt Nam"]
  },
  {
    term: "Đinh Bộ Lĩnh",
    category: "Nhân vật",
    definition: "Người sáng lập nhà Đinh (968-980), đưa đất nước vào thời kỳ tự chủ sau hơn 1000 năm Bắc thuộc. Xưng đế với niên hiệu Thái Bình.",
    era: "Thời Đinh - Tiền Lê",
    related: ["Nhà Đinh", "Hoa Lư", "Đại Cồ Việt"]
  },
  {
    term: "Đỗ Nhuận",
    category: "Nhân vật",
    definition: "Tướng quân thời Trần, người có công trong việc đào sông Vân Đồn chuẩn bị cho trận Bạch Đằng đánh quân Nguyên Mông.",
    era: "Thời Trần",
    related: ["Trần Hưng Đạo", "Bạch Đằng", "Nguyên Mông"]
  },
  {
    term: "Đông Sơn",
    category: "Văn hóa",
    definition: "Nền văn hóa đồ đồng phát triển cao nhất ở Việt Nam và Đông Nam Á (khoảng 1000 TCN - 100 SCN), nổi tiếng với nghệ thuật chế tác trống đồng.",
    era: "Tiền sử",
    related: ["Trống đồng", "Văn Lang", "Đồ đồng"]
  },
  {
    term: "Hải Thượng Lãn Ông",
    category: "Nhân vật",
    definition: "Lê Hữu Trác (1720-1791), danh y nổi tiếng thời Lê Trung Hưng, có nhiều đóng góp cho nền y học cổ truyền Việt Nam.",
    era: "Thời Lê Trung Hưng",
    related: ["Y học", "Lê Hữu Trác", "Danh y"]
  },
  {
    term: "Hai Bà Trưng",
    category: "Nhân vật",
    definition: "Trưng Trắc và Trưng Nhị, hai chị em khởi nghĩa chống quân Hán năm 40, lập nên nhà nước Lĩnh Nam với Trưng Trắc làm Nữ Vương.",
    era: "Bắc thuộc lần 1",
    related: ["Khởi nghĩa", "Nữ vương", "Tô Định"]
  },
  {
    term: "Hoàng Thành Thăng Long",
    category: "Di tích",
    definition: "Trung tâm chính trị của Đại Việt trong hơn 1000 năm, từ thời Lý đến cuối thời Lê. Hiện là di sản văn hóa thế giới UNESCO.",
    era: "Phong kiến",
    related: ["Thăng Long", "Hà Nội", "Lý Thái Tổ"]
  },
  {
    term: "Khoa cử",
    category: "Chế độ",
    definition: "Chế độ thi cử để tuyển chọn quan lại dựa trên học vấn và tài năng, bắt đầu từ thời Lý và phát triển mạnh thời Lê.",
    era: "Phong kiến",
    related: ["Văn Miếu", "Tiến sĩ", "Nho giáo"]
  },
  {
    term: "Lê Lợi",
    category: "Nhân vật",
    definition: "Người lãnh đạo khởi nghĩa Lam Sơn (1418-1427) chống quân Minh, sau đó lên ngôi, lập ra nhà Lê (Lê Sơ), một trong những triều đại hưng thịnh nhất.",
    era: "Thời Lê",
    related: ["Lam Sơn", "Nhà Lê", "Nguyễn Trãi"]
  },
  {
    term: "Lý Thái Tổ",
    category: "Nhân vật",
    definition: "Lý Công Uẩn, người sáng lập nhà Lý (1009-1225), dời đô từ Hoa Lư về Thăng Long, mở ra thời kỳ phát triển rực rỡ của đất nước.",
    era: "Thời Lý",
    related: ["Nhà Lý", "Thăng Long", "Chiếu dời đô"]
  },
  {
    term: "Ngô Quyền",
    category: "Nhân vật",
    definition: "Người lãnh đạo quân dân đánh tan quân Nam Hán trên sông Bạch Đằng năm 938, chấm dứt ách Bắc thuộc, lập ra nhà Ngô.",
    era: "Thời Ngô",
    related: ["Bạch Đằng 938", "Nhà Ngô", "Nam Hán"]
  },
  {
    term: "Nho giáo",
    category: "Tư tưởng",
    definition: "Hệ tư tưởng triết học và đạo đức của Khổng Tử, trở thành nền tảng tư tưởng thống trị trong các triều đại phong kiến Việt Nam.",
    era: "Phong kiến",
    related: ["Khổng Tử", "Khoa cử", "Văn Miếu"]
  },
  {
    term: "Quận Giao Chỉ",
    category: "Địa danh",
    definition: "Tên gọi của Việt Nam thời Bắc thuộc, được nhà Hán lập ra năm 111 TCN. Đây là đơn vị hành chính của chế độ quận huyện.",
    era: "Bắc thuộc",
    related: ["Bắc thuộc", "Nhà Hán", "Giao Châu"]
  },
  {
    term: "Trần Hưng Đạo",
    category: "Nhân vật",
    definition: "Trần Quốc Tuấn (1228-1300), danh tướng thời Trần, người chỉ huy ba lần đánh thắng quân Nguyên Mông xâm lược (1258, 1285, 1288).",
    era: "Thời Trần",
    related: ["Bạch Đằng", "Nguyên Mông", "Nhà Trần"]
  },
  {
    term: "Trống đồng",
    category: "Hiện vật",
    definition: "Loại nhạc cụ bằng đồng đặc trưng của văn hóa Đông Sơn, được trang trí tinh xảo, hiện là biểu tượng văn hóa Việt Nam.",
    era: "Tiền sử",
    related: ["Đông Sơn", "Ngọc Lũ", "Văn hóa đồ đồng"]
  },
  {
    term: "Văn Lang",
    category: "Quốc hiệu",
    definition: "Tên nước đầu tiên của Việt Nam do Hùng Vương dựng nên, tồn tại từ khoảng thế kỷ 7 TCN đến 258 TCN.",
    era: "Tiền sử",
    related: ["Hùng Vương", "Âu Lạc", "Lạc Việt"]
  }
];

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const categories = ["Tất cả", "Nhân vật", "Địa danh", "Văn hóa", "Thời kỳ", "Chế độ", "Quốc hiệu", "Hiện vật", "Văn bản", "Tư tưởng", "Di tích", "Dân tộc"];

  const filteredTerms = historicalTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <BookMarked className="w-10 h-10" />
          Từ điển Thuật ngữ Lịch sử
        </h1>
        <p className="text-indigo-100 text-lg">
          Tra cứu và tìm hiểu các thuật ngữ quan trọng trong lịch sử Việt Nam
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="border-2 border-indigo-200">
        <CardContent className="p-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Tìm kiếm thuật ngữ lịch sử..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg border-2 border-indigo-300 focus:border-indigo-600"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="text-sm text-gray-600">
            Tìm thấy <span className="font-bold text-indigo-600">{filteredTerms.length}</span> thuật ngữ
          </div>
        </CardContent>
      </Card>

      {/* Dictionary Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((item, index) => (
          <Card key={index} className="border-2 border-amber-200 hover:shadow-lg transition-all bg-gradient-to-br from-white to-amber-50">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <CardTitle className="text-2xl text-red-800 mb-2">
                    {item.term}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-indigo-600 text-white">
                      {item.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <History className="w-3 h-3 mr-1" />
                      {item.era}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="text-gray-700 text-base leading-relaxed mt-3">
                {item.definition}
              </CardDescription>
            </CardHeader>
            
            {item.related && item.related.length > 0 && (
              <CardContent>
                <div className="border-t border-amber-200 pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Từ liên quan:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.related.map((related, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-red-300 text-red-700 hover:bg-red-50 cursor-pointer">
                        {related}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card className="border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Không tìm thấy thuật ngữ
            </h3>
            <p className="text-gray-600">
              Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
