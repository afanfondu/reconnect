"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
require("./utils/connectDB");
const corsOptions_1 = require("./utils/corsOptions");
const auth_1 = __importDefault(require("./routes/auth"));
const socket_1 = __importDefault(require("./socket"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, socket_1.default)(server);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use('/api/auth', auth_1.default);
app.get('/', (req, res) => {
    res.send({ uptime: process.uptime() });
});
server.listen(PORT, () => console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`));
