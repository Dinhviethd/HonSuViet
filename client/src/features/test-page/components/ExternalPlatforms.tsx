import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import type { QuizPlatform } from "../schemas/tests.types";

interface ExternalPlatformsProps {
	quizPlatforms: QuizPlatform[];
}

export function ExternalPlatforms({ quizPlatforms }: ExternalPlatformsProps) {
	return (
		<div>
			<h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
				<ExternalLink className="w-6 h-6 text-red-600" />
				Nền tảng học tập tương tác
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{quizPlatforms.map((platform) => (
					<Card
						key={platform.name}
						className="border-2 border-amber-200 hover:shadow-xl transition-all overflow-hidden"
					>
						<div className={`h-2 bg-gradient-to-r ${platform.color}`} />
						<CardHeader>
							<div className="text-5xl mb-3">{platform.icon}</div>
							<CardTitle className="text-2xl text-gray-800">{platform.name}</CardTitle>
							<CardDescription className="text-base">{platform.description}</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<ul className="space-y-2">
								{platform.features.map((feature, index) => (
									<li key={index} className="flex items-center gap-2 text-sm text-gray-600">
										<div className="w-1.5 h-1.5 rounded-full bg-red-600" />
										{feature}
									</li>
								))}
							</ul>
							<a href={platform.link} target="_blank" rel="noopener noreferrer">
								<Button className={`w-full bg-gradient-to-r ${platform.color} hover:opacity-90`}>
									<ExternalLink className="w-4 h-4 mr-2" />
									Truy cập {platform.name}
								</Button>
							</a>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

