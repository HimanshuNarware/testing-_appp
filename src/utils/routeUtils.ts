import { GridCell } from '../types/CrimeIncident';

/**
 * Approximates path safety by sampling points between start and end coordinates
 * and checking them against aggregated grid risk data.
 */
export const calculatePathSafety = (
  start: [number, number],
  end: [number, number],
  gridData: GridCell[]
): { score: number; rating: 'safe' | 'caution' | 'danger'; dangerZones: GridCell[] } => {
  const steps = 12;
  let totalRisk = 0;
  const dangerZonesMap = new Map<string, GridCell>();

  for (let i = 0; i <= steps; i++) {
    const sampleLat = start[0] + (end[0] - start[0]) * (i / steps);
    const sampleLng = start[1] + (end[1] - start[1]) * (i / steps);

    let minDistance = Infinity;
    let nearestCell: GridCell | null = null;

    gridData.forEach(cell => {
      const d = Math.sqrt(Math.pow(cell.lat - sampleLat, 2) + Math.pow(cell.lng - sampleLng, 2));
      if (d < minDistance) {
        minDistance = d;
        nearestCell = cell;
      }
    });

    if (nearestCell) {
      const cell = nearestCell as GridCell;
      totalRisk += cell.riskScore;
      if (cell.safetyScore < 60) {
        dangerZonesMap.set(cell.id, cell);
      }
    }
  }

  const avgRisk = totalRisk / (steps + 1);
  const normalizedScore = Math.max(10, 100 - avgRisk * 12);

  return {
    score: Math.round(normalizedScore),
    rating: normalizedScore > 75 ? 'safe' : normalizedScore > 45 ? 'caution' : 'danger',
    dangerZones: Array.from(dangerZonesMap.values())
  };
};
