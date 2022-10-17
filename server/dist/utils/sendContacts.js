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
const Contact_1 = __importDefault(require("../models/Contact"));
const socket_1 = require("../socket");
function sendContacts(userId, io) {
    return __awaiter(this, void 0, void 0, function* () {
        const contacts = yield Contact_1.default.find({ user: userId })
            .sort('newMessageDate')
            .populate('recipient');
        io.to(userId).emit(socket_1.EVENTS.SERVER.CONTACTS, contacts);
    });
}
exports.default = sendContacts;
