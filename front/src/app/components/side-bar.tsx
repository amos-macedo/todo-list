"use client";

import { useState } from "react";
import {
  Filter,
  Settings,
  CheckCircle,
  Clock,
  Square,
  House,
  PlusCircle,
} from "lucide-react";
import { AccordionAnimatedItem } from "./accordion-item";
import { CategoryList } from "./category-list";
import { CategoryForm } from "./form/category-form";
import categoryApi, { Category } from "@/api/category";

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
  return (
    <div className="h-full border-r border-[#1E2128FF] text-sm p-6 flex flex-col items-start justify-start">
      <div className="gap-4 flex flex-col items-start">
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

        <CategoryList handleSetCategory={() => handleSetCategory?.("")} />
      </div>
    </div>
  );
};
