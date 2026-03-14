import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";
import { ImageWithFallback } from "@/features/hon-su-viet/components/ImageWithFallback";

interface MediaItem {
  src: string;
  alt: string;
  caption: string;
}

interface VideoPlayerProps {
  images?: MediaItem[];
}

const defaultImages: MediaItem[] = [
  {
    src: "https://images.unsplash.com/photo-1714073619284-b71674885558?w=400",
    alt: "Trống đồng Đông Sơn",
    caption: "Trống đồng Đông Sơn",
  },
  {
    src: "https://images.unsplash.com/photo-1740476376215-22fc302da920?w=400",
    alt: "Di tích khảo cổ",
    caption: "Di tích khảo cổ Đông Sơn",
  },
];

export function VideoPlayer({ images = defaultImages }: VideoPlayerProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-red-800">🎥 Video bài giảng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <Video className="w-16 h-16 mx-auto mb-2" />
              <p>Video bài giảng sẽ được cập nhật</p>
              <p className="text-sm mt-1">(Tích hợp từ YouTube hoặc nguồn giáo dục)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-800">🖼️ Hình ảnh minh họa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="space-y-2">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-600 text-center">{image.caption}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
