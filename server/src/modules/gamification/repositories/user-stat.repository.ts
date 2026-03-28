import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { UserStat } from '@/modules/gamification/entities/user_stats.entity';
import { CreateUserStatInput, UpdateUserStatInput } from '@/modules/gamification/schemas/gamification.schema';
import { createPaginationQuery, PaginationResult, PaginationUtil } from '@/utils/pagination';

export class UserStatRepository {
  private repository: Repository<UserStat>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserStat);
  }

  async findAll(): Promise<UserStat[]> {
    return this.repository.find({
      relations: {
        user: true,
        currentLevel: true,
      },
      order: {
        totalXp: 'DESC',
      },
    });
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginationResult<UserStat>> {
    const { skip, take } = createPaginationQuery(page, limit);
    const [data, total] = await this.repository.findAndCount({
      relations: {
        user: true,
        currentLevel: true,
      },
      order: {
        totalXp: 'DESC',
      },
      skip,
      take,
    });

    return PaginationUtil.createPagination(data, total, page, limit);
  }

  async findById(idStat: string): Promise<UserStat | null> {
    return this.repository.findOne({
      where: { idStat },
      relations: {
        user: true,
        currentLevel: true,
      },
    });
  }

  async findByUserId(idUser: string): Promise<UserStat | null> {
    return this.repository.findOne({
      where: {
        user: { idUser },
      },
      relations: {
        user: true,
        currentLevel: true,
      },
    });
  }

  async create(data: CreateUserStatInput): Promise<UserStat> {
    const stat = this.repository.create({
      user: { idUser: data.idUser } as UserStat['user'],
      currentLevel: { idLevel: data.idLevel } as UserStat['currentLevel'],
      totalXp: data.totalXp ?? 0,
      energy: data.energy ?? 100,
      streakDays: data.streakDays ?? 0,
    });

    return this.repository.save(stat);
  }

  async update(idStat: string, data: UpdateUserStatInput): Promise<UserStat | null> {
    const existing = await this.findById(idStat);
    if (!existing) {
      return null;
    }

    if (data.idLevel !== undefined) {
      existing.currentLevel = { idLevel: data.idLevel } as UserStat['currentLevel'];
    }
    if (data.totalXp !== undefined) existing.totalXp = data.totalXp;
    if (data.energy !== undefined) existing.energy = data.energy;
    if (data.streakDays !== undefined) existing.streakDays = data.streakDays;

    await this.repository.save(existing);
    return this.findById(idStat);
  }

  async delete(idStat: string): Promise<boolean> {
    const result = await this.repository.delete(idStat);
    return (result.affected ?? 0) > 0;
  }
}

export const userStatRepository = new UserStatRepository();
