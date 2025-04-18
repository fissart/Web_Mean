"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const AVERAGE_controller_1 = require("../2.controllers/AVERAGE.controller");
//C
router.route('/')
    .post(AVERAGE_controller_1.createController)
    .get(AVERAGE_controller_1.getsController);
//RUD
router.route('/:id')
    .get(AVERAGE_controller_1.getupdateController)
    .delete(AVERAGE_controller_1.deleteController)
    .put(AVERAGE_controller_1.updateController);
router.route('/getAveragesUser/:id')
    .get(AVERAGE_controller_1.getAveragesUserController);
router.route('/First/:ciclo/:mencion/:year')
    .get(AVERAGE_controller_1.getFirstController);
exports.default = router;
