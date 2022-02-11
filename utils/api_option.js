"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = exports.payload = exports.secret_key = exports.access_key = exports.server_url = void 0;
const uuid_1 = require("uuid");
const sign = require('jsonwebtoken').sign;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.server_url = process.env.UPBIT_OPEN_API_SERVER_URL;
exports.access_key = process.env.UPBIT_ACCESS_KEY;
exports.secret_key = process.env.UPBIT_SECRET_KEY;
exports.payload = {
    access_key: exports.access_key,
    nonce: (0, uuid_1.v4)(),
};
exports.token = sign(exports.payload, exports.secret_key);
//# sourceMappingURL=api_option.js.map