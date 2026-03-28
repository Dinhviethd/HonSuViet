"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelConfigController = void 0;
const level_config_service_1 = require("@/modules/gamification/services/level-config.service");
const gamification_schema_1 = require("@/modules/gamification/schemas/gamification.schema");
const error_response_1 = require("@/utils/error.response");
class LevelConfigController {
    getAll = (0, error_response_1.asyncHandler)(async (req, res) => {
        const { page, limit } = req.query;
        if (page || limit) {
            const p = parseInt(page) || 1;
            const l = parseInt(limit) || 20;
            const result = await level_config_service_1.levelConfigService.getAllPaginated(p, l);
            return res.status(200).json({ success: true, ...result });
        }
        const levels = await level_config_service_1.levelConfigService.getAll();
        res.status(200).json({ success: true, data: levels });
    });
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const level = await level_config_service_1.levelConfigService.getById(req.params.id);
        res.status(200).json({ success: true, data: level });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = gamification_schema_1.createLevelConfigSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const level = await level_config_service_1.levelConfigService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo level config thành công', data: level });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = gamification_schema_1.updateLevelConfigSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const level = await level_config_service_1.levelConfigService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật level config thành công', data: level });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await level_config_service_1.levelConfigService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa level config thành công' });
    });
}
exports.levelConfigController = new LevelConfigController();
