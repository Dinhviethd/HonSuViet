"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizService = exports.QuizService = void 0;
const quiz_repository_1 = require("@/modules/quiz/repositories/quiz.repository");
const error_response_1 = require("@/utils/error.response");
class QuizService {
    quizRepo;
    constructor() {
        this.quizRepo = quiz_repository_1.quizRepository;
    }
    async getAll() {
        return this.quizRepo.findAll();
    }
    async getAllPaginated(page, limit) {
        return this.quizRepo.findAllPaginated(page, limit);
    }
    async getById(idQuiz) {
        const quiz = await this.quizRepo.findById(idQuiz);
        if (!quiz)
            throw new error_response_1.AppError(404, 'Bài kiểm tra không tồn tại');
        return quiz;
    }
    async create(data) {
        return this.quizRepo.create(data);
    }
    async update(idQuiz, data) {
        const updated = await this.quizRepo.update(idQuiz, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Bài kiểm tra không tồn tại');
        return updated;
    }
    async delete(idQuiz) {
        const deleted = await this.quizRepo.delete(idQuiz);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Bài kiểm tra không tồn tại');
    }
    async getAllWithQuestionCount() {
        return this.quizRepo.findAllWithQuestionCount();
    }
}
exports.QuizService = QuizService;
exports.quizService = new QuizService();
