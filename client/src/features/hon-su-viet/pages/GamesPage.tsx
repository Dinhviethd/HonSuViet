import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Zap, Award, Crown, Star, Gamepad2, Target, Users } from "lucide-react";

const games = [
  {
    id: 1, title: "Trắc nghiệm chớp nhoáng",
    description: "Trả lời nhanh 10 câu hỏi lịch sử trong 60 giây",
    icon: "⚡", difficulty: "Dễ", xpReward: 50, energyCost: 10, color: "from-yellow-500 to-orange-500"
  },
  {
    id: 2, title: "Ghép thẻ sự kiện",
    description: "Ghép đúng sự kiện với thời gian xảy ra",
    icon: "🃏", difficulty: "Trung bình", xpReward: 75, energyCost: 15, color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3, title: "Ô chữ lịch sử",
    description: "Giải ô chữ với các gợi ý về lịch sử Việt Nam",
    icon: "🔤", difficulty: "Trung bình", xpReward: 100, energyCost: 20, color: "from-green-500 to-emerald-500"
  },
  {
    id: 4, title: "Đường dây thời gian",
    description: "Sắp xếp các sự kiện lịch sử theo đúng thứ tự",
    icon: "📅", difficulty: "Khó", xpReward: 125, energyCost: 25, color: "from-purple-500 to-pink-500"
  },
  {
    id: 5, title: "Tìm nhân vật bí ẩn",
    description: "Đoán tên nhân vật lịch sử qua các gợi ý",
    icon: "🕵️", difficulty: "Khó", xpReward: 150, energyCost: 30, color: "from-red-500 to-rose-500"
  },
  {
    id: 6, title: "Boss chiến - Tri thức lịch sử",
    description: "Thử thách cuối với 50 câu hỏi khó nhất",
    icon: "👑", difficulty: "Cực khó", xpReward: 300, energyCost: 50, color: "from-indigo-600 to-purple-600"
  }
];

const leaderboard = [
  { rank: 1, name: "Nguyễn Minh Anh", level: 24, xp: 12450, badge: "Sử gia tối cao", avatar: "NMA" },
  { rank: 2, name: "Trần Tuấn Kiệt", level: 22, xp: 11200, badge: "Bậc thầy lịch sử", avatar: "TTK" },
  { rank: 3, name: "Lê Thu Hà", level: 20, xp: 9850, badge: "Nhà nghiên cứu", avatar: "LTH" },
  { rank: 4, name: "Phạm Hoàng Long", level: 19, xp: 9320, badge: "Học giả", avatar: "PHL" },
  { rank: 5, name: "Đỗ Mai Linh", level: 18, xp: 8750, badge: "Chuyên gia", avatar: "DML" },
  { rank: 6, name: "Vũ Đức Nam", level: 17, xp: 8200, badge: "Chuyên gia", avatar: "VDN" },
  { rank: 7, name: "Ngô Thanh Tâm", level: 16, xp: 7680, badge: "Người am hiểu", avatar: "NTT" },
  { rank: 8, name: "Bùi Khánh Linh", level: 15, xp: 7100, badge: "Người am hiểu", avatar: "BKL" },
  { rank: 9, name: "Đinh Quang Huy", level: 14, xp: 6550, badge: "Học viên xuất sắc", avatar: "DQH" },
  { rank: 10, name: "Hoàng Mỹ Duyên", level: 13, xp: 6000, badge: "Học viên xuất sắc", avatar: "HMD" },
];

