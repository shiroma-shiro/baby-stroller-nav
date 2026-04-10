export type TrainType = '各駅停車' | '急行' | '特急' | '快速' | '準急';
export type BabyLabel = '最適' | 'おすすめ' | 'ふつう';
export type CarPosition = 'front' | 'middle' | 'rear';

export interface BoardingGuide {
  car: number;
  carLabel: string;       // "3号車"
  position: CarPosition;
  positionLabel: string;  // "前寄り"
  elevatorNote: string;   // "ホーム南端のエレベーターから乗車"
}

export interface RouteSegment {
  fromStation: string;
  toStation: string;
  lineId: string;
  lineName: string;
  lineColor: string;
  trainType: TrainType;
  departureTime: string;  // "09:15"
  arrivalTime: string;    // "09:28"
  durationMin: number;
  stopCount: number;
  boarding: BoardingGuide;
  alighting: BoardingGuide;
  transferNote?: string;  // 次の路線への乗換案内
  platform?: string;      // "3・4番線"
}

export interface ScoreBreakdown {
  elevator: number;   // 0-40: エレベーター使いやすさ
  platform: number;   // 0-20: ホーム移動の少なさ
  transfer: number;   // 0-20: 乗換のわかりやすさ
  time: number;       // 0-20: 所要時間の短さ
}

export interface Route {
  id: string;
  rank: number;
  segments: RouteSegment[];
  totalMin: number;
  transferCount: number;
  babyScore: number;
  scoreBreakdown: ScoreBreakdown;
  babyLabel: BabyLabel;
  babyColor: string;
  highlight: string;
  arrivalNote: string;
}

export interface SearchParams {
  from: string;
  to: string;
  time: string;
}

export interface Favorite {
  id: string;
  label: string;
  from: string;
  to: string;
  savedAt: string;
}

export interface StationInfo {
  id: string;
  name: string;
  lines: string[];
}
