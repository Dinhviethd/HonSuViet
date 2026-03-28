import { Request, Response } from 'express';
import { userLessonProgressService } from '@/modules/lesson/services/user-lesson-progress.service';
import { createUserLessonProgressSchema, updateUserLessonProgressSchema } from '@/modules/lesson/schemas/lesson.schema';
import { asyncHandler, AppError } from '@/utils/error.response';

class UserLessonProgressController {
  getById = asyncHandler(async (req: Request, res: Response) => {
    const progress = await userLessonProgressService.getById(req.params.id);
    res.status(200).json({ success: true, data: progress });
  });

  getByUser = asyncHandler(async (req: Request, res: Response) => {
    const progressList = await userLessonProgressService.getByUser(req.params.userId);
    res.status(200).json({ success: true, data: progressList });
  });

  getByUserAndLesson = asyncHandler(async (req: Request, res: Response) => {
    const progress = await userLessonProgressService.getByUserAndLesson(
      req.params.userId,
      req.params.lessonId,
    );
    res.status(200).json({ success: true, data: progress });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createUserLessonProgressSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const progress = await userLessonProgressService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo tiến độ học thành công', data: progress });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateUserLessonProgressSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const progress = await userLessonProgressService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật tiến độ học thành công', data: progress });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await userLessonProgressService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa tiến độ học thành công' });
  });
}

export const userLessonProgressController = new UserLessonProgressController();
