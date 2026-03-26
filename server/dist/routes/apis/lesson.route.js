"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chapter_controller_1 = require("@/modules/lesson/controllers/chapter.controller");
const lesson_controller_1 = require("@/modules/lesson/controllers/lesson.controller");
const lesson_media_controller_1 = require("@/modules/lesson/controllers/lesson-media.controller");
const user_lesson_progress_controller_1 = require("@/modules/lesson/controllers/user-lesson-progress.controller");
const user_note_controller_1 = require("@/modules/lesson/controllers/user-note.controller");
const router = (0, express_1.Router)();
// ─── Chapters ─────────────────────────────────────
router.get('/chapters', chapter_controller_1.chapterController.getAll);
router.get('/chapters/:id', chapter_controller_1.chapterController.getById);
router.post('/chapters', chapter_controller_1.chapterController.create);
router.put('/chapters/:id', chapter_controller_1.chapterController.update);
router.delete('/chapters/:id', chapter_controller_1.chapterController.delete);
// ─── Lessons ──────────────────────────────────────
router.get('/lessons', lesson_controller_1.lessonController.getAll);
router.get('/lessons/:id', lesson_controller_1.lessonController.getById);
router.get('/chapters/:chapterId/lessons', lesson_controller_1.lessonController.getByChapter);
router.post('/lessons', lesson_controller_1.lessonController.create);
router.put('/lessons/:id', lesson_controller_1.lessonController.update);
router.delete('/lessons/:id', lesson_controller_1.lessonController.delete);
// ─── Lesson Media ──────────────────────────────────
router.get('/media/:id', lesson_media_controller_1.lessonMediaController.getById);
router.get('/lessons/:lessonId/media', lesson_media_controller_1.lessonMediaController.getByLesson);
router.post('/media', lesson_media_controller_1.lessonMediaController.create);
router.put('/media/:id', lesson_media_controller_1.lessonMediaController.update);
router.delete('/media/:id', lesson_media_controller_1.lessonMediaController.delete);
// ─── User Lesson Progress ─────────────────────────
router.get('/progress/:id', user_lesson_progress_controller_1.userLessonProgressController.getById);
router.get('/progress/user/:userId', user_lesson_progress_controller_1.userLessonProgressController.getByUser);
router.get('/progress/user/:userId/lesson/:lessonId', user_lesson_progress_controller_1.userLessonProgressController.getByUserAndLesson);
router.post('/progress', user_lesson_progress_controller_1.userLessonProgressController.create);
router.put('/progress/:id', user_lesson_progress_controller_1.userLessonProgressController.update);
router.delete('/progress/:id', user_lesson_progress_controller_1.userLessonProgressController.delete);
// ─── User Notes ───────────────────────────────────
router.get('/notes/:id', user_note_controller_1.userNoteController.getById);
router.get('/notes/user/:userId', user_note_controller_1.userNoteController.getByUser);
router.get('/notes/lesson/:lessonId', user_note_controller_1.userNoteController.getByLesson);
router.post('/notes', user_note_controller_1.userNoteController.create);
router.put('/notes/:id', user_note_controller_1.userNoteController.update);
router.delete('/notes/:id', user_note_controller_1.userNoteController.delete);
exports.default = router;