const badges = [
  { id: 1, name: "Người mới", icon: "🌱", description: "Hoàn thành bài học đầu tiên", unlocked: true, rarity: "common" },
  { id: 2, name: "Học sinh chăm chỉ", icon: "📚", description: "Học 7 ngày liên tiếp", unlocked: true, rarity: "common" },
  { id: 3, name: "Thạc sĩ Đông Sơn", icon: "🥁", description: "Hoàn thành giai đoạn Tiền sử", unlocked: true, rarity: "uncommon" },
  { id: 4, name: "Chiến binh Bạch Đằng", icon: "⚔️", description: "Đạt 100% bài kiểm tra Ngô Quyền", unlocked: true, rarity: "uncommon" },
  { id: 5, name: "Danh tướng Trần", icon: "🛡️", description: "Hoàn thành giai đoạn Lý - Trần", unlocked: false, rarity: "rare" },
  { id: 6, name: "Nhà ngoại giao", icon: "🎭", description: "Tham gia 50 thảo luận diễn đàn", unlocked: false, rarity: "rare" },
  { id: 7, name: "Bậc thầy lịch sử", icon: "👨‍🎓", description: "Đạt level 20", unlocked: false, rarity: "epic" },
  { id: 8, name: "Sử gia huyền thoại", icon: "📜", description: "Hoàn thành tất cả bài học", unlocked: false, rarity: "legendary" },
  { id: 9, name: "Vua quiz", icon: "🏆", description: "Thắng 100 trận quiz", unlocked: false, rarity: "epic" },
  { id: 10, name: "Chinh phục đỉnh cao", icon: "⭐", description: "Đứng top 1 bảng xếp hạng", unlocked: false, rarity: "legendary" },
];

const playerStats = {
  name: "Học sinh",
  level: 5,
  currentXP: 750,
  xpToNextLevel: 1000,
  energy: 85,
  maxEnergy: 100,
  energyRegenTime: "15 phút",
  rank: 245,
  totalGames: 42,
  gamesWon: 28,
  winRate: 67,
  badges: 4,
  streak: 5,
};

const rarityColors: Record<string, string> = {
  common: "bg-gray-400",
  uncommon: "bg-green-500",
  rare: "bg-blue-500",
  epic: "bg-purple-600",
  legendary: "bg-yellow-500"
};

