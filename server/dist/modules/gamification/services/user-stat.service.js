"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatService = exports.UserStatService = void 0;
const user_stat_repository_1 = require("@/modules/gamification/repositories/user-stat.repository");
const error_response_1 = require("@/utils/error.response");
class UserStatService {
    repo;
    constructor() {
        this.repo = user_stat_repository_1.userStatRepository;
    }
    async getAll() {
        return this.repo.findAll();
    }
    async getAllPaginated(page, limit) {
        return this.repo.findAllPaginated(page, limit);
    }
    async getById(idStat) {
        const stat = await this.repo.findById(idStat);
        if (!stat)
            throw new error_response_1.AppError(404, 'User stat không tồn tại');
        return stat;
    }
    async getByUser(idUser) {
        const stat = await this.repo.findByUserId(idUser);
        if (!stat)
            throw new error_response_1.AppError(404, 'User stat không tồn tại');
        return stat;
    }
    async create(data) {
        const existing = await this.repo.findByUserId(data.idUser);
        if (existing)
            throw new error_response_1.AppError(409, 'User stat đã tồn tại cho user này');
        return this.repo.create(data);
    }
    async update(idStat, data) {
        const updated = await this.repo.update(idStat, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'User stat không tồn tại');
        return updated;
    }
    async delete(idStat) {
        const deleted = await this.repo.delete(idStat);
        if (!deleted)
            throw new error_response_1.AppError(404, 'User stat không tồn tại');
    }
}
exports.UserStatService = UserStatService;
exports.userStatService = new UserStatService();
