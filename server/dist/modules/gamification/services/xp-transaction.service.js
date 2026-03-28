"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xpTransactionService = exports.XpTransactionService = void 0;
const xp_transaction_repository_1 = require("@/modules/gamification/repositories/xp-transaction.repository");
const error_response_1 = require("@/utils/error.response");
class XpTransactionService {
    repo;
    constructor() {
        this.repo = xp_transaction_repository_1.xpTransactionRepository;
    }
    async getById(idTransaction) {
        const tx = await this.repo.findById(idTransaction);
        if (!tx)
            throw new error_response_1.AppError(404, 'XP transaction không tồn tại');
        return tx;
    }
    async getByUser(idUser) {
        return this.repo.findByUserId(idUser);
    }
    async getByUserPaginated(idUser, page, limit) {
        return this.repo.findByUserIdPaginated(idUser, page, limit);
    }
    async create(data) {
        return this.repo.create(data);
    }
    async update(idTransaction, data) {
        const updated = await this.repo.update(idTransaction, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'XP transaction không tồn tại');
        return updated;
    }
    async delete(idTransaction) {
        const deleted = await this.repo.delete(idTransaction);
        if (!deleted)
            throw new error_response_1.AppError(404, 'XP transaction không tồn tại');
    }
}
exports.XpTransactionService = XpTransactionService;
exports.xpTransactionService = new XpTransactionService();
