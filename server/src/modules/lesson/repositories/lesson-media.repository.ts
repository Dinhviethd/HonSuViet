import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { LessonMedia } from '@/modules/lesson/entities/lesson_media.entity';
import { CreateLessonMediaInput, UpdateLessonMediaInput } from '@/modules/lesson/schemas/lesson.schema';

export class LessonMediaRepository {
  private repository: Repository<LessonMedia>;

  constructor() {
    this.repository = AppDataSource.getRepository(LessonMedia);
  }

  async findById(idMedia: string): Promise<LessonMedia | null> {
    return this.repository.findOne({
      where: { idMedia },
      relations: {
        lesson: true,
      },
    });
  }

  async findByLessonId(idLesson: string): Promise<LessonMedia[]> {
    return this.repository.find({
      where: {
        lesson: { idLesson },
      },
      relations: {
        lesson: true,
      },
      order: {
        orderIndex: 'ASC',
      },
    });
  }

  async create(data: CreateLessonMediaInput): Promise<LessonMedia> {
    const media = this.repository.create({
      mediaType: data.mediaType,
      mediaUrl: data.mediaUrl,
      caption: data.caption,
      orderIndex: data.orderIndex ?? 0,
      lesson: { idLesson: data.idLesson } as LessonMedia['lesson'],
    });

    return this.repository.save(media);
  }

  async update(idMedia: string, data: UpdateLessonMediaInput): Promise<LessonMedia | null> {
    const existing = await this.findById(idMedia);
    if (!existing) {
      return null;
    }

    if (data.mediaType !== undefined) existing.mediaType = data.mediaType;
    if (data.mediaUrl !== undefined) existing.mediaUrl = data.mediaUrl;
    if (data.caption !== undefined) existing.caption = data.caption;
    if (data.orderIndex !== undefined) existing.orderIndex = data.orderIndex;

    await this.repository.save(existing);
    return this.findById(idMedia);
  }

  async delete(idMedia: string): Promise<boolean> {
    const result = await this.repository.delete(idMedia);
    return (result.affected ?? 0) > 0;
  }
}

export const lessonMediaRepository = new LessonMediaRepository();
