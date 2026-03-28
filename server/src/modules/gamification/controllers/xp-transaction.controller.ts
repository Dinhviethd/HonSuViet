import { Request, Response } from 'express';
import { xpTransactionService } from '@/modules/gamification/services/xp-transaction.service';
import { createXpTransactionSchema, updateXpTransactionSchema } from '@/modules/gamification/schemas/gamification.schema';
import { asyncHandler, AppError } from '@/utils/error.response';

class XpTransactionController {
  getById = asyncHandler(async (req: Request, res: Response) => {
    const tx = await xpTransactionService.getById(req.params.id);
    res.status(200).json({ success: true, data: tx });
  });

  getByUser = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    if (page || limit) {
      const p = parseInt(page as string) || 1;
      const l = parseInt(limit as string) || 20;
      const result = await xpTransactionService.getByUserPaginated(req.params.userId, p, l);
      return res.status(200).json({ success: true, ...result });
    }
    const txList = await xpTransactionService.getByUser(req.params.userId);
    res.status(200).json({ success: true, data: txList });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createXpTransactionSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const tx = await xpTransactionService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo XP transaction thành công', data: tx });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateXpTransactionSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const tx = await xpTransactionService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật XP transaction thành công', data: tx });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await xpTransactionService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa XP transaction thành công' });
  });
}

export const xpTransactionController = new XpTransactionController();
