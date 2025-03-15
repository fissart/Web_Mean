"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileupdateController = exports.updateController = exports.deleteController = exports.getupdateController = exports.getsController = exports.createController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const foro_1 = __importDefault(require("./foro"));
//createController///////////////////////////////////////////////////////////////////////
async function createController(req, res) {
    const { title, type, user, foreign, description, descriptionnew } = req.body;
    const newCurse = {
        title, type, user, foreign, description, descriptionnew
    };
    const userw = new foro_1.default(newCurse);
    await userw.save();
    return res.json({
        message: 'Saved Successfully',
    });
}
exports.createController = createController;
;
//getsController/////////////////////////////////////////////////////////////////////////
async function getsController(req, res) {
    const data = await foro_1.default.aggregate([
        { $match: { $expr: { $eq: ["$type", "theme"] } } },
        {
            $lookup: {
                from: "foros",
                let: { www: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$foreign", "$$www"] } } },
                    {
                        $lookup: {
                            from: "foros",
                            let: { wwwww: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$foreign", "$$wwwww"] } } },
                                {
                                    $lookup: {
                                        from: "foros",
                                        let: { www: "$_id" },
                                        pipeline: [
                                            { $match: { $expr: { $eq: ["$foreign", "$$www"] } } },
                                            {
                                                $lookup: {
                                                    from: "foros",
                                                    let: { wwwww: "$_id" },
                                                    pipeline: [
                                                        { $match: { $expr: { $eq: ["$foreign", "$$wwwww"] } } },
                                                    ],
                                                    as: "comentas",
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    let: { usser: "$user" },
                                                    pipeline: [
                                                        { $match: { $expr: { $eq: ["$_id", "$$usser"] } } },
                                                    ],
                                                    as: "usser",
                                                },
                                            },
                                        ],
                                        as: "comentass",
                                    },
                                },
                                {
                                    $lookup: {
                                        from: "users",
                                        let: { usser: "$user" },
                                        pipeline: [
                                            { $match: { $expr: { $eq: ["$_id", "$$usser"] } } },
                                        ],
                                        as: "usser",
                                    },
                                },
                            ],
                            as: "comentas",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            let: { usser: "$user" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$usser"] } } },
                            ],
                            as: "usser",
                        },
                    },
                ],
                as: "comenta",
            },
        },
        {
            $lookup: {
                from: "users",
                let: { ww: "$user" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$ww"] } } },
                ],
                as: "usser",
            },
        },
    ]);
    //    console.log(integers);
    return res.json(data);
}
exports.getsController = getsController;
//getupdateController////////////////////////////////////////////////////////////////////
async function getupdateController(req, res) {
    const { id } = req.params;
    const data = await foro_1.default.findById(id);
    return res.json(data);
}
exports.getupdateController = getupdateController;
//deleteController///////////////////////////////////////////////////////////////////////
async function deleteController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const File = await foro_1.default.findByIdAndRemove(id);
    await foro_1.default.deleteMany({ foreign: id });
    return res.json({ message: 'Ok remove' });
}
exports.deleteController = deleteController;
;
//updateController///////////////////////////////////////////////////////////////////////
async function updateController(req, res) {
    const { id } = req.params;
    const { title, description, descriptionnew } = req.body;
    console.log(id, title, description);
    const update = await foro_1.default.findByIdAndUpdate(id, { title, description, descriptionnew });
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
        const File = await foro_1.default.findById(id);
        if (File) {
            try {
                await fs_extra_1.default.unlink(path_1.default.resolve(File.title));
            }
            catch (err) {
                console.error(err);
            }
        }
        const update = await foro_1.default.findByIdAndUpdate(id, { img: req.file.path });
    }
    else {
        const update = await foro_1.default.findByIdAndUpdate(id, {});
    }
    return res.json({
        message: 'Successfully updated'
    });
}
exports.FileupdateController = FileupdateController;
