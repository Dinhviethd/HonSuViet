"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLessonProgressRepository = exports.UserLessonProgressRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const user_lesson_progress_entity_1 = require("@/modules/lesson/entities/user_lesson_progress.entity");
class UserLessonProgressRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(user_lesson_progress_entity_1.UserLessonProgress);
    }
    async findById(idProgress) {
        return this.repository.findOne({
            where: { idProgress },
            relations: {
                user: true,
                lesson: true,
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
                lesson: true,
            },
        });
    }
    async findByUserAndLesson(idUser, idLesson) {
        return this.repository.findOne({
            where: {
                user: { idUser },
                lesson: { idLesson },
            },
            relations: {
                user: true,
                lesson: true,
            },
        });
    }
    async create(data) {
        const progress = this.repository.create({
            user: { idUser: data.idUser },
            lesson: { idLesson: data.idLesson },
            status: data.status ?? 'unlocked',
            completedAt: data.completedAt,
        });
        return this.repository.save(progress);
    }
    async update(idProgress, data) {
        const existing = await this.findById(idProgress);
        if (!existing) {
            return null;
        }
        if (data.status !== undefined)
            existing.status = data.status;
        if (data.completedAt !== undefined)
            existing.completedAt = data.completedAt;
        await this.repository.save(existing);
        return this.findById(idProgress);
    }
    async delete(idProgress) {
        const result = await this.repository.delete(idProgress);
        return (result.affected ?? 0) > 0;
    }
}
exports.UserLessonProgressRepository = UserLessonProgressRepository;
exports.userLessonProgressRepository = new UserLessonProgressRepository();
