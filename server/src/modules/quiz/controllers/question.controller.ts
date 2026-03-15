import { Request, Response } from 'express';
import { questionService } from '@/modules/quiz/services/question.service';
import { asyncHandler, AppError } from '@/utils/error.response';
import { createQuestionSchema, updateQuestionSchema } from '@/modules/quiz/schemas/quiz.schema';

class QuestionController {
  getByQuiz = asyncHandler(async (req: Request, res: Response) => {
    const questions = await questionService.getByQuiz(req.params.quizId);
    res.status(200).json({ success: true, data: questions });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const question = await questionService.getById(req.params.id);
    res.status(200).json({ success: true, data: question });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createQuestionSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const question = await questionService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo câu hỏi thành công', data: question });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateQuestionSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const question = await questionService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật câu hỏi thành công', data: question });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await questionService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa câu hỏi thành công' });
  });
}

export const questionController = new QuestionController();
