"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  CheckCircle,
  Clock,
  House,
  Settings,
  Square,
  PlusCircle,
  Pencil,
  Trash,
} from "lucide-react";
import categoryApi, { Category } from "@/api/category";
import { CategoryForm } from "./form/category-form";
import { AccordionAnimatedItem } from "./accordion-item";

const mockFilters = [
  { name: "Todos", value: "All", icon: House },
  { name: "Concluídos", value: "COMPLETED", icon: CheckCircle },
  { name: "Pendentes", value: "PENDING", icon: Clock },
];

type SidebarProps = {
  handleSetFilter?: (filter: string) => void;
  handleSetCategory?: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

export const SideBar = ({
  handleSetFilter,
  handleSetCategory,
  isOpen,
  onClose,
  onCreated,
}: SidebarProps) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<Category[]>([]);
  const [formOpen, setFormOpen] = useState(false);

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

  const handleOpenForm = (categoryId: string = "") => {
    setSelectedCategory(categoryId);
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

  const categoriesContent = [
    ...categories,
    { id: "", name: "Sem categoria" },
  ].map((cat) => (
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
      {cat.id !== "" && (
        <span className="flex opacity-0 items-center gap-3 group-hover:opacity-100 transition">
          <Pencil
            className="cursor-pointer hover:text-blue-400"
            onClick={() => handleOpenForm(cat.id)}
            size={14}
          />
          <Trash
            className="cursor-pointer hover:text-red-400"
            onClick={() => handleDeleteCategory(cat.id)}
            size={14}
          />
        </span>
      )}
    </button>
  ));

  const Filters = (
    <>
      <h1 className="text-md font-bold flex items-center gap-2">
        <Filter size={16} />
        Filtros
      </h1>
      <div className="w-full mt-3 flex flex-col gap-2">
        {mockFilters.map((filter) => (
          <button
            key={filter.name}
            className={`flex items-center w-full py-1.5 px-3 rounded-lg gap-2 transition-colors duration-200 text-[#BDC1CAFF] hover:bg-[#0C0A42FF]/40 ${
              selectedFilter === filter.value && "text-white bg-[#0C0A42FF]"
            }`}
            onClick={() => {
              setSelectedFilter(filter.value);
              handleSetFilter?.(filter.value);
            }}
          >
            <filter.icon size={14} />
            {filter.name}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="hidden md:flex h-full w-56 flex-col justify-between border-r border-[#1E2128FF] p-5  text-sm">
        <div className="flex flex-col gap-4">{Filters}</div>
        <div className="flex flex-col flex-1 mt-4 relative">
          <AccordionAnimatedItem
            openByDefault={true}
            title={
              <div className="flex items-center gap-2">
                <Settings size={16} />
                <span>Categorias</span>
              </div>
            }
            content={categoriesContent}
            handleOpen={() => {
              setSelectedCategory("All");
              handleSetCategory?.("All");
            }}
          />
          <div className="absolute bottom-20 left-0 w-full mt-4">
            <button
              onClick={() => handleOpenForm()}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#262A33] hover:bg-[#4E5668] transition w-full"
            >
              <PlusCircle size={16} />
              <span className="text-sm">Adicionar categoria</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <motion.div
              className="absolute left-0 top-0 h-full w-60 bg-[#1B1D23FF] p-6 flex flex-col justify-between"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div>
                <button
                  onClick={onClose}
                  className="self-end mb-4 text-slate-300 hover:text-white"
                >
                  ✕
                </button>
                {Filters}
                <AccordionAnimatedItem
                  openByDefault={true}
                  title={
                    <div className="flex items-center gap-2">
                      <Settings size={16} />
                      <span>Categorias</span>
                    </div>
                  }
                  content={categoriesContent}
                />
              </div>

              <div className="absolute flex justify-center bottom-6 left-0 w-full">
                <button
                  onClick={() => handleOpenForm()}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#262A33] hover:bg-[#4E5668] transition "
                >
                  <PlusCircle size={16} />
                  <span className="text-sm">Adicionar categoria</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {formOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 z-50">
          <CategoryForm
            categoryId={selectedCategory}
            onCreated={() => {
              fetchCategories();
              setFormOpen(false);
              onCreated?.();
            }}
            onClose={() => setFormOpen(false)}
          />
        </div>
      )}
    </>
  );
};
