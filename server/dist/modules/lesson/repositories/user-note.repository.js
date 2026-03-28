"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNoteRepository = exports.UserNoteRepository = void 0;
const database_config_1 = require("@/configs/database.config");
const user_notes_entity_1 = require("@/modules/lesson/entities/user_notes.entity");
class UserNoteRepository {
    repository;
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(user_notes_entity_1.UserNote);
    }
    async findById(id) {
        return this.repository.findOne({
            where: { idNote: id },
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
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findByLesson(idLesson) {
        return this.repository.find({
            where: {
                lesson: { idLesson: idLesson },
            },
            relations: {
                user: true,
                lesson: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async create(data) {
        const note = this.repository.create({
            user: { idUser: data.idUser },
            lesson: { idLesson: data.idLesson },
            content: data.content,
        });
        return this.repository.save(note);
    }
    async update(id, data) {
        const existing = await this.findById(id);
        if (!existing) {
            return null;
        }
        if (data.content !== undefined)
            existing.content = data.content;
        await this.repository.save(existing);
        return this.findById(id);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
exports.UserNoteRepository = UserNoteRepository;
exports.userNoteRepository = new UserNoteRepository();
