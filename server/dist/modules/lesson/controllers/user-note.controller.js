"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNoteController = void 0;
const user_note_service_1 = require("@/modules/lesson/services/user-note.service");
const lesson_schema_1 = require("@/modules/lesson/schemas/lesson.schema");
const error_response_1 = require("@/utils/error.response");
class UserNoteController {
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const note = await user_note_service_1.userNoteService.getById(req.params.id);
        res.status(200).json({ success: true, data: note });
    });
    getByUser = (0, error_response_1.asyncHandler)(async (req, res) => {
        const notes = await user_note_service_1.userNoteService.getByUser(req.params.userId);
        res.status(200).json({ success: true, data: notes });
    });
    getByLesson = (0, error_response_1.asyncHandler)(async (req, res) => {
        const notes = await user_note_service_1.userNoteService.getByLesson(req.params.lessonId);
        res.status(200).json({ success: true, data: notes });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.createUserNoteSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const note = await user_note_service_1.userNoteService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo ghi chú thành công', data: note });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = lesson_schema_1.updateUserNoteSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const note = await user_note_service_1.userNoteService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật ghi chú thành công', data: note });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await user_note_service_1.userNoteService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa ghi chú thành công' });
    });
}
exports.userNoteController = new UserNoteController();
