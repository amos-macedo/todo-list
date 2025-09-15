"use client";

import { Menu, PlusCircle } from "lucide-react";

type HeaderProps = {
  handleOpenForm: () => void;
  onToggleSidebar: () => void; // novo
};

export const Header = ({ handleOpenForm, onToggleSidebar }: HeaderProps) => {
  return (
    <header className="w-full flex items-center justify-between gap-3 p-3 pb-6 border-b border-[#1E2128FF]">
      {/* Botão menu só aparece no mobile */}
      <button
        className="md:hidden flex items-center p-2 rounded-md hover:bg-[#262A33FF]"
        onClick={onToggleSidebar}
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-3 ml-auto">
        <button
          onClick={handleOpenForm}
          className="flex items-center gap-3 px-2 py-2 rounded-md bg-[#262A33FF] hover:bg-[#4E5668FF]"
        >
          <PlusCircle size={16} />
          <span className="hidden sm:inline">Adicionar tarefa</span>
        </button>

        <div className="text-slate-700 p-2 rounded-full bg-slate-300 w-8 h-8 flex items-center justify-center font-bold">
          AM
        </div>
      </div>
    </header>
  );
};
