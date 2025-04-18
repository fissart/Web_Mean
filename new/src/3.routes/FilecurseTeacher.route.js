"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const img_collection_1 = __importDefault(require("../libs/img_collection"));
const FilecurseTeacher_controller_1 = require("../2.controllers/FilecurseTeacher.controller");
//C
router.route('/')
    .post(img_collection_1.default.single('image'), FilecurseTeacher_controller_1.createController)
    .get(FilecurseTeacher_controller_1.getsController);
//RUD
router.route('/:id')
    .delete(FilecurseTeacher_controller_1.deleteController)
    .get(FilecurseTeacher_controller_1.getupdateController)
    .put(img_collection_1.default.single('image'), FilecurseTeacher_controller_1.updateController);
exports.default = router;
