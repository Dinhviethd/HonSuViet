"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterController = void 0;
const chapter_service_1 = require("@/modules/lesson/services/chapter.service");
const lesson_schema_1 = require("@/modules/lesson/schemas/lesson.schema");
const error_response_1 = require("@/utils/error.response");
class ChapterController {
    getAll = (0, error_response_1.asyncHandler)(async (_req, res) => {
        const chapters = await chapter_service_1.chapterService.getAll();
        res.status(200).json({ success: true, data: chapters });
    });
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const chapter = await chapter_service_1.chapterService.getById(req.params.id);
        res.status(200).json({ success: true, data: chapter });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.createChapterSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const chapter = await chapter_service_1.chapterService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo chương học thành công', data: chapter });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.updateChapterSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const chapter = await chapter_service_1.chapterService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật chương học thành công', data: chapter });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await chapter_service_1.chapterService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa chương học thành công' });
    });
}
exports.chapterController = new ChapterController();
