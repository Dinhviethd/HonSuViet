"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./apis/auth.route"));
const lesson_route_1 = __importDefault(require("./apis/lesson.route"));
const gamification_route_1 = __importDefault(require("./apis/gamification.route"));
const quiz_route_1 = __importDefault(require("./apis/quiz.route"));
const router = (0, express_1.Router)();
router.use('/auth', auth_route_1.default);
router.use('/lesson', lesson_route_1.default);
router.use('/gamification', gamification_route_1.default);
router.use('/quiz', quiz_route_1.default);
exports.default = router;
