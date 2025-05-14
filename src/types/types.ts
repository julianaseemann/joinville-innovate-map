
export type ActorType = 
  | 'startup'
  | 'accelerator'
  | 'university'
  | 'investor'
  | 'coworking'
  | 'corporate'
  | 'government';

export interface Actor {
  id: string;
  name: string;
  type: ActorType;
  description: string;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
  website?: string;
  logoUrl?: string;
  founded?: string;
  employees?: number;
}

export interface FilterOption {
  id: ActorType;
  label: string;
  color: string;
  isActive: boolean;
}
