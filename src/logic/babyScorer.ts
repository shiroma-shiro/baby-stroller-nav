import { ScoreBreakdown, BabyLabel, RouteSegment } from '../types';

export interface BabyScoreResult {
  score: number;
  breakdown: ScoreBreakdown;
  label: BabyLabel;
  color: string;
  badgeClass: string;
}

/**
 * ベビースコアを計算する
 * モックデータ版: scoreBreakdown をそのまま使って計算
 * 本番 API 接続後はこの関数内で実際のエレベーター情報を基に再計算する
 */
export function calcBabyScore(
  breakdown: ScoreBreakdown,
  segments: RouteSegment[],
  totalMin: number,
): BabyScoreResult {
  // 乗換回数ペナルティ（transferScore はモックで設定済みだが念のため補正）
  const transferCount = segments.length - 1;
  const transferPenalty = transferCount >= 2 ? 5 : 0;

  // 所要時間ペナルティ（60分超えたら減点）
  const timePenalty = totalMin > 60 ? 5 : 0;

  const raw = breakdown.elevator + breakdown.platform + breakdown.transfer + breakdown.time
    - transferPenalty - timePenalty;
  const score = Math.min(100, Math.max(0, raw));

  let label: BabyLabel;
  let color: string;
  let badgeClass: string;

  if (score >= 85) {
    label = '最適';
    color = '#16a34a';
    badgeClass = 'bg-green-100 text-green-800 border-green-300';
  } else if (score >= 70) {
    label = 'おすすめ';
    color = '#0284c7';
    badgeClass = 'bg-sky-100 text-sky-800 border-sky-300';
  } else {
    label = 'ふつう';
    color = '#d97706';
    badgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
  }

  return { score, breakdown, label, color, badgeClass };
}

/**
 * スコアをパーセント円弧 SVG 用に変換
 */
export function scoreToDashArray(score: number, radius = 28): { dash: number; gap: number } {
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  const gap = circumference - dash;
  return { dash, gap };
}
