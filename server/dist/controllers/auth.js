"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const User_1 = __importDefault(require("../models/User"));
/**
 * @desc    login
 * @route   POST /api/auth/login
 * @access  public
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { credential } = req.body;
    try {
        const decoded = (0, jwt_decode_1.default)(credential);
        const user = yield User_1.default.findOne({ email: decoded.email });
        if (user) {
            res.send(user);
            return;
        }
        const newUser = yield User_1.default.create({
            name: decoded.name,
            email: decoded.email,
            image: decoded.picture
        });
        res.status(201).send(newUser);
    }
    catch (error) {
        res.status(500).send('Something went wrong');
    }
});
exports.login = login;
