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
exports.LevelConfig = void 0;
const typeorm_1 = require("typeorm");
let LevelConfig = class LevelConfig {
    idLevel;
    level;
    minXp;
    title;
};
exports.LevelConfig = LevelConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LevelConfig.prototype, "idLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', unique: true }),
    __metadata("design:type", Number)
], LevelConfig.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], LevelConfig.prototype, "minXp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LevelConfig.prototype, "title", void 0);
exports.LevelConfig = LevelConfig = __decorate([
    (0, typeorm_1.Entity)('levels_config')
], LevelConfig);
