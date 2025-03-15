"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.updateStdController = exports.updateController = exports.deleteController = exports.getupdateController = exports.createController = exports.updaterestricted_datelogin = exports.updaterestricted_date = exports.getControllerstd = exports.getControllerteacher = exports.getController = exports.getSController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Models
const _1_User_1 = __importDefault(require("../1.models/1_User"));
//import Curse, { ICurse } from '../1.models/2_Curse';
const _6_Integer_1 = __importDefault(require("../1.models/6_Integer"));
const _5_Task_1 = __importDefault(require("../1.models/5_Task"));
//Usuarios unicamente sin anidaciones/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getSController(req, res) {
    //const Curse = await User.find({rol:'3'}).sort({name:1});
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const mencion = req.params.www;
    const ciclo = req.params.ciclo;
    const codigo = req.params.codigo;
    const idcurso = ObjectId(id);
    var year = new Date().getFullYear();
    console.log(year, mencion, ciclo, codigo, idcurso);
    const usersww = await _1_User_1.default.aggregate([
        {
            $match: {
                'rol': '3',
                'mencion': mencion,
                'ciclo': ciclo,
            },
        },
        {
            $lookup: {
                from: "averages",
                let: { wwwww: "$_id" },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ["$user", "$$wwwww"] }, { $eq: ["$codigo", codigo] }, { $eq: ["$mencion", mencion] }, { $eq: ["$ciclo", ciclo] }, { $eq: ["$year", year + ''] }] } } },
                    {
                        $lookup: {
                            from: "users",
                            let: { wwwww: "$teacher" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$wwwww"] } } },
                            ],
                            as: "teach",
                        },
                    },
                    {
                        $lookup: {
                            from: "curses",
                            let: { www: "$curse" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$www"] } } },
                            ],
                            as: "cursse",
                        },
                    },
                ],
                as: "averagge",
            },
        },
    ]).collation({ locale: 'es' }).sort({ "name": 1 });
    return res.json(usersww);
}
exports.getSController = getSController;
//Usuarios opiniones 1-2/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const user = ObjectId(id);
    //console.log(user,"hola")
    const Curses = await _1_User_1.default.aggregate([
        {
            $lookup: {
                from: "curses",
                let: { ww: "$_id" },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ["$user", "$$ww"] }, { $eq: ["$show", "true"] },] } } },
                ],
                as: "cursse",
            },
        },
        {
            $lookup: {
                from: "integers",
                let: { www: "$_id" },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ["$user", "$$www"] }, { $eq: ["$show", "true"] },] } } },
                    {
                        $lookup: {
                            from: "curses",
                            let: { wwwww: "$curse" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$wwwww"] } } },
                            ],
                            as: "cursew",
                        },
                    },
                ],
                as: "integer",
            },
        }
    ]);
    return res.json(Curses);
}
exports.getController = getController;
;
async function getControllerteacher(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const user = ObjectId(id);
    //console.log(user,"hola")
    const Curses = await _1_User_1.default.aggregate([
        {
            $match: {
                rol: "2",
            },
        },
        {
            $lookup: {
                from: "curses",
                let: { ww: "$_id" },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ["$user", "$$ww"] }, { $eq: ["$show", "true"] },] } } },
                ],
                as: "cursse",
            },
        },
        {
            $lookup: {
                from: "filecurses",
                let: { ww: "$_id" },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ["$curse", "$$ww"] }, { $eq: ["$type", "teacher"] },] } } },
                ],
                as: "filecursses",
            },
        },
    ]);
    return res.json(Curses);
}
exports.getControllerteacher = getControllerteacher;
;
async function getControllerstd(req, res) {
    const Useers = await _1_User_1.default.aggregate([
        {
            $match: {
                $expr: { $and: [{ $ne: ["$rol", "1"] }, { $ne: ["$rol", "2"] }, { $ne: ["$rol", "4"] }, { $ne: ["$rol", "5"] }] }
            }
        },
        {
            $group: {
                _id: "$rol", total: { $sum: 1 },
            }
        },
        {
            $lookup: {
                from: "users",
                let: { www: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$rol", "$$www"] } } },
                    {
                        $group: {
                            _id: "$mencion", total: { $sum: 1 },
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            let: { wwwww: "$_id" },
                            pipeline: [
                                { $match: { $expr: { $and: [{ $eq: ["$mencion", "$$wwwww"] }, { $eq: ["$rol", "$$www"] }] } } },
                                {
                                    $group: {
                                        _id: "$ciclo", total: { $sum: 1 },
                                    }
                                },
                                {
                                    $lookup: {
                                        from: "users",
                                        let: { wwwwwww: "$_id" },
                                        pipeline: [
                                            { $match: { $expr: { $and: [{ $eq: ["$mencion", "$$wwwww"] }, { $eq: ["$ciclo", "$$wwwwwww"] }, { $eq: ["$rol", "$$www"] }] } } },
                                            { $sort: { "name": 1 } },
                                        ],
                                        as: "ussers",
                                    },
                                },
                                { $sort: { "_id": -1 } },
                            ],
                            as: "cycles",
                        },
                    },
                    { $sort: { "_id": 1 } },
                ],
                as: "mencions",
            },
        },
        { $sort: { "_id": -1 } },
    ]);
    return res.json(Useers);
}
exports.getControllerstd = getControllerstd;
;
///////////////////////////////////////////////////////////
async function updaterestricted_date(req, res) {
    const { ww, www } = req.body;
    const setdate = await _1_User_1.default.updateMany({}, { $set: { dateb: ww, datee: www } });
    console.log(setdate);
    return res.json("ok");
}
exports.updaterestricted_date = updaterestricted_date;
///////////////////////////////////////////////////////////
async function updaterestricted_datelogin(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const user = ObjectId(id);
    var str = new Date();
    let day = str.getDate();
    let month = str.getMonth() + 1;
    let year = str.getFullYear();
    let hour = str.getHours();
    let mnt = str.getMinutes();
    let scn = str.getSeconds();
    let format1 = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${mnt < 10 ? '0' + mnt : mnt}`;
    // const { ww, www } = req.body;
    const setdate = await _1_User_1.default.updateMany({ _id: ObjectId(user) }, { $set: { logindate: format1 } });
    // console.log(setdate)
    return res.json("ok");
}
exports.updaterestricted_datelogin = updaterestricted_datelogin;
;
//2/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function createController(req, res) {
    const { name, email, rol, password } = req.body;
    //console.log(req);
    const foto = req.file ? req.file.path : 'uploads/user/' + password + '.jpg';
    const Curse = await _1_User_1.default.findOne({ email: email });
    if (Curse)
        return res.json({
            user: { "msg": "El usuario ya esta registrado" }
        });
    const newCursej = { name, email, password, dni: password, celular: password, rol: rol, foto, ciclo: 'N', mencion: 'N' };
    const newCurse = { name, email, password, dni: password, celular: password, rol: rol, foto };
    const user = new _1_User_1.default(rol != '3' ? newCurse : newCursej);
    await user.save();
    return res.json({
        user
    });
}
exports.createController = createController;
;
//getupdateController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function getupdateController(req, res) {
    const { ObjectId } = require("mongodb");
    const user = ObjectId(req.params.id);
    const Usser = await _1_User_1.default.aggregate([
        {
            $match: {
                _id: user,
            },
        },
        {
            $lookup: {
                from: "filecurses",
                let: { www: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$curse", "$$www"] } } },
                ],
                as: "archivos",
            },
        },
    ]);
    return res.json(Usser);
}
exports.getupdateController = getupdateController;
///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
async function deleteController(req, res) {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    //usuario -- cursos(tareas...) fotos-cursos
    const Userw = await _1_User_1.default.findByIdAndRemove(id);
    await _6_Integer_1.default.remove({ user: id });
    await _5_Task_1.default.remove({ user: id });
    if (Userw) {
        try {
            await fs_extra_1.default.unlink(path_1.default.resolve(Userw.foto));
            //await fs.unlink(path.resolve(Curse.img));
        }
        catch (err) {
            console.error(err);
        }
    }
    //    await Curse.delete({ user: id });
    return res.json({ message: 'Curse Deleted' });
}
exports.deleteController = deleteController;
;
//5/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function updateController(req, res) {
    const { id } = req.params;
    const { name, email, password, rol, celular, carrera, mencion, ciclo, sexo, dni, filosophy, logindate } = req.body;
    console.log(req.body);
    const updatedCurse = "";
    if (req.file) {
        const Curse = await _1_User_1.default.findById(id);
        if (Curse) {
            try {
                await fs_extra_1.default.unlink(path_1.default.resolve(Curse.foto));
            }
            catch (err) {
                console.error(err);
            }
        }
        const updatedCurse = await _1_User_1.default.findByIdAndUpdate(id, { name, email, password, rol, celular, carrera, mencion, ciclo, sexo, dni, filosophy, logindate, foto: req.file.path });
    }
    else {
        //await User.updateMany({rol:'2'}, {"$set": {"filosophy": filosophy}})
        const updatedCurse = await _1_User_1.default.findByIdAndUpdate(id, { name, email, password, rol, celular, carrera, mencion, ciclo, sexo, dni, filosophy, logindate });
    }
    return res.json({
        www: "actualizado correctamente"
    });
}
exports.updateController = updateController;
async function updateStdController(req, res) {
    const { id } = req.params;
    const { name, ciclo, mencion, tipostd } = req.body;
    const updatedCurse = await _1_User_1.default.findByIdAndUpdate(id, { name, ciclo, mencion, tipostd });
    return res.json({
        www: "actualizado correctamente"
    });
}
exports.updateStdController = updateStdController;
///////////////
/*
notesww.updateU = async (req, res) => {
//   console.log(req);
//    console.log(req.files);

  //const { title, content, duration, date, author } = req.body;
  //console.log(req.params.id);
  if (req.files) {
    const note = await Curse.findById(req.params.id);
    const file = note.foto;
    try {
      fs.unlinkSync("files/profile/" + file);
    } catch (err) {
      console.error(err);
    }
    const myFile = req.files.foto;
    myFile.mv(`files/profile/${req.params.id + "_" + myFile.name}`);
    const nEw = {
      foto: req.params.id + "_" + myFile.name,
      category: req.body.category,
      nombre: req.body.nombre,
      contenido: req.body.contenido,
      tarea: req.body.tarea,
      test: req.body.test,
      fechaexamen: req.body.fechaexamen,
      fechatarea: req.body.fechatarea,
      timexa: req.body.timexa,
    };
    console.log(nEw);
    await Curse.findByIdAndUpdate(req.params.id, nEw);
  } else {
    const nEw = {
      category: req.body.category,
      nombre: req.body.nombre,
      contenido: req.body.contenido,
      tarea: req.body.tarea,
      test: req.body.test,
      fechaexamen: req.body.fechaexamen,
      fechatarea: req.body.fechatarea,
      timexa: req.body.timexa,
    };
    await Curse.findByIdAndUpdate(req.params.id, nEw);
  }
res.json("Note Updated");
};
*/
//6/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
async function signin(req, res) {
    const { re, uu } = req.params;
    //console.log(req.params)
    const user = await _1_User_1.default.findOne({ email: re });
    if (!user) //return res.status(401).send('The email doen\' exists');
        return res.json({
            user: { "msg": "El usuario no esta registrado" }
        });
    if (user.password !== uu) // return res.status(401).send('Wrong Password');
        return res.json({
            user: { "msg": "Password incorrecto" }
        });
    return res.json({
        user
    });
}
exports.signin = signin;
;
