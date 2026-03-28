"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerRepository = exports.AnswerRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const answer_entity_1 = require("@/modules/quiz/entities/answer.entity");
class AnswerRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(answer_entity_1.Answer);
    }
    async findByQuestionId(idQuestion) {
        return this.repository.find({
            where: {
                question: { idQuestion },
            },
            relations: {
                question: true,
            },
            order: {
                idAnswer: 'ASC',
            },
        });
    }
    async findById(idAnswer) {
        return this.repository.findOne({
            where: { idAnswer },
            relations: {
                question: true,
            },
        });
    }
    async create(data) {
        const answer = this.repository.create({
            content: data.content,
            isCorrect: data.isCorrect ?? false,
            question: { idQuestion: data.idQuestion },
        });
        return this.repository.save(answer);
    }
    async update(idAnswer, data) {
        const existing = await this.findById(idAnswer);
        if (!existing) {
            return null;
        }
        if (data.content !== undefined)
            existing.content = data.content;
        if (data.isCorrect !== undefined)
            existing.isCorrect = data.isCorrect;
        await this.repository.save(existing);
        return this.findById(idAnswer);
    }
    async delete(idAnswer) {
        const result = await this.repository.delete(idAnswer);
        return (result.affected ?? 0) > 0;
    }
}
exports.AnswerRepository = AnswerRepository;
exports.answerRepository = new AnswerRepository();
