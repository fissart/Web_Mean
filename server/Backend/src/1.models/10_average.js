"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    nota: String,
    codigo: String,
    teacher: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    curse: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    title: String,
    ciclo: String,
    credito: String,
    mencion: String,
    year: String,
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Average', schema);
