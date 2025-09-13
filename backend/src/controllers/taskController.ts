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


export const create = (req:Request, res:Response) =>{
    const {data} = req.body
    if(!data) return res.sendStatus(400).json({message: "Data is required"});
    
    const task = taskService.create(data);
    res.status(201).json(task);
}

export const update =(req:Request, res:Response) => {
    const {id, ...data} = req.body
    if(!data) return res.sendStatus(400).json({message: "Data is required"});

    const task = taskService.update(id, data);
    if(!task) return res.sendStatus(404).json({message: "Task not found"});
    res.json(task);
}   

export const remove = (req: Request, res:Response) => {
    const {id} = req.params
    const success = taskService.remove(id);
    if(!success) return res.sendStatus(404).json({message: "Task not found"});
    res.sendStatus(204);
}

export const taskController = {
    getAll,
    getOne,
    create,
    update,
    remove
}