"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { timeStamp } from 'console';
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    show: String,
    codigo: String,
    curse: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    userteach: {
        type: mongoose_1.Schema.Types.ObjectId,
    }
});
exports.default = mongoose_1.model('Integer', schema);
