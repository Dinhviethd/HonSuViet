import { Request, Response } from 'express';
import { chapterService } from '@/modules/lesson/services/chapter.service';
import { createChapterSchema, updateChapterSchema } from '@/modules/lesson/schemas/lesson.schema';
import { asyncHandler, AppError } from '@/utils/error.response';

class ChapterController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const chapters = await chapterService.getAll();
    res.status(200).json({ success: true, data: chapters });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const chapter = await chapterService.getById(req.params.id);
    res.status(200).json({ success: true, data: chapter });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createChapterSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const chapter = await chapterService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo chương học thành công', data: chapter });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateChapterSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const chapter = await chapterService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật chương học thành công', data: chapter });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await chapterService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa chương học thành công' });
  });
}

export const chapterController = new ChapterController();
