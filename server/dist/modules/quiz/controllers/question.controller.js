"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionController = void 0;
const question_service_1 = require("@/modules/quiz/services/question.service");
const error_response_1 = require("@/utils/error.response");
const quiz_schema_1 = require("@/modules/quiz/schemas/quiz.schema");
class QuestionController {
    getByQuiz = (0, error_response_1.asyncHandler)(async (req, res) => {
        const questions = await question_service_1.questionService.getByQuiz(req.params.quizId);
        res.status(200).json({ success: true, data: questions });
    });
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const question = await question_service_1.questionService.getById(req.params.id);
        res.status(200).json({ success: true, data: question });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = quiz_schema_1.createQuestionSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const question = await question_service_1.questionService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo câu hỏi thành công', data: question });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = quiz_schema_1.updateQuestionSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const question = await question_service_1.questionService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật câu hỏi thành công', data: question });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await question_service_1.questionService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa câu hỏi thành công' });
    });
}
exports.questionController = new QuestionController();
