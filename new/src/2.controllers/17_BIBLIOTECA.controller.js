"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateController = exports.deleteController = exports.getupdateController = exports.getsController = exports.createController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const _9_Book_1 = __importDefault(require("../1.models/9_Book"));
//createController///////////////////////////////////////////////////////////////////////
async function createController(req, res) {
    const { title, description, user, author, subtype } = req.body;
    //console.log(req.body);
    const newDate = { title, description, user, author, subtype, type: 'BIBLIOTECA' };
    const data = new _9_Book_1.default(newDate);
    await data.save();
    return res.json({ message: 'Ok create' });
}
exports.createController = createController;
;
//getsController/////////////////////////////////////////////////////////////////////////
async function getsController(req, res) {
    const data = await _9_Book_1.default.find({ type: 'BIBLIOTECA' });
    return res.json(data);
}
exports.getsController = getsController;
//getupdateController////////////////////////////////////////////////////////////////////
async function getupdateController(req, res) {
    const { id } = req.params;
    const data = await _9_Book_1.default.findById(id);
    return res.json(data);
}
exports.getupdateController = getupdateController;
//deleteController///////////////////////////////////////////////////////////////////////
async function deleteController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const File = await _9_Book_1.default.findByIdAndRemove(id);
    if (File) {
        try {
            await fs_extra_1.default.unlink(path_1.default.resolve(File.file));
        }
        catch (err) {
            console.error(err);
        }
    }
    return res.json({ message: 'Ok remove' });
}
exports.deleteController = deleteController;
;
//updateController///////////////////////////////////////////////////////////////////////
async function updateController(req, res) {
    const { id } = req.params;
    const { title, description, user, responce, author, subtype } = req.body;
    const update = '';
    if (req.file) {
        const File = await _9_Book_1.default.findById(id);
        if (File) {
            try {
                await fs_extra_1.default.unlink(path_1.default.resolve(File.file));
            }
            catch (err) {
                console.error(err);
            }
        }
        const update = await _9_Book_1.default.findByIdAndUpdate(id, { title, description, subtype, author, file: req.file.path });
    }
    else {
        const update = await _9_Book_1.default.findByIdAndUpdate(id, { title, description, subtype, author });
    }
    return res.json({
        message: 'Successfully updated'
    });
}
exports.updateController = updateController;
