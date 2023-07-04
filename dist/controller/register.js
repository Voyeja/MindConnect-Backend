"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerModel_1 = __importDefault(require("../model/registerModel"));
const uuid_1 = require("uuid");
const resetPassword_1 = require("../utils/resetPassword");
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const Private_Key = process.env.Private_Key;
const register = async (req, res) => {
    const { firstName, lastName, email, mentalCondition, country, state, gender, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(404).send('Password does not match');
    }
    try {
        const userExist = await registerModel_1.default.findOne({ where: { email } });
        if (userExist) {
            return res.status(404).send('This User already exists');
        }
        const encryptedPassword = await bcryptjs_1.default.hash(password, 10);
        const { otp, otp_expiry } = (0, resetPassword_1.generateOtp)();
        const newUser = await registerModel_1.default.create({
            id: (0, uuid_1.v4)(),
            firstName,
            lastName,
            email,
            mentalCondition,
            country,
            state,
            gender,
            password: encryptedPassword,
            otp,
            otp_expiry,
            verify: false,
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email }, process.env.JWT_SECRET_KEY || 'SECRET-KEY', {
            expiresIn: '7d',
        });
        const chatEngineData = {
            username: newUser.email,
            secret: newUser.password,
            email: newUser.email,
            first_Name: newUser.firstName,
            last_Name: newUser.lastName,
        };
        const config = {
            method: 'post',
            url: 'https://api.chatengine.io/users/',
            headers: {
                Private_Key: `${Private_Key}`,
            },
            data: chatEngineData,
        };
        await (0, axios_1.default)(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
            .catch(function (error) {
            console.log(error);
        });
        await (0, resetPassword_1.sendVerificationOTP)(newUser.email, newUser.otp);
        return res.status(201).json({
            userDetails: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                mentalCondition: newUser.mentalCondition,
                country: newUser.country,
                state: newUser.state,
                gender: newUser.gender,
                token,
                otp,
            },
            chatEngineData,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('An error occurred, please try again');
    }
};
exports.register = register;
const verifyOTP = async (req, res) => {
    const { otp } = req.body;
    try {
        const user = await registerModel_1.default.findOne({ where: { otp } });
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (user.verify) {
            return res.status(400).send('User already verified');
        }
        const currentTime = new Date();
        if (currentTime > user.otp_expiry) {
            return res.status(400).send('OTP has expired');
        }
        // Update user verification status
        user.verify = true;
        await user.save();
        const chatEngineData = {
            username: user.email,
            secret: user.password,
            email: user.email,
            fullName: user.firstName,
        };
        const config = {
            method: 'post',
            url: 'https://api.chatengine.io/users/',
            headers: {
                'Project-ID': `${Private_Key}`,
            },
            data: chatEngineData,
        };
        await (0, axios_1.default)(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
            .catch(function (error) {
            console.log(error);
        });
        return res.status(200).send('OTP verified successfully');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('An error occurred, please try again');
    }
};
exports.verifyOTP = verifyOTP;
