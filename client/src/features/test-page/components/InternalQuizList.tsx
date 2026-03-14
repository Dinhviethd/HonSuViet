import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import type { InternalQuiz } from "../schemas/tests.types";

interface InternalQuizListProps {
	internalQuizzes: InternalQuiz[];
}

export function InternalQuizList({ internalQuizzes }: InternalQuizListProps) {
	return (
		<div>
			<h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
				<Trophy className="w-6 h-6 text-red-600" />
				Bài kiểm tra nội bộ
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{internalQuizzes.map((quiz) => (
					<Card
						key={quiz.id}
						className={`border-2 ${
							quiz.completed ? "border-green-300 bg-green-50" : "border-amber-300 bg-white"
						} hover:shadow-lg transition-all`}
					>
						<CardHeader>
							<div className="flex items-start justify-between mb-2">
								<Badge className="bg-red-600 text-white">{quiz.topic}</Badge>
								{quiz.completed && <Badge className="bg-green-600 text-white">✓ Đã hoàn thành</Badge>}
							</div>
							<CardTitle className="text-xl text-gray-800">{quiz.title}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-3 gap-4 text-sm">
								<div className="text-center p-2 bg-blue-50 rounded">
									<p className="text-gray-600">Câu hỏi</p>
									<p className="font-bold text-blue-700">{quiz.questions}</p>
								</div>
								<div className="text-center p-2 bg-purple-50 rounded">
									<p className="text-gray-600">Thời gian</p>
									<p className="font-bold text-purple-700">{quiz.duration}</p>
								</div>
								<div className="text-center p-2 bg-orange-50 rounded">
									<p className="text-gray-600">Độ khó</p>
									<p className="font-bold text-orange-700">{quiz.difficulty}</p>
								</div>
							</div>

							{quiz.completed && quiz.score !== null ? (
								<div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
									<p className="text-sm text-green-700 mb-1">Điểm số của bạn</p>
									<p className="text-3xl font-bold text-green-700">{quiz.score}%</p>
								</div>
							) : null}

							<Button className={`w-full ${quiz.completed ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>
								{quiz.completed ? "🔄 Làm lại" : "▶️ Bắt đầu kiểm tra"}
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

