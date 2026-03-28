import { Clock } from "lucide-react"

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <Clock className="w-16 h-16 text-muted-foreground mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-red-700 via-yellow-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl  pb-3">Coming Soon</h1>
      <p className="text-lg max-w-md  text-amber-800 font-medium">
        Trang này đang được phát triển và sẽ sớm ra mắt. Hãy quay lại sau nhé!
      </p>
    </div>
  )
}