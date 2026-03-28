"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonMediaController = void 0;
const lesson_media_service_1 = require("@/modules/lesson/services/lesson-media.service");
const lesson_schema_1 = require("@/modules/lesson/schemas/lesson.schema");
const error_response_1 = require("@/utils/error.response");
class LessonMediaController {
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const media = await lesson_media_service_1.lessonMediaService.getById(req.params.id);
        res.status(200).json({ success: true, data: media });
    });
    getByLesson = (0, error_response_1.asyncHandler)(async (req, res) => {
        const mediaList = await lesson_media_service_1.lessonMediaService.getByLesson(req.params.lessonId);
        res.status(200).json({ success: true, data: mediaList });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.createLessonMediaSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const media = await lesson_media_service_1.lessonMediaService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Thêm media thành công', data: media });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.updateLessonMediaSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const media = await lesson_media_service_1.lessonMediaService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật media thành công', data: media });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await lesson_media_service_1.lessonMediaService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa media thành công' });
    });
}
exports.lessonMediaController = new LessonMediaController();
