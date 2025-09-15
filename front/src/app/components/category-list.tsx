"use client";

import React, { useEffect, useState } from "react";
import { Pencil, PlusCircle, Settings, Square, Trash } from "lucide-react";
import { AccordionAnimatedItem } from "./accordion-item";
import categoryApi, { Category } from "@/api/category";
import { CategoryForm } from "./form/category-form";

type CategoryListProps = {
  handleSetCategory?: (cat: string) => void;
};

export const CategoryList = ({ handleSetCategory }: CategoryListProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

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

  const handleOpenForm = () => setFormOpen(true);
  const handleEditCategory = (id: string) => {
    setSelectedCategory(id);
    setFormOpen(true);
  };
  const handleDeleteCategory = async (id: string) => {
    try {
      await categoryApi.remove(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const categoriesContent = categories.map((cat) => (
    <button
      key={cat.id}
      className={`group flex items-center justify-between py-2 w-full px-3 rounded-md gap-2 transition-colors duration-200 text-sm ${
        selectedCategory === cat.id
          ? "text-white bg-[#0C0A42]"
          : "text-[#BDC1CA] hover:bg-[#0C0A42]/40"
      }`}
      onClick={() => {
        setSelectedCategory(cat.id);
        handleSetCategory?.(cat.id);
      }}
    >
      <div className="flex items-center gap-2">
        <Square size={10} />
        {cat.name}
      </div>
      <span className="flex opacity-0 items-center gap-3 group-hover:opacity-100 transition">
        <Pencil
          className="cursor-pointer hover:text-blue-400"
          onClick={() => handleEditCategory(cat.id)}
          size={14}
        />
        <Trash
          className="cursor-pointer hover:text-red-400"
          onClick={() => handleDeleteCategory(cat.id)}
          size={14}
        />
      </span>
    </button>
  ));

  return (
    <div className="flex flex-col justify-between flex-1 h-full relative bg-red-600">
      <AccordionAnimatedItem
        title={
          <div className="flex items-center gap-2">
            <Settings size={16} />
            <span>Categorias</span>
          </div>
        }
        content={categoriesContent}
      />

      {/* Botão fixo embaixo, desktop e mobile */}
      <div className="absolute bottom-0 left-0 w-full mt-4">
        <button
          onClick={handleOpenForm}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#262A33] hover:bg-[#4E5668] transition w-full"
        >
          <PlusCircle size={16} />
          <span className="text-sm">Adicionar categoria</span>
        </button>
      </div>

      {formOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-50">
          <CategoryForm
            categoryId={selectedCategory}
            onCreated={() => {
              fetchCategories();
              setFormOpen(false);
            }}
            onClose={() => setFormOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
