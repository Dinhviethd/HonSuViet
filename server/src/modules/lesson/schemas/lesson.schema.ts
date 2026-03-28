import { z } from 'zod';

export const lessonMediaTypeEnumSchema = z.enum(['video', 'image', 'document']);
export const userLessonProgressStatusEnumSchema = z.enum(['unlocked', 'in_progress', 'completed']);

export const createChapterSchema = z.object({
  authorId: z.string().uuid('authorId không hợp lệ').optional(),
  title: z.string().min(1, 'Tiêu đề chương không được để trống').max(255, 'Tiêu đề chương tối đa 255 ký tự'),
  description: z.string().optional(),
  orderIndex: z.number().int('orderIndex phải là số nguyên').min(0).optional(),
});

export const updateChapterSchema = createChapterSchema.partial();

export const createLessonSchema = z.object({
  idChapter: z.string().uuid('idChapter không hợp lệ'),
  authorId: z.string().uuid('authorId không hợp lệ').optional(),
  title: z.string().min(1, 'Tiêu đề bài học không được để trống').max(255, 'Tiêu đề bài học tối đa 255 ký tự'),
  timeTag: z.string().max(100, 'timeTag tối đa 100 ký tự').optional(),
  durationMinutes: z.number().int('durationMinutes phải là số nguyên').min(0).optional(),
  contentBody: z.unknown().optional(),
  orderIndex: z.number().int('orderIndex phải là số nguyên').min(0).optional(),
});

export const updateLessonSchema = createLessonSchema
  .omit({ idChapter: true })
  .partial();

export const createLessonMediaSchema = z.object({
  idLesson: z.string().uuid('idLesson không hợp lệ'),
  mediaType: lessonMediaTypeEnumSchema,
  mediaUrl: z.string().min(1, 'mediaUrl không được để trống').max(500, 'mediaUrl tối đa 500 ký tự'),
  caption: z.string().optional(),
  orderIndex: z.number().int('orderIndex phải là số nguyên').min(0).optional(),
});

export const updateLessonMediaSchema = createLessonMediaSchema
  .omit({ idLesson: true })
  .partial();

export const createUserLessonProgressSchema = z.object({
  idUser: z.string().uuid('idUser không hợp lệ'),
  idLesson: z.string().uuid('idLesson không hợp lệ'),
  status: userLessonProgressStatusEnumSchema.optional(),
  completedAt: z.coerce.date().optional(),
});

export const updateUserLessonProgressSchema = createUserLessonProgressSchema
  .omit({ idUser: true, idLesson: true })
  .partial();

export const createUserNoteSchema = z.object({
  idUser: z.string().uuid('idUser không hợp lệ'),
  idLesson: z.string().uuid('idLesson không hợp lệ'),
  content: z.string().min(1, 'Nội dung ghi chú không được để trống'),
});

export const updateUserNoteSchema = createUserNoteSchema
  .omit({ idUser: true, idLesson: true })
  .partial();

export type CreateChapterInput = z.infer<typeof createChapterSchema>;
export type UpdateChapterInput = z.infer<typeof updateChapterSchema>;

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;

export type CreateLessonMediaInput = z.infer<typeof createLessonMediaSchema>;
export type UpdateLessonMediaInput = z.infer<typeof updateLessonMediaSchema>;

export type CreateUserLessonProgressInput = z.infer<typeof createUserLessonProgressSchema>;
export type UpdateUserLessonProgressInput = z.infer<typeof updateUserLessonProgressSchema>;

export type CreateUserNoteInput = z.infer<typeof createUserNoteSchema>;
export type UpdateUserNoteInput = z.infer<typeof updateUserNoteSchema>;
