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
const User_1 = __importDefault(require("../models/User"));
const Contact_1 = __importDefault(require("../models/Contact"));
const sendContacts_1 = __importDefault(require("./sendContacts"));
function updateUserStatus(userId, status, io) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findById(userId);
        if (!user)
            return;
        user.status = status;
        yield user.save();
        const contactsToUpdate = yield Contact_1.default.find({ recipient: userId });
        for (let i = 0; i < contactsToUpdate.length; i++) {
            (0, sendContacts_1.default)(`${contactsToUpdate[i].user}`, io);
        }
    });
}
exports.default = updateUserStatus;
