"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAttemptRepository = exports.QuizAttemptRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const quiz_attempt_entity_1 = require("@/modules/quiz/entities/quiz_attempt.entity");
class QuizAttemptRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(quiz_attempt_entity_1.QuizAttempt);
    }
    async findById(idAttempt) {
        return this.repository.findOne({
            where: { idAttempt },
            relations: {
                user: true,
                quiz: true,
            },
        });
    }
    async findByUser(idUser) {
        return this.repository.find({
            where: {
                user: { idUser },
            },
            relations: {
                user: true,
                quiz: true,
            },
            order: {
                startedAt: 'DESC',
            },
        });
    }
    async create(data) {
        const attempt = this.repository.create({
            user: { idUser: data.idUser },
            quiz: { idQuiz: data.idQuiz },
            questionsLayout: data.questionsLayout,
            answersData: data.answersData,
            scorePercentage: data.scorePercentage ?? 0,
            correctAnswersCount: data.correctAnswersCount ?? 0,
            status: data.status ?? 'in_progress',
            completedAt: data.completedAt,
        });
        return this.repository.save(attempt);
    }
    async update(idAttempt, data) {
        const existing = await this.findById(idAttempt);
        if (!existing) {
            return null;
        }
        if (data.questionsLayout !== undefined)
            existing.questionsLayout = data.questionsLayout;
        if (data.answersData !== undefined)
            existing.answersData = data.answersData;
        if (data.scorePercentage !== undefined)
            existing.scorePercentage = data.scorePercentage;
        if (data.correctAnswersCount !== undefined)
            existing.correctAnswersCount = data.correctAnswersCount;
        if (data.status !== undefined)
            existing.status = data.status;
        if (data.completedAt !== undefined)
            existing.completedAt = data.completedAt;
        await this.repository.save(existing);
        return this.findById(idAttempt);
    }
    async delete(idAttempt) {
        const result = await this.repository.delete(idAttempt);
        return (result.affected ?? 0) > 0;
    }
    async getStatsByUser(idUser) {
        const [row] = await database_config_1.AppDataSource.query(`
      SELECT
        COUNT(DISTINCT qa."idQuiz")::int                             AS "distinctCompletedQuizzes",
        COALESCE(ROUND(AVG(qa."scorePercentage")), 0)::int           AS "averageScore",
        COALESCE(MAX(qa."scorePercentage"), 0)::int                  AS "highestScore"
      FROM quiz_attempts qa
      WHERE qa."idUser" = $1
        AND qa.status = 'completed'
      `, [idUser]);
        return row;
    }
}
exports.QuizAttemptRepository = QuizAttemptRepository;
exports.quizAttemptRepository = new QuizAttemptRepository();
