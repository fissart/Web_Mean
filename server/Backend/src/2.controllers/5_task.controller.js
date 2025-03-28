"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateController = exports.updaterestricted_date = exports.deleteController = exports.getController = exports.createController = exports.getupdateController = exports.getsController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Models
const _5_Task_1 = __importDefault(require("../1.models/5_Task"));
const _2_Curse_1 = __importDefault(require("../1.models/2_Curse"));
//import Opinion, { IOpinion } from '../1.models/Opinion';
//getsController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getsController(req, res) {
    const { ObjectId } = require("mongodb");
    const user = ObjectId(req.params.user);
    const curse = ObjectId(req.params.curse);
    console.log(user, curse);
    const Curses = await _2_Curse_1.default.aggregate([
        {
            $match: {
                _id: curse,
            },
        },
        {
            $lookup: {
                from: "sections",
                let: { www: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$curse", "$$www"] } } },
                    {
                        $lookup: {
                            from: "themes",
                            let: { www: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$unidad", "$$www"] } } },
                                {
                                    $lookup: {
                                        from: "tasks",
                                        let: { www: "$_id" },
                                        pipeline: [
                                            { $match: { $expr: { $and: [
                                                            { $eq: ["$theme", "$$www"] },
                                                            {
                                                                $eq: ["$user", user],
                                                            },
                                                        ] } } }
                                        ],
                                        as: "usertask",
                                    },
                                }
                            ],
                            as: "temas",
                        },
                    },
                ],
                as: "unidades",
            },
        },
    ]);
    return res.json(Curses);
}
exports.getsController = getsController;
;
//getupdateController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getupdateController(req, res) {
    const { id } = req.params;
    const www = await _5_Task_1.default.findById(id);
    console.log(id);
    return res.json(www);
}
exports.getupdateController = getupdateController;
//createController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function createController(req, res) {
    const { note, task, dateb, datee, solution, theme, unidad, curse, user, asistence, codigo, ciclo, mencion, teacher, year } = req.body;
    //console.log(patth)
    if (req.file) {
        const patth = req.file.path;
        const newCurse = { note, img: patth, task, dateb, datee, solution, theme, unidad, curse, user, asistence, codigo, ciclo, mencion, teacher, year };
        const userw = new _5_Task_1.default(newCurse);
        await userw.save();
    }
    else {
        const newCurse = { note, task, dateb, datee, solution, theme, unidad, curse, user, asistence, codigo, ciclo, mencion, teacher, year };
        console.log(dateb, datee);
        const userw = new _5_Task_1.default(newCurse);
        await userw.save();
    }
    ///console.log(userw._id);
    //    if (!req.file) return res.status(400).send("No files were uploaded!!");
    //    const newCurse = {archivo:req.file.path, task, theme, unidad, curse, user};
    //  const Cursew = new Curse(newCurse);
    //await Cursew.save();
    //  console.log(Cursew);
    return res.json({
        message: 'Saved theme',
    });
}
exports.createController = createController;
;
//getController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const user = ObjectId(id);
    //    const { id } = req.params;
    //    const Curseuser = await Curse.findById(id);
    const Curseuser = await _5_Task_1.default.aggregate([
        {
            $match: {
                _id: user,
            },
        },
        {
            $lookup: {
                from: "sections",
                let: { www: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$curse", "$$www"] } } },
                    {
                        $lookup: {
                            from: "themes",
                            let: { www: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$unidad", "$$www"] } } }
                            ],
                            as: "temas",
                        },
                    },
                ],
                as: "unidades",
            },
        },
    ]);
    console.log(Curseuser);
    return res.json(Curseuser);
}
exports.getController = getController;
//deleteController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function deleteController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    //await Opinion.deleteMany({ imageid: id });
    const Curseww = await _5_Task_1.default.findByIdAndRemove(req.params.id);
    //const Curse = await Curse.findByIdAndRemove(id) as ITask;
    if (Curseww) {
        try {
            //fs.unlinkSync("files/tasks/" + file);
            await fs_extra_1.default.unlink(path_1.default.resolve(Curseww.img));
        }
        catch (err) {
            console.error(err);
        }
    }
    return res.json({ message: 'Successfully deleted task' });
}
exports.deleteController = deleteController;
;
///////////////////////////////////////////////////////////
async function updaterestricted_date(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const { ww, www } = req.body;
    const setdate = await _5_Task_1.default.updateMany({ theme: id }, { $set: { dateb: ww, datee: www } });
    console.log(setdate);
    return res.json("ok");
}
exports.updaterestricted_date = updaterestricted_date;
;
//updateController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function updateController(req, res) {
    console.log(req.file);
    const { id } = req.params;
    const { task, solution, note, asistence } = req.body;
    const updatedCurse = "";
    if (req.file) {
        const patth = req.file.path;
        const Cursew = await _5_Task_1.default.findById(id);
        if (Cursew) {
            try {
                await fs_extra_1.default.unlink(path_1.default.resolve(Cursew.img));
            }
            catch (err) {
                console.error(err);
            }
        }
        const updatedCurse = await _5_Task_1.default.findByIdAndUpdate(id, { note, task, solution, asistence, img: patth });
    }
    else {
        const updatedCurse = await _5_Task_1.default.findByIdAndUpdate(id, { note, task, solution, asistence });
    }
    return res.json({
        message: 'Successfully updated',
    });
}
exports.updateController = updateController;
