"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateController = exports.deleteController = exports.getupdateController = exports.getsController = exports.createController = void 0;
const Filecurse_1 = __importDefault(require("../1.models/Filecurse"));
//createController///////////////////////////////////////////////////////////////////////
async function createController(req, res) {
    const { title, type, img, curse, codigo } = req.body;
    if (req.file) {
        const newCurse = { title, type, img: req.file.path, curse, codigo };
        const userw = new Filecurse_1.default(newCurse);
        await userw.save();
    }
    else {
        const newCurse = { title, type, img, curse, codigo };
        const userw = new Filecurse_1.default(newCurse);
        await userw.save();
    }
    return res.json({
        message: 'Saved Successfully',
    });
}
exports.createController = createController;
;
//getsController/////////////////////////////////////////////////////////////////////////
async function getsController(req, res) {
    const data = await Filecurse_1.default.find({ type: 'RESPONCE' });
    return res.json(data);
}
exports.getsController = getsController;
//getupdateController////////////////////////////////////////////////////////////////////
async function getupdateController(req, res) {
    const { id } = req.params;
    const data = await Filecurse_1.default.findById(id);
    return res.json(data);
}
exports.getupdateController = getupdateController;
//deleteController///////////////////////////////////////////////////////////////////////
async function deleteController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const File = await Filecurse_1.default.findByIdAndRemove(id);
    return res.json({ message: 'Ok remove' });
}
exports.deleteController = deleteController;
;
//updateController///////////////////////////////////////////////////////////////////////
async function updateController(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const update = await Filecurse_1.default.findByIdAndUpdate(id, { title });
    return res.json({
        message: 'Successfully updated'
    });
}
exports.updateController = updateController;
