"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLessonProgressController = void 0;
const user_lesson_progress_service_1 = require("@/modules/lesson/services/user-lesson-progress.service");
const lesson_schema_1 = require("@/modules/lesson/schemas/lesson.schema");
const error_response_1 = require("@/utils/error.response");
class UserLessonProgressController {
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const progress = await user_lesson_progress_service_1.userLessonProgressService.getById(req.params.id);
        res.status(200).json({ success: true, data: progress });
    });
    getByUser = (0, error_response_1.asyncHandler)(async (req, res) => {
        const progressList = await user_lesson_progress_service_1.userLessonProgressService.getByUser(req.params.userId);
        res.status(200).json({ success: true, data: progressList });
    });
    getByUserAndLesson = (0, error_response_1.asyncHandler)(async (req, res) => {
        const progress = await user_lesson_progress_service_1.userLessonProgressService.getByUserAndLesson(req.params.userId, req.params.lessonId);
        res.status(200).json({ success: true, data: progress });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.createUserLessonProgressSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const progress = await user_lesson_progress_service_1.userLessonProgressService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo tiến độ học thành công', data: progress });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.updateUserLessonProgressSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const progress = await user_lesson_progress_service_1.userLessonProgressService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật tiến độ học thành công', data: progress });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await user_lesson_progress_service_1.userLessonProgressService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa tiến độ học thành công' });
    });
}
exports.userLessonProgressController = new UserLessonProgressController();
