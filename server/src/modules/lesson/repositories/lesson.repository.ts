import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { Lesson } from '@/modules/lesson/entities/lesson.entity';
import { CreateLessonInput, UpdateLessonInput } from '@/modules/lesson/schemas/lesson.schema';

export class LessonRepository {
  private repository: Repository<Lesson>;

  constructor() {
    this.repository = AppDataSource.getRepository(Lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.repository.find({
      relations: {
        chapter: true,
        author: true,
      },
      order: {
        orderIndex: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findById(idLesson: string): Promise<Lesson | null> {
    return this.repository.findOne({
      where: { idLesson },
      relations: {
        chapter: true,
        author: true,
      },
    });
  }

  async findByChapterId(idChapter: string): Promise<Lesson[]> {
    return this.repository.find({
      where: {
        chapter: { idChapter },
      },
      relations: {
        chapter: true,
        author: true,
      },
      order: {
        orderIndex: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async create(data: CreateLessonInput): Promise<Lesson> {
    const lesson = this.repository.create({
      title: data.title,
      timeTag: data.timeTag,
      durationMinutes: data.durationMinutes ?? 0,
      contentBody: data.contentBody,
      orderIndex: data.orderIndex ?? 0,
      chapter: { idChapter: data.idChapter } as Lesson['chapter'],
      author: data.authorId ? ({ idUser: data.authorId } as Lesson['author']) : undefined,
    });

    return this.repository.save(lesson);
  }

  async update(idLesson: string, data: UpdateLessonInput): Promise<Lesson | null> {
    const existing = await this.findById(idLesson);
    if (!existing) {
      return null;
    }

    if (data.title !== undefined) existing.title = data.title;
    if (data.timeTag !== undefined) existing.timeTag = data.timeTag;
    if (data.durationMinutes !== undefined) existing.durationMinutes = data.durationMinutes;
    if (data.contentBody !== undefined) existing.contentBody = data.contentBody;
    if (data.orderIndex !== undefined) existing.orderIndex = data.orderIndex;
    if (data.authorId !== undefined) {
      existing.author = data.authorId
        ? ({ idUser: data.authorId } as Lesson['author'])
        : undefined;
    }

    await this.repository.save(existing);
    return this.findById(idLesson);
  }

  async delete(idLesson: string): Promise<boolean> {
    const result = await this.repository.delete(idLesson);
    return (result.affected ?? 0) > 0;
  }
}

export const lessonRepository = new LessonRepository();
