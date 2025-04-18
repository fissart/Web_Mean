"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateController = exports.deleteController = exports.getControlleruser = exports.getControllerNotesnew = exports.getControllerNotes = exports.getController = exports.getintegerController = exports.createController = exports.getupdateController = exports.getsController = void 0;
// Models
const _6_Integer_1 = __importDefault(require("../1.models/6_Integer"));
const _2_Curse_1 = __importDefault(require("../1.models/2_Curse"));
const _1_User_1 = __importDefault(require("../1.models/1_User"));
//import Opinion, { IOpinion } from '../1.models/Opinion';
//getsController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getsController(req, res) {
    const Curses = await _6_Integer_1.default.find();
    return res.json(Curses);
}
exports.getsController = getsController;
;
//getupdateController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getupdateController(req, res) {
    const { id } = req.params;
    const www = await _6_Integer_1.default.findById(id);
    //console.log(id);
    return res.json(www);
}
exports.getupdateController = getupdateController;
//createController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function createController(req, res) {
    var mongoose = require('mongoose');
    const { curse, user, userteach, codigo } = req.body;
    if (mongoose.Types.ObjectId.isValid(curse)) {
        const { ObjectId } = require("mongodb");
        const id_curse = ObjectId(curse);
        const id_user = ObjectId(user);
        const www = await _2_Curse_1.default.findById(curse);
        const wwwww = await _1_User_1.default.findById(user);
        //console.log(www, wwwww);
        //const integer = await Curse.find({curse:id_curse,user:id_user});
        if (wwwww && www) {
            const integer = await _6_Integer_1.default.find({ curse: id_curse, user: id_user });
            console.log(integer);
            if (integer.length == 0) {
                const userteachwww = www.user;
                const newCurse = { curse, user, userteach: userteachwww, codigo, show: "true" };
                const Cursew = new _6_Integer_1.default(newCurse);
                await Cursew.save();
            }
            else {
                return res.json({
                    msg: 'Algún docente más registró a este estudiante en este curso comunquese si aún no tiene calificación alguna.',
                });
            }
        }
        else {
            return res.json({
                msg: 'No existe curso o usuario, reinicie sesión',
            });
        }
    }
    else {
        return res.json({
            msg: 'Código incorrecto',
        });
    }
    return res.json({
        msgok: "ok",
    });
}
exports.createController = createController;
;
//getController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getintegerController(req, res) {
    const { ObjectId } = require("mongodb");
    const curso = req.params.id;
    console.log(curso);
    //const curso = ObjectId(id);
    const integers = await _6_Integer_1.default.aggregate([
        {
            $match: {
                codigo: curso,
            },
        },
        {
            $lookup: {
                from: "users",
                let: { www: "$user" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$www"] } } },
                    {
                        $lookup: {
                            from: "averages",
                            let: { wwwww: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $and: [{ $eq: ["$user", "$$www"] }, { $eq: ["$codigo", curso] },] } } },
                            ],
                            as: "averagge",
                        },
                    },
                ],
                as: "userw",
            },
        },
        { '$sort': { 'userw.name': 1 } },
        {
            $lookup: {
                from: "users",
                let: { www: "$userteach" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$www"] } } },
                ],
                as: "userwwteach",
            },
        },
    ]);
    //  console.log(integers);
    return res.json(integers);
}
exports.getintegerController = getintegerController;
//getController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const curso = ObjectId(id);
    //    const { id } = req.params;
    //          const Curseuser = await Curse.find({curse:curso});
    const integers = await _6_Integer_1.default.aggregate([
        {
            $match: {
                curse: curso,
            },
        },
        {
            $lookup: {
                from: "users",
                let: { www: "$user" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$www"] } } },
                    {
                        $lookup: {
                            from: "tasks",
                            let: { www: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$user", "$$www"] } } },
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$user", "$$www"] },
                                                {
                                                    $eq: ["$curse", curso],
                                                },
                                            ],
                                        }
                                    }
                                }
                            ],
                            as: "tasks",
                        },
                    },
                ],
                as: "userw",
            },
        },
        { '$sort': { 'userw.name': 1 } },
    ]);
    //  console.log(integers);
    return res.json(integers);
}
exports.getController = getController;
//getControllerNotes/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getControllerNotes(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const curso = ObjectId(id);
    const ciclo = req.params.ciclo;
    const mencion = req.params.mencion;
    const codigo = req.params.codigo;
    //    const { id } = req.params;
    //          const Curseuser = await Curse.find({curse:curso});
    const integers = await _1_User_1.default.aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        { $eq: ["$ciclo", ciclo] },
                        { $eq: ["$mencion", mencion] },
                    ]
                }
            }
        },
        { '$sort': { 'userw.name': 1 } },
        {
            $lookup: {
                from: "curses",
                let: { wwwww: "$curse", www_: "$user" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$wwwww"] } } },
                    {
                        $lookup: {
                            from: "sections",
                            let: { www: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$curse", "$$www"] } } },
                                {
                                    $lookup: {
                                        from: "themes",
                                        let: { w_ww: "$_id" },
                                        pipeline: [
                                            { $match: { $expr: { $eq: ["$unidad", "$$www"] } } },
                                            {
                                                $lookup: {
                                                    from: "tasks",
                                                    let: { www: "$_id" },
                                                    pipeline: [
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $and: [
                                                                        { $eq: ["$theme", "$$w_ww"] },
                                                                        {
                                                                            $eq: ["$user", "$$www_"],
                                                                        },
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    as: "taskstd",
                                                },
                                            },
                                        ],
                                        as: "themes",
                                    },
                                },
                            ],
                            as: "units",
                        },
                    },
                ],
                as: "cursse",
            },
        },
    ]);
    return res.json(integers);
}
exports.getControllerNotes = getControllerNotes;
//getControllerNoteswhit_id/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getControllerNotesnew(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const curso = ObjectId(id);
    console.log(curso, "www"); //    const { id } = req.params;
    //          const Curseuser = await Curse.find({curse:curso});
    const integers = await _6_Integer_1.default.aggregate([
        {
            $match: {
                curse: curso,
            },
        },
        {
            $lookup: {
                from: "users",
                let: { www: "$user" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$www"] } } },
                    {
                        $lookup: {
                            from: "tasks",
                            let: { www: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$user", "$$www"] } } },
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$user", "$$www"] },
                                                {
                                                    $eq: ["$curse", curso],
                                                },
                                            ],
                                        }
                                    }
                                }
                            ],
                            as: "tasks",
                        },
                    },
                ],
                as: "userw",
            },
        },
        { '$sort': { 'userw.name': 1 } },
        {
            $lookup: {
                from: "curses",
                let: { wwwww: "$curse", www_: "$user" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$wwwww"] } } },
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
                                                        {
                                                            $match: {
                                                                $expr: {
                                                                    $and: [
                                                                        { $eq: ["$theme", "$$www"] },
                                                                        {
                                                                            $eq: ["$user", "$$www_"],
                                                                        },
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    as: "task",
                                                },
                                            },
                                        ],
                                        as: "themes",
                                    },
                                },
                            ],
                            as: "units",
                        },
                    },
                ],
                as: "cursse",
            },
        },
    ]);
    console.log(integers, "wwwww");
    return res.json(integers);
}
exports.getControllerNotesnew = getControllerNotesnew;
//getControlleruserinteger/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getControlleruser(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const user = ObjectId(id);
    const integers = await _6_Integer_1.default.aggregate([
        {
            $match: { $expr: { $and: [{ $eq: ["$user", user] }, { $eq: ["$show", "true"] }] } },
        },
        {
            $lookup: {
                from: "users",
                let: { www: "$userteach" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$www"] } } },
                ],
                as: "userw",
            },
        },
        {
            $lookup: {
                from: "curses",
                let: { ww: "$curse" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$ww"] } } },
                ],
                as: "cursse",
            },
        },
    ]);
    //    console.log(integers);
    return res.json(integers);
}
exports.getControlleruser = getControlleruser;
//deleteController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function deleteController(req, res) {
    const Curseww = await _6_Integer_1.default.findByIdAndRemove(req.params.id);
    return res.json({ message: 'Successfully deleted task' });
}
exports.deleteController = deleteController;
;
//updateController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function updateController(req, res) {
    const { id } = req.params;
    const { task } = req.body;
    const updatedCurse = await _6_Integer_1.default.findByIdAndUpdate(id, { task });
    return res.json({
        message: 'Successfully updated',
    });
}
exports.updateController = updateController;
