"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuizAttemptSchema = exports.createQuizAttemptSchema = exports.updateAnswerSchema = exports.createAnswerSchema = exports.updateQuestionSchema = exports.createQuestionSchema = exports.updateQuizSchema = exports.createQuizSchema = exports.attemptStatusEnumSchema = exports.difficultyEnumSchema = void 0;
const zod_1 = require("zod");
exports.difficultyEnumSchema = zod_1.z.enum(['easy', 'medium', 'hard']);
exports.attemptStatusEnumSchema = zod_1.z.enum(['in_progress', 'completed']);
exports.createQuizSchema = zod_1.z.object({
    idChapter: zod_1.z.string().uuid('idChapter không hợp lệ').optional(),
    authorId: zod_1.z.string().uuid('authorId không hợp lệ').optional(),
    title: zod_1.z.string().min(1, 'Tiêu đề không được để trống').max(255, 'Tiêu đề tối đa 255 ký tự'),
    topicTag: zod_1.z.string().max(100, 'Topic tag tối đa 100 ký tự').optional(),
    difficulty: exports.difficultyEnumSchema,
    timeLimitMinutes: zod_1.z.number().int('Thời gian phải là số nguyên').min(1, 'Thời gian tối thiểu là 1 phút'),
});
exports.updateQuizSchema = exports.createQuizSchema.partial();
exports.createQuestionSchema = zod_1.z.object({
    idQuiz: zod_1.z.string().uuid('idQuiz không hợp lệ'),
    content: zod_1.z.string().min(1, 'Nội dung câu hỏi không được để trống'),
    explanation: zod_1.z.string().optional(),
});
exports.updateQuestionSchema = exports.createQuestionSchema
    .omit({ idQuiz: true })
    .partial();
exports.createAnswerSchema = zod_1.z.object({
    idQuestion: zod_1.z.string().uuid('idQuestion không hợp lệ'),
    content: zod_1.z.string().min(1, 'Nội dung đáp án không được để trống'),
    isCorrect: zod_1.z.boolean().optional(),
});
exports.updateAnswerSchema = exports.createAnswerSchema
    .omit({ idQuestion: true })
    .partial();
exports.createQuizAttemptSchema = zod_1.z.object({
    idUser: zod_1.z.string().uuid('idUser không hợp lệ'),
    idQuiz: zod_1.z.string().uuid('idQuiz không hợp lệ'),
    questionsLayout: zod_1.z.unknown().optional(),
    answersData: zod_1.z.unknown().optional(),
    scorePercentage: zod_1.z.number().int().min(0).max(100).optional(),
    correctAnswersCount: zod_1.z.number().int().min(0).optional(),
    status: exports.attemptStatusEnumSchema.optional(),
    completedAt: zod_1.z.coerce.date().optional(),
});
exports.updateQuizAttemptSchema = exports.createQuizAttemptSchema
    .omit({ idUser: true, idQuiz: true })
    .partial();
