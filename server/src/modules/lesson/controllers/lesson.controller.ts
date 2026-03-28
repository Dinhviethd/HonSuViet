import { Request, Response } from 'express';
import { lessonService } from '@/modules/lesson/services/lesson.service';
import { createLessonSchema, updateLessonSchema } from '@/modules/lesson/schemas/lesson.schema';
import { asyncHandler, AppError } from '@/utils/error.response';

class LessonController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const lessons = await lessonService.getAll();
    res.status(200).json({ success: true, data: lessons });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const lesson = await lessonService.getById(req.params.id);
    res.status(200).json({ success: true, data: lesson });
  });

  getByChapter = asyncHandler(async (req: Request, res: Response) => {
    const lessons = await lessonService.getByChapter(req.params.chapterId);
    res.status(200).json({ success: true, data: lessons });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createLessonSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const lesson = await lessonService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo bài học thành công', data: lesson });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateLessonSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const lesson = await lessonService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật bài học thành công', data: lesson });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await lessonService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa bài học thành công' });
  });
}

export const lessonController = new LessonController();
