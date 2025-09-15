"use client";

import { useEffect, useState } from "react";
import taskApi, { Status, Task, TaskFilters } from "@/api/task";
import { TaskItem } from "./task-item";
import { TaskForm } from "./form/task-form";
import { SideBar } from "./side-bar";
import categoryApi, { Category } from "@/api/category";
import { Menu, PlusCircle } from "lucide-react";

export const PageContent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
  });

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskApi.getAll(filters);
      setTasks(data);
    } catch (err) {
      console.error("Erro ao buscar tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

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
    <div className="w-full h-dvh mx-auto bg-black text-white p-0">
      <button
        className="md:hidden flex items-center p-2 rounded-md hover:bg-[#262A33FF]"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={20} />
      </button>

      <div className="h-full flex items-start ">
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          handleSetFilter={(status) =>
            setFilters((prev) => ({ ...prev, status }))
          }
          handleSetCategory={(category) =>
            setFilters((prev) => ({ ...prev, category }))
          }
          onCreated={() => {
            fetchTasks();
            fetchCategories();
          }}
        />

        <div className="flex-1 h-full mx-auto md:max-w-[60dvw] flex flex-col  gap-5 p-4 pt-10">
          <h2 className="text-2xl font-bold text-white">Tarefas</h2>

          <div className="flex w-full items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Buscar tarefa"
              className="w-[60%] flex-1 p-2 rounded-md bg-[#262A33FF] text-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center  gap-3 px-2 py-2 rounded-md bg-[#262A33FF] hover:bg-[#4E5668FF]"
            >
              <PlusCircle size={16} />
              <span className="hidden sm:inline">Adicionar tarefa</span>
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center  mb-10 md:mb-0 h-full  text-center gap-4 text-gray-400">
              <h2 className="text-2xl font-bold text-white">
                Nenhuma tarefa por aqui!
              </h2>
              <p className="text-sm max-w-xs">
                Você ainda não adicionou nenhuma task. Clique no botão{" "}
                <span className="font-semibold text-blue-400">
                  Adicionar Task
                </span>{" "}
                para começar a organizar suas tarefas.
              </p>
              <button
                onClick={() => setOpenForm(true)}
                className="mt-2 px-4 cursor-pointer py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold"
              >
                Adicionar Task
              </button>
            </div>
          ) : (
            <div className="mt-10 flex flex-col gap-2">
              {tasks.map((task) => {
                const category = categories.find((c) => c.id === task.category);

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
                      handleOnToggleStatus(id, status)
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {openForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 z-50">
          <TaskForm
            taskId={taskId}
            onClose={() => setOpenForm(false)}
            onCreated={() => {
              fetchCategories();
              fetchTasks();
            }}
          />
        </div>
      )}
    </div>
  );
};
