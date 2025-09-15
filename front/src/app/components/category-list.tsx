"use client";

import React, { useEffect, useState } from "react";
import { Pencil, PlusCircle, Settings, Square, Trash } from "lucide-react";
import { AccordionAnimatedItem } from "./accordion-item";
import categoryApi, { Category } from "@/api/category";
import { div } from "framer-motion/client";
import { CategoryForm } from "./form/category-form";

type CategoryListProps = {
  handleSetCategory: (cat: string) => void;
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

  const handleOpenForm = () => {
    setFormOpen(true);
  };

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
      className={`group flex items-center justify-between py-1.5 w-full px-3 rounded-md gap-2 transition-colors duration-200 text-[#BDC1CAFF] hover:bg-[#0C0A42FF]/40 ${
        selectedCategory === cat.id && "text-white bg-[#0C0A42FF]"
      }`}
      key={cat.id}
      onClick={() => {
        setSelectedCategory(cat.id);
        handleSetCategory?.(cat.id);
      }}
    >
      <div className="flex items-center gap-2">
        <Square size={10} />
        {cat.name}
      </div>
      <span className="flex invisible items-center gap-3 group-hover:visible">
        <Pencil
          className="cursor-pointer"
          onClick={() => handleEditCategory(cat.id)}
          size={14}
        />
        <Trash
          className="cursor-pointer"
          onClick={() => handleDeleteCategory(cat.id)}
          size={14}
        />
      </span>
    </button>
  ));

  return (
    <div>
      <div className="h-full border-r border-[#1E2128FF] text-sm flex flex-col items-between">
        <div className="gap-4 flex flex-col items-start">
          <AccordionAnimatedItem
            title={
              <div className="flex items-center gap-2">
                <Settings size={16} />
                <div>Categorias</div>
              </div>
            }
            content={categoriesContent}
          />
        </div>
      </div>

      <button
        onClick={handleOpenForm}
        className="flex absolute bottom-10 items-center gap-3 px-2 py-2 rounded-md   bg-[#262A33FF] hover:bg-[#4E5668FF]"
      >
        <PlusCircle size={16} />
        Adicionar categoria
      </button>

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
