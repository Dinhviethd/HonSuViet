import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { UserNote } from '@/modules/lesson/entities/user_notes.entity';
import { CreateUserNoteInput, UpdateUserNoteInput } from '@/modules/lesson/schemas/lesson.schema';

export class UserNoteRepository {
  private repository: Repository<UserNote>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserNote);
  }

  async findById(id: string): Promise<UserNote | null> {
    return this.repository.findOne({
      where: { idNote: id },
      relations: {
        user: true,
        lesson: true,
      },
    });
  }

  async findByUser(idUser: string): Promise<UserNote[]> {
    return this.repository.find({
      where: {
        user: { idUser },
      },
      relations: {
        user: true,
        lesson: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByLesson(idLesson: string): Promise<UserNote[]> {
    return this.repository.find({
      where: {
        lesson: { idLesson: idLesson },
      },
      relations: {
        user: true,
        lesson: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(data: CreateUserNoteInput): Promise<UserNote> {
    const note = this.repository.create({
      user: { idUser: data.idUser } as UserNote['user'],
      lesson: { idLesson: data.idLesson } as UserNote['lesson'],
      content: data.content,
    });

    return this.repository.save(note);
  }

  async update(id: string, data: UpdateUserNoteInput): Promise<UserNote | null> {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }

    if (data.content !== undefined) existing.content = data.content;

    await this.repository.save(existing);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

export const userNoteRepository = new UserNoteRepository();
