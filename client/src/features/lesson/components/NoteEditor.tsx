import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NoteEditor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-800">📝 Ghi chú của bạn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <textarea
          className="w-full min-h-[200px] p-4 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
          placeholder="Viết ghi chú của bạn về bài học này..."
        />
        <Button className="bg-red-600 hover:bg-red-700">
          Lưu ghi chú
        </Button>
      </CardContent>
    </Card>
  );
}
