"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = require("../controller/login");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/test', function (req, res, next) {
    res.status(200).send({ msg: "Users Working well" });
});
router.post('/login', login_1.Login);
exports.default = router;
