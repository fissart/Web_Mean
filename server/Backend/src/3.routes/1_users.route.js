"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const img_user_1 = __importDefault(require("../libs/img_user"));
const _1_users_controller_1 = require("../2.controllers/1_users.controller");
//C
router.route('/Controller')
    .post(img_user_1.default.single('image'), _1_users_controller_1.createController);
//RUD
router.route('/Controller/:id')
    .delete(_1_users_controller_1.deleteController)
    .get(_1_users_controller_1.getupdateController)
    .put(img_user_1.default.single('image'), _1_users_controller_1.updateController);
router.route('/Controller/usserUpd/:id')
    .put(_1_users_controller_1.updateStdController);
router.route('/ControllerAllstd')
    .get(_1_users_controller_1.getControllerstd);
router.route('/Controller/Updaterestricted_date')
    .post(_1_users_controller_1.updaterestricted_date);
router.route('/Controller/Updaterestricted_datelogin/:id')
    .post(_1_users_controller_1.updaterestricted_datelogin);
//Inicio
router.route('/ControllerAll/:id')
    .get(_1_users_controller_1.getController);
router.route('/ControllerAllteacher/')
    .get(_1_users_controller_1.getControllerteacher);
//inicio sesion
router.route('/Controllersign/:re/:uu')
    .get(_1_users_controller_1.signin);
//All users only 
router.route('/ControllerGetusers/:id/:www/:ciclo/:codigo')
    .get(_1_users_controller_1.getSController);
//router.route('/Controller')
//   .get(getController)
exports.default = router;
