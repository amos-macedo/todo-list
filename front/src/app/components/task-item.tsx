import { Calendar, Pencil, Trash } from "lucide-react";
import { AccordionAnimatedItem } from "./accordion-item";

type TaskItemProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  dueDate: Date;
  checked: boolean;
  handleOnCheck: (id: string) => void;
  handleOnEditTask: (id: string) => void;
  handleOnDeleteTask: (id: string) => void;
  handleOnToggleStatus: (id: string, newStatus: string) => void;
};

const status_map: Record<string, { color: string; name: string }> = {
  PENDING: { color: "bg-yellow-500", name: "Pendente" },
  COMPLETED: { color: "bg-green-500", name: "Concluída" },
  IN_PROGRESS: { color: "bg-blue-500", name: "Em andamento" },
};

export const TaskItem = ({
  id,
  title,
  description,
  category,
  status,
  dueDate,
  checked,
  handleOnCheck,
  handleOnEditTask,
  handleOnDeleteTask,
  handleOnToggleStatus,
}: TaskItemProps) => {
  return (
    <div className="flex items-center w-full text-sm justify-between gap-2 px-2 py-3 rounded-md bg-[#1E2128FF]">
      {/* Checkbox + textos */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={checked}
          onChange={() => handleOnCheck(id)}
        />
        <span className="flex flex-col">
          <p className="font-semibold text-lg">{title}</p>
          <p className="text-[#BDC1CAFF]">{description || "Sem descrição"}</p>
        </span>
      </div>

      {/* Categoria + Status + Data */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <p className="p-1 rounded-md bg-[#323842FF]">{category}</p>

          {/* 🔽 Dropdown customizado pro status */}
          <AccordionAnimatedItem
            closeOnSelect
            title={
              <p
                className={`py-1 px-2 rounded-md ${status_map[status]?.color}`}
              >
                {status_map[status]?.name}
              </p>
            }
            content={
              <div className="flex flex-col rounded-md bg-[#2A2E37]">
                {Object.entries(status_map).map(([key, { color, name }]) => (
                  <button
                    key={key}
                    onClick={() => handleOnToggleStatus(id, key)}
                    className={`w-full text-left px-3 py-2 rounded-md ${color} text-white`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            }
          />

          <span className="flex items-center gap-2">
            <Calendar size={16} />
            <p>{dueDate && new Date(dueDate).toLocaleDateString("pt-BR")}</p>
          </span>
        </div>

        {/* Botões de editar/excluir */}
        <button className="cursor-pointer" onClick={() => handleOnEditTask(id)}>
          <Pencil size={16} />
        </button>
        <button
          className="text-red-400 hover:text-red-500 cursor-pointer"
          onClick={() => handleOnDeleteTask(id)}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};
