
import React, { useState } from 'react';
import { Actor } from '../types/types';
import { getColorByType, getIconByType } from '../data/mockData';

interface ActorMarkerProps {
  actor: Actor;
  onClick: (actor: Actor) => void;
}

const ActorMarker: React.FC<ActorMarkerProps> = ({ actor, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const color = getColorByType(actor.type);
  const icon = getIconByType(actor.type);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(actor);
  };
  
  return (
    <div 
      className={`map-marker ${isHovered ? 'animate-pulse-marker' : ''}`}
      style={{ 
        backgroundColor: color,
        width: isHovered ? '40px' : '30px',
        height: isHovered ? '40px' : '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ fontSize: isHovered ? '18px' : '16px' }}>
        {icon}
      </span>
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white px-2 py-1 rounded-md shadow-md whitespace-nowrap z-20">
          <span className="text-xs font-medium">{actor.name}</span>
        </div>
      )}
    </div>
  );
};

export default ActorMarker;
