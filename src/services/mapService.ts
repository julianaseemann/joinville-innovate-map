
import { Actor, ActorType } from '../types/types';

// This service would typically connect to a backend API to fetch data
// For now, we'll use mock data and simulate API calls

export const fetchAllActors = async (): Promise<Actor[]> => {
  // Simulate API call delay
  return new Promise(resolve => {
    setTimeout(() => {
      // Import mock data dynamically to avoid circular dependencies
      import('../data/mockData').then(({ actorsData }) => {
        resolve(actorsData);
      });
    }, 500); // 500ms delay to simulate network request
  });
};

export const fetchActorsByType = async (types: ActorType[]): Promise<Actor[]> => {
  // Simulate API call delay
  return new Promise(resolve => {
    setTimeout(() => {
      // Import mock data dynamically
      import('../data/mockData').then(({ actorsData }) => {
        const filteredActors = actorsData.filter(actor => types.includes(actor.type));
        resolve(filteredActors);
      });
    }, 300); // 300ms delay to simulate network request
  });
};

export const fetchActorById = async (id: string): Promise<Actor | undefined> => {
  // Simulate API call delay
  return new Promise(resolve => {
    setTimeout(() => {
      // Import mock data dynamically
      import('../data/mockData').then(({ actorsData }) => {
        const actor = actorsData.find(a => a.id === id);
        resolve(actor);
      });
    }, 200); // 200ms delay to simulate network request
  });
};

// This function would be used when connecting to a real backend
export const createMapboxUrlWithCredentials = (style: string): string => {
  // In a real app, this would use an API key from environment variables or user input
  return `mapbox://styles/mapbox/${style}`;
};

// This would be replaced with a real API endpoint in production
export const API_ENDPOINT = 'https://api.example.com/innovation-ecosystem';
