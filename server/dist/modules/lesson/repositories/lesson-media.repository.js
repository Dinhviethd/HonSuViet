"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonMediaRepository = exports.LessonMediaRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const lesson_media_entity_1 = require("@/modules/lesson/entities/lesson_media.entity");
class LessonMediaRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(lesson_media_entity_1.LessonMedia);
    }
    async findById(idMedia) {
        return this.repository.findOne({
            where: { idMedia },
            relations: {
                lesson: true,
            },
        });
    }
    async findByLessonId(idLesson) {
        return this.repository.find({
            where: {
                lesson: { idLesson },
            },
            relations: {
                lesson: true,
            },
            order: {
                orderIndex: 'ASC',
            },
        });
    }
    async create(data) {
        const media = this.repository.create({
            mediaType: data.mediaType,
            mediaUrl: data.mediaUrl,
            caption: data.caption,
            orderIndex: data.orderIndex ?? 0,
            lesson: { idLesson: data.idLesson },
        });
        return this.repository.save(media);
    }
    async update(idMedia, data) {
        const existing = await this.findById(idMedia);
        if (!existing) {
            return null;
        }
        if (data.mediaType !== undefined)
            existing.mediaType = data.mediaType;
        if (data.mediaUrl !== undefined)
            existing.mediaUrl = data.mediaUrl;
        if (data.caption !== undefined)
            existing.caption = data.caption;
        if (data.orderIndex !== undefined)
            existing.orderIndex = data.orderIndex;
        await this.repository.save(existing);
        return this.findById(idMedia);
    }
    async delete(idMedia) {
        const result = await this.repository.delete(idMedia);
        return (result.affected ?? 0) > 0;
    }
}
exports.LessonMediaRepository = LessonMediaRepository;
exports.lessonMediaRepository = new LessonMediaRepository();
