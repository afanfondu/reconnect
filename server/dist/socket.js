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
exports.EVENTS = void 0;
const socket_io_1 = require("socket.io");
const corsOptions_1 = require("./utils/corsOptions");
const Contact_1 = __importDefault(require("./models/Contact"));
const User_1 = __importDefault(require("./models/User"));
const updateUserStatus_1 = __importDefault(require("./utils/updateUserStatus"));
const sendContacts_1 = __importDefault(require("./utils/sendContacts"));
const Message_1 = __importDefault(require("./models/Message"));
exports.EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    CLIENT: {
        ADD_NEW_CONTACT: 'add-new-contact',
        SEND_MESSAGE: 'send-message',
        SEND_CONTACT_MESSAGES: 'send-contact-messages',
        SEEN_MESSAGES: 'seen-messages'
    },
    SERVER: {
        CONTACTS: 'contacts',
        CONTACT_MESSAGES: 'contact-messages',
        RECEIVE_MESSAGE: 'receive-message',
        UNSEEN_MESSAGES_COUNT: 'unseen-messages-count'
    }
};
const handleSocketServer = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: corsOptions_1.allowedOrigins
        }
    });
    io.on(exports.EVENTS.CONNECTION, socket => {
        const userId = socket.handshake.auth.userId;
        socket.join(userId);
        (0, updateUserStatus_1.default)(userId, 'online', io);
        (0, sendContacts_1.default)(userId, io);
        console.log(userId, 'is online');
        socket.on(exports.EVENTS.CLIENT.ADD_NEW_CONTACT, (recipientEmail, cb) => __awaiter(void 0, void 0, void 0, function* () {
            const recipient = yield User_1.default.findOne({ email: recipientEmail });
            if (!recipient)
                return cb(`User with email '${recipientEmail}' doesn't exists. Tell him/her to register first.`);
            const contact = yield Contact_1.default.findOne({
                user: userId,
                recipient: recipient._id
            });
            if (contact)
                return cb('This email is already in your contact list.');
            if (userId === `${recipient._id}`)
                return cb('Why you want to add yourself in your contact list 😅.');
            yield Contact_1.default.create({
                user: userId,
                recipient: recipient._id
            });
            (0, sendContacts_1.default)(userId, io);
        }));
        socket.on(exports.EVENTS.CLIENT.SEND_CONTACT_MESSAGES, (recipient) => __awaiter(void 0, void 0, void 0, function* () {
            const messages = yield Message_1.default.find().or([
                {
                    $and: [{ sender: userId }, { recipient }]
                },
                {
                    $and: [{ sender: recipient }, { recipient: userId }]
                }
            ]);
            const recipientContact = yield Contact_1.default.findOne({
                user: recipient,
                recipient: userId
            });
            const unseenMessagesCount = recipientContact
                ? recipientContact.newMessagesCount
                : 0;
            socket.emit(exports.EVENTS.SERVER.CONTACT_MESSAGES, messages);
            socket.emit(exports.EVENTS.SERVER.UNSEEN_MESSAGES_COUNT, unseenMessagesCount);
        }));
        socket.on(exports.EVENTS.CLIENT.SEND_MESSAGE, (message) => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = yield Message_1.default.create(message);
            const contact = yield Contact_1.default.findOne({
                user: message.recipient,
                recipient: userId
            });
            if (!contact) {
                yield Contact_1.default.create({
                    user: message.recipient,
                    recipient: userId,
                    newMessagesCount: 1
                });
            }
            else {
                contact.newMessagesCount = contact.newMessagesCount + 1;
                yield contact.save();
            }
            (0, sendContacts_1.default)(message.recipient, io);
            const unseenMessagesCount = contact ? contact.newMessagesCount : 1;
            socket.emit(exports.EVENTS.SERVER.UNSEEN_MESSAGES_COUNT, unseenMessagesCount);
            io.to([message.recipient, userId]).emit(exports.EVENTS.SERVER.RECEIVE_MESSAGE, newMessage);
        }));
        socket.on(exports.EVENTS.CLIENT.SEEN_MESSAGES, (contactIdx) => __awaiter(void 0, void 0, void 0, function* () {
            const contact = yield Contact_1.default.findById(contactIdx);
            contact.newMessagesCount = 0;
            yield contact.save();
            (0, sendContacts_1.default)(userId, io);
            io.to(`${contact.recipient}`).emit(exports.EVENTS.SERVER.UNSEEN_MESSAGES_COUNT, 0);
        }));
        socket.on(exports.EVENTS.DISCONNECT, () => {
            (0, updateUserStatus_1.default)(userId, 'offline', io);
            console.log(userId, 'is offline');
        });
    });
};
exports.default = handleSocketServer;
