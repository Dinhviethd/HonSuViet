"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatController = void 0;
const user_stat_service_1 = require("@/modules/gamification/services/user-stat.service");
const gamification_schema_1 = require("@/modules/gamification/schemas/gamification.schema");
const error_response_1 = require("@/utils/error.response");
class UserStatController {
    getAll = (0, error_response_1.asyncHandler)(async (req, res) => {
        const { page, limit } = req.query;
        if (page || limit) {
            const p = parseInt(page) || 1;
            const l = parseInt(limit) || 20;
            const result = await user_stat_service_1.userStatService.getAllPaginated(p, l);
            return res.status(200).json({ success: true, ...result });
        }
        const stats = await user_stat_service_1.userStatService.getAll();
        res.status(200).json({ success: true, data: stats });
    });
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const stat = await user_stat_service_1.userStatService.getById(req.params.id);
        res.status(200).json({ success: true, data: stat });
    });
    getByUser = (0, error_response_1.asyncHandler)(async (req, res) => {
        const stat = await user_stat_service_1.userStatService.getByUser(req.params.userId);
        res.status(200).json({ success: true, data: stat });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = gamification_schema_1.createUserStatSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const stat = await user_stat_service_1.userStatService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo user stat thành công', data: stat });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = gamification_schema_1.updateUserStatSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const stat = await user_stat_service_1.userStatService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật user stat thành công', data: stat });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await user_stat_service_1.userStatService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa user stat thành công' });
    });
}
exports.userStatController = new UserStatController();
