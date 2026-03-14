import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { UserLessonProgress } from '@/modules/lesson/entities/user_lesson_progress.entity';
import { CreateUserLessonProgressInput, UpdateUserLessonProgressInput } from '@/modules/lesson/schemas/lesson.schema';

export class UserLessonProgressRepository {
  private repository: Repository<UserLessonProgress>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserLessonProgress);
  }

  async findById(idProgress: string): Promise<UserLessonProgress | null> {
    return this.repository.findOne({
      where: { idProgress },
      relations: {
        user: true,
        lesson: true,
      },
    });
  }

  async findByUser(idUser: string): Promise<UserLessonProgress[]> {
    return this.repository.find({
      where: {
        user: { idUser },
      },
      relations: {
        user: true,
        lesson: true,
      },
    });
  }

  async findByUserAndLesson(idUser: string, idLesson: string): Promise<UserLessonProgress | null> {
    return this.repository.findOne({
      where: {
        user: { idUser },
        lesson: { idLesson },
      },
      relations: {
        user: true,
        lesson: true,
      },
    });
  }

  async create(data: CreateUserLessonProgressInput): Promise<UserLessonProgress> {
    const progress = this.repository.create({
      user: { idUser: data.idUser } as UserLessonProgress['user'],
      lesson: { idLesson: data.idLesson } as UserLessonProgress['lesson'],
      status: data.status ?? 'unlocked',
      completedAt: data.completedAt,
    });

    return this.repository.save(progress);
  }

  async update(idProgress: string, data: UpdateUserLessonProgressInput): Promise<UserLessonProgress | null> {
    const existing = await this.findById(idProgress);
    if (!existing) {
      return null;
    }

    if (data.status !== undefined) existing.status = data.status;
    if (data.completedAt !== undefined) existing.completedAt = data.completedAt;

    await this.repository.save(existing);
    return this.findById(idProgress);
  }

  async delete(idProgress: string): Promise<boolean> {
    const result = await this.repository.delete(idProgress);
    return (result.affected ?? 0) > 0;
  }
}

export const userLessonProgressRepository = new UserLessonProgressRepository();
