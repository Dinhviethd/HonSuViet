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
exports.UserStat = void 0;
const typeorm_1 = require("typeorm");
const level_config_entity_1 = require("./level_config.entity");
const user_model_1 = require("../../auth/entities/user.model");
let UserStat = class UserStat {
    idStat;
    user;
    totalXp;
    currentLevel;
    energy;
    streakDays;
    updatedAt;
};
exports.UserStat = UserStat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserStat.prototype, "idStat", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_model_1.User, user => user.stats, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'idUser' }),
    __metadata("design:type", user_model_1.User)
], UserStat.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], UserStat.prototype, "totalXp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => level_config_entity_1.LevelConfig),
    (0, typeorm_1.JoinColumn)({ name: 'idLevel' }),
    __metadata("design:type", level_config_entity_1.LevelConfig)
], UserStat.prototype, "currentLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 100 }),
    __metadata("design:type", Number)
], UserStat.prototype, "energy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], UserStat.prototype, "streakDays", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserStat.prototype, "updatedAt", void 0);
exports.UserStat = UserStat = __decorate([
    (0, typeorm_1.Entity)('user_stats')
], UserStat);
