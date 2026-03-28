import { z } from 'zod';

export const difficultyEnumSchema = z.enum(['easy', 'medium', 'hard']);
export const attemptStatusEnumSchema = z.enum(['in_progress', 'completed']);

export const createQuizSchema = z.object({
  idChapter: z.string().uuid('idChapter không hợp lệ').optional(),
  authorId: z.string().uuid('authorId không hợp lệ').optional(),
  title: z.string().min(1, 'Tiêu đề không được để trống').max(255, 'Tiêu đề tối đa 255 ký tự'),
  topicTag: z.string().max(100, 'Topic tag tối đa 100 ký tự').optional(),
  difficulty: difficultyEnumSchema,
  timeLimitMinutes: z.number().int('Thời gian phải là số nguyên').min(1, 'Thời gian tối thiểu là 1 phút'),
});

export const updateQuizSchema = createQuizSchema.partial();

export const createQuestionSchema = z.object({
  idQuiz: z.string().uuid('idQuiz không hợp lệ'),
  content: z.string().min(1, 'Nội dung câu hỏi không được để trống'),
  explanation: z.string().optional(),
});

export const updateQuestionSchema = createQuestionSchema
  .omit({ idQuiz: true })
  .partial();

export const createAnswerSchema = z.object({
  idQuestion: z.string().uuid('idQuestion không hợp lệ'),
  content: z.string().min(1, 'Nội dung đáp án không được để trống'),
  isCorrect: z.boolean().optional(),
});

export const updateAnswerSchema = createAnswerSchema
  .omit({ idQuestion: true })
  .partial();

export const createQuizAttemptSchema = z.object({
  idUser: z.string().uuid('idUser không hợp lệ'),
  idQuiz: z.string().uuid('idQuiz không hợp lệ'),
  questionsLayout: z.unknown().optional(),
  answersData: z.unknown().optional(),
  scorePercentage: z.number().int().min(0).max(100).optional(),
  correctAnswersCount: z.number().int().min(0).optional(),
  status: attemptStatusEnumSchema.optional(),
  completedAt: z.coerce.date().optional(),
});

export const updateQuizAttemptSchema = createQuizAttemptSchema
  .omit({ idUser: true, idQuiz: true })
  .partial();

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
export type UpdateQuizInput = z.infer<typeof updateQuizSchema>;

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;

export type CreateAnswerInput = z.infer<typeof createAnswerSchema>;
export type UpdateAnswerInput = z.infer<typeof updateAnswerSchema>;

export type CreateQuizAttemptInput = z.infer<typeof createQuizAttemptSchema>;
export type UpdateQuizAttemptInput = z.infer<typeof updateQuizAttemptSchema>;
