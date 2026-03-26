"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelConfigService = exports.LevelConfigService = void 0;
const level_config_repository_1 = require("@/modules/gamification/repositories/level-config.repository");
const error_response_1 = require("@/utils/error.response");
class LevelConfigService {
    repo;
    constructor() {
        this.repo = level_config_repository_1.levelConfigRepository;
    }
    async getAll() {
        return this.repo.findAll();
    }
    async getAllPaginated(page, limit) {
        return this.repo.findAllPaginated(page, limit);
    }
    async getById(idLevel) {
        const level = await this.repo.findById(idLevel);
        if (!level)
            throw new error_response_1.AppError(404, 'Level config không tồn tại');
        return level;
    }
    async create(data) {
        const existing = await this.repo.findByLevel(data.level);
        if (existing)
            throw new error_response_1.AppError(409, `Level ${data.level} đã tồn tại`);
        return this.repo.create(data);
    }
    async update(idLevel, data) {
        const updated = await this.repo.update(idLevel, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Level config không tồn tại');
        return updated;
    }
    async delete(idLevel) {
        const deleted = await this.repo.delete(idLevel);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Level config không tồn tại');
    }
}
exports.LevelConfigService = LevelConfigService;
exports.levelConfigService = new LevelConfigService();
