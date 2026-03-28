"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xpTransactionRepository = exports.XpTransactionRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const xp_transactions_entity_1 = require("@/modules/gamification/entities/xp_transactions.entity");
const pagination_1 = require("@/utils/pagination");
class XpTransactionRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(xp_transactions_entity_1.XpTransaction);
    }
    async findById(idTransaction) {
        return this.repository.findOne({
            where: { idTransaction },
            relations: {
                user: true,
            },
        });
    }
    async findByUserId(idUser) {
        return this.repository.find({
            where: {
                user: { idUser },
            },
            relations: {
                user: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findByUserIdPaginated(idUser, page, limit) {
        const { skip, take } = (0, pagination_1.createPaginationQuery)(page, limit);
        const [data, total] = await this.repository.findAndCount({
            where: {
                user: { idUser },
            },
            relations: {
                user: true,
            },
            order: {
                createdAt: 'DESC',
            },
            skip,
            take,
        });
        return pagination_1.PaginationUtil.createPagination(data, total, page, limit);
    }
    async create(data) {
        const transaction = this.repository.create({
            user: { idUser: data.idUser },
            actionType: data.actionType,
            referenceId: data.referenceId,
            xpEarned: data.xpEarned,
        });
        return this.repository.save(transaction);
    }
    async update(idTransaction, data) {
        const existing = await this.findById(idTransaction);
        if (!existing) {
            return null;
        }
        if (data.actionType !== undefined)
            existing.actionType = data.actionType;
        if (data.referenceId !== undefined)
            existing.referenceId = data.referenceId;
        if (data.xpEarned !== undefined)
            existing.xpEarned = data.xpEarned;
        await this.repository.save(existing);
        return this.findById(idTransaction);
    }
    async delete(idTransaction) {
        const result = await this.repository.delete(idTransaction);
        return (result.affected ?? 0) > 0;
    }
}
exports.XpTransactionRepository = XpTransactionRepository;
exports.xpTransactionRepository = new XpTransactionRepository();
