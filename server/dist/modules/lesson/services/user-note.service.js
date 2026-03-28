"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNoteService = exports.UserNoteService = void 0;
const user_note_repository_1 = require("@/modules/lesson/repositories/user-note.repository");
const error_response_1 = require("@/utils/error.response");
class UserNoteService {
    noteRepo;
    constructor() {
        this.noteRepo = user_note_repository_1.userNoteRepository;
    }
    async getById(idNote) {
        const note = await this.noteRepo.findById(idNote);
        if (!note)
            throw new error_response_1.AppError(404, 'Ghi chú không tồn tại');
        return note;
    }
    async getByUser(idUser) {
        return this.noteRepo.findByUser(idUser);
    }
    async getByLesson(idLesson) {
        return this.noteRepo.findByLesson(idLesson);
    }
    async create(data) {
        return this.noteRepo.create(data);
    }
    async update(idNote, data) {
        const updated = await this.noteRepo.update(idNote, data);
        if (!updated)
            throw new error_response_1.AppError(404, 'Ghi chú không tồn tại');
        return updated;
    }
    async delete(idNote) {
        const deleted = await this.noteRepo.delete(idNote);
        if (!deleted)
            throw new error_response_1.AppError(404, 'Ghi chú không tồn tại');
    }
}
exports.UserNoteService = UserNoteService;
exports.userNoteService = new UserNoteService();
