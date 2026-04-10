import { RouteSegment, ScoreBreakdown } from '../types';

// ============================================================
// 路線定義
// 将来の路線追加時は LINE_DEFS にエントリーを追加するだけ
// ============================================================
export const LINE_DEFS: Record<string, { name: string; color: string; cars: number; frequencyMin: number }> = {
  yamanote:    { name: 'JR山手線',           color: '#9acd32', cars: 11, frequencyMin: 4  },
  marunouchi:  { name: '東京メトロ丸ノ内線', color: '#e60012', cars: 6,  frequencyMin: 5  },
  ginza:       { name: '東京メトロ銀座線',   color: '#f39700', cars: 6,  frequencyMin: 3  },
  hibiya:      { name: '東京メトロ日比谷線', color: '#9caeb7', cars: 8,  frequencyMin: 5  },
  asakusa:     { name: '都営浅草線',         color: '#e85298', cars: 8,  frequencyMin: 10 },
};

// ============================================================
// ルートテンプレート型
// ============================================================
export interface RouteTemplate {
  segments: Omit<RouteSegment, 'departureTime' | 'arrivalTime'>[];
  baseDurationMin: number;   // 合計所要時間
  scoreBreakdown: ScoreBreakdown;
  highlight: string;
  arrivalNote: string;
}

