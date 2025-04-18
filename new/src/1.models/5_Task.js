"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    note: String,
    img: String,
    codigo: String,
    ciclo: String,
    mencion: String,
    teacher: String,
    year: String,
    task: String,
    dateb: String,
    datee: String,
    solution: String,
    asistence: String,
    theme: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    unidad: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    curse: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Task', schema);
