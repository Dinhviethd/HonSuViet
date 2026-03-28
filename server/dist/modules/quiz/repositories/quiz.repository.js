"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRepository = exports.QuizRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const quiz_entity_1 = require("@/modules/quiz/entities/quiz.entity");
const pagination_1 = require("@/utils/pagination");
class QuizRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(quiz_entity_1.Quiz);
    }
    async findAll() {
        return this.repository.find({
            relations: {
                chapter: true,
                author: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findAllPaginated(page, limit) {
        const { skip, take } = (0, pagination_1.createPaginationQuery)(page, limit);
        const [data, total] = await this.repository.findAndCount({
            relations: {
                chapter: true,
                author: true,
            },
            order: {
                createdAt: 'DESC',
            },
            skip,
            take,
        });
        return pagination_1.PaginationUtil.createPagination(data, total, page, limit);
    }
    async findById(idQuiz) {
        return this.repository.findOne({
            where: { idQuiz },
            relations: {
                chapter: true,
                author: true,
            },
        });
    }
    async create(data) {
        const quiz = this.repository.create({
            title: data.title,
            topicTag: data.topicTag,
            difficulty: data.difficulty,
            timeLimitMinutes: data.timeLimitMinutes,
            chapter: data.idChapter ? { idChapter: data.idChapter } : undefined,
            author: data.authorId ? { idUser: data.authorId } : undefined,
        });
        return this.repository.save(quiz);
    }
    async update(idQuiz, data) {
        const existing = await this.findById(idQuiz);
        if (!existing) {
            return null;
        }
        if (data.title !== undefined)
            existing.title = data.title;
        if (data.topicTag !== undefined)
            existing.topicTag = data.topicTag;
        if (data.difficulty !== undefined)
            existing.difficulty = data.difficulty;
        if (data.timeLimitMinutes !== undefined)
            existing.timeLimitMinutes = data.timeLimitMinutes;
        if (data.idChapter !== undefined) {
            existing.chapter = data.idChapter
                ? { idChapter: data.idChapter }
                : undefined;
        }
        if (data.authorId !== undefined) {
            existing.author = data.authorId
                ? { idUser: data.authorId }
                : undefined;
        }
        await this.repository.save(existing);
        return this.findById(idQuiz);
    }
    async delete(idQuiz) {
        const result = await this.repository.delete(idQuiz);
        return (result.affected ?? 0) > 0;
    }
    async countAll() {
        return this.repository.count();
    }
    async findAllWithQuestionCount() {
        const quizzes = await this.findAll();
        const counts = await database_config_1.AppDataSource.query(`SELECT "idQuiz", COUNT("idQuestion")::int AS "questionCount" FROM questions GROUP BY "idQuiz"`);
        const countMap = new Map(counts.map(r => [r.idQuiz, r.questionCount]));
        return quizzes.map(q => Object.assign(q, { questionCount: countMap.get(q.idQuiz) ?? 0 }));
    }
}
exports.QuizRepository = QuizRepository;
exports.quizRepository = new QuizRepository();
