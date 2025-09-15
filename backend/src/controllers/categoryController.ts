import { Request, Response } from "express";
import * as categoryServices from "../services/categoryServices";
import { Category } from "../models/category";


export const getAll = (req: Request, res: Response)=> {
  res.json(categoryServices.getAll());
}


export const getOne = (req: Request, res: Response) => {
    const {id} = req.params
   const category = categoryServices.getOne(id);
if (!category) return res.status(404).json({ message: "Category not found" });
res.json(category);

}


export const create = async (req: Request, res: Response) => {
  try {
    const category = await categoryServices.create(req.body);
    return res.status(201).json(category); // return evita continuar
  } catch (err) {
    return res.status(500).json({ error: err}); // return aqui também
  }
};


export const update = (req: Request, res: Response) => {
  const { id } = req.params;          // pega id da URL
  const data: Partial<Category> = req.body;

  if (!id || Object.keys(data).length === 0) {
    return res.status(400).json({ message: "ID and data are required" });
  }

  const category = categoryServices.update(id, data);
  if (!category) return res.status(404).json({ message: "Categoryk not found" });

  res.json(category);
};

export const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  const removed = categoryServices.remove(id);

  if (!removed) {
    return res.status(404).json({ message: "Category not found" });
  }

  return res.sendStatus(204);
};


export const categoryController = {
    getAll,
    getOne,
    create,
    update,
    remove
}