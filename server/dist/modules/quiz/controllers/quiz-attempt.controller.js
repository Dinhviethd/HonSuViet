"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAttemptController = void 0;
const quiz_attempt_service_1 = require("@/modules/quiz/services/quiz-attempt.service");
const error_response_1 = require("@/utils/error.response");
const quiz_schema_1 = require("@/modules/quiz/schemas/quiz.schema");
class QuizAttemptController {
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const attempt = await quiz_attempt_service_1.quizAttemptService.getById(req.params.id);
        res.status(200).json({ success: true, data: attempt });
    });
    getByUser = (0, error_response_1.asyncHandler)(async (req, res) => {
        const attempts = await quiz_attempt_service_1.quizAttemptService.getByUser(req.params.userId);
        res.status(200).json({ success: true, data: attempts });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = quiz_schema_1.createQuizAttemptSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const attempt = await quiz_attempt_service_1.quizAttemptService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo lần làm bài thành công', data: attempt });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = quiz_schema_1.updateQuizAttemptSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const attempt = await quiz_attempt_service_1.quizAttemptService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật lần làm bài thành công', data: attempt });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await quiz_attempt_service_1.quizAttemptService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa lần làm bài thành công' });
    });
    getStatsByUser = (0, error_response_1.asyncHandler)(async (req, res) => {
        const stats = await quiz_attempt_service_1.quizAttemptService.getStatsByUser(req.params.userId);
        res.status(200).json({ success: true, data: stats });
    });
    getTotalQuizzes = (0, error_response_1.asyncHandler)(async (_req, res) => {
        const total = await quiz_attempt_service_1.quizAttemptService.getTotalQuizzes();
        res.status(200).json({ success: true, data: { totalQuizzes: total } });
    });
}
exports.quizAttemptController = new QuizAttemptController();
