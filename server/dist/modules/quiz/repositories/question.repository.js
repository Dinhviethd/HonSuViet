"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRepository = exports.QuestionRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const question_entity_1 = require("@/modules/quiz/entities/question.entity");
class QuestionRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(question_entity_1.Question);
    }
    async findByQuizId(idQuiz) {
        return this.repository.find({
            where: {
                quiz: { idQuiz },
            },
            relations: {
                quiz: true,
            },
            order: {
                idQuestion: 'ASC',
            },
        });
    }
    async findById(idQuestion) {
        return this.repository.findOne({
            where: { idQuestion },
            relations: {
                quiz: true,
            },
        });
    }
    async create(data) {
        const question = this.repository.create({
            content: data.content,
            explanation: data.explanation,
            quiz: { idQuiz: data.idQuiz },
        });
        return this.repository.save(question);
    }
    async update(idQuestion, data) {
        const existing = await this.findById(idQuestion);
        if (!existing) {
            return null;
        }
        if (data.content !== undefined)
            existing.content = data.content;
        if (data.explanation !== undefined)
            existing.explanation = data.explanation;
        await this.repository.save(existing);
        return this.findById(idQuestion);
    }
    async delete(idQuestion) {
        const result = await this.repository.delete(idQuestion);
        return (result.affected ?? 0) > 0;
    }
}
exports.QuestionRepository = QuestionRepository;
exports.questionRepository = new QuestionRepository();