export default function GamesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Player Stats */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Gamepad2 className="w-10 h-10" />
              Trò chơi Lịch sử
            </h1>
            <p className="text-orange-100 text-lg">
              Học qua chơi, chơi mà học - Vui vẻ chinh phục kiến thức!
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-2">
              <Crown className="w-6 h-6 text-yellow-300" />
              <span className="text-2xl font-bold">Cấp {playerStats.level}</span>
            </div>
            <Badge className="bg-yellow-500 text-orange-900">
              Hạng #{playerStats.rank}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-2 font-semibold">
                <Star className="w-5 h-5 text-yellow-300" />
                Kinh nghiệm (XP)
              </span>
              <span className="font-bold">{playerStats.currentXP} / {playerStats.xpToNextLevel}</span>
            </div>
            <Progress value={(playerStats.currentXP / playerStats.xpToNextLevel) * 100} className="h-3 bg-orange-900/50" />
            <p className="text-xs text-orange-200 mt-2">
              Còn {playerStats.xpToNextLevel - playerStats.currentXP} XP nữa lên cấp {playerStats.level + 1}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-2 font-semibold">
                <Zap className="w-5 h-5 text-yellow-300" />
                Năng lượng
              </span>
              <span className="font-bold">{playerStats.energy} / {playerStats.maxEnergy}</span>
            </div>
            <Progress value={(playerStats.energy / playerStats.maxEnergy) * 100} className="h-3 bg-orange-900/50" />
            <p className="text-xs text-orange-200 mt-2">
              ⚡ Hồi phục {playerStats.energyRegenTime} / 1 năng lượng
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-orange-100">
          <TabsTrigger value="games" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Gamepad2 className="w-4 h-4 mr-2" />
            Trò chơi
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Trophy className="w-4 h-4 mr-2" />
            Bảng xếp hạng
          </TabsTrigger>
          <TabsTrigger value="badges" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Award className="w-4 h-4 mr-2" />
            Huy hiệu
          </TabsTrigger>
        </TabsList>

        {/* Games Tab */}
        <TabsContent value="games" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="border-2 border-amber-200 hover:shadow-xl transition-all overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${game.color}`} />
                <CardHeader>
                  <div className="text-5xl mb-3">{game.icon}</div>
                  <CardTitle className="text-xl">{game.title}</CardTitle>
                  <CardDescription className="text-base">{game.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-orange-50 p-3 rounded-lg text-center">
                      <Target className="w-4 h-4 mx-auto mb-1 text-orange-600" />
                      <p className="font-semibold text-orange-700">{game.difficulty}</p>
                      <p className="text-xs text-gray-600">Độ khó</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <Star className="w-4 h-4 mx-auto mb-1 text-green-600" />
                      <p className="font-semibold text-green-700">+{game.xpReward} XP</p>
                      <p className="text-xs text-gray-600">Phần thưởng</p>
                    </div>
                  </div>

                  <Button 
                    className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white`}
                    disabled={playerStats.energy < game.energyCost}
                  >
                    {playerStats.energy >= game.energyCost ? (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Chơi (-{game.energyCost} năng lượng)
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Không đủ năng lượng
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-red-800">📊 Thống kê của bạn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{playerStats.totalGames}</p>
                  <p className="text-sm text-gray-600">Tổng trận</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{playerStats.gamesWon}</p>
                  <p className="text-sm text-gray-600">Thắng</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{playerStats.winRate}%</p>
                  <p className="text-sm text-gray-600">Tỉ lệ thắng</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{playerStats.streak}</p>
                  <p className="text-sm text-gray-600">Streak ngày</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="mt-6">
          <Card className="border-2 border-yellow-300">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400">
              <CardTitle className="text-2xl text-red-900 flex items-center gap-2">
                <Trophy className="w-7 h-7" />
                Bảng Xếp Hạng Tháng {new Date().getMonth() + 1}/2026
              </CardTitle>
              <CardDescription className="text-red-800">
                Cập nhật mỗi tuần - Top 10 học sinh xuất sắc
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      player.rank <= 3
                        ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400"
                        : "bg-white border-2 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                      player.rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white" :
                      player.rank === 2 ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white" :
                      player.rank === 3 ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white" :
                      "bg-gray-200 text-gray-700"
                    }`}>
                      {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : player.rank}
                    </div>

                    <Avatar className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 text-white">
                      <AvatarFallback>{player.avatar}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{player.name}</h4>
                      <div className="flex items-center gap-3 text-sm">
                        <Badge className="bg-red-600 text-white text-xs">
                          Cấp {player.level}
                        </Badge>
                        <span className="text-gray-600">{player.badge}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-xl text-orange-600">{player.xp.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Hạng của bạn: #{playerStats.rank}
              </h3>
              <p className="text-gray-600">
                Tiếp tục học tập và chơi game để leo lên bảng xếp hạng! 🚀
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <Card
                key={badge.id}
                className={`border-2 transition-all ${
                  badge.unlocked
                    ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-xl"
                    : "border-gray-300 bg-gray-50 opacity-60"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`text-5xl ${badge.unlocked ? "" : "grayscale"}`}>
                      {badge.icon}
                    </div>
                    <Badge className={`${rarityColors[badge.rarity]} text-white text-xs`}>
                      {badge.rarity === "common" ? "Phổ thông" :
                       badge.rarity === "uncommon" ? "Hiếm" :
                       badge.rarity === "rare" ? "Quý hiếm" :
                       badge.rarity === "epic" ? "Sử thi" : "Huyền thoại"}
                    </Badge>
                  </div>
                  <CardTitle className={`text-lg ${badge.unlocked ? "text-gray-800" : "text-gray-500"}`}>
                    {badge.name}
                  </CardTitle>
                  <CardDescription className={badge.unlocked ? "text-gray-600" : "text-gray-400"}>
                    {badge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {badge.unlocked ? (
                    <Badge className="w-full bg-green-600 text-white justify-center">
                      ✓ Đã mở khóa
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="w-full justify-center bg-gray-300 text-gray-700">
                      🔒 Chưa mở khóa
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
            <CardContent className="p-8 text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                Bạn đã mở khóa {badges.filter(b => b.unlocked).length}/{badges.length} huy hiệu!
              </h3>
              <p className="text-purple-100">
                Tiếp tục hoàn thành thử thách để thu thập thêm huy hiệu quý hiếm 🏆
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
