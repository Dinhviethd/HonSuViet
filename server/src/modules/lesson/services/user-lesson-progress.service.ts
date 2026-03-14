import { userLessonProgressRepository, UserLessonProgressRepository } from '@/modules/lesson/repositories/user-lesson-progress.repository';
import { CreateUserLessonProgressInput, UpdateUserLessonProgressInput } from '@/modules/lesson/schemas/lesson.schema';
import { UserLessonProgress } from '@/modules/lesson/entities/user_lesson_progress.entity';
import { AppError } from '@/utils/error.response';

export class UserLessonProgressService {
  private progressRepo: UserLessonProgressRepository;

  constructor() {
    this.progressRepo = userLessonProgressRepository;
  }

  async getById(idProgress: string): Promise<UserLessonProgress> {
    const progress = await this.progressRepo.findById(idProgress);
    if (!progress) throw new AppError(404, 'Tiến độ học không tồn tại');
    return progress;
  }

  async getByUser(idUser: string): Promise<UserLessonProgress[]> {
    return this.progressRepo.findByUser(idUser);
  }

  async getByUserAndLesson(idUser: string, idLesson: string): Promise<UserLessonProgress> {
    const progress = await this.progressRepo.findByUserAndLesson(idUser, idLesson);
    if (!progress) throw new AppError(404, 'Tiến độ học không tồn tại');
    return progress;
  }

  async create(data: CreateUserLessonProgressInput): Promise<UserLessonProgress> {
    const existing = await this.progressRepo.findByUserAndLesson(data.idUser, data.idLesson);
    if (existing) throw new AppError(409, 'Tiến độ học đã tồn tại cho user và bài học này');
    return this.progressRepo.create(data);
  }

  async update(idProgress: string, data: UpdateUserLessonProgressInput): Promise<UserLessonProgress> {
    const updated = await this.progressRepo.update(idProgress, data);
    if (!updated) throw new AppError(404, 'Tiến độ học không tồn tại');
    return updated;
  }

  async delete(idProgress: string): Promise<void> {
    const deleted = await this.progressRepo.delete(idProgress);
    if (!deleted) throw new AppError(404, 'Tiến độ học không tồn tại');
  }
}

export const userLessonProgressService = new UserLessonProgressService();
