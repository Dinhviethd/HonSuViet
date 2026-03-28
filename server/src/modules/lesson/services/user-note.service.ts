import { userNoteRepository, UserNoteRepository } from '@/modules/lesson/repositories/user-note.repository';
import { CreateUserNoteInput, UpdateUserNoteInput } from '@/modules/lesson/schemas/lesson.schema';
import { UserNote } from '@/modules/lesson/entities/user_notes.entity';
import { AppError } from '@/utils/error.response';

export class UserNoteService {
  private noteRepo: UserNoteRepository;

  constructor() {
    this.noteRepo = userNoteRepository;
  }

  async getById(idNote: string): Promise<UserNote> {
    const note = await this.noteRepo.findById(idNote);
    if (!note) throw new AppError(404, 'Ghi chú không tồn tại');
    return note;
  }

  async getByUser(idUser: string): Promise<UserNote[]> {
    return this.noteRepo.findByUser(idUser);
  }

  async getByLesson(idLesson: string): Promise<UserNote[]> {
    return this.noteRepo.findByLesson(idLesson);
  }

  async create(data: CreateUserNoteInput): Promise<UserNote> {
    return this.noteRepo.create(data);
  }

  async update(idNote: string, data: UpdateUserNoteInput): Promise<UserNote> {
    const updated = await this.noteRepo.update(idNote, data);
    if (!updated) throw new AppError(404, 'Ghi chú không tồn tại');
    return updated;
  }

  async delete(idNote: string): Promise<void> {
    const deleted = await this.noteRepo.delete(idNote);
    if (!deleted) throw new AppError(404, 'Ghi chú không tồn tại');
  }
}

export const userNoteService = new UserNoteService();
