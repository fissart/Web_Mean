"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnection = void 0;
const mongoose_1 = require("mongoose");
async function startConnection() {
    const db = await mongoose_1.connect('mongodb://localhost/fgpa', {
        //const db = await connect('mongodb+srv://r7:@Qq1w2e3r4t5y6u7@cluster0.q17em.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
}
exports.startConnection = startConnection;
