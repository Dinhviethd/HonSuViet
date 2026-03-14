import { levelConfigRepository, LevelConfigRepository } from '@/modules/gamification/repositories/level-config.repository';
import { CreateLevelConfigInput, UpdateLevelConfigInput } from '@/modules/gamification/schemas/gamification.schema';
import { LevelConfig } from '@/modules/gamification/entities/level_config.entity';
import { PaginationResult } from '@/utils/pagination';
import { AppError } from '@/utils/error.response';

export class LevelConfigService {
  private repo: LevelConfigRepository;

  constructor() {
    this.repo = levelConfigRepository;
  }

  async getAll(): Promise<LevelConfig[]> {
    return this.repo.findAll();
  }

  async getAllPaginated(page: number, limit: number): Promise<PaginationResult<LevelConfig>> {
    return this.repo.findAllPaginated(page, limit);
  }

  async getById(idLevel: string): Promise<LevelConfig> {
    const level = await this.repo.findById(idLevel);
    if (!level) throw new AppError(404, 'Level config không tồn tại');
    return level;
  }

  async create(data: CreateLevelConfigInput): Promise<LevelConfig> {
    const existing = await this.repo.findByLevel(data.level);
    if (existing) throw new AppError(409, `Level ${data.level} đã tồn tại`);
    return this.repo.create(data);
  }

  async update(idLevel: string, data: UpdateLevelConfigInput): Promise<LevelConfig> {
    const updated = await this.repo.update(idLevel, data);
    if (!updated) throw new AppError(404, 'Level config không tồn tại');
    return updated;
  }

  async delete(idLevel: string): Promise<void> {
    const deleted = await this.repo.delete(idLevel);
    if (!deleted) throw new AppError(404, 'Level config không tồn tại');
  }
}

export const levelConfigService = new LevelConfigService();
