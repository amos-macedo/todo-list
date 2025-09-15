// src/services/tasks.ts
import { api } from "./api";

export type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED";

 export interface Category {
  id: string;
  name: string;
  userId: string;
}

// Buscar todas as tasks
 const getAll = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};


const getOne = async (id: string): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${id}`);
  return response.data;
}

// Criar task
 const create = async (task: Category): Promise<Category> => {
  if(!task.name) throw new Error('name is required');
  const response = await api.post<Category>("/categories", { ...task });
  return response.data;
};

// Atualizar task
const update = async (id: string, task: Category): Promise<Category> => {
  if (!id || !task.name) throw new Error("Error updating category");

  const { id: _, ...rest } = task;

  const response = await api.put<Category>(`/categories/${id}`, {
    ...rest,
  });

  return response.data;
};


// Deletar task
 const remove = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

const categoryApi = { getAll, getOne, create, update, remove };
export default categoryApi;