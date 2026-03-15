import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { QuizAttempt } from '@/modules/quiz/entities/quiz_attempt.entity';
import { CreateQuizAttemptInput, UpdateQuizAttemptInput } from '@/modules/quiz/schemas/quiz.schema';

export interface UserQuizStats {
  distinctCompletedQuizzes: number;
  averageScore: number;
  highestScore: number;
}

export class QuizAttemptRepository {
  private repository: Repository<QuizAttempt>;

  constructor() {
    this.repository = AppDataSource.getRepository(QuizAttempt);
  }

  async findById(idAttempt: string): Promise<QuizAttempt | null> {
    return this.repository.findOne({
      where: { idAttempt },
      relations: {
        user: true,
        quiz: true,
      },
    });
  }

  async findByUser(idUser: string): Promise<QuizAttempt[]> {
    return this.repository.find({
      where: {
        user: { idUser },
      },
      relations: {
        user: true,
        quiz: true,
      },
      order: {
        startedAt: 'DESC',
      },
    });
  }

  async create(data: CreateQuizAttemptInput): Promise<QuizAttempt> {
    const attempt = this.repository.create({
      user: { idUser: data.idUser } as QuizAttempt['user'],
      quiz: { idQuiz: data.idQuiz } as QuizAttempt['quiz'],
      questionsLayout: data.questionsLayout,
      answersData: data.answersData,
      scorePercentage: data.scorePercentage ?? 0,
      correctAnswersCount: data.correctAnswersCount ?? 0,
      status: data.status ?? 'in_progress',
      completedAt: data.completedAt,
    });

    return this.repository.save(attempt);
  }

  async update(idAttempt: string, data: UpdateQuizAttemptInput): Promise<QuizAttempt | null> {
    const existing = await this.findById(idAttempt);
    if (!existing) {
      return null;
    }

    if (data.questionsLayout !== undefined) existing.questionsLayout = data.questionsLayout;
    if (data.answersData !== undefined) existing.answersData = data.answersData;
    if (data.scorePercentage !== undefined) existing.scorePercentage = data.scorePercentage;
    if (data.correctAnswersCount !== undefined) existing.correctAnswersCount = data.correctAnswersCount;
    if (data.status !== undefined) existing.status = data.status;
    if (data.completedAt !== undefined) existing.completedAt = data.completedAt;

    await this.repository.save(existing);
    return this.findById(idAttempt);
  }

  async delete(idAttempt: string): Promise<boolean> {
    const result = await this.repository.delete(idAttempt);
    return (result.affected ?? 0) > 0;
  }

  async getStatsByUser(idUser: string): Promise<UserQuizStats> {
    const [row] = await AppDataSource.query<UserQuizStats[]>(
      `
      SELECT
        COUNT(DISTINCT qa."idQuiz")::int                             AS "distinctCompletedQuizzes",
        COALESCE(ROUND(AVG(qa."scorePercentage")), 0)::int           AS "averageScore",
        COALESCE(MAX(qa."scorePercentage"), 0)::int                  AS "highestScore"
      FROM quiz_attempts qa
      WHERE qa."idUser" = $1
        AND qa.status = 'completed'
      `,
      [idUser],
    );
    return row;
  }
}

export const quizAttemptRepository = new QuizAttemptRepository();
