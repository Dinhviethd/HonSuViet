"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterService = exports.ChapterService = void 0;
const chapter_repository_1 = require("@/modules/lesson/repositories/chapter.repository");
const error_response_1 = require("@/utils/error.response");
class ChapterService {
    chapterRepo;
    constructor() {
        this.chapterRepo = chapter_repository_1.chapterRepository;
    }
    async getAll() {
        return this.chapterRepo.findAll();
    }
    async getById(idChapter) {
        const chapter = await this.chapterRepo.findById(idChapter);
        if (!chapter)
            throw new error_response_1.AppError(404, 'Chương học không tồn tại');
        return chapter;
    }
    async create(data) {
        return this.chapterRepo.create(data);
    }
    async update(idChapter, data) {
        const updated = await this.chapterRepo.update(idChapter, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Chương học không tồn tại');
        return updated;
    }
    async delete(idChapter) {
        const deleted = await this.chapterRepo.delete(idChapter);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Chương học không tồn tại');
    }
}
exports.ChapterService = ChapterService;
exports.chapterService = new ChapterService();
