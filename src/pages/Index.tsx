
import React, { useState } from 'react';
import Header from '../components/Header';
import MapView from '../components/MapView';
import FilterPanel from '../components/FilterPanel';
import { FilterOption } from '../types/types';
import { filterOptions } from '../data/mockData';

const Index: React.FC = () => {
  const [filters, setFilters] = useState<FilterOption[]>(filterOptions);

  const handleFilterChange = (filterId: string) => {
    setFilters(prevFilters => 
      prevFilters.map(filter => 
        filter.id === filterId 
          ? { ...filter, isActive: !filter.isActive } 
          : filter
      )
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4">
        <div className="md:w-1/4 flex flex-col gap-4">
          <FilterPanel 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3">Sobre o Projeto</h3>
            <p className="text-sm text-gray-700">
              Este mapa interativo exibe os atores do ecossistema de inovação de Joinville,
              permitindo visualizar a distribuição geográfica de startups, aceleradoras, 
              universidades e outros componentes importantes do ecossistema local.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Use os filtros para explorar diferentes tipos de organizações e clique nos marcadores para obter mais informações.
            </p>
          </div>
        </div>
        
        <div className="md:w-3/4 h-[500px] md:h-auto">
          <MapView activeFilters={filters} />
        </div>
      </main>
      
      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Ecossistema de Inovação de Joinville</p>
      </footer>
    </div>
  );
};

export default Index;
