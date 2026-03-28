import { Repository } from 'typeorm';
import { AppDataSource } from '@/configs/database.config';
import { LevelConfig } from '@/modules/gamification/entities/level_config.entity';
import { CreateLevelConfigInput, UpdateLevelConfigInput } from '@/modules/gamification/schemas/gamification.schema';
import { createPaginationQuery, PaginationResult, PaginationUtil } from '@/utils/pagination';

export class LevelConfigRepository {
  private repository: Repository<LevelConfig>;

  constructor() {
    this.repository = AppDataSource.getRepository(LevelConfig);
  }

  async findAll(): Promise<LevelConfig[]> {
    return this.repository.find({
      order: {
        level: 'ASC',
      },
    });
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginationResult<LevelConfig>> {
    const { skip, take } = createPaginationQuery(page, limit);
    const [data, total] = await this.repository.findAndCount({
      order: {
        level: 'ASC',
      },
      skip,
      take,
    });

    return PaginationUtil.createPagination(data, total, page, limit);
  }

  async findById(idLevel: string): Promise<LevelConfig | null> {
    return this.repository.findOne({
      where: { idLevel },
    });
  }

  async findByLevel(level: number): Promise<LevelConfig | null> {
    return this.repository.findOne({
      where: { level },
    });
  }

  async create(data: CreateLevelConfigInput): Promise<LevelConfig> {
    const level = this.repository.create(data);
    return this.repository.save(level);
  }

  async update(idLevel: string, data: UpdateLevelConfigInput): Promise<LevelConfig | null> {
    const existing = await this.findById(idLevel);
    if (!existing) {
      return null;
    }

    if (data.level !== undefined) existing.level = data.level;
    if (data.minXp !== undefined) existing.minXp = data.minXp;
    if (data.title !== undefined) existing.title = data.title;

    await this.repository.save(existing);
    return this.findById(idLevel);
  }

  async delete(idLevel: string): Promise<boolean> {
    const result = await this.repository.delete(idLevel);
    return (result.affected ?? 0) > 0;
  }
}

export const levelConfigRepository = new LevelConfigRepository();
