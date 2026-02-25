import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp, MessageCircle, Bot, Send, Sparkles, Users, TrendingUp } from "lucide-react";

const forumPosts = [
  {
    id: 1,
    author: "Minh Anh",
    avatar: "MA",
    title: "Tại sao Hai Bà Trưng được coi là anh hùng dân tộc?",
    content: "Mình đang tìm hiểu về khởi nghĩa Hai Bà Trưng và muốn hiểu rõ hơn về vai trò của các Bà trong lịch sử Việt Nam...",
    topic: "Bắc thuộc",
    replies: 12,
    likes: 45,
    time: "2 giờ trước"
  },
  {
    id: 2,
    author: "Tuấn Kiệt",
    avatar: "TK",
    title: "Chiến thuật nào giúp Trần Hưng Đạo đánh thắng quân Nguyên?",
    content: "Các bạn có thể giải thích chi tiết về chiến thuật Bạch Đằng được không? Mình thấy rất thú vị!",
    topic: "Triều Trần",
    replies: 18,
    likes: 67,
    time: "5 giờ trước"
  },
  {
    id: 3,
    author: "Thu Hà",
    avatar: "TH",
    title: "Văn hóa Đông Sơn có những đặc điểm gì nổi bật?",
    content: "Em chuẩn bị làm bài thuyết trình về văn hóa Đông Sơn, mọi người có thể gợi ý những điểm quan trọng cần nói không?",
    topic: "Tiền sử",
    replies: 8,
    likes: 34,
    time: "1 ngày trước"
  },
  {
    id: 4,
    author: "Hoàng Long",
    avatar: "HL",
    title: "So sánh triều đại Lý và Trần",
    content: "Các triều đại Lý và Trần có những điểm giống và khác nhau như thế nào về chính trị, kinh tế, văn hóa?",
    topic: "Phong kiến",
    replies: 15,
    likes: 52,
    time: "2 ngày trước"
  }
];

const trendingTopics = [
  { name: "Trận Bạch Đằng", posts: 45 },
  { name: "Văn hóa Đông Sơn", posts: 38 },
  { name: "Hai Bà Trưng", posts: 32 },
  { name: "Triều Nguyễn", posts: 28 },
  { name: "Cách mạng Tháng Tám", posts: 24 }
];

export default function ForumPage() {
  const [chatMessages, setChatMessages] = useState([
    { type: "ai", text: "Xin chào! Tôi là trợ lý AI lịch sử Việt Nam. Bạn có câu hỏi gì về lịch sử không?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setChatMessages([...chatMessages, { type: "user", text: inputMessage }]);

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: "ai",
        text: `Đây là câu trả lời mô phỏng cho câu hỏi: "${inputMessage}". Trong phiên bản thực tế, đây sẽ kết nối với AI chatbot như GPT, Claude, hoặc Gemini để trả lời chi tiết về lịch sử Việt Nam.`
      }]);
    }, 1000);

    setInputMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Diễn đàn & Hỏi đáp</h1>
        <p className="text-purple-100 text-lg">
          Trao đổi kiến thức, thảo luận và học hỏi cùng cộng đồng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Forum Posts - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="discussions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-purple-100">
              <TabsTrigger value="discussions" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                Thảo luận
              </TabsTrigger>
              <TabsTrigger value="ai-chat" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Bot className="w-4 h-4 mr-2" />
                AI Chatbox
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="mt-6 space-y-4">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                ➕ Tạo bài viết mới
              </Button>

              {forumPosts.map((post) => (
                <Card key={post.id} className="border-2 border-purple-200 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        <AvatarFallback>{post.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-800">{post.author}</span>
                          <span className="text-sm text-gray-500">• {post.time}</span>
                          <Badge className="bg-red-600 text-white text-xs">
                            {post.topic}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-gray-800 mb-2 hover:text-red-700 transition-colors cursor-pointer">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {post.content}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <button className="flex items-center gap-2 hover:text-purple-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes} thích</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-purple-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.replies} trả lời</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ai-chat" className="mt-6">
              <Card className="border-2 border-purple-300 h-[600px] flex flex-col">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-6 h-6" />
                    Trợ lý AI Lịch sử Việt Nam
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Hỏi bất kỳ câu hỏi nào về lịch sử Việt Nam
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        message.type === 'user'
                          ? 'bg-red-600 text-white'
                          : 'bg-white border-2 border-purple-200 text-gray-800'
                      } rounded-2xl px-4 py-3 shadow-md`}>
                        {message.type === 'ai' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="w-4 h-4 text-purple-600" />
                            <span className="font-semibold text-sm text-purple-600">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                <div className="p-4 border-t-2 border-purple-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Hỏi về lịch sử Việt Nam..."
                      className="flex-1 px-4 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-600 focus:outline-none"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Tính năng này sẽ liên kết với AI như ChatGPT, Claude hoặc Gemini trong phiên bản thực tế
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <TrendingUp className="w-5 h-5" />
                Chủ đề thịnh hành
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-800">{topic.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {topic.posts} bài
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Users className="w-5 h-5" />
                Thống kê cộng đồng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-3xl font-bold text-purple-600">2,345</p>
                <p className="text-sm text-gray-600">Thành viên</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-3xl font-bold text-pink-600">567</p>
                <p className="text-sm text-gray-600">Bài viết</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-3xl font-bold text-orange-600">1,234</p>
                <p className="text-sm text-gray-600">Thảo luận</p>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Sparkles className="w-5 h-5" />
                Quy tắc diễn đàn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600">✓</span>
                  <span>Tôn trọng ý kiến của mọi người</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600">✓</span>
                  <span>Chia sẻ kiến thức chính xác</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600">✓</span>
                  <span>Không spam hoặc quảng cáo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600">✓</span>
                  <span>Trích nguồn khi cần thiết</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
