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
  dataSource?: string;
  policePortal?: string;
}

export const INDIAN_CITIES: CityInfo[] = [
  { 
    name: "Mumbai", 
    state: "Maharashtra", 
    coordinates: [19.0760, 72.8777], 
    zoom: 11, 
    hotspots: 42, 
    activeCriminals: 156,
    dataSource: "Mumbai Police CitySafe",
    policePortal: "https://mumbaipolice.gov.in"
  },
  { 
    name: "Delhi", 
    state: "Delhi", 
    coordinates: [28.6139, 77.2090], 
    zoom: 11, 
    hotspots: 68, 
    activeCriminals: 210,
    dataSource: "Delhi Police Himmat Plus",
    policePortal: "https://delhipolice.gov.in"
  },
  { 
    name: "Bangalore", 
    state: "Karnataka", 
    coordinates: [12.9716, 77.5946], 
    zoom: 11, 
    hotspots: 35, 
    activeCriminals: 89,
    dataSource: "Bangalore Police Suraksha",
    policePortal: "https://bangalorecitypolice.gov.in"
  },
  { 
    name: "Hyderabad", 
    state: "Telangana", 
    coordinates: [17.3850, 78.4867], 
    zoom: 11, 
    hotspots: 28, 
    activeCriminals: 64,
    dataSource: "Hyderabad Police HawkEye",
    policePortal: "https://hyderabadpolice.gov.in"
  },
  { 
    name: "Chennai", 
    state: "Tamil Nadu", 
    coordinates: [13.0827, 80.2707], 
    zoom: 11, 
    hotspots: 22, 
    activeCriminals: 75,
    dataSource: "Chennai Police Kavalan",
    policePortal: "https://chennaicitypolice.gov.in"
  },
  { 
    name: "Kolkata", 
    state: "West Bengal", 
    coordinates: [22.5726, 88.3639], 
    zoom: 11, 
    hotspots: 45, 
    activeCriminals: 112,
    dataSource: "Kolkata Police Bondhu",
    policePortal: "https://www.kolkatapolice.gov.in"
  },
  { 
    name: "Lucknow", 
    state: "Uttar Pradesh", 
    coordinates: [26.8467, 80.9462], 
    zoom: 11, 
    hotspots: 31, 
    activeCriminals: 98,
    dataSource: "UP Police 112",
    policePortal: "https://uppolice.gov.in"
  },
  {
    name: "Pune",
    state: "Maharashtra",
    coordinates: [18.5204, 73.8567],
    zoom: 12,
    hotspots: 19,
    activeCriminals: 42,
    dataSource: "Pune Police CitySafe",
    policePortal: "https://punepolice.gov.in"
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    coordinates: [23.0225, 72.5714],
    zoom: 11,
    hotspots: 26,
    activeCriminals: 82,
    dataSource: "Ahmedabad Police",
    policePortal: "https://ahmedabadcitypolice.org"
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    coordinates: [26.9124, 75.7873],
    zoom: 11,
    hotspots: 34,
    activeCriminals: 95,
    dataSource: "Rajasthan Police",
    policePortal: "https://police.rajasthan.gov.in"
  },
  {
    name: "Surat",
    state: "Gujarat",
    coordinates: [21.1702, 72.8311],
    zoom: 11,
    hotspots: 21,
    activeCriminals: 58,
    dataSource: "Surat City Police",
    policePortal: "https://suratcitypolice.org"
  },
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    coordinates: [26.8467, 80.9462],
    zoom: 11,
    hotspots: 31,
    activeCriminals: 98,
    dataSource: "UP Police 112",
    policePortal: "https://uppolice.gov.in"
  },
  {
    name: "Kanpur",
    state: "Uttar Pradesh",
    coordinates: [26.4499, 80.3319],
    zoom: 11,
    hotspots: 40,
    activeCriminals: 120,
    dataSource: "UP Police",
    policePortal: "https://uppolice.gov.in"
  },
  {
    name: "Nagpur",
    state: "Maharashtra",
    coordinates: [21.1458, 79.0882],
    zoom: 11,
    hotspots: 18,
    activeCriminals: 45,
    dataSource: "Nagpur Police",
    policePortal: "https://nagpurpolice.gov.in"
  },
  {
    name: "Indore",
    state: "Madhya Pradesh",
    coordinates: [22.7196, 75.8577],
    zoom: 11,
    hotspots: 25,
    activeCriminals: 70,
    dataSource: "MP Police",
    policePortal: "https://mppolice.gov.in"
  },
  {
    name: "Patna",
    state: "Bihar",
    coordinates: [25.5941, 85.1376],
    zoom: 11,
    hotspots: 38,
    activeCriminals: 130,
    dataSource: "Bihar Police",
    policePortal: "https://biharpolice.in"
  },
  {
    name: "Bhopal",
    state: "Madhya Pradesh",
    coordinates: [23.2599, 77.4126],
    zoom: 11,
    hotspots: 22,
    activeCriminals: 55,
    dataSource: "MP Police",
    policePortal: "https://mppolice.gov.in"
  },
  {
    name: "Chandigarh",
    state: "Chandigarh",
    coordinates: [30.7333, 76.7794],
    zoom: 12,
    hotspots: 12,
    activeCriminals: 30,
    dataSource: "Chandigarh Police",
    policePortal: "https://chandigarhpolice.gov.in"
  },
  {
    name: "Bhubaneswar",
    state: "Odisha",
    coordinates: [20.2961, 85.8245],
    zoom: 12,
    hotspots: 15,
    activeCriminals: 40,
    dataSource: "Odisha Police",
    policePortal: "https://odishapolice.gov.in"
  },
  {
    name: "Guwahati",
    state: "Assam",
    coordinates: [26.1445, 91.7362],
    zoom: 12,
    hotspots: 28,
    activeCriminals: 65,
    dataSource: "Assam Police",
    policePortal: "https://police.assam.gov.in"
  },
  {
    name: "Ranchi",
    state: "Jharkhand",
    coordinates: [23.3441, 85.3096],
    zoom: 12,
    hotspots: 24,
    activeCriminals: 72,
    dataSource: "Jharkhand Police",
    policePortal: "https://jhpolice.gov.in"
  },
  {
    name: "Srinagar",
    state: "Jammu and Kashmir",
    coordinates: [34.0837, 74.7973],
    zoom: 11,
    hotspots: 50,
    activeCriminals: 180,
    dataSource: "JK Police",
    policePortal: "https://jkpolice.gov.in"
  },
  {
    name: "Dehradun",
    state: "Uttarakhand",
    coordinates: [30.3165, 78.0322],
    zoom: 12,
    hotspots: 10,
    activeCriminals: 25,
    dataSource: "Uttarakhand Police",
    policePortal: "https://uttarakhandpolice.uk.gov.in"
  },
  {
    name: "Raipur",
    state: "Chhattisgarh",
    coordinates: [21.2514, 81.6296],
    zoom: 12,
    hotspots: 22,
    activeCriminals: 48,
    dataSource: "CG Police",
    policePortal: "https://cgpolice.gov.in"
  },
  {
    name: "Shimla",
    state: "Himachal Pradesh",
    coordinates: [31.1048, 77.1734],
    zoom: 13,
    hotspots: 5,
    activeCriminals: 12,
    dataSource: "HP Police",
    policePortal: "https://hppolice.gov.in"
  },
  {
    name: "Goa",
    state: "Goa",
    coordinates: [15.2993, 74.1240],
    zoom: 11,
    hotspots: 14,
    activeCriminals: 35,
    dataSource: "Goa Police",
    policePortal: "https://goapolice.gov.in"
  },
  {
    name: "Kochi",
    state: "Kerala",
    coordinates: [9.9312, 76.2673],
    zoom: 12,
    hotspots: 18,
    activeCriminals: 42,
    dataSource: "Kerala Police",
    policePortal: "https://keralapolice.gov.in"
  },
  {
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    coordinates: [17.6868, 83.2185],
    zoom: 11,
    hotspots: 20,
    activeCriminals: 52,
    dataSource: "AP Police",
    policePortal: "https://appolice.gov.in"
  },
  {
    name: "Coimbatore",
    state: "Tamil Nadu",
    coordinates: [11.0168, 76.9558],
    zoom: 12,
    hotspots: 15,
    activeCriminals: 38,
    dataSource: "TN Police",
    policePortal: "https://eservices.tnpolice.gov.in"
  }
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
