import { Request, Response } from "express";
import * as taskService from "../services/taskServices";
import { Task } from "../models/task";

export const getAll = (req: Request, res: Response)=> {

  try{
    const {category, status, search} = req.query;
    const tasks = taskService.getAll({category: category as string, status: status as string, search: search as string});

    res.json(tasks);
  } catch (err) {
    return res.status(500).json({ error: "Error fetching tasks" });
  }

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


export const update = (req: Request, res: Response) => {
  const { id } = req.params;          // pega id da URL
  const data: Partial<Task> = req.body;

  if (!id || Object.keys(data).length === 0) {
    return res.status(400).json({ message: "ID and data are required" });
  }

  const task = taskService.update(id, data);
  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};


export const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  const removed = taskService.remove(id);

  if (!removed) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.sendStatus(204);
};


export const taskController = {
    getAll,
    getOne,
    create,
    update,
    remove
}