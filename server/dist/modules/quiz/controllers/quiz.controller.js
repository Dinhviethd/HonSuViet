"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizController = void 0;
const quiz_service_1 = require("@/modules/quiz/services/quiz.service");
const error_response_1 = require("@/utils/error.response");
const quiz_schema_1 = require("@/modules/quiz/schemas/quiz.schema");
class QuizController {
    getAll = (0, error_response_1.asyncHandler)(async (_req, res) => {
        const quizzes = await quiz_service_1.quizService.getAll();
        res.status(200).json({ success: true, data: quizzes });
    });
    getAllPaginated = (0, error_response_1.asyncHandler)(async (req, res) => {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
        const result = await quiz_service_1.quizService.getAllPaginated(page, limit);
        res.status(200).json({ success: true, ...result });
    });
    getById = (0, error_response_1.asyncHandler)(async (req, res) => {
        const quiz = await quiz_service_1.quizService.getById(req.params.id);
        res.status(200).json({ success: true, data: quiz });
    });
    create = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = quiz_schema_1.createQuizSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const quiz = await quiz_service_1.quizService.create(parsed.data);
        res.status(201).json({ success: true, message: 'Tạo bài kiểm tra thành công', data: quiz });
    });
    update = (0, error_response_1.asyncHandler)(async (req, res) => {
        const parsed = quiz_schema_1.updateQuizSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new error_response_1.AppError(400, parsed.error.issues.map(e => e.message).join(', '));
        }
        const quiz = await quiz_service_1.quizService.update(req.params.id, parsed.data);
        res.status(200).json({ success: true, message: 'Cập nhật bài kiểm tra thành công', data: quiz });
    });
    delete = (0, error_response_1.asyncHandler)(async (req, res) => {
        await quiz_service_1.quizService.delete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa bài kiểm tra thành công' });
    });
    getAllWithQuestionCount = (0, error_response_1.asyncHandler)(async (_req, res) => {
        const quizzes = await quiz_service_1.quizService.getAllWithQuestionCount();
        res.status(200).json({ success: true, data: quizzes });
    });
}
exports.quizController = new QuizController();
