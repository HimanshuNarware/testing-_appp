export interface SafetyData {
  id: number;
  city: string;
  state: string;
  coordinates: [number, number];
  crimeRate: number;
  safetyScore: number;
}
