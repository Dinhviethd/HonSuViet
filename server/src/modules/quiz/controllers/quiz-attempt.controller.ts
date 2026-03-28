import { Request, Response } from 'express';
import { quizAttemptService } from '@/modules/quiz/services/quiz-attempt.service';
import { asyncHandler, AppError } from '@/utils/error.response';
import { createQuizAttemptSchema, updateQuizAttemptSchema } from '@/modules/quiz/schemas/quiz.schema';

class QuizAttemptController {
  getById = asyncHandler(async (req: Request, res: Response) => {
    const attempt = await quizAttemptService.getById(req.params.id);
    res.status(200).json({ success: true, data: attempt });
  });

  getByUser = asyncHandler(async (req: Request, res: Response) => {
    const attempts = await quizAttemptService.getByUser(req.params.userId);
    res.status(200).json({ success: true, data: attempts });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createQuizAttemptSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const attempt = await quizAttemptService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo lần làm bài thành công', data: attempt });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateQuizAttemptSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const attempt = await quizAttemptService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật lần làm bài thành công', data: attempt });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await quizAttemptService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa lần làm bài thành công' });
  });

  getStatsByUser = asyncHandler(async (req: Request, res: Response) => {
    const stats = await quizAttemptService.getStatsByUser(req.params.userId);
    res.status(200).json({ success: true, data: stats });
  });

  getTotalQuizzes = asyncHandler(async (_req: Request, res: Response) => {
    const total = await quizAttemptService.getTotalQuizzes();
    res.status(200).json({ success: true, data: { totalQuizzes: total } });
  });
}

export const quizAttemptController = new QuizAttemptController();
