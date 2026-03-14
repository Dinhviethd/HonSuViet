import { chapterRepository, ChapterRepository } from '@/modules/lesson/repositories/chapter.repository';
import { CreateChapterInput, UpdateChapterInput } from '@/modules/lesson/schemas/lesson.schema';
import { Chapter } from '@/modules/lesson/entities/chapter.entity';
import { AppError } from '@/utils/error.response';

export class ChapterService {
  private chapterRepo: ChapterRepository;

  constructor() {
    this.chapterRepo = chapterRepository;
  }

  async getAll(): Promise<Chapter[]> {
    return this.chapterRepo.findAll();
  }

  async getById(idChapter: string): Promise<Chapter> {
    const chapter = await this.chapterRepo.findById(idChapter);
    if (!chapter) throw new AppError(404, 'Chương học không tồn tại');
    return chapter;
  }

  async create(data: CreateChapterInput): Promise<Chapter> {
    return this.chapterRepo.create(data);
  }

  async update(idChapter: string, data: UpdateChapterInput): Promise<Chapter> {
    const updated = await this.chapterRepo.update(idChapter, data);
    if (!updated) throw new AppError(404, 'Chương học không tồn tại');
    return updated;
  }

  async delete(idChapter: string): Promise<void> {
    const deleted = await this.chapterRepo.delete(idChapter);
    if (!deleted) throw new AppError(404, 'Chương học không tồn tại');
  }
}

export const chapterService = new ChapterService();
