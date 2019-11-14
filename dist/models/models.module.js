"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_schema_1 = require("../models/users.schema");
const posts_schema_1 = require("../models/posts.schema");
const mongoose_1 = require("@nestjs/mongoose");
let ModelsModule = class ModelsModule {
};
ModelsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'UserModel', schema: users_schema_1.UserSchema },
                { name: 'PostModel', schema: posts_schema_1.PostSchema }
            ])
        ],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'UserModel', schema: users_schema_1.UserSchema },
                { name: 'PostModel', schema: posts_schema_1.PostSchema }
            ])
        ]
    })
], ModelsModule);
exports.ModelsModule = ModelsModule;
//# sourceMappingURL=models.module.js.map