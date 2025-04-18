"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: String,
    codigo: String,
    type: String,
    img: String,
    curse: {
        type: mongoose_1.Schema.Types.ObjectId,
    }
});
exports.default = mongoose_1.model('Filecurse', schema);
