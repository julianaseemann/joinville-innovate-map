
import React from 'react';
import { Actor } from '../types/types';
import { getColorByType, getIconByType } from '../data/mockData';

interface InfoPopupProps {
  actor: Actor;
  onClose: () => void;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ actor, onClose }) => {
  const color = getColorByType(actor.type);
  const icon = getIconByType(actor.type);

  // Get actor type in Portuguese
  const getActorTypeInPortuguese = (type: string): string => {
    switch (type) {
      case 'startup': return 'Startup';
      case 'accelerator': return 'Aceleradora';
      case 'university': return 'Universidade';
      case 'investor': return 'Investidor';
      case 'coworking': return 'Coworking';
      case 'corporate': return 'Corporação';
      case 'government': return 'Governo';
      default: return type;
    }
  };

  return (
    <div className="popup-content">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
            style={{ backgroundColor: color }}
          >
            <span className="text-lg">{icon}</span>
          </div>
          <h3 className="text-lg font-semibold">{actor.name}</h3>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      
      <div className="mb-3">
        <span 
          className="inline-block px-2 py-1 rounded-full text-xs" 
          style={{ backgroundColor: color, color: 'white' }}
        >
          {getActorTypeInPortuguese(actor.type)}
        </span>
        {actor.founded && (
          <span className="text-sm text-gray-600 ml-2">Fundada em {actor.founded}</span>
        )}
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{actor.description}</p>
      
      <div className="text-xs text-gray-600 mb-2">
        <strong>Endereço:</strong> {actor.address}
      </div>
      
      {actor.website && (
        <div className="mt-3">
          <a 
            href={actor.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-primary hover:underline"
          >
            Visitar website
          </a>
        </div>
      )}
    </div>
  );
};

export default InfoPopup;
