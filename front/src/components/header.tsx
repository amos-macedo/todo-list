import { PlusCircle } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-end gap-3 p-3  pb-10">
      <button className="flex items-center gap-3 px-2 py-2 rounded-md   bg-[#262A33FF] hover:bg-[#4E5668FF]">
        <PlusCircle size={16} />
        Adicionar tarefa
      </button>
      <div className=" text-slate-700 p-2 rounded-full bg-slate-300">
        {/* <Image src="/logo.svg" alt="logo" /> */}
        <p>AM</p>
      </div>
    </header>
  );
};
