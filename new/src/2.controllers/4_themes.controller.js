"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updaterestricted_date = exports.updateController = exports.deleteController = exports.getController = exports.createController = exports.getupdateController = exports.getsController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Models
const _4_Theme_1 = __importDefault(require("../1.models/4_Theme"));
const _5_Task_1 = __importDefault(require("../1.models/5_Task"));
//getsController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getsController(req, res) {
    const Curses = await _4_Theme_1.default.find();
    return res.json(Curses);
}
exports.getsController = getsController;
;
//getupdateController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getupdateController(req, res) {
    const { ObjectId } = require("mongodb");
    const idtheme = ObjectId(req.params.id);
    const curssse = ObjectId(req.params.curssse);
    const Curses = await _4_Theme_1.default.aggregate([
        {
            $match: {
                _id: idtheme,
            },
        },
        {
            $lookup: {
                from: "curses",
                let: { w_1: "$curse" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$w_1"] } } },
                    {
                        $lookup: {
                            from: "users",
                            let: { w_ww: "$curse", ww_w: "$_id", www: "$ciclo", wwwww: "$mencion" },
                            pipeline: [
                                { $match: { $expr: { $and: [{ $eq: ["$ciclo", "$$www"] }, { $eq: ["$mencion", '$$wwwww'] },] } } },
                                {
                                    $lookup: {
                                        from: "tasks",
                                        let: { w_ww: "$_id" },
                                        pipeline: [
                                            { $match: { $expr: { $and: [{ $eq: ["$user", "$$w_ww"] }, { $eq: ["$theme", idtheme] },] } } },
                                        ],
                                        as: "tassk",
                                    },
                                },
                                { $sort: { 'name': 1 } },
                            ],
                            as: "integgers",
                        },
                    },
                ],
                as: "curso",
            },
        },
        {
            $lookup: {
                from: "tasks",
                let: { w_1: "$_id", w_2: "$user" },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ["$user", "$$w_2"] }, { $eq: ["$theme", '$$w_1'] },] } } },
                ],
                as: "tassks",
            },
        },
        {
            $lookup: {
                from: "sections",
                let: { w_1: "$unidad" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$w_1"] } } },
                ],
                as: "unity",
            },
        },
        {
            $lookup: {
                from: "users",
                let: { w_1: "$user" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$w_1"] } } },
                ],
                as: "userr",
            },
        },
    ]).collation({ locale: 'es' });
    //const Curses = await Curse.find();
    return res.json(Curses);
}
exports.getupdateController = getupdateController;
//createController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function createController(req, res) {
    const { title, description, user, file, task, solution, curse, unidad, time, dateb, datee } = req.body;
    //console.log(title, description, user, file, task, solution, curse, unidad, time);
    //    if (!req.file) return res.status(400).send("No files were uploaded!!");
    const newCurse = {
        title, description, task, solution, unidad, curse, user, time, dateb: "2024-03-26T10:15", datee: "2024-03-28T10:15", img: file
    };
    const Cursew = new _4_Theme_1.default(newCurse);
    await Cursew.save();
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
    const Curseuser = await _4_Theme_1.default.aggregate([
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
    //console.log(Curseuser);
    return res.json(Curseuser);
}
exports.getController = getController;
//deleteController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function deleteController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    //await Opinion.deleteMany({ imageid: id });
    const Curseww = await _4_Theme_1.default.findByIdAndRemove(req.params.id);
    //const Curse = await Curse.findByIdAndRemove(id) as ICurse;
    await _5_Task_1.default.deleteMany({ 'theme': id });
    /*
   if (Curseww) {
       try {
           //fs.unlinkSync("files/tasks/" + file);
           await fs.unlink(path.resolve(Curseww.img));
       } catch (err) {
           console.error(err);
       }
   }
   */
    return res.json({ message: { "msg": "El usuario no esta registrado" } });
}
exports.deleteController = deleteController;
;
//updateController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function updateController(req, res) {
    const { id } = req.params;
    //console.log(req);
    const { title, description, task, solution, time } = req.body;
    if (req.file) {
        const Cursew = await _4_Theme_1.default.findById(id);
        if (Cursew) {
            try {
                await fs_extra_1.default.unlink(path_1.default.resolve(Cursew.img));
            }
            catch (err) {
                console.error(err);
            }
        }
        const updatedCurse = await _4_Theme_1.default.findByIdAndUpdate(id, { title, description, task, solution, time, img: req.file.path });
        //const updatedCurse = await Curse.findByIdAndUpdate(id, { title, description, img: req.file.path });
    }
    else {
        //const updatedCurse = await Curse.findByIdAndUpdate(id, { title, description });
        const updatedCurse = await _4_Theme_1.default.findByIdAndUpdate(id, { title, description, task, solution, time });
    }
    return res.json({
        message: 'Successfully updated theme',
    });
}
exports.updateController = updateController;
///////////////////////////////////////////////////////////
async function updaterestricted_date(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const { ww, www } = req.body;
    const setdate = await _4_Theme_1.default.findByIdAndUpdate(id, { dateb: ww, datee: www });
    //console.log(setdate)
    return res.json("ok");
}
exports.updaterestricted_date = updaterestricted_date;
;
/*
//createCurse2/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export async function createCurse2(req: Request, res: Response): Promise<Response> {
    const { title, description, user, curse } = req.body;
    console.log(req);
    const newCurse = { title, description, user, curse, imagePath: req.file.path };
    const Curse = new Curse(newCurse);
    await Curse.save();

    return res.json({
        message: 'Curse Saved Successfully',
    });
};

//updateCurse2/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export async function updateCurse2(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    console.log(id)
    const { title, description } = req.body;
    const updatedCurse = "";
    if (req.file) {
        const Curse = await Curse.findById(id) as ICurse;
        if (Curse) {
            try {
                await fs.unlink(path.resolve(Curse.imagePath));
            } catch (err) {
                console.error(err);
            }
        }
        const updatedCurse = await Curse.findByIdAndUpdate(id, { title, description, imagePath: req.file.path });
    } else {
        const updatedCurse = await Curse.findByIdAndUpdate(id, { title, description });
    }
    return res.json({
        message: 'Successfully updated',
        updatedCurse
    });

}
//createOpinion/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export async function createOpinion(req: Request, res: Response): Promise<Response> {
    const { user, imageid, value } = req.body;
    await Opinion.deleteMany({ user, imageid });
    const opinar = { user, imageid, value };
    const opi = new Opinion(opinar);
    await opi.save();
    return res.json({
        message: 'Opinion Saved Successfully',
        opi
    });
};

//delete_Opinion/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export async function delete_Opinion(req: Request, res: Response): Promise<Response> {
    const { user, imageid } = req.body;
    console.log(user, imageid)
    await Opinion.deleteMany({ user, imageid });
    return res.json({ message: 'Curse Deleted' });
};
*/
