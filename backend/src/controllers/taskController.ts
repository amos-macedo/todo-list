import { Request, Response } from "express";
import * as taskService from "../services/taskServices";

export const getAll = (req: Request, res: Response)=> {
  res.json(taskService.getAll());
}

export const getOne = (req: Request, res: Response) => {
    const {id} = req.params
    const task = taskService.getOne(id);
    if(!task) return res.sendStatus(404).json({message: "Task not found"});
    res.json(task);
}


export const create = async (req: Request, res: Response) => {
  try {
    const task = await taskService.create(req.body);
    return res.status(201).json(task); // return evita continuar
  } catch (err) {
    return res.status(500).json({ error: err}); // return aqui também
  }
};


export const update =(req:Request, res:Response) => {
    const {id, ...data} = req.body
    if(!data) return res.sendStatus(400).json({message: "Data is required"});

    const task = taskService.update(id, data);
    if(!task) return res.sendStatus(404).json({message: "Task not found"});
    res.json(task);
}   

export const remove = (req: Request, res:Response) => {
    const {id} = req.params
    try{
    const success = taskService.remove(id);
res.sendStatus(204);
    }catch{
    return res.sendStatus(404).json({message: "Task not found"});
    }
}

export const taskController = {
    getAll,
    getOne,
    create,
    update,
    remove
}