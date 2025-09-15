"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  title: React.ReactNode;
  content: React.ReactNode;
  closeOnSelect?: boolean;
}

export const AccordionAnimatedItem = ({
  title,
  content,
  closeOnSelect = false,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = () => {
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-md font-bold w-full flex gap-2 items-center justify-between cursor-pointer"
      >
        <span className="flex items-center gap-2">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1 w-44 origin-top rounded-md shadow-lg bg-[#2A2E37] z-50"
            onClick={handleSelect}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
