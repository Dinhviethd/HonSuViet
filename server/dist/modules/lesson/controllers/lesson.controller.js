"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonController = void 0;
const lesson_service_1 = require("@/modules/lesson/services/lesson.service");
const lesson_schema_1 = require("@/modules/lesson/schemas/lesson.schema");
const error_response_1 = require("@/utils/error.response");
class LessonController {
    getAll = (0, error_response_1.asyncHandler)(async (_req, res) => {
        const lessons = await lesson_service_1.lessonService.getAll();
        res.status(200).json({ success: true, data: lessons });
    });
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const lesson = await lesson_service_1.lessonService.getById(req.params.id);
        res.status(200).json({ success: true, data: lesson });
    });
    getByChapter = (0, error_response_1.asyncHandler)(async (req, res) => {
        const lessons = await lesson_service_1.lessonService.getByChapter(req.params.chapterId);
        res.status(200).json({ success: true, data: lessons });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.createLessonSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const lesson = await lesson_service_1.lessonService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo bài học thành công', data: lesson });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.updateLessonSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const lesson = await lesson_service_1.lessonService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật bài học thành công', data: lesson });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await lesson_service_1.lessonService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa bài học thành công' });
    });
}
exports.lessonController = new LessonController();
