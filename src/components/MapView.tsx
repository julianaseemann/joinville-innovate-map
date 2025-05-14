
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Actor, ActorType, FilterOption } from '../types/types';
import { fetchAllActors } from '../services/mapService';
import { createRoot } from 'react-dom/client';
import ActorMarker from './ActorMarker';
import InfoPopup from './InfoPopup';

interface MapViewProps {
  activeFilters: FilterOption[];
}

const MapView: React.FC<MapViewProps> = ({ activeFilters }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  
  const [actors, setActors] = useState<Actor[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map on component mount
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      // NOTE: In a production app, you would get this from environment variables or user input
      mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbGdlNmppY3QwMXB2M2VvYTVqaDJlOTFvIn0.Yu2Xi3HRD_Ty7bHL9b7REw';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-48.8457, -26.3037], // Center of Joinville
        zoom: 12,
        pitch: 40, // Tilted view
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      map.current.on('load', () => {
        setMapLoaded(true);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

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

  // Filter and update markers when filters or actors change
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
    
    // Get active filter types
    const activeTypes = activeFilters
      .filter(filter => filter.isActive)
      .map(filter => filter.id);
    
    // Filter actors
    const filteredActors = actors.filter(actor => 
      activeTypes.includes(actor.type as ActorType)
    );
    
    // Add markers for filtered actors
    filteredActors.forEach(actor => {
      const markerElement = document.createElement('div');
      const root = createRoot(markerElement);
      
      root.render(
        <ActorMarker 
          actor={actor} 
          onClick={(clickedActor) => handleMarkerClick(clickedActor)}
        />
      );
      
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(actor.coordinates)
        .addTo(map.current!);
      
      markersRef.current[actor.id] = marker;
    });
  }, [mapLoaded, activeFilters, actors]);

  // Handle marker click
  const handleMarkerClick = (actor: Actor) => {
    if (!map.current) return;
    
    // Close existing popup if open
    if (popupRef.current) {
      popupRef.current.remove();
    }
    
    // Create popup element
    const popupElement = document.createElement('div');
    const root = createRoot(popupElement);
    
    root.render(
      <InfoPopup 
        actor={actor} 
        onClose={() => {
          if (popupRef.current) {
            popupRef.current.remove();
            popupRef.current = null;
          }
        }}
      />
    );
    
    // Create and show popup
    popupRef.current = new mapboxgl.Popup({
      closeButton: false,
      maxWidth: '320px',
      offset: 25
    })
      .setLngLat(actor.coordinates)
      .setDOMContent(popupElement)
      .addTo(map.current);
    
    // Fly to the clicked marker
    map.current.flyTo({
      center: actor.coordinates,
      zoom: 14,
      speed: 1.2,
      essential: true
    });
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg relative">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapView;
