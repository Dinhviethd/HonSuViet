import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { Quiz } from '@/modules/quiz/entities/quiz.entity';
import { CreateQuizInput, UpdateQuizInput } from '@/modules/quiz/schemas/quiz.schema';
import { createPaginationQuery, PaginationResult, PaginationUtil } from '@/utils/pagination';

export class QuizRepository {
  private repository: Repository<Quiz>;

  constructor() {
    this.repository = AppDataSource.getRepository(Quiz);
  }

  async findAll(): Promise<Quiz[]> {
    return this.repository.find({
      relations: {
        chapter: true,
        author: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginationResult<Quiz>> {
    const { skip, take } = createPaginationQuery(page, limit);
    const [data, total] = await this.repository.findAndCount({
      relations: {
        chapter: true,
        author: true,
      },
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });

    return PaginationUtil.createPagination(data, total, page, limit);
  }

  async findById(idQuiz: string): Promise<Quiz | null> {
    return this.repository.findOne({
      where: { idQuiz },
      relations: {
        chapter: true,
        author: true,
      },
    });
  }

  async create(data: CreateQuizInput): Promise<Quiz> {
    const quiz = this.repository.create({
      title: data.title,
      topicTag: data.topicTag,
      difficulty: data.difficulty,
      timeLimitMinutes: data.timeLimitMinutes,
      chapter: data.idChapter ? ({ idChapter: data.idChapter } as Quiz['chapter']) : undefined,
      author: data.authorId ? ({ idUser: data.authorId } as Quiz['author']) : undefined,
    });

    return this.repository.save(quiz);
  }

  async update(idQuiz: string, data: UpdateQuizInput): Promise<Quiz | null> {
    const existing = await this.findById(idQuiz);
    if (!existing) {
      return null;
    }

    if (data.title !== undefined) existing.title = data.title;
    if (data.topicTag !== undefined) existing.topicTag = data.topicTag;
    if (data.difficulty !== undefined) existing.difficulty = data.difficulty;
    if (data.timeLimitMinutes !== undefined) existing.timeLimitMinutes = data.timeLimitMinutes;
    if (data.idChapter !== undefined) {
      existing.chapter = data.idChapter
        ? ({ idChapter: data.idChapter } as Quiz['chapter'])
        : undefined;
    }
    if (data.authorId !== undefined) {
      existing.author = data.authorId
        ? ({ idUser: data.authorId } as Quiz['author'])
        : undefined;
    }

    await this.repository.save(existing);
    return this.findById(idQuiz);
  }

  async delete(idQuiz: string): Promise<boolean> {
    const result = await this.repository.delete(idQuiz);
    return (result.affected ?? 0) > 0;
  }
}

export const quizRepository = new QuizRepository();