// ============================================================
// ルートデータベース（モック）
// Key: "出発駅名|到着駅名"
// 将来的に ODPT API 等に差し替えるポイント
// ============================================================
export const ROUTE_DB: Record<string, RouteTemplate[]> = {

  // ─── 新宿 → 渋谷 ───────────────────────────────────────
  '新宿|渋谷': [{
    baseDurationMin: 13,
    highlight: '乗換なし・エレベーター直結',
    arrivalNote: '渋谷駅は6号車付近を降りると南改札のエレベーター(地上行き)がすぐ目の前に出ます。そのまま南改札を通り抜けて出口へどうぞ。',
    scoreBreakdown: { elevator: 38, platform: 18, transfer: 20, time: 19 },
    segments: [{
      fromStation: '新宿',
      toStation: '渋谷',
      lineId: 'yamanote',
      lineName: 'JR山手線（内回り）',
      lineColor: '#9acd32',
      trainType: '各駅停車',
      durationMin: 13,
      stopCount: 5,
      platform: '1・2番線',
      boarding: {
        car: 6, carLabel: '6号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '新宿駅 南改札のエレベーターで1番線ホームへ。ホーム前方（渋谷方面）寄りに6号車が停車します。',
      },
      alighting: {
        car: 6, carLabel: '6号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '渋谷駅 6号車を降りると目の前にエレベーターがあります。地上・改札階へそのまま移動できます。',
      },
    }],
  }],

  // ─── 渋谷 → 新宿 ───────────────────────────────────────
  '渋谷|新宿': [{
    baseDurationMin: 13,
    highlight: '乗換なし・エレベーター直結',
    arrivalNote: '新宿駅は7号車付近を降りると南改札のエレベーターに近い位置です。改札を出てすぐ右手にエレベーターがあります。',
    scoreBreakdown: { elevator: 36, platform: 18, transfer: 20, time: 19 },
    segments: [{
      fromStation: '渋谷',
      toStation: '新宿',
      lineId: 'yamanote',
      lineName: 'JR山手線（外回り）',
      lineColor: '#9acd32',
      trainType: '各駅停車',
      durationMin: 13,
      stopCount: 5,
      platform: '3・4番線',
      boarding: {
        car: 7, carLabel: '7号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '渋谷駅 南改札のエレベーターで3番線ホームへ。ホーム中程〜後方寄りに乗り場があります。',
      },
      alighting: {
        car: 7, carLabel: '7号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '新宿駅 7号車を降りて後ろに数歩歩くと南改札へのエレベーターがあります。',
      },
    }],
  }],

  // ─── 池袋 → 銀座 ───────────────────────────────────────
  '池袋|銀座': [{
    baseDurationMin: 22,
    highlight: '乗換なし・丸ノ内線直通',
    arrivalNote: '銀座駅は1号車（前寄り）を降りると改札に近く、エレベーターで地上・有楽町方面へ出られます。A13出口が広いのでベビーカー向きです。',
    scoreBreakdown: { elevator: 35, platform: 17, transfer: 20, time: 17 },
    segments: [{
      fromStation: '池袋',
      toStation: '銀座',
      lineId: 'marunouchi',
      lineName: '東京メトロ丸ノ内線',
      lineColor: '#e60012',
      trainType: '各駅停車',
      durationMin: 22,
      stopCount: 9,
      platform: '1番線',
      boarding: {
        car: 1, carLabel: '1号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '池袋駅 丸ノ内線乗り場は地下1F。エレベーターで1番線ホームへ。1号車はホーム前端に停車します。',
      },
      alighting: {
        car: 1, carLabel: '1号車', position: 'rear', positionLabel: '後寄り',
        elevatorNote: '銀座駅1号車を降りると改札方面へのエレベーターが正面にあります。そのままA13出口(広い)まで移動できます。',
      },
    }],
  }],

  // ─── 銀座 → 池袋 ───────────────────────────────────────
  '銀座|池袋': [{
    baseDurationMin: 22,
    highlight: '乗換なし・丸ノ内線直通',
    arrivalNote: '池袋駅は6号車（前寄り）を降りると丸ノ内線改札のエレベーター付近。そのまま東口・西口方面へ。',
    scoreBreakdown: { elevator: 34, platform: 17, transfer: 20, time: 17 },
    segments: [{
      fromStation: '銀座',
      toStation: '池袋',
      lineId: 'marunouchi',
      lineName: '東京メトロ丸ノ内線',
      lineColor: '#e60012',
      trainType: '各駅停車',
      durationMin: 22,
      stopCount: 9,
      platform: '2番線',
      boarding: {
        car: 6, carLabel: '6号車', position: 'rear', positionLabel: '後寄り',
        elevatorNote: '銀座駅 2番線ホームのエレベーターで乗り場へ。6号車はホーム後端付近に停車します。',
      },
      alighting: {
        car: 6, carLabel: '6号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '池袋駅6号車を降りると丸ノ内線改札エレベーターがすぐ右手にあります。',
      },
    }],
  }],

  // ─── 渋谷 → 浅草 ───────────────────────────────────────
  '渋谷|浅草': [{
    baseDurationMin: 43,
    highlight: '銀座線直通・乗換なし',
    arrivalNote: '浅草駅は6号車（後寄り）を降りると1番出口のエレベーターが近いです。仲見世方面もエレベーター対応です。',
    scoreBreakdown: { elevator: 30, platform: 16, transfer: 20, time: 10 },
    segments: [{
      fromStation: '渋谷',
      toStation: '浅草',
      lineId: 'ginza',
      lineName: '東京メトロ銀座線',
      lineColor: '#f39700',
      trainType: '各駅停車',
      durationMin: 43,
      stopCount: 18,
      platform: '3番線',
      boarding: {
        car: 1, carLabel: '1号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '渋谷駅 銀座線ホームは3F。エレベーターでホームへ上がり、ホーム先頭（浅草方面）寄りに乗車します。',
      },
      alighting: {
        car: 6, carLabel: '6号車', position: 'rear', positionLabel: '後寄り',
        elevatorNote: '浅草駅1番出口のエレベーターに最も近い位置に降車できます。改札出てすぐ右手がエレベーターです。',
      },
    }],
  }],

  // ─── 浅草 → 渋谷 ───────────────────────────────────────
  '浅草|渋谷': [{
    baseDurationMin: 43,
    highlight: '銀座線直通・乗換なし',
    arrivalNote: '渋谷駅の銀座線は地上3F到着。エレベーターで1Fへ降り、ハチ公口方面へ向かいます。',
    scoreBreakdown: { elevator: 29, platform: 16, transfer: 20, time: 10 },
    segments: [{
      fromStation: '浅草',
      toStation: '渋谷',
      lineId: 'ginza',
      lineName: '東京メトロ銀座線',
      lineColor: '#f39700',
      trainType: '各駅停車',
      durationMin: 43,
      stopCount: 18,
      platform: '1番線',
      boarding: {
        car: 1, carLabel: '1号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '浅草駅 1番出口のエレベーターで改札へ。ホーム前端に1号車が停車します。',
      },
      alighting: {
        car: 6, carLabel: '6号車', position: 'rear', positionLabel: '後寄り',
        elevatorNote: '渋谷駅 6号車を降りてすぐ後方にエレベーターがあります。3Fから1Fへ降りてハチ公口へ。',
      },
    }],
  }],

  // ─── 東京 → 六本木（丸ノ内線+日比谷線/銀座乗換）────────
  '東京|六本木': [
    {
      baseDurationMin: 28,
      highlight: '銀座乗換1回・エレベーター完備',
      arrivalNote: '六本木駅は3号車付近を降りるとエレベーターに近いです。出口2が広くベビーカーでも安心です。',
      scoreBreakdown: { elevator: 32, platform: 14, transfer: 12, time: 17 },
      segments: [
        {
          fromStation: '東京',
          toStation: '銀座',
          lineId: 'marunouchi',
          lineName: '東京メトロ丸ノ内線',
          lineColor: '#e60012',
          trainType: '各駅停車',
          durationMin: 7,
          stopCount: 3,
          platform: '1番線',
          boarding: {
            car: 6, carLabel: '6号車', position: 'rear', positionLabel: '後寄り',
            elevatorNote: '東京駅 丸ノ内線乗り場はB1F。1番線（池袋方面）のエレベーターでホームへ。6号車はホーム後端です。',
          },
          alighting: {
            car: 6, carLabel: '6号車', position: 'front', positionLabel: '前寄り',
            elevatorNote: '銀座駅で下車。丸ノ内線改札出てすぐ日比谷線乗り場の案内板に従い、エレベーターで乗り換えます。',
          },
          transferNote: '銀座駅で日比谷線（中目黒方面）に乗り換え。改札を出て右へ30秒、エレベーターで日比谷線ホームへ。乗換時間は約5分余裕があります。',
        },
        {
          fromStation: '銀座',
          toStation: '六本木',
          lineId: 'hibiya',
          lineName: '東京メトロ日比谷線',
          lineColor: '#9caeb7',
          trainType: '各駅停車',
          durationMin: 10,
          stopCount: 4,
          platform: '2番線',
          boarding: {
            car: 3, carLabel: '3号車', position: 'middle', positionLabel: '中程',
            elevatorNote: '銀座駅 日比谷線2番線（中目黒方面）3号車付近のエレベーターから乗車します。',
          },
          alighting: {
            car: 3, carLabel: '3号車', position: 'front', positionLabel: '前寄り',
            elevatorNote: '六本木駅 3号車を降りて前方へ向かうとエレベーターがあります。出口2方面（広い通路）へ。',
          },
        },
      ],
    },
  ],

  // ─── 六本木 → 東京 ─────────────────────────────────────
  '六本木|東京': [{
    baseDurationMin: 28,
    highlight: '銀座乗換1回・エレベーター完備',
    arrivalNote: '東京駅は丸ノ内線から地下通路でJR改札に向かえます。エレベーターは丸ノ内中央口付近にあります。',
    scoreBreakdown: { elevator: 30, platform: 13, transfer: 12, time: 17 },
    segments: [
      {
        fromStation: '六本木',
        toStation: '銀座',
        lineId: 'hibiya',
        lineName: '東京メトロ日比谷線',
        lineColor: '#9caeb7',
        trainType: '各駅停車',
        durationMin: 10,
        stopCount: 4,
        platform: '1番線',
        boarding: {
          car: 6, carLabel: '6号車', position: 'rear', positionLabel: '後寄り',
          elevatorNote: '六本木駅 1番線（北千住方面）のエレベーターでホームへ。6号車はホーム後端付近です。',
        },
        alighting: {
          car: 6, carLabel: '6号車', position: 'front', positionLabel: '前寄り',
          elevatorNote: '銀座駅で乗換。日比谷線改札を出て案内板に従い、エレベーターで丸ノ内線ホームへ。',
        },
        transferNote: '銀座駅で丸ノ内線（東京・荻窪方面）に乗り換え。改札を出て左へ進みエレベーターで乗り換えます。乗換時間約5分。',
      },
      {
        fromStation: '銀座',
        toStation: '東京',
        lineId: 'marunouchi',
        lineName: '東京メトロ丸ノ内線',
        lineColor: '#e60012',
        trainType: '各駅停車',
        durationMin: 7,
        stopCount: 3,
        platform: '1番線',
        boarding: {
          car: 1, carLabel: '1号車', position: 'front', positionLabel: '前寄り',
          elevatorNote: '銀座駅 丸ノ内線1番線（東京方面）1号車付近のエレベーターから乗車します。',
        },
        alighting: {
          car: 1, carLabel: '1号車', position: 'rear', positionLabel: '後寄り',
          elevatorNote: '東京駅 1号車降車後すぐ改札エレベーターがあります。丸ノ内中央口へ。',
        },
      },
    ],
  }],

  // ─── 品川 → 上野 ───────────────────────────────────────
  '品川|上野': [{
    baseDurationMin: 31,
    highlight: '乗換なし・山手線外回り',
    arrivalNote: '上野駅は4号車付近を降りると公園口のエレベーターに近い位置です。上野公園方面へのアクセスがスムーズです。',
    scoreBreakdown: { elevator: 34, platform: 17, transfer: 20, time: 15 },
    segments: [{
      fromStation: '品川',
      toStation: '上野',
      lineId: 'yamanote',
      lineName: 'JR山手線（外回り）',
      lineColor: '#9acd32',
      trainType: '各駅停車',
      durationMin: 31,
      stopCount: 12,
      platform: '2番線',
      boarding: {
        car: 4, carLabel: '4号車', position: 'middle', positionLabel: '中程',
        elevatorNote: '品川駅 中央改札のエレベーターで2番線ホームへ。4号車はホーム中央付近に停車します。',
      },
      alighting: {
        car: 4, carLabel: '4号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '上野駅 4号車を降りると公園口方面。エレベーターで改札へ出て、そのまま上野公園口です。',
      },
    }],
  }],

  // ─── 上野 → 品川 ───────────────────────────────────────
  '上野|品川': [{
    baseDurationMin: 31,
    highlight: '乗換なし・山手線内回り',
    arrivalNote: '品川駅は中央改札のエレベーターを使うと改札外へスムーズに出られます。港南口・高輪口どちらも対応しています。',
    scoreBreakdown: { elevator: 33, platform: 17, transfer: 20, time: 15 },
    segments: [{
      fromStation: '上野',
      toStation: '品川',
      lineId: 'yamanote',
      lineName: 'JR山手線（内回り）',
      lineColor: '#9acd32',
      trainType: '各駅停車',
      durationMin: 31,
      stopCount: 12,
      platform: '1番線',
      boarding: {
        car: 8, carLabel: '8号車', position: 'middle', positionLabel: '中程',
        elevatorNote: '上野駅 公園口のエレベーターで1番線ホームへ。8号車はホーム中程に停車します。',
      },
      alighting: {
        car: 8, carLabel: '8号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '品川駅 8号車を降りてホーム前方に進むとエレベーターがあります。中央改札を通り抜けてください。',
      },
    }],
  }],

  // ─── 新宿 → 池袋 ───────────────────────────────────────
  '新宿|池袋': [{
    baseDurationMin: 11,
    highlight: '乗換なし・山手線外回り',
    arrivalNote: '池袋駅は3号車付近を降りると南改札のエレベーターに近い位置です。東口・西口どちらへも便利です。',
    scoreBreakdown: { elevator: 36, platform: 18, transfer: 20, time: 19 },
    segments: [{
      fromStation: '新宿',
      toStation: '池袋',
      lineId: 'yamanote',
      lineName: 'JR山手線（外回り）',
      lineColor: '#9acd32',
      trainType: '各駅停車',
      durationMin: 11,
      stopCount: 4,
      platform: '3・4番線',
      boarding: {
        car: 3, carLabel: '3号車', position: 'middle', positionLabel: '中程',
        elevatorNote: '新宿駅 南改札のエレベーターで3番線ホームへ。3号車はホーム中程寄りに停車します。',
      },
      alighting: {
        car: 3, carLabel: '3号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '池袋駅 3号車を降りると南改札方面。そのままエレベーターで改札へ出ます。',
      },
    }],
  }],

  // ─── 池袋 → 新宿 ───────────────────────────────────────
  '池袋|新宿': [{
    baseDurationMin: 11,
    highlight: '乗換なし・山手線内回り',
    arrivalNote: '新宿駅は6号車付近を降りると南改札のエレベーターに近い位置。そのまま南口・西口方面へ。',
    scoreBreakdown: { elevator: 36, platform: 18, transfer: 20, time: 19 },
    segments: [{
      fromStation: '池袋',
      toStation: '新宿',
      lineId: 'yamanote',
      lineName: 'JR山手線（内回り）',
      lineColor: '#9acd32',
      trainType: '各駅停車',
      durationMin: 11,
      stopCount: 4,
      platform: '1・2番線',
      boarding: {
        car: 6, carLabel: '6号車', position: 'middle', positionLabel: '中程',
        elevatorNote: '池袋駅 南改札のエレベーターで1番線ホームへ。6号車はホーム中程に停車します。',
      },
      alighting: {
        car: 6, carLabel: '6号車', position: 'front', positionLabel: '前寄り',
        elevatorNote: '新宿駅 6号車を降りて前方へ進むと南改札エレベーターがあります。',
      },
    }],
  }],
};

// ============================================================
// デモ用サンプル経路（トップ画面に表示）
// ============================================================
export const DEMO_ROUTES = [
  { from: '新宿', to: '渋谷',  time: '09:00', label: '通勤タイム 新宿→渋谷' },
  { from: '池袋', to: '銀座',  time: '10:30', label: 'お出かけ 池袋→銀座'   },
  { from: '東京', to: '六本木', time: '13:00', label: 'ランチ後 東京→六本木' },
];
