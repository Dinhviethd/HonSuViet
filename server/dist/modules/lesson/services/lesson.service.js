"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonService = exports.LessonService = void 0;
const lesson_repository_1 = require("@/modules/lesson/repositories/lesson.repository");
const error_response_1 = require("@/utils/error.response");
class LessonService {
    lessonRepo;
    constructor() {
        this.lessonRepo = lesson_repository_1.lessonRepository;
    }
    async getAll() {
        return this.lessonRepo.findAll();
    }
    async getById(idLesson) {
        const lesson = await this.lessonRepo.findById(idLesson);
        if (!lesson)
            throw new error_response_1.AppError(404, 'Bài học không tồn tại');
        return lesson;
    }
    async getByChapter(idChapter) {
        return this.lessonRepo.findByChapterId(idChapter);
    }
    async create(data) {
        return this.lessonRepo.create(data);
    }
    async update(idLesson, data) {
        const updated = await this.lessonRepo.update(idLesson, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Bài học không tồn tại');
        return updated;
    }
    async delete(idLesson) {
        const deleted = await this.lessonRepo.delete(idLesson);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Bài học không tồn tại');
    }
}
exports.LessonService = LessonService;
exports.lessonService = new LessonService();
