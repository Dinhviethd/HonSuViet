"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xpTransactionController = void 0;
const xp_transaction_service_1 = require("@/modules/gamification/services/xp-transaction.service");
const gamification_schema_1 = require("@/modules/gamification/schemas/gamification.schema");
const error_response_1 = require("@/utils/error.response");
class XpTransactionController {
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const tx = await xp_transaction_service_1.xpTransactionService.getById(req.params.id);
        res.status(200).json({ success: true, data: tx });
    });
    getByUser = (0, error_response_1.asyncHandler)(async (req, res) => {
        const { page, limit } = req.query;
        if (page || limit) {
            const p = parseInt(page) || 1;
            const l = parseInt(limit) || 20;
            const result = await xp_transaction_service_1.xpTransactionService.getByUserPaginated(req.params.userId, p, l);
            return res.status(200).json({ success: true, ...result });
        }
        const txList = await xp_transaction_service_1.xpTransactionService.getByUser(req.params.userId);
        res.status(200).json({ success: true, data: txList });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = gamification_schema_1.createXpTransactionSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const tx = await xp_transaction_service_1.xpTransactionService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo XP transaction thành công', data: tx });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = gamification_schema_1.updateXpTransactionSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const tx = await xp_transaction_service_1.xpTransactionService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật XP transaction thành công', data: tx });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await xp_transaction_service_1.xpTransactionService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa XP transaction thành công' });
    });
}
exports.xpTransactionController = new XpTransactionController();
