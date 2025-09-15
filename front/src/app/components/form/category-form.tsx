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
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      try {
        const data = await categoryApi.getOne(categoryId);
        setCategory(data);
        setName(data.name);
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const validate = () => {
    if (!name.trim()) {
      setError("O nome da categoria é obrigatório.");
      return false;
    }
    if (name.trim().length < 2) {
      setError("O nome da categoria precisa ter pelo menos 2 caracteres.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const categoryData: Omit<Category, "id"> = {
        name: name.trim(),
        userId: category?.userId || "123",
      };

      const savedCategory = categoryId
        ? await categoryApi.update(categoryId, categoryData as Category)
        : await categoryApi.create(categoryData as Category);

      onCreated?.(savedCategory);
      onClose?.();
    } catch (err) {
      console.error("Erro ao salvar categoria:", err);
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

      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Nome da Categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border rounded px-3 py-2 ${
            error ? "border-red-500" : ""
          }`}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? "Salvando..."
          : categoryId
          ? "Atualizar Categoria"
          : "Criar Categoria"}
      </button>
    </form>
  );
};
