import { Request, Response } from 'express';
import { quizService } from '@/modules/quiz/services/quiz.service';
import { asyncHandler, AppError } from '@/utils/error.response';
import { createQuizSchema, updateQuizSchema } from '@/modules/quiz/schemas/quiz.schema';

class QuizController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const quizzes = await quizService.getAll();
    res.status(200).json({ success: true, data: quizzes });
  });

  getAllPaginated = asyncHandler(async (req: Request, res: Response) => {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const result = await quizService.getAllPaginated(page, limit);
    res.status(200).json({ success: true, ...result });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const quiz = await quizService.getById(req.params.id);
    res.status(200).json({ success: true, data: quiz });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createQuizSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const quiz = await quizService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo bài kiểm tra thành công', data: quiz });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateQuizSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const quiz = await quizService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật bài kiểm tra thành công', data: quiz });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await quizService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa bài kiểm tra thành công' });
  });

  getAllWithQuestionCount = asyncHandler(async (_req: Request, res: Response) => {
    const quizzes = await quizService.getAllWithQuestionCount();
    res.status(200).json({ success: true, data: quizzes });
  });
}

export const quizController = new QuizController();
