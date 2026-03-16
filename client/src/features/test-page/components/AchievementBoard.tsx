import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Clock, Sparkles, Target, Trophy } from "lucide-react";
import type { AchievementStats } from "../schemas/tests.types";

interface AchievementBoardProps {
	achievements: AchievementStats;
}

export function AchievementBoard({ achievements }: AchievementBoardProps) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
			<Card className="bg-blue-800 text-white border-none">
				<CardContent className="p-6 text-center">
					<BarChart3 className="w-8 h-8 mx-auto mb-2" />
					<p className="text-3xl font-bold">{achievements.completed}</p>
					<p className="text-sm text-blue-100">Đã hoàn thành</p>
				</CardContent>
			</Card>

			<Card className="bg-green-700 text-white border-none">
				<CardContent className="p-6 text-center">
					<Target className="w-8 h-8 mx-auto mb-2" />
					<p className="text-3xl font-bold">{achievements.averageScore}%</p>
					<p className="text-sm text-green-100">Điểm trung bình</p>
				</CardContent>
			</Card>

			<Card className="bg-orange-700 text-white border-none">
				<CardContent className="p-6 text-center">
					<Trophy className="w-8 h-8 mx-auto mb-2" />
					<p className="text-3xl font-bold">{achievements.bestScore}%</p>
					<p className="text-sm text-yellow-100">Điểm cao nhất</p>
				</CardContent>
			</Card>

			<Card className="bg-purple-700 text-white border-none">
				<CardContent className="p-6 text-center">
					<Sparkles className="w-8 h-8 mx-auto mb-2" />
					<p className="text-3xl font-bold">{achievements.streak}</p>
					<p className="text-sm text-purple-100">Ngày liên tiếp</p>
				</CardContent>
			</Card>

			<Card className="bg-rose-700 text-white border-none">
				<CardContent className="p-6 text-center">
					<Clock className="w-8 h-8 mx-auto mb-2" />
					<p className="text-3xl font-bold">{achievements.totalTests}</p>
					<p className="text-sm text-pink-100">Tổng bài kiểm tra</p>
				</CardContent>
			</Card>
		</div>
	);
}

