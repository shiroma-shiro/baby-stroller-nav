import { Route, RouteSegment, SearchParams, ScoreBreakdown, BabyLabel } from '../types';
import { LINES, TRANSFERS, getElevatorRec, LineDef } from '../data/lines';

// ─── 時刻ユーティリティ ──────────────────────────────────────
const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const toTime = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2,'0')}:${String(m % 60).padStart(2,'0')}`;

// ─── 駅名正規化（よみがな対応）─────────────────────────────
const ALIAS: Record<string, string> = {
  // ひらがな
  'しぶや':'渋谷','しんじゅく':'新宿','いけぶくろ':'池袋',
  'うえの':'上野','とうきょう':'東京','ぎんざ':'銀座',
  'しながわ':'品川','あきはばら':'秋葉原','ろっぽんぎ':'六本木',
  'あさくさ':'浅草','えびす':'恵比寿','おおさき':'大崎',
  'めぐろ':'目黒','よこはま':'横浜','かわさき':'川崎',
  'ごたんだ':'五反田','はらじゅく':'原宿','よよぎ':'代々木',
  'おちゃのみず':'御茶ノ水','あかさか':'赤坂','かすみがせき':'霞ヶ関',
  'ながたちょう':'永田町','おおてまち':'大手町','にほんばし':'日本橋',
  'なかのまち':'中野','みたか':'三鷹','きちじょうじ':'吉祥寺',
  'とよす':'豊洲','きばし':'木場','たつみ':'辰巳',
  'ちゅうもく':'中目黒','じゆうがおか':'自由が丘',
  'にこたまがわ':'二子玉川','みぞのくち':'溝の口',
  'しもきたざわ':'下北沢','むさしこすぎ':'武蔵小杉',
  'あざみの':'あざみ野','たまぷらーざ':'たまプラーザ',
  'まちだ':'町田','さがみおおの':'相模大野','おだわら':'小田原',
  'なかのりんかん':'中央林間',
  // カタカナ
  'シブヤ':'渋谷','シンジュク':'新宿','イケブクロ':'池袋',
  'ウエノ':'上野','トウキョウ':'東京','ギンザ':'銀座',
  'シナガワ':'品川','アキハバラ':'秋葉原','ロッポンギ':'六本木',
  'アサクサ':'浅草','エビス':'恵比寿',
  // 表記ゆれ
  '霞ケ関':'霞ヶ関','かすみケ関':'霞ヶ関',
  '市ヶ谷':'市ケ谷','いちがや':'市ケ谷',
  '四谷':'四ツ谷','よつや':'四ツ谷',
  '明治神宮前（原宿）':'明治神宮前','明治神宮前〈原宿〉':'明治神宮前',
  '東京スカイツリー':'とうきょうスカイツリー',
  'スカイツリー':'とうきょうスカイツリー',
};
const norm = (s: string): string => ALIAS[s.trim()] ?? s.trim();

// ─── 路線内の2駅間情報 ───────────────────────────────────────
function routeInfo(line: LineDef, from: string, to: string): { stops: number; dir: string } | null {
  const fi = line.stations.indexOf(from);
  const ti = line.stations.indexOf(to);
  if (fi < 0 || ti < 0 || fi === ti) return null;
  if (!line.circular) {
    return { stops: Math.abs(ti - fi), dir: fi < ti ? line.dirForward : line.dirBackward };
  }
  const n = line.stations.length;
  const fwd = (ti - fi + n) % n;
  const bwd = n - fwd;
  return fwd <= bwd ? { stops: fwd, dir: line.dirForward } : { stops: bwd, dir: line.dirBackward };
}

// ─── RouteSegment 生成 ───────────────────────────────────────
function makeSeg(
  line: LineDef, from: string, to: string,
  dir: string, stops: number, depMin: number,
  transferNote?: string,
): RouteSegment {
  const dur = Math.max(2, Math.round(stops * line.avgMinPerStop));
  const eB = getElevatorRec(from, line.id, line.cars);
  const eA = getElevatorRec(to,   line.id, line.cars);
  const pos = (p: string) => p === '前寄り' ? 'front' : p === '後寄り' ? 'rear' : 'middle';
  return {
    fromStation: from, toStation: to,
    lineId: line.id, lineName: `${line.name}（${dir}）`,
    lineColor: line.color, trainType: '各駅停車',
    departureTime: toTime(depMin), arrivalTime: toTime(depMin + dur),
    durationMin: dur, stopCount: stops, platform: undefined,
    boarding: { car: eB.car, carLabel: `${eB.car}号車`, position: pos(eB.position), positionLabel: eB.position, elevatorNote: eB.boardNote },
    alighting: { car: eA.car, carLabel: `${eA.car}号車`, position: pos(eA.position), positionLabel: eA.position, elevatorNote: eA.alightNote },
    transferNote,
  };
}

// ─── スコア計算 ──────────────────────────────────────────────
function calcScore(segs: RouteSegment[], totalMin: number): { sc: number; bd: ScoreBreakdown; label: BabyLabel; color: string } {
  const tc = segs.length - 1;
  const elev = Math.max(20, 38 - tc * 5);
  const plat = [20, 14, 7][tc] ?? 4;
  const tran = [20, 11, 4][tc] ?? 2;
  const tm   = totalMin <= 15 ? 20 : totalMin <= 25 ? 18 : totalMin <= 35 ? 16
             : totalMin <= 45 ? 13 : totalMin <= 60 ? 9 : 5;
  const sc = Math.min(100, elev + plat + tran + tm);
  const label: BabyLabel = sc >= 85 ? '最適' : sc >= 70 ? 'おすすめ' : 'ふつう';
  const color = sc >= 85 ? '#10b981' : sc >= 70 ? '#0ea5e9' : '#f59e0b';
  return { sc, bd: { elevator: elev, platform: plat, transfer: tran, time: tm }, label, color };
}

// ─── Route 組み立て ──────────────────────────────────────────
function makeRoute(id: string, segs: RouteSegment[], title: string, arrNote: string): Route {
  const dep = toMin(segs[0].departureTime);
  const arr = toMin(segs[segs.length - 1].arrivalTime);
  const totalMin = arr - dep;
  const { sc, bd, label, color } = calcScore(segs, totalMin);
  return { id, rank: 0, segments: segs, totalMin, transferCount: segs.length - 1,
    babyScore: sc, scoreBreakdown: bd, babyLabel: label, babyColor: color,
    highlight: title, arrivalNote: arrNote };
}

// ─── メイン探索 ──────────────────────────────────────────────
export function findRoutes(params: SearchParams): Route[] | null {
  try {
    const from = norm(params.from);
    const to   = norm(params.to);
    if (!from || !to || from === to) return null;

    const base = toMin(params.time);
    const routes: Route[] = [];
    const seen  = new Set<string>();
    const add   = (r: Route) => { const k = r.segments.map(s => s.lineId).join('+') + String(r.totalMin); if (!seen.has(k)) { seen.add(k); routes.push(r); } };

    // 1. 直通ルート（各路線を全部チェック）
    for (const line of LINES) {
      const ri = routeInfo(line, from, to);
      if (!ri) continue;
      for (let i = 0; i < 3; i++) {
        const dep = base + i * line.frequencyMin;
        const seg = makeSeg(line, from, to, ri.dir, ri.stops, dep);
        add(makeRoute(`d-${line.id}-${i}`, [seg],
          `乗換なし・${line.shortName}直通`,
          `${to}駅: ${getElevatorRec(to, line.id, line.cars).alightNote}`));
      }
    }

    // 2. 1乗換ルート
    for (const tr of TRANSFERS) {
      const l1 = LINES.find(l => l.id === tr.line1);
      const l2 = LINES.find(l => l.id === tr.line2);
      if (!l1 || !l2 || l1 === l2) continue;
      const r1 = routeInfo(l1, from, tr.station1);
      const r2 = routeInfo(l2, tr.station2, to);
      if (!r1 || !r2) continue;
      const dep1 = base + l1.frequencyMin;
      const s1   = makeSeg(l1, from, tr.station1, r1.dir, r1.stops, dep1, tr.elevatorNote);
      const dep2 = toMin(s1.arrivalTime) + tr.transferMin;
      const s2   = makeSeg(l2, tr.station2, to,   r2.dir, r2.stops, dep2);
      add(makeRoute(`t-${tr.line1}-${tr.station1}`, [s1, s2],
        `${l1.shortName}→${l2.shortName}（${tr.station2}乗換）`,
        `${to}駅: ${getElevatorRec(to, l2.id, l2.cars).alightNote}`));
    }

    // 3. 2乗換ルート（直通・1乗換で見つからなかった場合のみ）
    if (routes.length === 0) {
      outer2: for (const tr1 of TRANSFERS) {
        // tr1: line1 → line2（乗換駅: tr1.station1/tr1.station2）
        const l1 = LINES.find(l => l.id === tr1.line1);
        const l2 = LINES.find(l => l.id === tr1.line2);
        if (!l1 || !l2) continue;
        // from → tr1.station1 on line1
        const r1 = routeInfo(l1, from, tr1.station1);
        if (!r1) continue;

        for (const tr2 of TRANSFERS) {
          // tr2: line2 → line3（乗換駅: tr2.station1/tr2.station2）
          if (tr2.line1 !== tr1.line2) continue;
          const l3 = LINES.find(l => l.id === tr2.line2);
          if (!l3 || l3.id === l1.id) continue;

          // tr1.station2 → tr2.station1 on line2（中間区間）
          const r2mid = tr1.station2 === tr2.station1
            ? { stops: 0, dir: l2.dirForward }
            : routeInfo(l2, tr1.station2, tr2.station1);
          if (!r2mid) continue;

          // tr2.station2 → to on line3
          const r3 = routeInfo(l3, tr2.station2, to);
          if (!r3) continue;

          // 時刻計算
          const dep1 = base + l1.frequencyMin;
          const s1   = makeSeg(l1, from, tr1.station1, r1.dir, r1.stops, dep1, tr1.elevatorNote);
          const dep2 = toMin(s1.arrivalTime) + tr1.transferMin;

          let dep3: number;
          let segs;
          if (r2mid.stops === 0) {
            // 同一駅乗換（line2に乗らない）
            dep3 = dep2 + tr2.transferMin;
            const s3 = makeSeg(l3, tr2.station2, to, r3.dir, r3.stops, dep3);
            segs = [s1, s3];
          } else {
            // line2に乗って中間駅へ
            const s2 = makeSeg(l2, tr1.station2, tr2.station1, r2mid.dir, r2mid.stops, dep2, tr2.elevatorNote);
            dep3 = toMin(s2.arrivalTime) + tr2.transferMin;
            const s3 = makeSeg(l3, tr2.station2, to, r3.dir, r3.stops, dep3);
            segs = [s1, s2, s3];
          }

          const key = `tt-${tr1.line1}-${tr1.station1}-${tr2.station1}-${tr2.line2}`;
          add(makeRoute(key, segs,
            `${l1.shortName}→${l2.shortName}→${l3.shortName}（${tr1.station2}・${tr2.station1}乗換）`,
            `${to}駅: ${getElevatorRec(to, l3.id, l3.cars).alightNote}`));

          if (routes.length >= 3) break outer2;
        }
      }
    }

    if (routes.length === 0) return null;
    routes.sort((a, b) => b.babyScore - a.babyScore || a.totalMin - b.totalMin);
    return routes.slice(0, 3).map((r, i) => ({ ...r, rank: i + 1 }));
  } catch (e) {
    console.error('[findRoutes]', e);
    return null;
  }
}

export function getSupportedStations(): string[] {
  return [...new Set(LINES.flatMap(l => l.stations))].sort();
}
