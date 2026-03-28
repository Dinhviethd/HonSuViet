const sections = [
	"Trao đổi",
	"Trò chuyện với AI",
	"Sáng tạo cùng AI",
];

export default function DiscoveryPage() {
	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 ">
			<section className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
				{sections.map((title) => (
					<article
						key={title}
						className="min-h-40 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/80 via-white/70 to-red-50/80 shadow-sm flex items-center justify-center px-6 text-center"
					>
						<h2 className="text-xl md:text-2xl font-bold text-red-700 tracking-tight">
							{title}
						</h2>
					</article>
				))}
			</section>
		</main>
	);
}
