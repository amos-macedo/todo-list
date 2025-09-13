"use client";
import { createTask, deleteTask, getTasks, Task, updateTask } from "@/api/task";
import { useEffect, useState } from "react";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleAddTask = async () => {
    const newTask = await createTask("Nova tarefa");
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = async (task: Task) => {
    const updated = await updateTask(task.id, !task.completed);
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div>
      <button onClick={handleAddTask}>Adicionar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task)}
            />
            {task.title}
            <button onClick={() => handleDeleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
