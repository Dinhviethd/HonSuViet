"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionService = exports.QuestionService = void 0;
const question_repository_1 = require("@/modules/quiz/repositories/question.repository");
const error_response_1 = require("@/utils/error.response");
class QuestionService {
    questionRepo;
    constructor() {
        this.questionRepo = question_repository_1.questionRepository;
    }
    async getByQuiz(idQuiz) {
        return this.questionRepo.findByQuizId(idQuiz);
    }
    async getById(idQuestion) {
        const question = await this.questionRepo.findById(idQuestion);
        if (!question)
            throw new error_response_1.AppError(404, 'Câu hỏi không tồn tại');
        return question;
    }
    async create(data) {
        return this.questionRepo.create(data);
    }
    async update(idQuestion, data) {
        const updated = await this.questionRepo.update(idQuestion, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Câu hỏi không tồn tại');
        return updated;
    }
    async delete(idQuestion) {
        const deleted = await this.questionRepo.delete(idQuestion);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Câu hỏi không tồn tại');
    }
}
exports.QuestionService = QuestionService;
exports.questionService = new QuestionService();
