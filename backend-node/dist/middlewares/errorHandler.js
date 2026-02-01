"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = __importDefault(require("../config/logger"));
function errorHandler(err, req, res, next) {
    logger_1.default.error(err.stack || err.message);
    res.status(err.status || 500).json({ error: err.message || 'Erreur interne du serveur' });
}
