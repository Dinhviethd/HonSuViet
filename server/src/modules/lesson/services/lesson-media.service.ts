import { lessonMediaRepository, LessonMediaRepository } from '@/modules/lesson/repositories/lesson-media.repository';
import { CreateLessonMediaInput, UpdateLessonMediaInput } from '@/modules/lesson/schemas/lesson.schema';
import { LessonMedia } from '@/modules/lesson/entities/lesson_media.entity';
import { AppError } from '@/utils/error.response';

export class LessonMediaService {
  private mediaRepo: LessonMediaRepository;

  constructor() {
    this.mediaRepo = lessonMediaRepository;
  }

  async getById(idMedia: string): Promise<LessonMedia> {
    const media = await this.mediaRepo.findById(idMedia);
    if (!media) throw new AppError(404, 'Media không tồn tại');
    return media;
  }

  async getByLesson(idLesson: string): Promise<LessonMedia[]> {
    return this.mediaRepo.findByLessonId(idLesson);
  }

  async create(data: CreateLessonMediaInput): Promise<LessonMedia> {
    return this.mediaRepo.create(data);
  }

  async update(idMedia: string, data: UpdateLessonMediaInput): Promise<LessonMedia> {
    const updated = await this.mediaRepo.update(idMedia, data);
    if (!updated) throw new AppError(404, 'Media không tồn tại');
    return updated;
  }

  async delete(idMedia: string): Promise<void> {
    const deleted = await this.mediaRepo.delete(idMedia);
    if (!deleted) throw new AppError(404, 'Media không tồn tại');
  }
}

export const lessonMediaService = new LessonMediaService();
