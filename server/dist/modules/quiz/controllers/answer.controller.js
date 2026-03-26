"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerController = void 0;
const answer_service_1 = require("@/modules/quiz/services/answer.service");
const error_response_1 = require("@/utils/error.response");
const quiz_schema_1 = require("@/modules/quiz/schemas/quiz.schema");
class AnswerController {
    getByQuestion = (0, error_response_1.asyncHandler)(async (req, res) => {
        const answers = await answer_service_1.answerService.getByQuestion(req.params.questionId);
        res.status(200).json({ success: true, data: answers });
    });
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const answer = await answer_service_1.answerService.getById(req.params.id);
        res.status(200).json({ success: true, data: answer });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = quiz_schema_1.createAnswerSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const answer = await answer_service_1.answerService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo đáp án thành công', data: answer });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = quiz_schema_1.updateAnswerSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const answer = await answer_service_1.answerService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật đáp án thành công', data: answer });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await answer_service_1.answerService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa đáp án thành công' });
    });
}
exports.answerController = new AnswerController();
