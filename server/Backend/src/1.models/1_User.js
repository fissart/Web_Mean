"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    foto: String,
    rol: String,
    tipostd: String,
    dateb: String,
    datee: String,
    celular: String,
    logindate: String,
    carrera: String,
    mencion: String,
    ciclo: String,
    sexo: String,
    dni: String,
    password: String,
    name: String,
    email: String,
    filosophy: String,
}, {
    timestamps: true,
    collation: { locale: 'es' }
});
exports.default = mongoose_1.model('User', schema);
