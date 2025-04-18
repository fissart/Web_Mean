"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileupdateController = exports.updateController = exports.deleteController = exports.getupdateController = exports.getsController = exports.createController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const land_1 = __importDefault(require("./land"));
//createController///////////////////////////////////////////////////////////////////////
async function createController(req, res) {
    console.log(req);
    const { title, type, img, curse, codigo, description } = req.body;
    if (req.file) {
        const newCurse = { title, type, img: req.file.path, curse, codigo, description };
        const userw = new land_1.default(newCurse);
        await userw.save();
    }
    else {
        const newCurse = { title, type, img, curse, codigo, description };
        const userw = new land_1.default(newCurse);
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
    const data = await land_1.default.find();
    return res.json(data);
}
exports.getsController = getsController;
//getupdateController////////////////////////////////////////////////////////////////////
async function getupdateController(req, res) {
    const { id } = req.params;
    const data = await land_1.default.findById(id);
    return res.json(data);
}
exports.getupdateController = getupdateController;
//deleteController///////////////////////////////////////////////////////////////////////
async function deleteController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const File = await land_1.default.findByIdAndRemove(id);
    return res.json({ message: 'Ok remove' });
}
exports.deleteController = deleteController;
;
//updateController///////////////////////////////////////////////////////////////////////
async function updateController(req, res) {
    const { id } = req.params;
    const { blogspot, youtube, instagram, whatsapp, facebook, title, description } = req.body;
    const update = await land_1.default.findByIdAndUpdate(id, { blogspot, youtube, instagram, whatsapp, facebook, title, description });
    return res.json({
        message: 'Successfully updated'
    });
}
exports.updateController = updateController;
//updateController///////////////////////////////////////////////////////////////////////
async function FileupdateController(req, res) {
    const { id } = req.params;
    console.log(id);
    const update = '';
    if (req.file) {
        const File = await land_1.default.findById(id);
        if (File) {
            try {
                await fs_extra_1.default.unlink(path_1.default.resolve(File.img));
            }
            catch (err) {
                console.error(err);
            }
        }
        const update = await land_1.default.findByIdAndUpdate(id, { img: req.file.path });
    }
    else {
        const update = await land_1.default.findByIdAndUpdate(id, {});
    }
    return res.json({
        message: 'Successfully updated'
    });
}
exports.FileupdateController = FileupdateController;
