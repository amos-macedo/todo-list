// src/services/tasks.ts
import { api } from "./api";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description: string;
    userId: string
}

// Buscar todas as tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/tasks");
  return response.data;
};

// Criar task
export const createTask = async (title: string): Promise<Task> => {
  const response = await api.post<Task>("/tasks", { title });
  return response.data;
};

// Atualizar task
export const updateTask = async (id: string, completed: boolean): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, { completed });
  return response.data;
};

// Deletar task
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
