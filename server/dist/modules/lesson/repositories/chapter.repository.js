"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterRepository = exports.ChapterRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const chapter_entity_1 = require("@/modules/lesson/entities/chapter.entity");
class ChapterRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(chapter_entity_1.Chapter);
    }
    async findAll() {
        return this.repository.find({
            relations: {
                author: true,
            },
            order: {
                orderIndex: 'ASC',
                createdAt: 'DESC',
            },
        });
    }
    async findById(idChapter) {
        return this.repository.findOne({
            where: { idChapter },
            relations: {
                author: true,
            },
        });
    }
    async create(data) {
        const chapter = this.repository.create({
            title: data.title,
            description: data.description,
            orderIndex: data.orderIndex ?? 0,
            author: data.authorId ? { idUser: data.authorId } : undefined,
        });
        return this.repository.save(chapter);
    }
    async update(idChapter, data) {
        const existing = await this.findById(idChapter);
        if (!existing) {
            return null;
        }
        if (data.title !== undefined)
            existing.title = data.title;
        if (data.description !== undefined)
            existing.description = data.description;
        if (data.orderIndex !== undefined)
            existing.orderIndex = data.orderIndex;
        if (data.authorId !== undefined) {
            existing.author = data.authorId
                ? { idUser: data.authorId }
                : undefined;
        }
        await this.repository.save(existing);
        return this.findById(idChapter);
    }
    async delete(idChapter) {
        const result = await this.repository.delete(idChapter);
        return (result.affected ?? 0) > 0;
    }
}
exports.ChapterRepository = ChapterRepository;
exports.chapterRepository = new ChapterRepository();
