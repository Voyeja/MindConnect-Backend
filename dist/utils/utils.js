"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.loginUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().trim().lowercase().required(),
    password: joi_1.default.string().trim().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
