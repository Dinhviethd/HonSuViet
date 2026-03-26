"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const level_config_controller_1 = require("@/modules/gamification/controllers/level-config.controller");
const user_stat_controller_1 = require("@/modules/gamification/controllers/user-stat.controller");
const xp_transaction_controller_1 = require("@/modules/gamification/controllers/xp-transaction.controller");
const router = (0, express_1.Router)();
// ─── Level Config ─────────────────────────────────
router.get('/levels', level_config_controller_1.levelConfigController.getAll);
router.get('/levels/:id', level_config_controller_1.levelConfigController.getById);
router.post('/levels', level_config_controller_1.levelConfigController.create);
router.put('/levels/:id', level_config_controller_1.levelConfigController.update);
router.delete('/levels/:id', level_config_controller_1.levelConfigController.delete);
// ─── User Stats ───────────────────────────────────
router.get('/stats', user_stat_controller_1.userStatController.getAll);
router.get('/stats/:id', user_stat_controller_1.userStatController.getById);
router.get('/stats/user/:userId', user_stat_controller_1.userStatController.getByUser);
router.post('/stats', user_stat_controller_1.userStatController.create);
router.put('/stats/:id', user_stat_controller_1.userStatController.update);
router.delete('/stats/:id', user_stat_controller_1.userStatController.delete);
// ─── XP Transactions ──────────────────────────────
router.get('/xp/:id', xp_transaction_controller_1.xpTransactionController.getById);
router.get('/xp/user/:userId', xp_transaction_controller_1.xpTransactionController.getByUser);
router.post('/xp', xp_transaction_controller_1.xpTransactionController.create);
router.put('/xp/:id', xp_transaction_controller_1.xpTransactionController.update);
router.delete('/xp/:id', xp_transaction_controller_1.xpTransactionController.delete);
exports.default = router;
