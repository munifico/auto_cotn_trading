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
exports.getCoinList = void 0;
const axios_1 = __importDefault(require("axios"));
const api_option_1 = require("./api_option");
function getCoinList() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: "GET",
            url: api_option_1.server_url + "/v1/market/all",
        };
        const res = yield (0, axios_1.default)(options);
        return res.data;
    });
}
exports.getCoinList = getCoinList;
//# sourceMappingURL=coin.js.map