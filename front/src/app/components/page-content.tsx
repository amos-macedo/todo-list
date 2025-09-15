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
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <div className="w-full h-dvh mx-auto bg-black text-white">
      <Header
        handleOpenForm={() => {
          setTaskId("");
          setOpenForm(true);
        }}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />

      <div className="h-full flex items-start">
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 h-full mx-auto md:max-w-[60dvw] flex flex-col gap-2 p-4">
          {tasks.map((task) => {
            const category =
              categories && categories.find((c) => c.id === task.category);

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
                handleOnCheck={() => {}}
                handleOnEditTask={() => {}}
                handleOnDeleteTask={() => {}}
                handleOnToggleStatus={() => {}}
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
