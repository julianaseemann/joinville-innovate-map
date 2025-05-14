
import React from 'react';
import { FilterOption } from '../types/types';

interface FilterPanelProps {
  filters: FilterOption[];
  onFilterChange: (filterId: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">Filtrar por tipo</h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              filter.isActive
                ? 'bg-opacity-100'
                : 'bg-opacity-30 text-gray-600'
            }`}
            style={{
              backgroundColor: filter.isActive ? filter.color : '#f3f4f6',
              color: filter.isActive ? 'white' : 'black',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
