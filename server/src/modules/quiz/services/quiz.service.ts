import { quizRepository, QuizRepository } from '@/modules/quiz/repositories/quiz.repository';
import { CreateQuizInput, UpdateQuizInput } from '@/modules/quiz/schemas/quiz.schema';
import { Quiz } from '@/modules/quiz/entities/quiz.entity';
import { PaginationResult } from '@/utils/pagination';
import { AppError } from '@/utils/error.response';

export class QuizService {
  private quizRepo: QuizRepository;

  constructor() {
    this.quizRepo = quizRepository;
  }

  async getAll(): Promise<Quiz[]> {
    return this.quizRepo.findAll();
  }

  async getAllPaginated(page: number, limit: number): Promise<PaginationResult<Quiz>> {
    return this.quizRepo.findAllPaginated(page, limit);
  }

  async getById(idQuiz: string): Promise<Quiz> {
    const quiz = await this.quizRepo.findById(idQuiz);
    if (!quiz) throw new AppError(404, 'Bài kiểm tra không tồn tại');
    return quiz;
  }

  async create(data: CreateQuizInput): Promise<Quiz> {
    return this.quizRepo.create(data);
  }

  async update(idQuiz: string, data: UpdateQuizInput): Promise<Quiz> {
    const updated = await this.quizRepo.update(idQuiz, data);
    if (!updated) throw new AppError(404, 'Bài kiểm tra không tồn tại');
    return updated;
  }

  async delete(idQuiz: string): Promise<void> {
    const deleted = await this.quizRepo.delete(idQuiz);
    if (!deleted) throw new AppError(404, 'Bài kiểm tra không tồn tại');
  }

  async getAllWithQuestionCount(): Promise<Array<Quiz & { questionCount: number }>> {
    return this.quizRepo.findAllWithQuestionCount();
  }
}

export const quizService = new QuizService();
