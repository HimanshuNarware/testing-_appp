export interface StateInfo {
  name: string;
  coordinates: [number, number];
  zoom: number;
  ncrbStats: {
    totalCrimes: number;
    convictionRate: number;
    safetyIndex: number;
  };
}

export interface CityInfo {
  name: string;
  state: string;
  coordinates: [number, number];
  zoom: number;
  hotspots: number;
  activeCriminals: number;
}

export const INDIAN_CITIES: CityInfo[] = [
  { name: "Mumbai", state: "Maharashtra", coordinates: [19.0760, 72.8777], zoom: 11, hotspots: 12, activeCriminals: 145 },
  { name: "New Delhi", state: "Delhi", coordinates: [28.6139, 77.2090], zoom: 11, hotspots: 18, activeCriminals: 230 },
  { name: "Bangalore", state: "Karnataka", coordinates: [12.9716, 77.5946], zoom: 11, hotspots: 8, activeCriminals: 90 },
  { name: "Hyderabad", state: "Telangana", coordinates: [17.3850, 78.4867], zoom: 11, hotspots: 6, activeCriminals: 75 },
  { name: "Chennai", state: "Tamil Nadu", coordinates: [13.0827, 80.2707], zoom: 11, hotspots: 5, activeCriminals: 60 },
  { name: "Kolkata", state: "West Bengal", coordinates: [22.5726, 88.3639], zoom: 11, hotspots: 9, activeCriminals: 110 }
];

export const INDIAN_STATES: StateInfo[] = [
  {
    name: "Maharashtra",
    coordinates: [19.7507, 75.7139],
    zoom: 6,
    ncrbStats: { totalCrimes: 394017, convictionRate: 45.2, safetyIndex: 68 }
  },
  {
    name: "Karnataka",
    coordinates: [15.3173, 75.7139],
    zoom: 6,
    ncrbStats: { totalCrimes: 163691, convictionRate: 48.5, safetyIndex: 72 }
  },
  {
    name: "Delhi",
    coordinates: [28.6139, 77.2090],
    zoom: 10,
    ncrbStats: { totalCrimes: 298988, convictionRate: 35.0, safetyIndex: 42 }
  },
  {
    name: "Tamil Nadu",
    coordinates: [11.1271, 78.6569],
    zoom: 7,
    ncrbStats: { totalCrimes: 185121, convictionRate: 62.3, safetyIndex: 85 }
  },
  {
    name: "Uttar Pradesh",
    coordinates: [26.8467, 80.9462],
    zoom: 6,
    ncrbStats: { totalCrimes: 608082, convictionRate: 59.1, safetyIndex: 55 }
  },
  {
    name: "West Bengal",
    coordinates: [22.9868, 87.8550],
    zoom: 7,
    ncrbStats: { totalCrimes: 182367, convictionRate: 32.4, safetyIndex: 60 }
  },
  {
    name: "Rajasthan",
    coordinates: [27.0238, 74.2179],
    zoom: 6,
    ncrbStats: { totalCrimes: 225406, convictionRate: 48.2, safetyIndex: 58 }
  },
  {
    name: "Gujarat",
    coordinates: [22.2587, 71.1924],
    zoom: 7,
    ncrbStats: { totalCrimes: 139114, convictionRate: 52.8, safetyIndex: 78 }
  },
  {
    name: "Kerala",
    coordinates: [10.8505, 76.2711],
    zoom: 7,
    ncrbStats: { totalCrimes: 121674, convictionRate: 85.0, safetyIndex: 92 }
  },
  {
    name: "Chhattisgarh",
    coordinates: [21.2787, 81.8661],
    zoom: 7,
    ncrbStats: { totalCrimes: 98127, convictionRate: 42.1, safetyIndex: 50 }
  },
  {
    name: "Jammu & Kashmir",
    coordinates: [33.7782, 76.5762],
    zoom: 7,
    ncrbStats: { totalCrimes: 25678, convictionRate: 38.5, safetyIndex: 45 }
  }
];
