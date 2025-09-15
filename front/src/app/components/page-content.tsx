"use client";

import { useEffect, useState } from "react";
import taskApi, { Status, Task } from "@/api/task";
import { TaskItem } from "./task-item";
import { TaskForm } from "./form/task-form";
import { SideBar } from "./side-bar";
import { Header } from "@/app/components/header";
import categoryApi, { Category } from "@/api/category";

export const PageContent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const [taskId, setTaskId] = useState("");

  // Buscar tasks do backend

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (err) {
      console.error("Erro ao buscar tasks:", err);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchTasks();
  }, []);

  const handleToggleTask = async (task: Task) => {
    try {
      const updated = await taskApi.update(task.id, {
        ...task,
        status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
      });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error("Erro ao atualizar task:", err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskApi.remove(id);
      fetchTasks();
      // setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Erro ao deletar task:", err);
    }
  };

  const handleEditTask = (id: string) => {
    setTaskId(id);
    setOpenForm(true);
  };

  const handleOnToggleStatus = async (id: string, newStatus: Status) => {
    const taskToUpdate = tasks.find((t) => t.id === id);
    if (!taskToUpdate) return;

    const updated = await taskApi.update(id, {
      ...taskToUpdate,
      status: newStatus,
    });
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  return (
    <div className="w-full h-dvh mx-auto bg-black text-white ">
      <Header
        handleOpenForm={() => {
          setTaskId("");
          setOpenForm(true);
        }}
      />
      <div className=" h-full flex items-center justify-start ">
        <SideBar />
        <div className="flex h-full  mx-auto md:max-w-[60dvw] flex-col gap-2 w-full">
          {tasks.map((task) => {
            const category =
              categories && categories.find((c) => c.id === task.category);

            console.log(categories);

            console.log(task);

            return (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                category={category?.name || ""}
                status={task.status}
                dueDate={task.dueDate}
                checked={task.status === "COMPLETED"}
                handleOnCheck={() => handleToggleTask(task)}
                handleOnEditTask={() => handleEditTask(task.id)}
                handleOnDeleteTask={() => handleDeleteTask(task.id)}
                handleOnToggleStatus={(id, status) =>
                  handleOnToggleStatus(id, status as Status)
                }
              />
            );
          })}
        </div>
      </div>

      {openForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-50">
          <TaskForm
            taskId={taskId}
            onClose={() => setOpenForm(false)}
            onCreated={fetchTasks}
          />
        </div>
      )}
    </div>
  );
};
