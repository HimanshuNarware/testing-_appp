export type CrimeCategory = 'women_safety' | 'harrasment' | 'domestic_violence' | 'theft' | 'naxal_activity' | 'insurgency';

export interface CrimeIncident {
  id: string;
  lat: number;
  lng: number;
  type: CrimeCategory;
  severity: number; // 1-5
  timestamp: string; // ISO format
  city: string;
}

export interface GridCell {
  id: string;
  lat: number;
  lng: number;
  riskScore: number;
  safetyScore: number;
  incidents: CrimeIncident[];
  trend: 'up' | 'down' | 'stable';
  populationDensity: number; // For "per 1000" calculation
}
