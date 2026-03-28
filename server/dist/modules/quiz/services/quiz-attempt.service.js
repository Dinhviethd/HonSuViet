"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAttemptService = exports.QuizAttemptService = void 0;
const quiz_attempt_repository_1 = require("@/modules/quiz/repositories/quiz-attempt.repository");
const quiz_repository_1 = require("@/modules/quiz/repositories/quiz.repository");
const error_response_1 = require("@/utils/error.response");
class QuizAttemptService {
    attemptRepo;
    quizRepo;
    constructor() {
        this.attemptRepo = quiz_attempt_repository_1.quizAttemptRepository;
        this.quizRepo = quiz_repository_1.quizRepository;
    }
    async getById(idAttempt) {
        const attempt = await this.attemptRepo.findById(idAttempt);
        if (!attempt)
            throw new error_response_1.AppError(404, 'Lần làm bài không tồn tại');
        return attempt;
    }
    async getByUser(idUser) {
        return this.attemptRepo.findByUser(idUser);
    }
    async create(data) {
        return this.attemptRepo.create(data);
    }
    async update(idAttempt, data) {
        const updated = await this.attemptRepo.update(idAttempt, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Lần làm bài không tồn tại');
        return updated;
    }
    async delete(idAttempt) {
        const deleted = await this.attemptRepo.delete(idAttempt);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Lần làm bài không tồn tại');
    }
    async getStatsByUser(idUser) {
        return this.attemptRepo.getStatsByUser(idUser);
    }
    async getTotalQuizzes() {
        return this.quizRepo.countAll();
    }
}
exports.QuizAttemptService = QuizAttemptService;
exports.quizAttemptService = new QuizAttemptService();
