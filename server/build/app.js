"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./src/config/config");
const logging_1 = __importDefault(require("./src/library/logging"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    logging_1.default.info('Connected to mongoDB');
    startServer();
})
    .catch(error => {
    logging_1.default.error('Unable to connect');
    logging_1.default.error(error);
});
const startServer = () => {
    app.use((req, res, next) => {
        logging_1.default.info(`Incoming -> Method: [${req.method}] - Url [${req.url}] - IP [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            logging_1.default.info(`Incoming -> Method: [${req.method}] - Url [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** ROUTES */
    /**Healthcheck */
    app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    /**Error Handling */
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    app.listen(config_1.config.server.port, () => logging_1.default.info(`⚡Server is running on port ${config_1.config.server.port}⚡`));
};
