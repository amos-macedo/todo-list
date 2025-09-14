"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Settings,
  CheckCircle,
  Clock,
  Square,
  House,
} from "lucide-react";
import { AccordionAnimatedItem } from "./accordion-item";

const mock = {
  filters: [
    { name: "Todos", icon: House },
    { name: "Concluídos", icon: CheckCircle },
    { name: "Pendentes", icon: Clock },
  ],
  categories: ["Todos", "Trabalho", "Pessoal", "Estudos", "Lazer"],
};

type SideBarProps = {
  handleSetFilter?: (filter: string) => void;
  handleSetCategory?: (category: string) => void;
};

export const SideBar = ({
  handleSetFilter,
  handleSetCategory,
}: SideBarProps) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoriesContent = mock.categories.map((cat) => (
    <button
      className={`flex items-center py-1.5 w-full px-3 rounded-md gap-2 transition-colors duration-200 text-[#BDC1CAFF] hover:bg-[#0C0A42FF]/40 ${
        selectedCategory === cat && "text-white bg-[#0C0A42FF]"
      }`}
      key={cat}
      onClick={() => {
        setSelectedCategory(cat);
        handleSetCategory?.(cat);
      }}
    >
      <Square size={10} />
      {cat}
    </button>
  ));
  return (
    <div className="h-full border-r border-[#1E2128FF] text-sm p-6 gap-4 flex flex-col items-start">
      <h1 className="text-md font-bold flex items-center gap-2">
        <Filter size={16} />
        Filtros
      </h1>
      <div className="w-44">
        {mock.filters.map((filter) => (
          <button
            className={`flex items-center w-full py-1.5 px-3 rounded-lg gap-2 transition-colors duration-200 text-[#BDC1CAFF] hover:bg-[#0C0A42FF]/40 ${
              selectedFilter === filter.name && "text-white bg-[#0C0A42FF]"
            }`}
            key={filter.name}
            onClick={() => {
              setSelectedFilter(filter.name);
              handleSetFilter?.(filter.name);
            }}
          >
            <filter.icon size={14} />
            {filter.name}
          </button>
        ))}
      </div>

      <AccordionAnimatedItem
        title={{ name: "Categorias", icon: <Settings size={16} /> }}
        content={categoriesContent}
      />
    </div>
  );
};
