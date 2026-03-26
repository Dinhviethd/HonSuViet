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
exports.LessonMedia = void 0;
const typeorm_1 = require("typeorm");
const lesson_entity_1 = require("./lesson.entity");
let LessonMedia = class LessonMedia {
    idMedia;
    lesson;
    mediaType;
    mediaUrl;
    caption;
    orderIndex;
};
exports.LessonMedia = LessonMedia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LessonMedia.prototype, "idMedia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idLesson' }),
    __metadata("design:type", lesson_entity_1.Lesson)
], LessonMedia.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['video', 'image', 'document'] }),
    __metadata("design:type", String)
], LessonMedia.prototype, "mediaType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LessonMedia.prototype, "mediaUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LessonMedia.prototype, "caption", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], LessonMedia.prototype, "orderIndex", void 0);
exports.LessonMedia = LessonMedia = __decorate([
    (0, typeorm_1.Entity)('lesson_media')
], LessonMedia);
