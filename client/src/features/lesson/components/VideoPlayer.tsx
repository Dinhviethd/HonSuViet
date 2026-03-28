import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";



export function VideoPlayer() {
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
                <p className="text-md text-gray-600">Hình ảnh minh họa sẽ được cập nhật sau</p>
              </div>
        </CardContent>
      </Card>
    </div>
  );
}
