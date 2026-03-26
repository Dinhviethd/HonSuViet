"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatRepository = exports.UserStatRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const user_stats_entity_1 = require("@/modules/gamification/entities/user_stats.entity");
const pagination_1 = require("@/utils/pagination");
class UserStatRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(user_stats_entity_1.UserStat);
    }
    async findAll() {
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
    async findAllPaginated(page, limit) {
        const { skip, take } = (0, pagination_1.createPaginationQuery)(page, limit);
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
        return pagination_1.PaginationUtil.createPagination(data, total, page, limit);
    }
    async findById(idStat) {
        return this.repository.findOne({
            where: { idStat },
            relations: {
                user: true,
                currentLevel: true,
            },
        });
    }
    async findByUserId(idUser) {
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
    async create(data) {
        const stat = this.repository.create({
            user: { idUser: data.idUser },
            currentLevel: { idLevel: data.idLevel },
            totalXp: data.totalXp ?? 0,
            energy: data.energy ?? 100,
            streakDays: data.streakDays ?? 0,
        });
        return this.repository.save(stat);
    }
    async update(idStat, data) {
        const existing = await this.findById(idStat);
        if (!existing) {
            return null;
        }
        if (data.idLevel !== undefined) {
            existing.currentLevel = { idLevel: data.idLevel };
        }
        if (data.totalXp !== undefined)
            existing.totalXp = data.totalXp;
        if (data.energy !== undefined)
            existing.energy = data.energy;
        if (data.streakDays !== undefined)
            existing.streakDays = data.streakDays;
        await this.repository.save(existing);
        return this.findById(idStat);
    }
    async delete(idStat) {
        const result = await this.repository.delete(idStat);
        return (result.affected ?? 0) > 0;
    }
}
exports.UserStatRepository = UserStatRepository;
exports.userStatRepository = new UserStatRepository();
