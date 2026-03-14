import { z } from 'zod';

export const createLevelConfigSchema = z.object({
  level: z.number().int('level phải là số nguyên').min(1, 'level tối thiểu là 1'),
  minXp: z.number().int('minXp phải là số nguyên').min(0, 'minXp không được âm'),
  title: z.string().min(1, 'title không được để trống').max(100, 'title tối đa 100 ký tự'),
});

export const updateLevelConfigSchema = createLevelConfigSchema.partial();

export const createUserStatSchema = z.object({
  idUser: z.string().uuid('idUser không hợp lệ'),
  idLevel: z.string().uuid('idLevel không hợp lệ'),
  totalXp: z.number().int('totalXp phải là số nguyên').min(0).optional(),
  energy: z.number().int('energy phải là số nguyên').min(0).optional(),
  streakDays: z.number().int('streakDays phải là số nguyên').min(0).optional(),
});

export const updateUserStatSchema = createUserStatSchema
  .omit({ idUser: true })
  .partial();

export const createXpTransactionSchema = z.object({
  idUser: z.string().uuid('idUser không hợp lệ'),
  actionType: z.string().min(1, 'actionType không được để trống').max(100, 'actionType tối đa 100 ký tự'),
  referenceId: z.string().uuid('referenceId không hợp lệ').optional(),
  xpEarned: z.number().int('xpEarned phải là số nguyên'),
});

export const updateXpTransactionSchema = createXpTransactionSchema
  .omit({ idUser: true })
  .partial();

export type CreateLevelConfigInput = z.infer<typeof createLevelConfigSchema>;
export type UpdateLevelConfigInput = z.infer<typeof updateLevelConfigSchema>;

export type CreateUserStatInput = z.infer<typeof createUserStatSchema>;
export type UpdateUserStatInput = z.infer<typeof updateUserStatSchema>;

export type CreateXpTransactionInput = z.infer<typeof createXpTransactionSchema>;
export type UpdateXpTransactionInput = z.infer<typeof updateXpTransactionSchema>;
