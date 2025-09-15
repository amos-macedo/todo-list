import { v4 as uuidv4 } from "uuid";
import { Category } from "../models/category";


let categories: Category[] = [];   

export function getAll():Category[] {
    return categories;
};

export function getOne(id: string):Category {
    const category = categories.find((cat) => cat.id === id);
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
}

export function create(data:Category) {

    const id: string = uuidv4() ?? "";
    const allData = { ...data, id };
    const category: Category= {
        ...allData
    };

    categories.push(category);
    return category;
    
};

export function update(id: string, data: Partial<Category>) {
  const index = categories.findIndex((t) => t.id === id);
  if (index === -1) return null;

  categories[index] = {
    ...categories[index],
    ...data,
  };

  return categories[index];
}

export function remove(id: string) {
  const index = categories.findIndex((cat) => cat.id === id);
  if (index === -1) return null;

  const deleted = categories[index];
  categories.splice(index, 1);
  return deleted;
}
