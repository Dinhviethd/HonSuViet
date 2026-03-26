"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelConfigRepository = exports.LevelConfigRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const level_config_entity_1 = require("@/modules/gamification/entities/level_config.entity");
const pagination_1 = require("@/utils/pagination");
class LevelConfigRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(level_config_entity_1.LevelConfig);
    }
    async findAll() {
        return this.repository.find({
            order: {
                level: 'ASC',
            },
        });
    }
    async findAllPaginated(page, limit) {
        const { skip, take } = (0, pagination_1.createPaginationQuery)(page, limit);
        const [data, total] = await this.repository.findAndCount({
            order: {
                level: 'ASC',
            },
            skip,
            take,
        });
        return pagination_1.PaginationUtil.createPagination(data, total, page, limit);
    }
    async findById(idLevel) {
        return this.repository.findOne({
            where: { idLevel },
        });
    }
    async findByLevel(level) {
        return this.repository.findOne({
            where: { level },
        });
    }
    async create(data) {
        const level = this.repository.create(data);
        return this.repository.save(level);
    }
    async update(idLevel, data) {
        const existing = await this.findById(idLevel);
        if (!existing) {
            return null;
        }
        if (data.level !== undefined)
            existing.level = data.level;
        if (data.minXp !== undefined)
            existing.minXp = data.minXp;
        if (data.title !== undefined)
            existing.title = data.title;
        await this.repository.save(existing);
        return this.findById(idLevel);
    }
    async delete(idLevel) {
        const result = await this.repository.delete(idLevel);
        return (result.affected ?? 0) > 0;
    }
}
exports.LevelConfigRepository = LevelConfigRepository;
exports.levelConfigRepository = new LevelConfigRepository();
