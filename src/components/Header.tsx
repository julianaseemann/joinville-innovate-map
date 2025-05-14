
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">Ecossistema de Inovação</h1>
            <h2 className="text-lg text-gray-600">Joinville - SC</h2>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="#sobre" 
            className="text-gray-700 hover:text-primary transition-colors"
          >
            Sobre o Mapa
          </a>
          <a 
            href="#como-funciona" 
            className="text-gray-700 hover:text-primary transition-colors"
          >
            Como Funciona
          </a>
          <a 
            href="#contato" 
            className="text-gray-700 hover:text-primary transition-colors"
          >
            Contato
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
