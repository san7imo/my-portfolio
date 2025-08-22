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
    <div className="flex flex-wrap justify-center gap-2 px-2 py-4 sm:p-6 rounded-2xl max-w-full overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{ 
            fontFamily: 'monospace',
            fontWeight: 'bold',
            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)',
            imageRendering: 'pixelated',
            whiteSpace: 'nowrap'
          }}
          className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
            selected === cat
              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
              : "text-white hover:bg-purple-500/20 hover:text-purple-100 bg-black/30 border border-white/20 hover:border-purple-400"
          }`}
          aria-label={`Filtrar por categoría: ${categoryLabels[cat]}`}
        >
          <span className="block transform scale-90 sm:scale-100">
            {categoryLabels[cat]}
          </span>
        </button>
      ))}
    </div>
  );
};