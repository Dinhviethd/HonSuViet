import { Request, Response } from 'express';
import { lessonMediaService } from '@/modules/lesson/services/lesson-media.service';
import { createLessonMediaSchema, updateLessonMediaSchema } from '@/modules/lesson/schemas/lesson.schema';
import { asyncHandler, AppError } from '@/utils/error.response';

class LessonMediaController {
  getById = asyncHandler(async (req: Request, res: Response) => {
    const media = await lessonMediaService.getById(req.params.id);
    res.status(200).json({ success: true, data: media });
  });

  getByLesson = asyncHandler(async (req: Request, res: Response) => {
    const mediaList = await lessonMediaService.getByLesson(req.params.lessonId);
    res.status(200).json({ success: true, data: mediaList });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createLessonMediaSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const media = await lessonMediaService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Thêm media thành công', data: media });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateLessonMediaSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const media = await lessonMediaService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật media thành công', data: media });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await lessonMediaService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa media thành công' });
  });
}

export const lessonMediaController = new LessonMediaController();
