import { LINES } from './lines';
import { StationInfo } from '../types';

// 路線グラフから全駅を自動生成
// 将来の路線追加時は lines.ts に追記するだけ自動反映
export const STATIONS: StationInfo[] = (() => {
  const map = new Map<string, StationInfo>();
  for (const line of LINES) {
    for (const stationName of line.stations) {
      if (map.has(stationName)) {
        map.get(stationName)!.lines.push(line.name);
      } else {
        map.set(stationName, {
          id: stationName,
          name: stationName,
          lines: [line.name],
        });
      }
    }
  }
  return Array.from(map.values());
})();

export const STATION_NAMES = STATIONS.map(s => s.name);

export function findStationByName(name: string): StationInfo | undefined {
  return STATIONS.find(s => s.name === name);
}
