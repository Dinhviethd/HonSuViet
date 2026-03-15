import { answerRepository, AnswerRepository } from '@/modules/quiz/repositories/answer.repository';
import { CreateAnswerInput, UpdateAnswerInput } from '@/modules/quiz/schemas/quiz.schema';
import { Answer } from '@/modules/quiz/entities/answer.entity';
import { AppError } from '@/utils/error.response';

export class AnswerService {
  private answerRepo: AnswerRepository;

  constructor() {
    this.answerRepo = answerRepository;
  }

  async getByQuestion(idQuestion: string): Promise<Answer[]> {
    return this.answerRepo.findByQuestionId(idQuestion);
  }

  async getById(idAnswer: string): Promise<Answer> {
    const answer = await this.answerRepo.findById(idAnswer);
    if (!answer) throw new AppError(404, 'Đáp án không tồn tại');
    return answer;
  }

  async create(data: CreateAnswerInput): Promise<Answer> {
    return this.answerRepo.create(data);
  }

  async update(idAnswer: string, data: UpdateAnswerInput): Promise<Answer> {
    const updated = await this.answerRepo.update(idAnswer, data);
    if (!updated) throw new AppError(404, 'Đáp án không tồn tại');
    return updated;
  }

  async delete(idAnswer: string): Promise<void> {
    const deleted = await this.answerRepo.delete(idAnswer);
    if (!deleted) throw new AppError(404, 'Đáp án không tồn tại');
  }
}

export const answerService = new AnswerService();
