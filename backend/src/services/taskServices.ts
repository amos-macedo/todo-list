import { v4 as uuidv4 } from "uuid";



import type task = require("../models/task");


let tasks: task.Task[] = [];   

export function getAll():task.Task[] {
    return tasks;
};

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

export function update(id: string, data: task.Task) {
    const task = tasks.findIndex((task) => task.id === id)
    if(!task) return null;

    tasks[task] = {
        ...tasks[task],
        ...data
    };
    return tasks[task];
};

export function remove (id: string) {
    const task = tasks.findIndex((task) => task.id === id)
    if(!task) return null;

    tasks.splice(task, 1);
    return tasks;
}   