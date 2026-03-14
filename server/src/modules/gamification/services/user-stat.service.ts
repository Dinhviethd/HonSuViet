import { userStatRepository, UserStatRepository } from '@/modules/gamification/repositories/user-stat.repository';
import { CreateUserStatInput, UpdateUserStatInput } from '@/modules/gamification/schemas/gamification.schema';
import { UserStat } from '@/modules/gamification/entities/user_stats.entity';
import { PaginationResult } from '@/utils/pagination';
import { AppError } from '@/utils/error.response';

export class UserStatService {
  private repo: UserStatRepository;

  constructor() {
    this.repo = userStatRepository;
  }

  async getAll(): Promise<UserStat[]> {
    return this.repo.findAll();
  }

  async getAllPaginated(page: number, limit: number): Promise<PaginationResult<UserStat>> {
    return this.repo.findAllPaginated(page, limit);
  }

  async getById(idStat: string): Promise<UserStat> {
    const stat = await this.repo.findById(idStat);
    if (!stat) throw new AppError(404, 'User stat không tồn tại');
    return stat;
  }

  async getByUser(idUser: string): Promise<UserStat> {
    const stat = await this.repo.findByUserId(idUser);
    if (!stat) throw new AppError(404, 'User stat không tồn tại');
    return stat;
  }

  async create(data: CreateUserStatInput): Promise<UserStat> {
    const existing = await this.repo.findByUserId(data.idUser);
    if (existing) throw new AppError(409, 'User stat đã tồn tại cho user này');
    return this.repo.create(data);
  }

  async update(idStat: string, data: UpdateUserStatInput): Promise<UserStat> {
    const updated = await this.repo.update(idStat, data);
    if (!updated) throw new AppError(404, 'User stat không tồn tại');
    return updated;
  }

  async delete(idStat: string): Promise<void> {
    const deleted = await this.repo.delete(idStat);
    if (!deleted) throw new AppError(404, 'User stat không tồn tại');
  }
}

export const userStatService = new UserStatService();
