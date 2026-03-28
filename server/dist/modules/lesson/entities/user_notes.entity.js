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
exports.UserNote = void 0;
const typeorm_1 = require("typeorm");
const lesson_entity_1 = require("./lesson.entity");
const user_model_1 = require("../../auth/entities/user.model");
let UserNote = class UserNote {
    idNote;
    content;
    createdAt;
    updatedAt;
    user;
    lesson;
};
exports.UserNote = UserNote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserNote.prototype, "idNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UserNote.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserNote.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserNote.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idUser' }),
    __metadata("design:type", user_model_1.User)
], UserNote.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idLesson' }),
    __metadata("design:type", lesson_entity_1.Lesson)
], UserNote.prototype, "lesson", void 0);
exports.UserNote = UserNote = __decorate([
    (0, typeorm_1.Entity)('user_notes')
], UserNote);
