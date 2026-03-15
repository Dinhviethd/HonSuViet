import { Request, Response } from 'express';
import { answerService } from '@/modules/quiz/services/answer.service';
import { asyncHandler, AppError } from '@/utils/error.response';
import { createAnswerSchema, updateAnswerSchema } from '@/modules/quiz/schemas/quiz.schema';

class AnswerController {
  getByQuestion = asyncHandler(async (req: Request, res: Response) => {
    const answers = await answerService.getByQuestion(req.params.questionId);
    res.status(200).json({ success: true, data: answers });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const answer = await answerService.getById(req.params.id);
    res.status(200).json({ success: true, data: answer });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createAnswerSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const answer = await answerService.create(parsed.data);
    res.status(201).json({ success: true, message: 'Tạo đáp án thành công', data: answer });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateAnswerSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError(400, parsed.error.issues.map(e => e.message).join(', '));
    }
    const answer = await answerService.update(req.params.id, parsed.data);
    res.status(200).json({ success: true, message: 'Cập nhật đáp án thành công', data: answer });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await answerService.delete(req.params.id);
    res.status(200).json({ success: true, message: 'Xóa đáp án thành công' });
  });
}

export const answerController = new AnswerController();
