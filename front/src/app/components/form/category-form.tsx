"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import categoryApi, { Category } from "@/api/category";

type CategoryFormProps = {
  categoryId?: string;
  onCreated?: (category: Category) => void;
  onClose?: () => void;
};

export const CategoryForm = ({
  categoryId,
  onCreated,
  onClose,
}: CategoryFormProps) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      try {
        const data = await categoryApi.getOne(categoryId);
        setCategory(data);
        setName(data.name);
      } catch (err) {
        console.error("Error to fetch category:", err);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryData: Omit<Category, "id"> = {
        name,
        userId: category?.userId || "123",
      };

      let savedCategory: Category;
      if (categoryId) {
        savedCategory = await categoryApi.update(
          categoryId,
          categoryData as Category
        );
      } else {
        savedCategory = await categoryApi.create(categoryData as Category);
      }

      onCreated?.(savedCategory);
      onClose?.();
    } catch (err) {
      console.error("Erro ao salvar category:", err);
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? "Salvando..."
          : categoryId
          ? "Atualizar Tarefa"
          : "Criar Tarefa"}
      </button>
    </form>
  );
};
