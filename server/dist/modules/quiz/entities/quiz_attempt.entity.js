"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizAttempt = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("../../auth/entities/user.model");
const quiz_entity_1 = require("./quiz.entity");
let QuizAttempt = class QuizAttempt {
    idAttempt;
    user;
    quiz;
    questionsLayout;
    answersData;
    scorePercentage;
    correctAnswersCount;
    status;
    startedAt;
    completedAt;
};
exports.QuizAttempt = QuizAttempt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizAttempt.prototype, "idAttempt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idUser' }),
    __metadata("design:type", user_model_1.User)
], QuizAttempt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idQuiz' }),
    __metadata("design:type", quiz_entity_1.Quiz)
], QuizAttempt.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], QuizAttempt.prototype, "questionsLayout", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], QuizAttempt.prototype, "answersData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], QuizAttempt.prototype, "scorePercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], QuizAttempt.prototype, "correctAnswersCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['in_progress', 'completed'], default: 'in_progress' }),
    __metadata("design:type", String)
], QuizAttempt.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizAttempt.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], QuizAttempt.prototype, "completedAt", void 0);
exports.QuizAttempt = QuizAttempt = __decorate([
    (0, typeorm_1.Entity)('quiz_attempts')
], QuizAttempt);
