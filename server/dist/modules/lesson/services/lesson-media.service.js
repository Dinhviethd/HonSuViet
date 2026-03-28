"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonMediaService = exports.LessonMediaService = void 0;
const lesson_media_repository_1 = require("@/modules/lesson/repositories/lesson-media.repository");
const error_response_1 = require("@/utils/error.response");
class LessonMediaService {
    mediaRepo;
    constructor() {
        this.mediaRepo = lesson_media_repository_1.lessonMediaRepository;
    }
    async getById(idMedia) {
        const media = await this.mediaRepo.findById(idMedia);
        if (!media)
            throw new error_response_1.AppError(404, 'Media không tồn tại');
        return media;
    }
    async getByLesson(idLesson) {
        return this.mediaRepo.findByLessonId(idLesson);
    }
    async create(data) {
        return this.mediaRepo.create(data);
    }
    async update(idMedia, data) {
        const updated = await this.mediaRepo.update(idMedia, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Media không tồn tại');
        return updated;
    }
    async delete(idMedia) {
        const deleted = await this.mediaRepo.delete(idMedia);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Media không tồn tại');
    }
}
exports.LessonMediaService = LessonMediaService;
exports.lessonMediaService = new LessonMediaService();
