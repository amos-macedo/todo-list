// src/services/tasks.ts
import { api } from "./api";

export type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED";

 export interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: Date;
  status: Status;
  description: string;
  userId: string
}

// Buscar todas as tasks
 const getAll = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/tasks");
  return response.data;
};


const getOne = async (id: string): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
}

// Criar task
 const create = async (task: Task): Promise<Task> => {
  if(!task.title) throw new Error('Title is required');
  const response = await api.post<Task>("/tasks", { ...task });
  return response.data;
};

// Atualizar task
const update = async (id: string, task: Task): Promise<Task> => {
  if (!id || !task.title) throw new Error("Error updating task");

  const { id: _, ...rest } = task;

  const response = await api.put<Task>(`/tasks/${id}`, {
    ...rest,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : new Date().toISOString(),
  });

  return response.data;
};


// Deletar task
 const remove = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

const taskApi = { getAll, getOne, create, update, remove };
export default taskApi;