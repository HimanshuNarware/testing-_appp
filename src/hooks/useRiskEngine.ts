import { useMemo } from 'react';
import { CrimeIncident, GridCell } from '../types/CrimeIncident';

const GRID_SIZE = 0.05; // High granularity for city hotspots (~5km)

export const useRiskEngine = (incidents: CrimeIncident[], filters: { category: string, time: string }) => {
  return useMemo(() => {
    const now = new Date().getTime();
    const THREE_MONTHS_MS = 90 * 24 * 60 * 60 * 1000;

    const filtered = incidents.filter(idx => {
      const date = new Date(idx.timestamp);
      const hour = date.getHours();
      const age = now - date.getTime();
      
      // Focus on recent 3 months if requested (implicit in core risk logic, but can be forced here)
      if (age > THREE_MONTHS_MS) return false;

      if (filters.category !== 'all') {
        if (filters.category === 'conflict_zones') {
          if (!['naxal_activity', 'insurgency'].includes(idx.type)) return false;
        } else if (idx.type !== filters.category) {
          return false;
        }
      }

      if (filters.time === 'night' && (hour < 20 && hour > 5)) return false;
      if (filters.time === 'day' && (hour >= 20 || hour <= 5)) return false;
      
      return true;
    });

    const grid: Record<string, GridCell> = {};

    filtered.forEach(inc => {
      const gridLat = Math.floor(inc.lat / GRID_SIZE) * GRID_SIZE;
      const gridLng = Math.floor(inc.lng / GRID_SIZE) * GRID_SIZE;
      const key = `${gridLat.toFixed(2)},${gridLng.toFixed(2)}`;

      if (!grid[key]) {
        grid[key] = {
          id: key,
          lat: gridLat + GRID_SIZE / 2,
          lng: gridLng + GRID_SIZE / 2,
          riskScore: 0,
          safetyScore: 100,
          incidents: [],
          trend: Math.random() > 0.5 ? 'up' : 'down',
          populationDensity: 2000 + Math.random() * 8000
        };
      }

      const incTime = new Date(inc.timestamp).getTime();
      const recencyWeight = Math.max(0.5, 1 - (now - incTime) / THREE_MONTHS_MS);
      
      let baseRisk = inc.severity;
      if (inc.type === 'naxal_activity' || inc.type === 'insurgency') baseRisk *= 2.5;
      
      // Criminal presence in area increases local risk
      const criminalWeight = (inc as any).isHighCriminalPresence ? 1.5 : 1.0;
      
      grid[key].riskScore += baseRisk * recencyWeight * criminalWeight;
      grid[key].incidents.push(inc);
    });

    return Object.values(grid).map(cell => {
      const scaledRisk = cell.riskScore * 12; 
      cell.safetyScore = Math.max(5, Math.min(100, Math.round(100 - scaledRisk)));
      return cell;
    });
  }, [incidents, filters]);
};
