import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { Chapter } from '@/modules/lesson/entities/chapter.entity';
import { CreateChapterInput, UpdateChapterInput } from '@/modules/lesson/schemas/lesson.schema';

export class ChapterRepository {
  private repository: Repository<Chapter>;

  constructor() {
    this.repository = AppDataSource.getRepository(Chapter);
  }

  async findAll(): Promise<Chapter[]> {
    return this.repository.find({
      relations: {
        author: true,
      },
      order: {
        orderIndex: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findById(idChapter: string): Promise<Chapter | null> {
    return this.repository.findOne({
      where: { idChapter },
      relations: {
        author: true,
      },
    });
  }

  async create(data: CreateChapterInput): Promise<Chapter> {
    const chapter = this.repository.create({
      title: data.title,
      description: data.description,
      orderIndex: data.orderIndex ?? 0,
      author: data.authorId ? ({ idUser: data.authorId } as Chapter['author']) : undefined,
    });

    return this.repository.save(chapter);
  }

  async update(idChapter: string, data: UpdateChapterInput): Promise<Chapter | null> {
    const existing = await this.findById(idChapter);
    if (!existing) {
      return null;
    }

    if (data.title !== undefined) existing.title = data.title;
    if (data.description !== undefined) existing.description = data.description;
    if (data.orderIndex !== undefined) existing.orderIndex = data.orderIndex;
    if (data.authorId !== undefined) {
      existing.author = data.authorId
        ? ({ idUser: data.authorId } as Chapter['author'])
        : undefined;
    }

    await this.repository.save(existing);
    return this.findById(idChapter);
  }

  async delete(idChapter: string): Promise<boolean> {
    const result = await this.repository.delete(idChapter);
    return (result.affected ?? 0) > 0;
  }
}

export const chapterRepository = new ChapterRepository();
