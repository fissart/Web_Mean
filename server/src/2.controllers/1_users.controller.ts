import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import User, { IUser } from '../1.models/1_User';
//import Curse, { ICurse } from '../1.models/2_Curse';
import Integer, { IInteger } from '../1.models/6_Integer';
import Tasks, { ITask } from '../1.models/5_Task';

//Usuarios unicamente sin anidaciones/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export async function getSController(req: Request, res: Response): Promise<Response> {
    //const Curse = await User.find({rol:'3'}).sort({name:1});
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const mension = req.params.www;
    const ciclo = req.params.ciclo;
    const codigo = req.params.codigo;
    console.log(mension);

    const curse = ObjectId(id);
    const usersww = await User.aggregate([
    {
        $match: {
            'rol': '3',
            'mension': mension,
            'ciclo': ciclo,
        },
    },
    /*
    {
      $lookup: {
        from: 'integers',
        let: { userId: '$_id' },
        pipeline: [
            {$match: { $expr: { $and: [{ $eq: ["$user", "$$userId"] }, { $eq: ["$curse",  curse] },] } }},
        ],
        as: 'www'
      }
    },
    */
    {
        $lookup: {
            from: "averages",
            let: { wwwww: "$_id" },
            pipeline: [
                {$match: { $expr: { $and: [{ $eq: ["$user", "$$wwwww"] }, { $eq: ["$codigo",  codigo] },] } }},
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
            ],
            as: "averagge",
        },
    },
    {$sort: {  'name': 1 }},
    /*
    {
      $lookup: {
        from: "averages",
        let: { userw: "$_id" },
        pipeline: [
            { $match: { $expr: { $eq: ["$user", "$$userw"] } } },
        ],
        as: "averagge",
      },
    },
    */
  ])
    return res.json(usersww);
}

//Usuarios opiniones 1-2/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export async function getController(req: Request, res: Response): Promise<Response> {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const user = ObjectId(id);
    //console.log(user,"hola")
    const Curses = await User.aggregate([
        {
            $lookup: {
                from: "curses",
                let: { ww: "$_id" },
                pipeline: [

                    {$match: { $expr: { $and: [{ $eq: ["$user", "$$ww"] }, { $eq: ["$show",  "true"] },] } }},
                ],
                as: "cursse",
            },
        },
        {
              $lookup: {
                from: "integers",
                let: { www: "$_id" },
                pipeline: [

                  {$match: { $expr: { $and: [{ $eq: ["$user", "$$www"] }, { $eq: ["$show",  "true"] },] } }},
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
};
//2/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export async function createController(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    //console.log(req);

    const foto = '';
    if (req.file) {
        const foto = req.file.path;
    } else {
        const foto = 'User';
    }
    const Curse = await User.findOne({email:email});
    //const user = await User.findOne({ email: re });
    if (Curse) //return res.status(401).send('The email doen\' exists');
        return res.json({
            user: { "msg": "El usuario ya esta registrado" }
        });

    const newCurse = { name, email, password, rol: "3", foto };
    const user = new User(newCurse);
    await user.save();

    return res.json({
        user
    });
};

//getupdateController/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
export async function getupdateController(req: Request, res: Response): Promise<Response> {
  const { ObjectId } = require("mongodb");
  const user = ObjectId(req.params.id);
  const Usser = await User.aggregate([
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

///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export async function deleteController(req: Request, res: Response): Promise<Response> {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
//usuario -- cursos(tareas...) fotos-cursos
    const Userw = await User.findByIdAndRemove(id) as IUser;
    await Integer.remove({ user: id });
    await Tasks.remove({ user: id });
    if (Userw) {
        try {
            await fs.unlink(path.resolve(Userw.foto));
            //await fs.unlink(path.resolve(Curse.img));
        } catch (err) {
            console.error(err);
        }
    }
    //    await Curse.delete({ user: id });
    return res.json({ message: 'Curse Deleted' });
};
//5/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export async function updateController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, rol, celular, carrera, mension, ciclo, sexo, dni, filosophy } = req.body;
//console.log(req.file)
    const updatedCurse = "";
    if (req.file) {
        const Curse = await User.findById(id) as IUser;
        if (Curse) {
            try {
                await fs.unlink(path.resolve(Curse.foto));
            } catch (err) {
                console.error(err);
            }
        }
        const updatedCurse = await User.findByIdAndUpdate(id, { name, email, password, rol, celular, carrera, mension, ciclo, sexo, dni, filosophy, foto: req.file.path });
    } else {
        //await User.updateMany({rol:'2'}, {"$set": {"filosophy": filosophy}})
        const updatedCurse = await User.findByIdAndUpdate(id, {name, email, password, rol, celular, carrera, mension, ciclo, sexo, dni, filosophy });
    }
    return res.json({
        www: "actualizado correctamente"
    });
}

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

export async function signin(req: Request, res: Response): Promise<Response> {
    const { re, uu } = req.params;
    //console.log(req.params)
    const user = await User.findOne({ email: re });
    if (!user) //return res.status(401).send('The email doen\' exists');
        return res.json({
            user: { "msg": "El usuario no esta registrado" }
        });
    if (user.password !== uu)// return res.status(401).send('Wrong Password');
        return res.json({
            user: { "msg": "Password incorrecto" }
        });

    return res.json({
        user
    });
};
