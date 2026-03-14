import { Request, Response } from 'express';
import { userStatService } from '@/modules/gamification/services/user-stat.service';
import { createUserStatSchema, updateUserStatSchema } from '@/modules/gamification/schemas/gamification.schema';
import { asyncHandler, AppError } from '@/utils/error.response';

class UserStatController {
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    if (page || limit) {
      const p = parseInt(page as string) || 1;
      const l = parseInt(limit as string) || 20;
      const result = await userStatService.getAllPaginated(p, l);
      return res.status(200).json({ success: true, ...result });
    }
    const stats = await userStatService.getAll();
    res.status(200).json({ success: true, data: stats });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const stat = await userStatService.getById(req.params.id);
    res.status(200).json({ success: true, data: stat });
  });

  getByUser = asyncHandler(async (req: Request, res: Response) => {
    const stat = await userStatService.getByUser(req.params.userId);
    res.status(200).json({ success: true, data: stat });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createUserStatSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const stat = await userStatService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo user stat thành công', data: stat });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateUserStatSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const stat = await userStatService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật user stat thành công', data: stat });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await userStatService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa user stat thành công' });
  });
}

export const userStatController = new UserStatController();
