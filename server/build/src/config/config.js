"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USER = process.env.MONGO_USER || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@sallis-mart.vt05nli.mongodb.net/`;
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT
    }
};
