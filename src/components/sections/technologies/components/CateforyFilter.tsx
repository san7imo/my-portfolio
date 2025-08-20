import React from "react";
import { categoryLabels, type CategoryType } from "../../../../data/techData";

interface Props {
  selected: CategoryType;
  categories: CategoryType[];
  onSelect: (category: CategoryType) => void;
}

export const CategoryFilter: React.FC<Props> = ({ selected, categories, onSelect }) => {
  return (
    // Se eliminó bg-black/40 backdrop-blur-xl y shadow-2xl para total transparencia
    <div className="flex flex-wrap justify-center gap-3 p-6 rounded-2xl">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{ 
            fontFamily: 'monospace',
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '1.8',
            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)',
            imageRendering: 'pixelated'
          }}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
            selected === cat
              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
              : "text-white hover:bg-purple-500/20 hover:text-purple-100 bg-black/30 border border-white/20 hover:border-purple-400"
          }`}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
};