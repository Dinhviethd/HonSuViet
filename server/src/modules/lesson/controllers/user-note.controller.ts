import { Request, Response } from 'express';
import { userNoteService } from '@/modules/lesson/services/user-note.service';
import { createUserNoteSchema, updateUserNoteSchema } from '@/modules/lesson/schemas/lesson.schema';
import { asyncHandler, AppError } from '@/utils/error.response';

class UserNoteController {
  getById = asyncHandler(async (req: Request, res: Response) => {
    const note = await userNoteService.getById(req.params.id);
    res.status(200).json({ success: true, data: note });
  });

  getByUser = asyncHandler(async (req: Request, res: Response) => {
    const notes = await userNoteService.getByUser(req.params.userId);
    res.status(200).json({ success: true, data: notes });
  });

  getByLesson = asyncHandler(async (req: Request, res: Response) => {
    const notes = await userNoteService.getByLesson(req.params.lessonId);
    res.status(200).json({ success: true, data: notes });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createUserNoteSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const note = await userNoteService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo ghi chú thành công', data: note });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateUserNoteSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const note = await userNoteService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật ghi chú thành công', data: note });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await userNoteService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa ghi chú thành công' });
  });
}

export const userNoteController = new UserNoteController();
