import { lessonRepository, LessonRepository } from '@/modules/lesson/repositories/lesson.repository';
import { CreateLessonInput, UpdateLessonInput } from '@/modules/lesson/schemas/lesson.schema';
import { Lesson } from '@/modules/lesson/entities/lesson.entity';
import { AppError } from '@/utils/error.response';

export class LessonService {
  private lessonRepo: LessonRepository;

  constructor() {
    this.lessonRepo = lessonRepository;
  }

  async getAll(): Promise<Lesson[]> {
    return this.lessonRepo.findAll();
  }

  async getById(idLesson: string): Promise<Lesson> {
    const lesson = await this.lessonRepo.findById(idLesson);
    if (!lesson) throw new AppError(404, 'Bài học không tồn tại');
    return lesson;
  }

  async getByChapter(idChapter: string): Promise<Lesson[]> {
    return this.lessonRepo.findByChapterId(idChapter);
  }

  async create(data: CreateLessonInput): Promise<Lesson> {
    return this.lessonRepo.create(data);
  }

  async update(idLesson: string, data: UpdateLessonInput): Promise<Lesson> {
    const updated = await this.lessonRepo.update(idLesson, data);
    if (!updated) throw new AppError(404, 'Bài học không tồn tại');
    return updated;
  }

  async delete(idLesson: string): Promise<void> {
    const deleted = await this.lessonRepo.delete(idLesson);
    if (!deleted) throw new AppError(404, 'Bài học không tồn tại');
  }
}

export const lessonService = new LessonService();
