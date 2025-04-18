"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: String,
    description: String,
    img: String,
    especialidad: String,
    mencion: String,
    credito: String,
    ciclo: String,
    meet: String,
    show: String,
    codigo: String,
    requisito: String,
    year: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
    }
});
exports.default = mongoose_1.model('Curse', schema);
