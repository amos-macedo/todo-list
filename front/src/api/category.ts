import { api } from "./api";

export type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED";

 export interface Category {
  id: string;
  name: string;
  userId: string;
}

 const getAll = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};


const getOne = async (id: string): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${id}`);
  return response.data;
}

 const create = async (category: Category): Promise<Category> => {
  if(!category.name) throw new Error('name is required');
  const response = await api.post<Category>("/categories", { ...category });
  return response.data;
};


const update = async (id: string, category: Category): Promise<Category> => {
  if (!id || !category.name) throw new Error("Error updating category");

  const { id: _, ...rest } = category;

  const response = await api.put<Category>(`/categories/${id}`, {
    ...rest,
  });

  return response.data;
};


 const remove = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

const categoryApi = { getAll, getOne, create, update, remove };
export default categoryApi;