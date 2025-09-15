"use client";

import { useEffect, useState } from "react";
import taskApi, { Task } from "@/api/task";
import { X } from "lucide-react";
import categoryApi, { Category } from "@/api/category";

type TaskFormProps = {
  taskId?: string; // opcional para edição
  onCreated?: (task: Task) => void;
  onClose?: () => void;
};

export const TaskForm = ({ taskId, onCreated, onClose }: TaskFormProps) => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    category?: string;
  }>({});

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

  // Buscar task para edição
  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        const data = await taskApi.getOne(taskId);
        setTask(data);
        setTitle(data.title);
        setDescription(data.description || "");
        setCategory(data.category || "");
      } catch (err) {
        console.error("Erro ao buscar task:", err);
      }
    };

    fetchTask();
  }, [taskId]);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = "Título é obrigatório.";
    else if (title.trim().length < 3)
      newErrors.title = "Título precisa ter pelo menos 3 caracteres.";

    if (description.length > 200)
      newErrors.description = "Descrição não pode passar de 200 caracteres.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const taskData: Omit<Task, "id"> = {
        title: title.trim(),
        description: description.trim(),
        category,
        dueDate: task?.dueDate ? new Date(task.dueDate) : new Date(),
        status: task?.status || "PENDING",
        userId: task?.userId || "123",
      };

      const savedTask = taskId
        ? await taskApi.update(taskId, taskData as Task)
        : await taskApi.create(taskData as Task);

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
      className="flex flex-col bg-black gap-3 relative max-w-md w-full p-6 rounded-md border border-[#1E2128FF]"
    >
      <X
        color="white"
        size={16}
        className="absolute top-2 right-2 cursor-pointer"
        onClick={onClose}
      />

      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border rounded px-3 py-2 ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`border rounded px-3 py-2 ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description}</span>
        )}
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border bg-black rounded px-3 py-2"
      >
        <option value="">Sem categoria</option>
        {categories.map((category) => (
          <option
            className="capitalize text-slate-300"
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
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
