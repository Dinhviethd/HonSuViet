"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerService = exports.AnswerService = void 0;
const answer_repository_1 = require("@/modules/quiz/repositories/answer.repository");
const error_response_1 = require("@/utils/error.response");
class AnswerService {
    answerRepo;
    constructor() {
        this.answerRepo = answer_repository_1.answerRepository;
    }
    async getByQuestion(idQuestion) {
        return this.answerRepo.findByQuestionId(idQuestion);
    }
    async getById(idAnswer) {
        const answer = await this.answerRepo.findById(idAnswer);
        if (!answer)
            throw new error_response_1.AppError(404, 'Đáp án không tồn tại');
        return answer;
    }
    async create(data) {
        return this.answerRepo.create(data);
    }
    async update(idAnswer, data) {
        const updated = await this.answerRepo.update(idAnswer, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Đáp án không tồn tại');
        return updated;
    }
    async delete(idAnswer) {
        const deleted = await this.answerRepo.delete(idAnswer);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Đáp án không tồn tại');
    }
}
exports.AnswerService = AnswerService;
exports.answerService = new AnswerService();
