import { Outlet, Link, useLocation } from "react-router-dom";
import { BookOpen, Trophy, MessageSquare, BookMarked, Library, Gamepad2, FileText, GraduationCap, Search, User, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FloatingDragon, TranHoPattern } from "@/features/hon-su-viet/components/DragonPattern";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const navigation = [
  { name: "Trang chủ", href: "/hon-su-viet", icon: BookOpen },
  { name: "Bài học", href: "/hon-su-viet/lessons", icon: GraduationCap },
  { name: "Kiểm tra", href: "/hon-su-viet/tests", icon: FileText },
  { name: "Kho tư liệu", href: "/hon-su-viet/resources", icon: Library },
  { name: "Diễn đàn", href: "/hon-su-viet/forum", icon: MessageSquare },
  { name: "Từ điển", href: "/hon-su-viet/dictionary", icon: BookMarked },
  { name: "Trò chơi", href: "/hon-su-viet/games", icon: Gamepad2 },
];

export default function HonSuVietLayout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const userProgress = {
    name: "Học sinh",
    level: 5,
    xp: 750,
    xpToNextLevel: 1000,
    energy: 85,
    badges: 12,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-800 via-red-700 to-amber-800 text-white shadow-2xl border-b-4 border-yellow-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <TranHoPattern />
        </div>
        
        <FloatingDragon className="absolute top-2 left-10 w-24 h-16 opacity-30 hidden lg:block" />
        <FloatingDragon className="absolute top-2 right-10 w-24 h-16 opacity-30 hidden lg:block transform scale-x-[-1]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/hon-su-viet" className="flex items-center space-x-3 group">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src="/logo.png" alt="" />
              </div>
              <div>
                <h1 className="font-black text-2xl tracking-wide bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
                  HỒN SỬ VIỆT
                </h1>
                <p className="text-xs text-yellow-200 font-medium"> Ngược dòng thời gian - Khám phá Sử Việt</p>
              </div>
            </Link>

            {/* Search Bar & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm bài học, nhân vật..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="pl-10 pr-4 py-2 w-64 bg-white/90 border-2 border-yellow-400 focus:border-yellow-300 text-gray-800 placeholder:text-gray-500"
                />
                {isSearchOpen && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border-2 border-yellow-400 max-h-96 overflow-y-auto">
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-2">Kết quả tìm kiếm:</p>
                      <div className="space-y-2">
                        <div className="p-2 hover:bg-amber-50 rounded cursor-pointer">
                          <p className="text-sm font-medium text-gray-800">Khởi nghĩa Hai Bà Trưng</p>
                          <p className="text-xs text-gray-500">Bài học • Thời Bắc thuộc</p>
                        </div>
                        <div className="p-2 hover:bg-amber-50 rounded cursor-pointer">
                          <p className="text-sm font-medium text-gray-800">Trống Đồng Đông Sơn</p>
                          <p className="text-xs text-gray-500">Tư liệu • Văn hóa cổ đại</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <div>
                    <p className="text-xs text-yellow-200">Cấp độ</p>
                    <p className="font-bold text-sm">{userProgress.level}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 min-w-[160px]">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-yellow-200">Năng lượng</p>
                  <p className="text-xs font-bold">{userProgress.energy}/100</p>
                </div>
                <Progress value={userProgress.energy} className="h-2 bg-red-900/50" />
              </div>

              <Badge className="bg-yellow-500 text-red-900 hover:bg-yellow-400 px-3 py-1 font-bold cursor-pointer">
                {userProgress.badges} 🏅
              </Badge>

              <Button 
                onClick={() => setIsLoginOpen(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 hover:from-yellow-500 hover:to-yellow-600 font-bold shadow-lg border-2 border-yellow-600"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Đăng nhập
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="text-white" onClick={() => setIsSearchOpen(true)}>
                <Search className="w-5 h-5" />
              </Button>
              <Button size="sm" className="bg-yellow-500 text-red-900" onClick={() => setIsLoginOpen(true)}>
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="pb-3">
            <ul className="flex space-x-1 overflow-x-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href || 
                  (item.href !== "/hon-su-viet" && location.pathname.startsWith(item.href));
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-all ${
                        isActive
                          ? "bg-amber-50 text-red-700 shadow-lg border-t-2 border-x-2 border-yellow-500 font-bold"
                          : "text-yellow-100 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md border-4 border-yellow-500 bg-gradient-to-br from-red-50 to-amber-50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-red-800 flex items-center gap-2">
              <span className="text-3xl">🐉</span>
              Đăng nhập Hồn Sử Việt
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Đăng nhập để lưu tiến độ học tập và tham gia thử thách!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">Tên đăng nhập</Label>
              <Input 
                id="username" 
                placeholder="Nhập tên đăng nhập" 
                className="border-2 border-amber-300 focus:border-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Mật khẩu</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Nhập mật khẩu"
                className="border-2 border-amber-300 focus:border-red-500"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-bold text-lg h-12">
              Đăng nhập
            </Button>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">hoặc</p>
              <Button variant="outline" className="w-full border-2 border-yellow-500 text-red-700 hover:bg-yellow-50 font-medium">
                Đăng ký tài khoản mới
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-140px)]" onClick={() => setIsSearchOpen(false)}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-red-900 to-amber-900 text-amber-100 border-t-4 border-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <TranHoPattern />
        </div>
        
        <FloatingDragon className="absolute bottom-4 left-20 w-32 h-20 opacity-20 hidden lg:block" />
        <FloatingDragon className="absolute bottom-4 right-20 w-32 h-20 opacity-20 hidden lg:block transform scale-x-[-1]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-yellow-300 mb-3 text-lg">Về Hồn Sử Việt</h3>
              <p className="text-sm text-amber-200">
                Nền tảng học tập lịch sử Việt Nam dành cho học sinh THCS, 
                mang đến trải nghiệm học tập sinh động, tôn vinh bản sắc dân tộc.
              </p>
              <p className="text-xs text-yellow-300 mt-3 font-medium italic">
                "Ngược dòng thời gian - Khám phá Sử Việt"
              </p>
            </div>
            <div>
              <h3 className="font-bold text-yellow-300 mb-3 text-lg">Liên hệ</h3>
              <p className="text-sm text-amber-200">Email: contact@honsuviet.edu.vn</p>
              <p className="text-sm text-amber-200">Hotline: 1900-xxxx</p>
            </div>
            <div>
              <h3 className="font-bold text-yellow-300 mb-3 text-lg">Nguồn tham khảo</h3>
              <ul className="text-sm text-amber-200 space-y-1">
                <li>• Bảo tàng Lịch sử Quốc gia</li>
                <li>• Người kể lịch</li>
                <li>• Đại Việt Kỳ Nhân</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-amber-700 text-center">
            <p className="text-sm text-yellow-300 font-bold">
              © 2026 Hồn Sử Việt - Khơi nguồn tự hào dân tộc
            </p>
            <p className="text-xs text-amber-300 mt-1">
              "Học lịch sử để hiểu hiện tại và xây dựng tương lai"
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
