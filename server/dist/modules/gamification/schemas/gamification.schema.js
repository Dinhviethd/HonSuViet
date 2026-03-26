"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateXpTransactionSchema = exports.createXpTransactionSchema = exports.updateUserStatSchema = exports.createUserStatSchema = exports.updateLevelConfigSchema = exports.createLevelConfigSchema = void 0;
const zod_1 = require("zod");
exports.createLevelConfigSchema = zod_1.z.object({
    level: zod_1.z.number().int('level phải là số nguyên').min(1, 'level tối thiểu là 1'),
    minXp: zod_1.z.number().int('minXp phải là số nguyên').min(0, 'minXp không được âm'),
    title: zod_1.z.string().min(1, 'title không được để trống').max(100, 'title tối đa 100 ký tự'),
});
exports.updateLevelConfigSchema = exports.createLevelConfigSchema.partial();
exports.createUserStatSchema = zod_1.z.object({
    idUser: zod_1.z.string().uuid('idUser không hợp lệ'),
    idLevel: zod_1.z.string().uuid('idLevel không hợp lệ'),
    totalXp: zod_1.z.number().int('totalXp phải là số nguyên').min(0).optional(),
    energy: zod_1.z.number().int('energy phải là số nguyên').min(0).optional(),
    streakDays: zod_1.z.number().int('streakDays phải là số nguyên').min(0).optional(),
});
exports.updateUserStatSchema = exports.createUserStatSchema
    .omit({ idUser: true })
    .partial();
exports.createXpTransactionSchema = zod_1.z.object({
    idUser: zod_1.z.string().uuid('idUser không hợp lệ'),
    actionType: zod_1.z.string().min(1, 'actionType không được để trống').max(100, 'actionType tối đa 100 ký tự'),
    referenceId: zod_1.z.string().uuid('referenceId không hợp lệ').optional(),
    xpEarned: zod_1.z.number().int('xpEarned phải là số nguyên'),
});
exports.updateXpTransactionSchema = exports.createXpTransactionSchema
    .omit({ idUser: true })
    .partial();
