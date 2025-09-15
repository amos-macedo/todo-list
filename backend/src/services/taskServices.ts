import { v4 as uuidv4 } from "uuid";



import type task = require("../models/task");


let tasks: task.Task[] = [];   

interface TaskFilters {
  category?: string;
  status?: string;
  search?: string;
}
export function getAll(filter?: TaskFilters): task.Task[] {
  let filteredTasks = [...tasks];

  if (filter?.search !== undefined) {
    filteredTasks = filteredTasks.filter((task) => task.title.toLowerCase().includes((filter.search as string).toLowerCase()));
  }
  
  if(filter?.category === ""){
    filteredTasks = filteredTasks.filter((task) => task.category === "");
  } else{
    if(filter?.category && filter.category !== "All"){
      filteredTasks = filteredTasks.filter((task) => task.category === filter.category);
    }
  }

  if (filter?.status && filter.status !== "All") {
    filteredTasks = filteredTasks.filter((task) => task.status === filter.status);
  }

  return filteredTasks;
}


export function getOne(id: string): task.Task {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        throw new Error("Task not found");
    }
    return task;
}

export function create(data: task.Task) {

    const id: string = uuidv4() ?? "";
    const allData = { ...data, id };
    const task: task.Task = {
        ...allData
    };

    tasks.push(task);
    return task;
    
};

export function update(id: string, data: Partial<task.Task>) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...data,
  };

  return tasks[index];
}

export function remove (id: string) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;

  const deleted = tasks[index];
  tasks.splice(index, 1);
  return deleted;
}   