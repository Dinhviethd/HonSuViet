import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Video, FileText, Award } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/stores/authStore";
import { LessonContentSection } from "../components/LessonContentSection";
import { VideoPlayer } from "@/features/lesson/components/VideoPlayer";
import { NoteEditor } from "@/features/lesson/components/NoteEditor";
import { useGetLessonDetail } from "../hooks/useGetLessonDetail";
import { lessonService } from "../services/lessonService";

export default function LessonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth((state) => state.user);
  const { lesson, isLoading, error } = useGetLessonDetail(id);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleCompleteLesson = async () => {
    if (!lesson?.id) {
      toast.error("Không tìm thấy bài học để hoàn thành");
      return;
    }

    const idUser = String(user?.idUser ?? "");
    if (!idUser) {
      toast.error("Bạn cần đăng nhập để lưu tiến độ học");
      return;
    }

    try {
      setIsCompleting(true);
      await lessonService.markLessonCompleted(idUser, lesson.id);
      toast.success("Đã cập nhật trạng thái hoàn thành bài học");
      navigate("/lessons");
    } catch {
      toast.error("Không thể cập nhật tiến độ học. Vui lòng thử lại.");
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">Đang tải bài học...</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-800">
          {error || "Không tìm thấy bài học"}
        </h2>
        <Link to="/lessons">
          <Button className="mt-4">Quay lại danh sách</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/lessons">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <Badge className="bg-yellow-500 text-red-900 mb-2">
            {lesson.period}
          </Badge>
          <h1 className="text-3xl font-bold text-gray-800">{lesson.title}</h1>
          <p className="text-gray-600 mt-1">Thời lượng: {lesson.duration}</p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-red-100">
          <TabsTrigger value="content" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <BookOpen className="w-4 h-4 mr-2" />
            Nội dung
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Video className="w-4 h-4 mr-2" />
            Video & Hình ảnh
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            Ghi chú
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 mt-6">
          <LessonContentSection
            introduction={lesson.content.introduction}
            sections={lesson.content.sections}
            keyPoints={lesson.content.keyPoints}
          />

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link to="/tests" className="flex-1">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Award className="w-4 h-4 mr-2" />
                Làm bài kiểm tra
              </Button>
            </Link>
            <Link to="/lessons" className="flex-1">
              <Button
                variant="outline"
                className="w-full"
                onClick={(event) => {
                  event.preventDefault();
                  void handleCompleteLesson();
                }}
                disabled={isCompleting}
              >
                {isCompleting ? "Đang cập nhật..." : "Hoàn thành bài học"}
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <VideoPlayer />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <NoteEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
