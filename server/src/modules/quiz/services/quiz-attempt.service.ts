import { quizAttemptRepository, QuizAttemptRepository, UserQuizStats } from '@/modules/quiz/repositories/quiz-attempt.repository';
import { quizRepository, QuizRepository } from '@/modules/quiz/repositories/quiz.repository';
import { CreateQuizAttemptInput, UpdateQuizAttemptInput } from '@/modules/quiz/schemas/quiz.schema';
import { QuizAttempt } from '@/modules/quiz/entities/quiz_attempt.entity';
import { AppError } from '@/utils/error.response';

export class QuizAttemptService {
  private attemptRepo: QuizAttemptRepository;
  private quizRepo: QuizRepository;

  constructor() {
    this.attemptRepo = quizAttemptRepository;
    this.quizRepo = quizRepository;
  }

  async getById(idAttempt: string): Promise<QuizAttempt> {
    const attempt = await this.attemptRepo.findById(idAttempt);
    if (!attempt) throw new AppError(404, 'Lần làm bài không tồn tại');
    return attempt;
  }

  async getByUser(idUser: string): Promise<QuizAttempt[]> {
    return this.attemptRepo.findByUser(idUser);
  }

  async create(data: CreateQuizAttemptInput): Promise<QuizAttempt> {
    return this.attemptRepo.create(data);
  }

  async update(idAttempt: string, data: UpdateQuizAttemptInput): Promise<QuizAttempt> {
    const updated = await this.attemptRepo.update(idAttempt, data);
    if (!updated) throw new AppError(404, 'Lần làm bài không tồn tại');
    return updated;
  }

  async delete(idAttempt: string): Promise<void> {
    const deleted = await this.attemptRepo.delete(idAttempt);
    if (!deleted) throw new AppError(404, 'Lần làm bài không tồn tại');
  }

  async getStatsByUser(idUser: string): Promise<UserQuizStats> {
    return this.attemptRepo.getStatsByUser(idUser);
  }

  async getTotalQuizzes(): Promise<number> {
    return this.quizRepo.countAll();
  }
}

export const quizAttemptService = new QuizAttemptService();
