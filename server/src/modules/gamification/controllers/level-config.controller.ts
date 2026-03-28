import { Request, Response } from 'express';
import { levelConfigService } from '@/modules/gamification/services/level-config.service';
import { createLevelConfigSchema, updateLevelConfigSchema } from '@/modules/gamification/schemas/gamification.schema';
import { asyncHandler, AppError } from '@/utils/error.response';

class LevelConfigController {
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    if (page || limit) {
      const p = parseInt(page as string) || 1;
      const l = parseInt(limit as string) || 20;
      const result = await levelConfigService.getAllPaginated(p, l);
      return res.status(200).json({ success: true, ...result });
    }
    const levels = await levelConfigService.getAll();
    res.status(200).json({ success: true, data: levels });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const level = await levelConfigService.getById(req.params.id);
    res.status(200).json({ success: true, data: level });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createLevelConfigSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const level = await levelConfigService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo level config thành công', data: level });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateLevelConfigSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const level = await levelConfigService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật level config thành công', data: level });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await levelConfigService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa level config thành công' });
  });
}

export const levelConfigController = new LevelConfigController();
