"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = require("@/modules/quiz/controllers/quiz.controller");
const question_controller_1 = require("@/modules/quiz/controllers/question.controller");
const answer_controller_1 = require("@/modules/quiz/controllers/answer.controller");
const quiz_attempt_controller_1 = require("@/modules/quiz/controllers/quiz-attempt.controller");
const router = (0, express_1.Router)();
// ─── Quizzes ──────────────────────────────────────
router.get('/', quiz_controller_1.quizController.getAll);
router.get('/paginated', quiz_controller_1.quizController.getAllPaginated);
router.get('/stats', quiz_attempt_controller_1.quizAttemptController.getTotalQuizzes);
router.get('/with-stats', quiz_controller_1.quizController.getAllWithQuestionCount);
router.get('/:id', quiz_controller_1.quizController.getById);
router.post('/', quiz_controller_1.quizController.create);
router.put('/:id', quiz_controller_1.quizController.update);
router.delete('/:id', quiz_controller_1.quizController.delete);
// ─── Questions ────────────────────────────────────
router.get('/questions/:id', question_controller_1.questionController.getById);
router.get('/:quizId/questions', question_controller_1.questionController.getByQuiz);
router.post('/questions', question_controller_1.questionController.create);
router.put('/questions/:id', question_controller_1.questionController.update);
router.delete('/questions/:id', question_controller_1.questionController.delete);
// ─── Answers ──────────────────────────────────────
router.get('/answers/:id', answer_controller_1.answerController.getById);
router.get('/questions/:questionId/answers', answer_controller_1.answerController.getByQuestion);
router.post('/answers', answer_controller_1.answerController.create);
router.put('/answers/:id', answer_controller_1.answerController.update);
router.delete('/answers/:id', answer_controller_1.answerController.delete);
// ─── Quiz Attempts ────────────────────────────────
router.get('/attempts/stats/user/:userId', quiz_attempt_controller_1.quizAttemptController.getStatsByUser);
router.get('/attempts/user/:userId', quiz_attempt_controller_1.quizAttemptController.getByUser);
router.get('/attempts/:id', quiz_attempt_controller_1.quizAttemptController.getById);
router.post('/attempts', quiz_attempt_controller_1.quizAttemptController.create);
router.put('/attempts/:id', quiz_attempt_controller_1.quizAttemptController.update);
router.delete('/attempts/:id', quiz_attempt_controller_1.quizAttemptController.delete);
exports.default = router;
