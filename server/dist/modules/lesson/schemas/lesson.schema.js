"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserNoteSchema = exports.createUserNoteSchema = exports.updateUserLessonProgressSchema = exports.createUserLessonProgressSchema = exports.updateLessonMediaSchema = exports.createLessonMediaSchema = exports.updateLessonSchema = exports.createLessonSchema = exports.updateChapterSchema = exports.createChapterSchema = exports.userLessonProgressStatusEnumSchema = exports.lessonMediaTypeEnumSchema = void 0;
const zod_1 = require("zod");
exports.lessonMediaTypeEnumSchema = zod_1.z.enum(['video', 'image', 'document']);
exports.userLessonProgressStatusEnumSchema = zod_1.z.enum(['unlocked', 'in_progress', 'completed']);
exports.createChapterSchema = zod_1.z.object({
    authorId: zod_1.z.string().uuid('authorId không hợp lệ').optional(),
    title: zod_1.z.string().min(1, 'Tiêu đề chương không được để trống').max(255, 'Tiêu đề chương tối đa 255 ký tự'),
    description: zod_1.z.string().optional(),
    orderIndex: zod_1.z.number().int('orderIndex phải là số nguyên').min(0).optional(),
});
exports.updateChapterSchema = exports.createChapterSchema.partial();
exports.createLessonSchema = zod_1.z.object({
    idChapter: zod_1.z.string().uuid('idChapter không hợp lệ'),
    authorId: zod_1.z.string().uuid('authorId không hợp lệ').optional(),
    title: zod_1.z.string().min(1, 'Tiêu đề bài học không được để trống').max(255, 'Tiêu đề bài học tối đa 255 ký tự'),
    timeTag: zod_1.z.string().max(100, 'timeTag tối đa 100 ký tự').optional(),
    durationMinutes: zod_1.z.number().int('durationMinutes phải là số nguyên').min(0).optional(),
    contentBody: zod_1.z.unknown().optional(),
    orderIndex: zod_1.z.number().int('orderIndex phải là số nguyên').min(0).optional(),
});
exports.updateLessonSchema = exports.createLessonSchema
    .omit({ idChapter: true })
    .partial();
exports.createLessonMediaSchema = zod_1.z.object({
    idLesson: zod_1.z.string().uuid('idLesson không hợp lệ'),
    mediaType: exports.lessonMediaTypeEnumSchema,
    mediaUrl: zod_1.z.string().min(1, 'mediaUrl không được để trống').max(500, 'mediaUrl tối đa 500 ký tự'),
    caption: zod_1.z.string().optional(),
    orderIndex: zod_1.z.number().int('orderIndex phải là số nguyên').min(0).optional(),
});
exports.updateLessonMediaSchema = exports.createLessonMediaSchema
    .omit({ idLesson: true })
    .partial();
exports.createUserLessonProgressSchema = zod_1.z.object({
    idUser: zod_1.z.string().uuid('idUser không hợp lệ'),
    idLesson: zod_1.z.string().uuid('idLesson không hợp lệ'),
    status: exports.userLessonProgressStatusEnumSchema.optional(),
    completedAt: zod_1.z.coerce.date().optional(),
});
exports.updateUserLessonProgressSchema = exports.createUserLessonProgressSchema
    .omit({ idUser: true, idLesson: true })
    .partial();
exports.createUserNoteSchema = zod_1.z.object({
    idUser: zod_1.z.string().uuid('idUser không hợp lệ'),
    idLesson: zod_1.z.string().uuid('idLesson không hợp lệ'),
    content: zod_1.z.string().min(1, 'Nội dung ghi chú không được để trống'),
});
exports.updateUserNoteSchema = exports.createUserNoteSchema
    .omit({ idUser: true, idLesson: true })
    .partial();
