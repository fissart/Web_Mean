import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
import Filecursew, { IForo } from './foro';

//createController///////////////////////////////////////////////////////////////////////
export async function createController(req: Request, res: Response): Promise<Response> {
    const { title, type, user, foreign, description, descriptionnew } = req.body;
    const newCurse = {
        title, type, user, foreign, description, descriptionnew
    };
    const userw = new Filecursew(newCurse);
    await userw.save();
    return res.json({
        message: 'Saved Successfully',
    });
};
//getsController/////////////////////////////////////////////////////////////////////////
export async function getsController(req: Request, res: Response): Promise<Response> {
    const data = await Filecursew.aggregate([
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
                    { $sort: { "_id": -1 } },
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

//getupdateController////////////////////////////////////////////////////////////////////
export async function getupdateController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = await Filecursew.findById(id);
    return res.json(data);
}
//deleteController///////////////////////////////////////////////////////////////////////
export async function deleteController(req: Request, res: Response): Promise<Response> {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);
    const File = await Filecursew.findByIdAndRemove(id) as IForo;
    await Filecursew.deleteMany({ foreign: id });

    return res.json({ message: 'Ok remove' });
};
//updateController///////////////////////////////////////////////////////////////////////
export async function updateController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { title, description, descriptionnew } = req.body
    console.log(id, title, description)
    const update = await Filecursew.findByIdAndUpdate(id, { title, description, descriptionnew })
    return res.json({
        message: 'Successfully updated'
    })
}
//updateController///////////////////////////////////////////////////////////////////////
export async function FileupdateController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    console.log(id);
    const update = '';
    if (req.file) {
        const File = await Filecursew.findById(id) as IForo;
        if (File) {
            try {
                await fs.unlink(path.resolve(File.title));
            } catch (err) {
                console.error(err);
            }
        }
        const update = await Filecursew.findByIdAndUpdate(id, { img: req.file.path });
    } else {
        const update = await Filecursew.findByIdAndUpdate(id, {});
    }
    return res.json({
        message: 'Successfully updated'
    });
}
