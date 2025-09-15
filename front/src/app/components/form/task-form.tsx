"use client";

import { useEffect, useState } from "react";
import taskApi, { Task } from "@/api/task";
import { X } from "lucide-react";

type TaskFormProps = {
  taskId?: string; // opcional para criação
  onCreated?: (task: Task) => void;
  onClose?: () => void;
};

export const TaskForm = ({ taskId, onCreated, onClose }: TaskFormProps) => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Trabalho");
  const [loading, setLoading] = useState(false);

  // Busca a task do backend caso esteja editando
  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        const data = await taskApi.getOne(taskId);
        setTask(data);
        setTitle(data.title);
        setDescription(data.description || "");
        setCategory(data.category || "Trabalho");
      } catch (err) {
        console.error("Erro ao buscar task:", err);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData: Omit<Task, "id"> = {
        title,
        description,
        category,
        dueDate: task?.dueDate ? new Date(task.dueDate) : new Date(),
        status: task?.status || "PENDING",
        // completed: task?.completed ?? false,
        userId: task?.userId || "123",
      };

      let savedTask: Task;
      if (taskId) {
        // update: id na URL, não no body
        savedTask = await taskApi.update(taskId, taskData as Task);
      } else {
        savedTask = await taskApi.create(taskData as Task);
      }

      onCreated?.(savedTask);
      onClose?.();
    } catch (err) {
      console.error("Erro ao salvar task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 relative max-w-md w-full p-6 rounded-md border border-[#1E2128FF]"
    >
      <X
        color="white"
        size={16}
        className="absolute top-2 right-2 cursor-pointer"
        onClick={onClose}
      />

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />

      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="Trabalho">Trabalho</option>
        <option value="Pessoal">Pessoal</option>
        <option value="Estudos">Estudos</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Salvando..." : taskId ? "Atualizar Tarefa" : "Criar Tarefa"}
      </button>
    </form>
  );
};
