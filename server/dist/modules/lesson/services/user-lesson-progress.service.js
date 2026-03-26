"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLessonProgressService = exports.UserLessonProgressService = void 0;
const user_lesson_progress_repository_1 = require("@/modules/lesson/repositories/user-lesson-progress.repository");
const error_response_1 = require("@/utils/error.response");
class UserLessonProgressService {
    progressRepo;
    constructor() {
        this.progressRepo = user_lesson_progress_repository_1.userLessonProgressRepository;
    }
    async getById(idProgress) {
        const progress = await this.progressRepo.findById(idProgress);
        if (!progress)
            throw new error_response_1.AppError(404, 'Tiến độ học không tồn tại');
        return progress;
    }
    async getByUser(idUser) {
        return this.progressRepo.findByUser(idUser);
    }
    async getByUserAndLesson(idUser, idLesson) {
        const progress = await this.progressRepo.findByUserAndLesson(idUser, idLesson);
        if (!progress)
            throw new error_response_1.AppError(404, 'Tiến độ học không tồn tại');
        return progress;
    }
    async create(data) {
        const existing = await this.progressRepo.findByUserAndLesson(data.idUser, data.idLesson);
        if (existing)
            throw new error_response_1.AppError(409, 'Tiến độ học đã tồn tại cho user và bài học này');
        return this.progressRepo.create(data);
    }
    async update(idProgress, data) {
        const updated = await this.progressRepo.update(idProgress, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Tiến độ học không tồn tại');
        return updated;
    }
    async delete(idProgress) {
        const deleted = await this.progressRepo.delete(idProgress);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Tiến độ học không tồn tại');
    }
}
exports.UserLessonProgressService = UserLessonProgressService;
exports.userLessonProgressService = new UserLessonProgressService();
