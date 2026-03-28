"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonRepository = exports.LessonRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const lesson_entity_1 = require("@/modules/lesson/entities/lesson.entity");
class LessonRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(lesson_entity_1.Lesson);
    }
    async findAll() {
        return this.repository.find({
            relations: {
                chapter: true,
                author: true,
            },
            order: {
                orderIndex: 'ASC',
                createdAt: 'DESC',
            },
        });
    }
    async findById(idLesson) {
        return this.repository.findOne({
            where: { idLesson },
            relations: {
                chapter: true,
                author: true,
            },
        });
    }
    async findByChapterId(idChapter) {
        return this.repository.find({
            where: {
                chapter: { idChapter },
            },
            relations: {
                chapter: true,
                author: true,
            },
            order: {
                orderIndex: 'ASC',
                createdAt: 'DESC',
            },
        });
    }
    async create(data) {
        const lesson = this.repository.create({
            title: data.title,
            timeTag: data.timeTag,
            durationMinutes: data.durationMinutes ?? 0,
            contentBody: data.contentBody,
            orderIndex: data.orderIndex ?? 0,
            chapter: { idChapter: data.idChapter },
            author: data.authorId ? { idUser: data.authorId } : undefined,
        });
        return this.repository.save(lesson);
    }
    async update(idLesson, data) {
        const existing = await this.findById(idLesson);
        if (!existing) {
            return null;
        }
        if (data.title !== undefined)
            existing.title = data.title;
        if (data.timeTag !== undefined)
            existing.timeTag = data.timeTag;
        if (data.durationMinutes !== undefined)
            existing.durationMinutes = data.durationMinutes;
        if (data.contentBody !== undefined)
            existing.contentBody = data.contentBody;
        if (data.orderIndex !== undefined)
            existing.orderIndex = data.orderIndex;
        if (data.authorId !== undefined) {
            existing.author = data.authorId
                ? { idUser: data.authorId }
                : undefined;
        }
        await this.repository.save(existing);
        return this.findById(idLesson);
    }
    async delete(idLesson) {
        const result = await this.repository.delete(idLesson);
        return (result.affected ?? 0) > 0;
    }
}
exports.LessonRepository = LessonRepository;
exports.lessonRepository = new LessonRepository();
