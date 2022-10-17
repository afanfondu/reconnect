"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.allowedOrigins = void 0;
exports.allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (exports.allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
    // credentials: true,
};
