
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Actor, ActorType, FilterOption } from '../types/types';
import { fetchAllActors } from '../services/mapService';
import { createRoot } from 'react-dom/client';
import ActorMarker from './ActorMarker';
import InfoPopup from './InfoPopup';
import L from 'leaflet';

// Fix Leaflet icon issue
// This is needed because Leaflet's default icons reference files that we don't have
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MarkerData {
  marker: L.Marker;
  root: ReturnType<typeof createRoot>;
}

interface MapActionsProps {
  actors: Actor[];
  activeFilters: FilterOption[];
  onMarkerClick: (actor: Actor) => void;
}

// Component to handle map actions
const MapActions: React.FC<MapActionsProps> = ({ actors, activeFilters, onMarkerClick }) => {
  const map = useMap();
  const markersRef = useRef<Record<string, MarkerData>>({});
  
  // Clean up function for markers
  const cleanupMarkers = () => {
    Object.values(markersRef.current).forEach(markerData => {
      markerData.marker.remove();
      if (markerData.root) {
        markerData.root.unmount();
      }
    });
    markersRef.current = {};
  };
  
  useEffect(() => {
    // Get active filter types
    const activeTypes = activeFilters
      .filter(filter => filter.isActive)
      .map(filter => filter.id);
    
    // Filter actors
    const filteredActors = actors.filter(actor => 
      activeTypes.includes(actor.type as ActorType)
    );
    
    // Clean up old markers
    cleanupMarkers();
    
    // Add new markers
    filteredActors.forEach(actor => {
      const customIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: '',
        iconSize: [30, 30],
      });
      
      // Create marker
      const markerElement = document.createElement('div');
      const marker = L.marker([actor.coordinates[1], actor.coordinates[0]], {
        icon: customIcon
      }).addTo(map);
      
      // Add custom React component to marker
      const root = createRoot(markerElement);
      root.render(
        <ActorMarker 
          actor={actor} 
          onClick={() => onMarkerClick(actor)}
        />
      );
      
      // Attach the marker element to the Leaflet marker
      marker.getElement().appendChild(markerElement);
      
      // Store for cleanup
      markersRef.current[actor.id] = { marker, root };
    });
    
    // Center map if we have actors
    if (filteredActors.length > 0) {
      const bounds = L.latLngBounds(filteredActors.map(actor => [actor.coordinates[1], actor.coordinates[0]]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
    
    return () => {
      cleanupMarkers();
    };
  }, [map, actors, activeFilters, onMarkerClick]);
  
  return null;
};

interface MapViewProps {
  activeFilters: FilterOption[];
}

const MapView: React.FC<MapViewProps> = ({ activeFilters }) => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  
  // Center of Joinville
  const initialPosition: [number, number] = [-26.3037, -48.8457]; // [latitude, longitude]
  
  // Fetch actors data
  useEffect(() => {
    const getActors = async () => {
      try {
        const data = await fetchAllActors();
        setActors(data);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    getActors();
  }, []);
  
  const handleMarkerClick = (actor: Actor) => {
    setSelectedActor(actor);
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg relative">
      <MapContainer 
        center={initialPosition} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }} 
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapActions 
          actors={actors} 
          activeFilters={activeFilters} 
          onMarkerClick={handleMarkerClick}
        />
        {selectedActor && (
          <Popup
            position={[selectedActor.coordinates[1], selectedActor.coordinates[0]]}
            onClose={() => setSelectedActor(null)}
            closeButton={false}
            className="custom-popup"
          >
            <InfoPopup 
              actor={selectedActor} 
              onClose={() => setSelectedActor(null)} 
            />
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
