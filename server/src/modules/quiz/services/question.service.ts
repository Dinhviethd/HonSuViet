import { questionRepository, QuestionRepository } from '@/modules/quiz/repositories/question.repository';
import { CreateQuestionInput, UpdateQuestionInput } from '@/modules/quiz/schemas/quiz.schema';
import { Question } from '@/modules/quiz/entities/question.entity';
import { AppError } from '@/utils/error.response';

export class QuestionService {
  private questionRepo: QuestionRepository;

  constructor() {
    this.questionRepo = questionRepository;
  }

  async getByQuiz(idQuiz: string): Promise<Question[]> {
    return this.questionRepo.findByQuizId(idQuiz);
  }

  async getById(idQuestion: string): Promise<Question> {
    const question = await this.questionRepo.findById(idQuestion);
    if (!question) throw new AppError(404, 'Câu hỏi không tồn tại');
    return question;
  }

  async create(data: CreateQuestionInput): Promise<Question> {
    return this.questionRepo.create(data);
  }

  async update(idQuestion: string, data: UpdateQuestionInput): Promise<Question> {
    const updated = await this.questionRepo.update(idQuestion, data);
    if (!updated) throw new AppError(404, 'Câu hỏi không tồn tại');
    return updated;
  }

  async delete(idQuestion: string): Promise<void> {
    const deleted = await this.questionRepo.delete(idQuestion);
    if (!deleted) throw new AppError(404, 'Câu hỏi không tồn tại');
  }
}

export const questionService = new QuestionService();
