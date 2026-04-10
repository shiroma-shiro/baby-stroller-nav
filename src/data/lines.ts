// ============================================================
// 路線グラフ定義 — 都内主要26路線
// ============================================================

export interface LineDef {
  id: string;
  name: string;
  shortName: string;
  color: string;
  textColor: string;
  stations: string[];
  avgMinPerStop: number;
  frequencyMin: number;
  cars: number;
  circular: boolean;
  dirForward: string;
  dirBackward: string;
}

export const LINES: LineDef[] = [
  // ── JR ────────────────────────────────────────────────────
  {
    id: 'yamanote', name: 'JR山手線', shortName: '山手線',
    color: '#9acd32', textColor: '#fff', circular: true,
    avgMinPerStop: 1.5, frequencyMin: 4, cars: 11,
    dirForward: '内回り', dirBackward: '外回り',
    stations: [
      '品川','大崎','五反田','目黒','恵比寿','渋谷','原宿','代々木',
      '新宿','新大久保','高田馬場','目白','池袋','大塚','巣鴨','駒込',
      '田端','西日暮里','日暮里','鶯谷','上野','御徒町','秋葉原','神田',
      '東京','有楽町','新橋','浜松町','田町','高輪ゲートウェイ',
    ],
  },
  {
    id: 'jr-chuo', name: 'JR中央線快速', shortName: '中央線',
    color: '#E60012', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 5, cars: 10,
    dirForward: '高尾方面', dirBackward: '東京方面',
    stations: [
      '東京','神田','御茶ノ水','四ツ谷','新宿','中野','高円寺','阿佐ヶ谷',
      '荻窪','西荻窪','吉祥寺','三鷹','武蔵境','東小金井','武蔵小金井',
      '国分寺','西国分寺','国立','立川','日野','豊田','八王子','西八王子','高尾',
    ],
  },
  {
    id: 'jr-sobu', name: 'JR総武線各停', shortName: '総武線',
    color: '#F4C400', textColor: '#333', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 4, cars: 10,
    dirForward: '千葉方面', dirBackward: '三鷹方面',
    stations: [
      '三鷹','吉祥寺','西荻窪','荻窪','阿佐ヶ谷','高円寺','中野','東中野',
      '大久保','新宿','代々木','千駄ヶ谷','信濃町','四ツ谷','市ケ谷','飯田橋',
      '水道橋','御茶ノ水','秋葉原','浅草橋','両国','錦糸町','亀戸','平井',
      '新小岩','小岩','市川','本八幡','下総中山','西船橋','船橋','東船橋',
      '津田沼','幕張本郷','幕張','新検見川','稲毛','西千葉','千葉',
    ],
  },
  {
    id: 'jr-keihin', name: 'JR京浜東北線', shortName: '京浜東北線',
    color: '#00AAAD', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 3, cars: 10,
    dirForward: '大船方面', dirBackward: '大宮方面',
    stations: [
      '大宮','さいたま新都心','与野','北浦和','浦和','南浦和','蕨','西川口',
      '川口','赤羽','東十条','王子','上中里','田端','西日暮里','日暮里',
      '鶯谷','上野','御徒町','秋葉原','神田','東京','有楽町','新橋',
      '浜松町','田町','高輪ゲートウェイ','品川','大井町','大森','蒲田',
      '川崎','鶴見','新子安','東神奈川','横浜','桜木町','関内','石川町',
      '山手','根岸','磯子','新杉田','洋光台','港南台','本郷台','大船',
    ],
  },
  // ── 東京メトロ ────────────────────────────────────────────
  {
    id: 'marunouchi', name: '東京メトロ丸ノ内線', shortName: '丸ノ内線',
    color: '#e60012', textColor: '#fff', circular: false,
    avgMinPerStop: 1.8, frequencyMin: 5, cars: 6,
    dirForward: '荻窪方面', dirBackward: '池袋方面',
    stations: [
      '池袋','新大塚','茗荷谷','後楽園','本郷三丁目','御茶ノ水',
      '淡路町','大手町','東京','銀座','霞ヶ関','国会議事堂前',
      '赤坂見附','四ツ谷','四谷三丁目','新宿御苑前','新宿三丁目','新宿','西新宿',
    ],
  },
  {
    id: 'ginza', name: '東京メトロ銀座線', shortName: '銀座線',
    color: '#f39700', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 3, cars: 6,
    dirForward: '浅草方面', dirBackward: '渋谷方面',
    stations: [
      '渋谷','表参道','外苑前','青山一丁目','赤坂見附','溜池山王',
      '虎ノ門','新橋','銀座','京橋','日本橋','三越前','神田',
      '末広町','上野広小路','上野','稲荷町','田原町','浅草',
    ],
  },
  {
    id: 'hibiya', name: '東京メトロ日比谷線', shortName: '日比谷線',
    color: '#9caeb7', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 5, cars: 8,
    dirForward: '北千住方面', dirBackward: '中目黒方面',
    stations: [
      '中目黒','恵比寿','広尾','六本木','神谷町','霞ヶ関',
      '日比谷','銀座','東銀座','築地','八丁堀','茅場町',
      '人形町','小伝馬町','秋葉原','仲御徒町','上野','入谷',
      '三ノ輪','南千住','北千住',
    ],
  },
  {
    id: 'tozai', name: '東京メトロ東西線', shortName: '東西線',
    color: '#00A7DB', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 4, cars: 10,
    dirForward: '西船橋方面', dirBackward: '中野方面',
    stations: [
      '中野','落合','高田馬場','早稲田','神楽坂','飯田橋','九段下',
      '竹橋','大手町','日本橋','茅場町','門前仲町','木場','東陽町',
      '南砂町','西葛西','葛西','浦安','南行徳','行徳','妙典','原木中山','西船橋',
    ],
  },
  {
    id: 'chiyoda', name: '東京メトロ千代田線', shortName: '千代田線',
    color: '#00BB85', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 5, cars: 10,
    dirForward: '綾瀬方面', dirBackward: '代々木上原方面',
    stations: [
      '代々木上原','代々木公園','明治神宮前','表参道','乃木坂','赤坂',
      '国会議事堂前','霞ヶ関','日比谷','二重橋前','大手町','新御茶ノ水',
      '湯島','根津','千駄木','西日暮里','町屋','北千住','綾瀬',
    ],
  },
  {
    id: 'yurakucho', name: '東京メトロ有楽町線', shortName: '有楽町線',
    color: '#C3A23B', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 5, cars: 10,
    dirForward: '新木場方面', dirBackward: '和光市方面',
    stations: [
      '和光市','地下鉄成増','地下鉄赤塚','平和台','氷川台','小竹向原',
      '千川','要町','池袋','東池袋','護国寺','江戸川橋','飯田橋',
      '市ケ谷','麹町','永田町','桜田門','有楽町','銀座一丁目',
      '新富町','月島','豊洲','辰巳','新木場',
    ],
  },
  {
    id: 'hanzomon', name: '東京メトロ半蔵門線', shortName: '半蔵門線',
    color: '#8F76D6', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 5, cars: 10,
    dirForward: '押上方面', dirBackward: '渋谷方面',
    stations: [
      '渋谷','表参道','青山一丁目','永田町','半蔵門','九段下',
      '神保町','大手町','三越前','水天宮前','清澄白河',
      '住吉','錦糸町','押上',
    ],
  },
  {
    id: 'namboku', name: '東京メトロ南北線', shortName: '南北線',
    color: '#00AC9B', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 5, cars: 6,
    dirForward: '赤羽岩淵方面', dirBackward: '目黒方面',
    stations: [
      '目黒','白金台','白金高輪','麻布十番','六本木一丁目','溜池山王',
      '永田町','四ツ谷','市ケ谷','飯田橋','後楽園','東大前',
      '本駒込','駒込','西ケ原','王子','王子神谷','志茂','赤羽岩淵',
    ],
  },
  {
    id: 'fukutoshin', name: '東京メトロ副都心線', shortName: '副都心線',
    color: '#9C5E31', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 6, cars: 10,
    dirForward: '渋谷方面', dirBackward: '和光市方面',
    stations: [
      '和光市','地下鉄成増','地下鉄赤塚','平和台','氷川台','小竹向原',
      '千川','要町','池袋','雑司が谷','西早稲田','東新宿',
      '新宿三丁目','北参道','明治神宮前','渋谷',
    ],
  },
  // ── 都営地下鉄 ────────────────────────────────────────────
  {
    id: 'asakusa', name: '都営浅草線', shortName: '浅草線',
    color: '#e85298', textColor: '#fff', circular: false,
    avgMinPerStop: 2.2, frequencyMin: 10, cars: 8,
    dirForward: '押上方面', dirBackward: '西馬込方面',
    stations: [
      '西馬込','馬込','中延','戸越','五反田','高輪台','泉岳寺',
      '三田','大門','新橋','宝町','日本橋','人形町','東日本橋',
      '浅草橋','蔵前','浅草','本所吾妻橋','押上',
    ],
  },
  {
    id: 'toei-mita', name: '都営三田線', shortName: '三田線',
    color: '#0079C2', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 8, cars: 6,
    dirForward: '西高島平方面', dirBackward: '目黒方面',
    stations: [
      '目黒','白金台','白金高輪','三田','芝公園','御成門','内幸町',
      '日比谷','大手町','神保町','水道橋','春日','白山','千石',
      '巣鴨','西巣鴨','新板橋','板橋区役所前','板橋本町','本蓮沼',
      '志村坂上','志村三丁目','蓮根','西台','高島平','新高島平','西高島平',
    ],
  },
  {
    id: 'shinjuku', name: '都営新宿線', shortName: '新宿線',
    color: '#6CBB5A', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 8, cars: 10,
    dirForward: '本八幡方面', dirBackward: '新宿方面',
    stations: [
      '新宿','新宿三丁目','曙橋','市ケ谷','九段下','神保町',
      '小川町','岩本町','馬喰横山','浜町','森下','菊川','住吉',
      '西大島','大島','東大島','船堀','一之江','瑞江','篠崎','本八幡',
    ],
  },
  {
    id: 'oedo', name: '都営大江戸線', shortName: '大江戸線',
    color: '#B51B8D', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 5, cars: 8,
    dirForward: '新宿方面', dirBackward: '光が丘方面',
    stations: [
      '光が丘','練馬春日町','豊島園','練馬','新江古田','落合南長崎',
      '中井','都庁前','新宿西口','東新宿','若松河田','牛込神楽坂',
      '飯田橋','春日','本郷三丁目','上野御徒町','新御徒町','蔵前',
      '両国','森下','清澄白河','門前仲町','月島','勝どき','築地市場',
      '汐留','大門','赤羽橋','麻布十番','六本木','青山一丁目',
      '国立競技場','代々木','新宿',
    ],
  },
  // ── 東急 ─────────────────────────────────────────────────
  {
    id: 'tokyu-toyoko', name: '東急東横線', shortName: '東横線',
    color: '#E60012', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 5, cars: 10,
    dirForward: '横浜方面', dirBackward: '渋谷方面',
    stations: [
      '渋谷','代官山','中目黒','祐天寺','学芸大学','都立大学',
      '自由が丘','田園調布','多摩川','新丸子','武蔵小杉','元住吉',
      '日吉','綱島','大倉山','菊名','妙蓮寺','白楽','東白楽','反町','横浜',
    ],
  },
  {
    id: 'tokyu-denentoshi', name: '東急田園都市線', shortName: '田園都市線',
    color: '#3E9B4F', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 4, cars: 10,
    dirForward: '中央林間方面', dirBackward: '渋谷方面',
    stations: [
      '渋谷','池尻大橋','三軒茶屋','駒沢大学','桜新町','用賀',
      '二子玉川','二子新地','高津','溝の口','梶が谷','宮崎台','宮前平',
      '鷺沼','たまプラーザ','あざみ野','江田','市が尾','藤が丘','青葉台',
      '田奈','長津田','つくし野','すずかけ台','南町田グランベリーパーク','つきみ野','中央林間',
    ],
  },
  {
    id: 'tokyu-meguro', name: '東急目黒線', shortName: '目黒線',
    color: '#00B398', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 6, cars: 6,
    dirForward: '日吉方面', dirBackward: '目黒方面',
    stations: [
      '目黒','不動前','武蔵小山','西小山','洗足','大岡山','奥沢',
      '田園調布','多摩川','新丸子','武蔵小杉','元住吉','日吉',
    ],
  },
  // ── 私鉄 ─────────────────────────────────────────────────
  {
    id: 'odakyu', name: '小田急小田原線', shortName: '小田急線',
    color: '#0066B3', textColor: '#fff', circular: false,
    avgMinPerStop: 3.0, frequencyMin: 6, cars: 10,
    dirForward: '小田原方面', dirBackward: '新宿方面',
    stations: [
      '新宿','南新宿','参宮橋','代々木八幡','代々木上原','東北沢',
      '下北沢','世田谷代田','梅ヶ丘','豪徳寺','経堂','千歳船橋',
      '祖師ヶ谷大蔵','成城学園前','喜多見','狛江','和泉多摩川',
      '登戸','向ヶ丘遊園','生田','読売ランド前','百合ヶ丘','新百合ヶ丘',
      '柿生','鶴川','玉川学園前','町田','相模大野','小田急相模原',
      '相武台前','座間','海老名','厚木','本厚木','愛甲石田','伊勢原',
      '鶴巻温泉','東海大学前','秦野','渋沢','新松田','松田',
      '開成','栢山','富水','螢田','足柄','小田原',
    ],
  },
  {
    id: 'keio', name: '京王線', shortName: '京王線',
    color: '#87008F', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 6, cars: 8,
    dirForward: '京王八王子方面', dirBackward: '新宿方面',
    stations: [
      '新宿','笹塚','代田橋','明大前','下高井戸','桜上水','上北沢',
      '八幡山','芦花公園','千歳烏山','仙川','柴崎','国領','布田',
      '調布','西調布','飛田給','武蔵野台','多磨霊園','東府中','府中',
      '分倍河原','中河原','聖蹟桜ヶ丘','百草園','高幡不動',
      '南平','平山城址公園','長沼','北野','京王八王子',
    ],
  },
  {
    id: 'seibu-ikebukuro', name: '西武池袋線', shortName: '西武池袋線',
    color: '#0079C2', textColor: '#fff', circular: false,
    avgMinPerStop: 3.0, frequencyMin: 8, cars: 10,
    dirForward: '飯能方面', dirBackward: '池袋方面',
    stations: [
      '池袋','椎名町','東長崎','江古田','桜台','練馬','中村橋',
      '富士見台','練馬高野台','石神井公園','大泉学園','保谷',
      'ひばりが丘','東久留米','清瀬','秋津','所沢','西所沢',
      '小手指','狭山ヶ丘','武蔵藤沢','稲荷山公園','入間市','仏子','元加治','飯能',
    ],
  },
  {
    id: 'tobu-tojo', name: '東武東上線', shortName: '東武東上線',
    color: '#0A82C6', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 8, cars: 10,
    dirForward: '小川町方面', dirBackward: '池袋方面',
    stations: [
      '池袋','北池袋','下板橋','大山','中板橋','ときわ台','上板橋',
      '東武練馬','下赤塚','成増','和光市','朝霞','朝霞台','志木',
      '柳瀬川','みずほ台','鶴瀬','ふじみ野','上福岡','新河岸',
      '川越','川越市','霞ヶ関','鶴ヶ島','若葉','坂戸','北坂戸',
      '高坂','東松山','森林公園','武蔵嵐山','小川町',
    ],
  },
  {
    id: 'tobu-skytree', name: '東武スカイツリーライン', shortName: 'スカイツリーライン',
    color: '#F87B42', textColor: '#fff', circular: false,
    avgMinPerStop: 2.5, frequencyMin: 6, cars: 10,
    dirForward: '東武動物公園方面', dirBackward: '浅草方面',
    stations: [
      '浅草','とうきょうスカイツリー','曳舟','東向島','鐘ヶ淵','堀切',
      '牛田','北千住','小菅','五反野','梅島','西新井','竹ノ塚',
      '谷塚','草加','獨協大学前','新田','蒲生','新越谷','越谷',
      '北越谷','大袋','せんげん台','武里','一ノ割','春日部','北春日部',
      '姫宮','東武動物公園',
    ],
  },
  {
    id: 'keikyu', name: '京急本線', shortName: '京急線',
    color: '#CC0033', textColor: '#fff', circular: false,
    avgMinPerStop: 2.0, frequencyMin: 5, cars: 8,
    dirForward: '浦賀方面', dirBackward: '品川方面',
    stations: [
      '品川','北品川','新馬場','青物横丁','鮫洲','立会川','大森海岸',
      '平和島','大森町','梅屋敷','京急蒲田','雑色','六郷土手',
      '京急川崎','八丁畷','鶴見市場','京急鶴見','花月総持寺','生麦',
      '京急新子安','子安','神奈川新町','仲木戸','神奈川','横浜',
      '戸部','日ノ出町','黄金町','南太田','井土ヶ谷','弘明寺',
      '上大岡','屏風浦','杉田','京急富岡','能見台','金沢文庫',
      '金沢八景','追浜','京急田浦','安針塚','逸見','汐入',
      '横須賀中央','県立大学','堀ノ内','京急大津','馬堀海岸','浦賀',
    ],
  },
  // ── JR京葉線 ─────────────────────────────────────────────────
  {
    id: 'jr-keiyo', name: 'JR京葉線', shortName: '京葉線',
    color: '#CC0033', textColor: '#fff', circular: false,
    avgMinPerStop: 3.0, frequencyMin: 10, cars: 10,
    dirForward: '蘇我方面', dirBackward: '東京方面',
    stations: [
      '東京','八丁堀','越中島','潮見','新木場',
      '葛西臨海公園','舞浜','新浦安','市川塩浜','西船橋',
      '二俣新町','南船橋','海浜幕張','検見川浜','稲毛海岸',
      '千葉みなと','蘇我',
    ],
  },
  // ── ゆりかもめ ───────────────────────────────────────────────
  {
    id: 'yurikamome', name: 'ゆりかもめ', shortName: 'ゆりかもめ',
    color: '#1094C1', textColor: '#fff', circular: false,
    avgMinPerStop: 2.2, frequencyMin: 5, cars: 6,
    dirForward: '豊洲方面', dirBackward: '新橋方面',
    stations: [
      '新橋','汐留','竹芝','日の出','芝浦ふ頭',
      'お台場海浜公園','台場','東京国際クルーズターミナル',
      'テレコムセンター','青海','有明テニスの森','有明',
      '市場前','新豊洲','豊洲',
    ],
  },
];

// ============================================================
// 乗換定義
// ============================================================
export interface TransferDef {
  station1: string;
  line1: string;
  station2: string;
  line2: string;
  transferMin: number;
  elevatorNote: string;
}

function mkT(s1: string, l1: string, s2: string, l2: string, min: number, note: string): TransferDef {
  return { station1: s1, line1: l1, station2: s2, line2: l2, transferMin: min, elevatorNote: note };
}
function pair(s1: string, l1: string, s2: string, l2: string, min: number, n1: string, n2: string): TransferDef[] {
  return [mkT(s1, l1, s2, l2, min, n1), mkT(s2, l2, s1, l1, min, n2)];
}
function same(st: string, l1: string, l2: string, min: number): TransferDef[] {
  const n = `${st}駅でエレベーターを使って乗換（約${min}分）`;
  return pair(st, l1, st, l2, min, n, n);
}

export const TRANSFERS: TransferDef[] = [
  // ── 渋谷 ─────────────────────────────────────────────────
  ...same('渋谷', 'yamanote',       'ginza',            5),
  ...same('渋谷', 'yamanote',       'hanzomon',         5),
  ...same('渋谷', 'yamanote',       'tokyu-toyoko',     5),
  ...same('渋谷', 'yamanote',       'tokyu-denentoshi', 5),
  ...same('渋谷', 'yamanote',       'fukutoshin',       3),
  ...same('渋谷', 'hanzomon',       'tokyu-denentoshi', 2),
  ...same('渋谷', 'fukutoshin',     'tokyu-toyoko',     2),
  ...same('渋谷', 'hanzomon',       'fukutoshin',       3),
  ...same('渋谷', 'ginza',          'yamanote',         5),
  // ── 新宿 ─────────────────────────────────────────────────
  ...same('新宿', 'yamanote',   'marunouchi',   6),
  ...same('新宿', 'yamanote',   'oedo',         5),
  ...same('新宿', 'yamanote',   'shinjuku',     5),
  ...same('新宿', 'yamanote',   'odakyu',       5),
  ...same('新宿', 'yamanote',   'keio',         5),
  ...same('新宿', 'marunouchi', 'oedo',         5),
  ...same('新宿', 'marunouchi', 'shinjuku',     5),
  ...same('新宿', 'shinjuku',   'oedo',         3),
  // ── 池袋 ─────────────────────────────────────────────────
  ...same('池袋', 'yamanote',       'marunouchi',       6),
  ...same('池袋', 'yamanote',       'yurakucho',        5),
  ...same('池袋', 'yamanote',       'fukutoshin',       5),
  ...same('池袋', 'yamanote',       'seibu-ikebukuro',  5),
  ...same('池袋', 'yamanote',       'tobu-tojo',        5),
  ...same('池袋', 'marunouchi',     'yurakucho',        4),
  ...same('池袋', 'marunouchi',     'fukutoshin',       4),
  ...same('池袋', 'yurakucho',      'fukutoshin',       2),
  ...same('池袋', 'fukutoshin',     'tobu-tojo',        3),
  ...same('池袋', 'yurakucho',      'tobu-tojo',        3),
  ...same('池袋', 'seibu-ikebukuro','tobu-tojo',        8),
  // ── 品川 ─────────────────────────────────────────────────
  ...same('品川', 'yamanote', 'keikyu',      4),
  ...same('品川', 'yamanote', 'jr-keihin',   3),
  // ── 東京 ─────────────────────────────────────────────────
  ...same('東京', 'yamanote',   'marunouchi',   6),
  ...same('東京', 'yamanote',   'jr-chuo',      3),
  ...same('東京', 'yamanote',   'jr-keihin',    3),
  ...same('東京', 'marunouchi', 'jr-keihin',    5),
  // ── 上野 ─────────────────────────────────────────────────
  ...same('上野', 'yamanote',  'ginza',      5),
  ...same('上野', 'yamanote',  'hibiya',     5),
  ...same('上野', 'yamanote',  'jr-keihin',  3),
  ...same('上野', 'ginza',     'hibiya',     3),
  // ── 秋葉原 ───────────────────────────────────────────────
  ...same('秋葉原', 'yamanote',  'hibiya',     4),
  ...same('秋葉原', 'yamanote',  'jr-sobu',    3),
  ...same('秋葉原', 'yamanote',  'jr-keihin',  3),
  ...same('秋葉原', 'hibiya',    'jr-sobu',    4),
  // ── 神田 ─────────────────────────────────────────────────
  ...same('神田', 'yamanote',  'ginza',      3),
  ...same('神田', 'yamanote',  'jr-chuo',    3),
  ...same('神田', 'yamanote',  'jr-keihin',  2),
  // ── 新橋 ─────────────────────────────────────────────────
  ...same('新橋', 'yamanote',    'ginza',       3),
  ...same('新橋', 'yamanote',    'asakusa',     5),
  ...same('新橋', 'ginza',       'asakusa',     4),
  ...same('新橋', 'yamanote',    'jr-keihin',   2),
  ...same('新橋', 'yamanote',    'yurikamome',  5),
  ...same('新橋', 'ginza',       'yurikamome',  5),
  ...same('新橋', 'asakusa',     'yurikamome',  6),
  ...same('新橋', 'jr-keihin',   'yurikamome',  5),
  // ── 有楽町 ───────────────────────────────────────────────
  ...same('有楽町', 'yamanote',  'jr-keihin',   2),
  ...same('有楽町', 'yamanote',  'yurakucho',   5),
  ...same('有楽町', 'yurakucho', 'jr-keihin',   5),
  // ── 浜松町・田町 ────────────────────────────────────────
  ...same('浜松町', 'yamanote', 'jr-keihin', 2),
  ...same('田町',   'yamanote', 'jr-keihin', 2),
  ...same('高輪ゲートウェイ', 'yamanote', 'jr-keihin', 2),
  // ── 恵比寿 ───────────────────────────────────────────────
  ...same('恵比寿', 'yamanote', 'hibiya', 5),
  // ── 目黒 ─────────────────────────────────────────────────
  ...same('目黒', 'yamanote',    'tokyu-meguro', 4),
  ...same('目黒', 'yamanote',    'toei-mita',    4),
  ...same('目黒', 'yamanote',    'namboku',      4),
  ...same('目黒', 'tokyu-meguro','toei-mita',    2),
  ...same('目黒', 'tokyu-meguro','namboku',      2),
  ...same('目黒', 'toei-mita',   'namboku',      2),
  // ── 五反田 ───────────────────────────────────────────────
  ...same('五反田', 'yamanote', 'asakusa', 5),
  // ── 大崎 ─────────────────────────────────────────────────
  ...same('大崎', 'yamanote', 'jr-keihin', 2),
  // ── 巣鴨 ─────────────────────────────────────────────────
  ...same('巣鴨', 'yamanote', 'toei-mita', 5),
  // ── 駒込 ─────────────────────────────────────────────────
  ...same('駒込', 'yamanote', 'namboku', 5),
  // ── 西日暮里 ────────────────────────────────────────────
  ...same('西日暮里', 'yamanote',  'chiyoda',    4),
  ...same('西日暮里', 'yamanote',  'jr-keihin',  2),
  ...same('西日暮里', 'chiyoda',   'jr-keihin',  4),
  // ── 日暮里 ───────────────────────────────────────────────
  ...same('日暮里', 'yamanote', 'jr-keihin', 2),
  // ── 鶯谷 ─────────────────────────────────────────────────
  ...same('鶯谷', 'yamanote', 'jr-keihin', 2),
  // ── 王子 ─────────────────────────────────────────────────
  ...same('王子', 'jr-keihin', 'namboku', 5),
  // ── 田端 ─────────────────────────────────────────────────
  ...same('田端', 'yamanote', 'jr-keihin', 2),
  // ── 北千住 ───────────────────────────────────────────────
  ...same('北千住', 'hibiya',       'chiyoda',       3),
  ...same('北千住', 'hibiya',       'tobu-skytree',  5),
  ...same('北千住', 'chiyoda',      'tobu-skytree',  5),
  ...same('北千住', 'hibiya',       'jr-keihin',     5),
  // ── 銀座 ─────────────────────────────────────────────────
  ...same('銀座', 'marunouchi', 'ginza',    4),
  ...same('銀座', 'marunouchi', 'hibiya',   4),
  ...same('銀座', 'ginza',      'hibiya',   3),
  // ── 大手町 ───────────────────────────────────────────────
  ...same('大手町', 'marunouchi', 'tozai',    5),
  ...same('大手町', 'marunouchi', 'chiyoda',  5),
  ...same('大手町', 'marunouchi', 'hanzomon', 5),
  ...same('大手町', 'marunouchi', 'toei-mita',5),
  ...same('大手町', 'tozai',      'chiyoda',  3),
  ...same('大手町', 'tozai',      'hanzomon', 3),
  ...same('大手町', 'chiyoda',    'hanzomon', 3),
  ...same('大手町', 'chiyoda',    'toei-mita',4),
  // ── 表参道 ───────────────────────────────────────────────
  ...same('表参道', 'ginza',    'chiyoda',  4),
  ...same('表参道', 'ginza',    'hanzomon', 4),
  ...same('表参道', 'chiyoda',  'hanzomon', 3),
  // ── 永田町/赤坂見附 ─────────────────────────────────────
  ...same('赤坂見附', 'marunouchi', 'ginza',     3),
  ...same('永田町',   'ginza',      'hanzomon',  3),
  ...same('永田町',   'ginza',      'namboku',   3),
  ...same('永田町',   'ginza',      'yurakucho', 3),
  ...same('永田町',   'hanzomon',   'namboku',   2),
  ...same('永田町',   'hanzomon',   'yurakucho', 2),
  ...same('永田町',   'namboku',    'yurakucho', 2),
  // ── 溜池山王 ─────────────────────────────────────────────
  ...same('溜池山王', 'ginza',  'namboku',  3),
  // ── 霞ヶ関 ───────────────────────────────────────────────
  ...same('霞ヶ関', 'marunouchi', 'hibiya',   4),
  ...same('霞ヶ関', 'marunouchi', 'chiyoda',  4),
  ...same('霞ヶ関', 'hibiya',     'chiyoda',  3),
  // ── 日比谷 ───────────────────────────────────────────────
  ...same('日比谷', 'hibiya',    'chiyoda',   3),
  ...same('日比谷', 'hibiya',    'toei-mita', 4),
  ...same('日比谷', 'chiyoda',   'toei-mita', 4),
  // ── 国会議事堂前 ──────────────────────────────────────────
  ...same('国会議事堂前', 'marunouchi', 'chiyoda', 3),
  // ── 茅場町 ───────────────────────────────────────────────
  ...same('茅場町', 'hibiya', 'tozai', 3),
  // ── 九段下 ───────────────────────────────────────────────
  ...same('九段下', 'tozai',   'hanzomon', 3),
  ...same('九段下', 'tozai',   'shinjuku', 4),
  ...same('九段下', 'hanzomon','shinjuku',  4),
  // ── 神保町 ───────────────────────────────────────────────
  ...same('神保町', 'hanzomon', 'shinjuku',  3),
  ...same('神保町', 'hanzomon', 'toei-mita', 4),
  ...same('神保町', 'shinjuku', 'toei-mita', 4),
  // ── 飯田橋 ───────────────────────────────────────────────
  ...same('飯田橋', 'tozai',    'yurakucho', 3),
  ...same('飯田橋', 'tozai',    'namboku',   3),
  ...same('飯田橋', 'tozai',    'oedo',      4),
  ...same('飯田橋', 'namboku',  'yurakucho', 2),
  ...same('飯田橋', 'namboku',  'oedo',      4),
  ...same('飯田橋', 'yurakucho','oedo',      4),
  // ── 後楽園 / 春日 ─────────────────────────────────────────
  ...same('後楽園', 'marunouchi', 'namboku',   3),
  ...same('後楽園', 'marunouchi', 'yurakucho', 3),
  ...same('後楽園', 'namboku',    'yurakucho', 2),
  ...pair('後楽園', 'namboku',    '春日', 'toei-mita', 4,
    '南北線後楽園→都営三田線春日：連絡通路でエレベーター乗換（約4分）',
    '都営三田線春日→南北線後楽園：連絡通路でエレベーター乗換（約4分）'),
  ...pair('後楽園', 'namboku',    '春日', 'oedo', 4,
    '南北線後楽園→大江戸線春日：連絡通路でエレベーター乗換（約4分）',
    '大江戸線春日→南北線後楽園：連絡通路でエレベーター乗換（約4分）'),
  ...pair('後楽園', 'marunouchi', '春日', 'oedo', 5,
    '丸ノ内線後楽園→大江戸線春日：連絡通路でエレベーター乗換（約5分）',
    '大江戸線春日→丸ノ内線後楽園：連絡通路でエレベーター乗換（約5分）'),
  ...same('春日', 'toei-mita', 'oedo', 3),
  // ── 市ケ谷 ───────────────────────────────────────────────
  ...same('市ケ谷', 'marunouchi', 'yurakucho', 3),
  ...same('市ケ谷', 'marunouchi', 'namboku',   3),
  ...same('市ケ谷', 'marunouchi', 'shinjuku',  3),
  ...same('市ケ谷', 'yurakucho',  'namboku',   2),
  ...same('市ケ谷', 'yurakucho',  'shinjuku',  3),
  // ── 四ツ谷 ───────────────────────────────────────────────
  ...same('四ツ谷', 'marunouchi', 'namboku',  3),
  ...same('四ツ谷', 'marunouchi', 'jr-chuo',  3),
  ...same('四ツ谷', 'jr-chuo',    'namboku',  3),
  // ── 御茶ノ水 ─────────────────────────────────────────────
  ...same('御茶ノ水', 'marunouchi', 'jr-chuo',  3),
  ...same('御茶ノ水', 'marunouchi', 'jr-sobu',  3),
  ...same('御茶ノ水', 'jr-chuo',    'jr-sobu',  2),
  // ── 新御茶ノ水 ───────────────────────────────────────────
  ...pair('新御茶ノ水', 'chiyoda', '御茶ノ水', 'marunouchi', 3,
    '千代田線新御茶ノ水→丸ノ内線御茶ノ水：地上経由でエレベーター（約3分）',
    '丸ノ内線御茶ノ水→千代田線新御茶ノ水：地上経由でエレベーター（約3分）'),
  // ── 月島 ─────────────────────────────────────────────────
  ...same('月島', 'yurakucho', 'oedo', 3),
  // ── 門前仲町 ─────────────────────────────────────────────
  ...same('門前仲町', 'hibiya', 'tozai', 4),
  ...same('門前仲町', 'oedo',   'tozai', 4),
  // ── 住吉 ─────────────────────────────────────────────────
  ...same('住吉', 'hanzomon', 'shinjuku', 4),
  // ── 押上 ─────────────────────────────────────────────────
  ...same('押上', 'asakusa',     'hanzomon',    4),
  ...same('押上', 'asakusa',     'tobu-skytree',5),
  ...same('押上', 'hanzomon',    'tobu-skytree',4),
  // ── 水天宮前 ─────────────────────────────────────────────
  ...pair('水天宮前', 'hanzomon', '人形町', 'asakusa', 5,
    '半蔵門線水天宮前→都営浅草線人形町：地上を歩いてエレベーター乗換（約5分）',
    '都営浅草線人形町→半蔵門線水天宮前：地上を歩いてエレベーター乗換（約5分）'),
  // ── 人形町 ───────────────────────────────────────────────
  ...same('人形町', 'hibiya',  'asakusa', 4),
  // ── 日本橋 ───────────────────────────────────────────────
  ...same('日本橋', 'ginza',   'asakusa', 4),
  ...same('日本橋', 'tozai',   'ginza',   4),
  ...same('日本橋', 'tozai',   'asakusa', 5),
  // ── 三越前 ───────────────────────────────────────────────
  ...same('三越前', 'ginza',   'hanzomon', 4),
  // ── 白金台・白金高輪 ──────────────────────────────────────
  ...same('白金台',   'toei-mita', 'namboku', 2),
  ...same('白金高輪', 'toei-mita', 'namboku', 2),
  // ── 麻布十番 ─────────────────────────────────────────────
  ...same('麻布十番', 'oedo', 'namboku', 3),
  // ── 六本木 ───────────────────────────────────────────────
  ...same('六本木', 'hibiya', 'oedo', 5),
  // ── 大門 ─────────────────────────────────────────────────
  ...same('大門', 'asakusa', 'oedo', 3),
  // ── 汐留 ─────────────────────────────────────────────────
  ...same('汐留', 'oedo', 'jr-keihin', 8),
  // ── 新宿三丁目 ───────────────────────────────────────────
  ...same('新宿三丁目', 'marunouchi', 'fukutoshin', 3),
  ...same('新宿三丁目', 'marunouchi', 'shinjuku',   3),
  ...same('新宿三丁目', 'fukutoshin', 'shinjuku',   2),
  // ── 代々木上原 ───────────────────────────────────────────
  ...same('代々木上原', 'chiyoda', 'odakyu', 3),
  // ── 代々木 ───────────────────────────────────────────────
  ...same('代々木', 'yamanote',  'jr-sobu', 3),
  ...same('代々木', 'yamanote',  'oedo',    5),
  ...same('代々木', 'jr-sobu',   'oedo',    5),
  // ── 原宿/明治神宮前 ──────────────────────────────────────
  ...pair('原宿', 'yamanote', '明治神宮前', 'chiyoda',    5,
    'JR原宿→千代田線明治神宮前：南口を出てエレベーターで乗換（約5分）',
    '千代田線明治神宮前→JR原宿：地上を経由してJR原宿へ（約5分）'),
  ...pair('原宿', 'yamanote', '明治神宮前', 'fukutoshin', 5,
    'JR原宿→副都心線明治神宮前：南口を出てエレベーターで乗換（約5分）',
    '副都心線明治神宮前→JR原宿：地上を経由してJR原宿へ（約5分）'),
  ...same('明治神宮前', 'chiyoda', 'fukutoshin', 3),
  // ── 中野 ─────────────────────────────────────────────────
  ...same('中野', 'jr-chuo',  'tozai',    3),
  ...same('中野', 'jr-sobu',  'tozai',    3),
  ...same('中野', 'jr-chuo',  'jr-sobu',  2),
  // ── 高田馬場 ─────────────────────────────────────────────
  ...same('高田馬場', 'yamanote', 'tozai', 5),
  // ── 三田 ─────────────────────────────────────────────────
  ...same('三田', 'asakusa', 'toei-mita', 5),
  // ── 東京/大手町/二重橋前 ─────────────────────────────────
  ...pair('東京',     'marunouchi', '大手町',    'chiyoda',   4,
    '丸ノ内線東京→千代田線大手町：改札内連絡でエレベーター（約4分）',
    '千代田線大手町→丸ノ内線東京：改札内連絡でエレベーター（約4分）'),
  // ── 和光市 ───────────────────────────────────────────────
  ...same('和光市', 'yurakucho',  'fukutoshin', 2),
  ...same('和光市', 'yurakucho',  'tobu-tojo',  3),
  ...same('和光市', 'fukutoshin', 'tobu-tojo',  2),
  // ── 小竹向原 ─────────────────────────────────────────────
  ...same('小竹向原', 'yurakucho', 'fukutoshin', 2),
  // ── 中目黒 ───────────────────────────────────────────────
  ...same('中目黒', 'hibiya', 'tokyu-toyoko', 4),
  // ── 武蔵小杉 ─────────────────────────────────────────────
  ...same('武蔵小杉', 'tokyu-toyoko', 'tokyu-meguro', 3),
  // ── 田園調布・多摩川・新丸子・日吉（東横↔目黒線共用区間）
  ...same('田園調布', 'tokyu-toyoko', 'tokyu-meguro', 2),
  ...same('多摩川',   'tokyu-toyoko', 'tokyu-meguro', 2),
  ...same('新丸子',   'tokyu-toyoko', 'tokyu-meguro', 2),
  ...same('元住吉',   'tokyu-toyoko', 'tokyu-meguro', 2),
  ...same('日吉',     'tokyu-toyoko', 'tokyu-meguro', 2),
  // ── 浅草 ─────────────────────────────────────────────────
  ...same('浅草', 'ginza',   'asakusa',      5),
  ...same('浅草', 'asakusa', 'tobu-skytree', 5),
  ...same('浅草', 'ginza',   'tobu-skytree', 8),
  // ── 上野広小路/仲御徒町 ──────────────────────────────────
  ...pair('上野広小路', 'ginza', '仲御徒町', 'hibiya', 4,
    '銀座線上野広小路→日比谷線仲御徒町：地上を通ってエレベーター乗換（約4分）',
    '日比谷線仲御徒町→銀座線上野広小路：地上を通ってエレベーター乗換（約4分）'),
  // ── 水道橋 ───────────────────────────────────────────────
  ...same('水道橋', 'jr-sobu', 'toei-mita', 5),
  // ── 錦糸町 ───────────────────────────────────────────────
  ...same('錦糸町', 'jr-sobu', 'hanzomon', 5),
  // ── 赤羽 ─────────────────────────────────────────────────
  ...same('赤羽', 'jr-keihin', 'yamanote', 8),
  // ── 豊洲（有楽町線↔ゆりかもめ）────────────────────────────
  ...same('豊洲', 'yurakucho', 'yurikamome', 5),
  // ── 東京（京葉線↔山手線・中央線・丸ノ内線）─────────────────
  // 京葉線ホームは離れているため乗換時間長め
  ...same('東京', 'jr-keiyo', 'yamanote',   12),
  ...same('東京', 'jr-keiyo', 'jr-keihin',  12),
  ...same('東京', 'jr-keiyo', 'jr-chuo',    15),
  ...same('東京', 'jr-keiyo', 'marunouchi', 12),
  // ── 新木場（京葉線↔有楽町線）────────────────────────────────
  ...same('新木場', 'jr-keiyo', 'yurakucho', 5),
  // ── 西船橋（京葉線↔東西線・総武線）─────────────────────────
  ...same('西船橋', 'jr-keiyo', 'tozai',   5),
  ...same('西船橋', 'jr-keiyo', 'jr-sobu', 5),
];

// ============================================================
// エレベーター号車情報（主要駅）
// ============================================================
export interface ElevatorRec {
  car: number;
  position: string;
  boardNote: string;
  alightNote: string;
}

type ElevatorKey = string;

export const ELEVATOR_MAP: Record<ElevatorKey, ElevatorRec> = {
  // 山手線
  '新宿|yamanote':    { car: 6, position: '前寄り', boardNote: '南改札のエレベーターでホームへ。6号車付近に乗車', alightNote: '6号車降車後すぐ前方にエレベーター' },
  '渋谷|yamanote':    { car: 6, position: '前寄り', boardNote: '南改札のエレベーターでホームへ。6号車付近に乗車', alightNote: '6号車降車後すぐエレベーター（南改札方向）' },
  '池袋|yamanote':    { car: 3, position: '中程',   boardNote: '南改札のエレベーターでホームへ。3号車付近に乗車', alightNote: '3号車降車後前方へ進むと南改札エレベーター' },
  '上野|yamanote':    { car: 4, position: '前寄り', boardNote: '公園口のエレベーターでホームへ。4号車付近に乗車', alightNote: '4号車を降りると公園口方向エレベーター' },
  '東京|yamanote':    { car: 6, position: '中程',   boardNote: '丸ノ内中央口のエレベーターでホームへ。6号車付近に乗車', alightNote: '6号車降車後エレベーターで丸ノ内中央口へ' },
  '品川|yamanote':    { car: 5, position: '中程',   boardNote: '中央改札のエレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで中央改札へ' },
  '新橋|yamanote':    { car: 6, position: '中程',   boardNote: 'JR新橋駅エレベーターでホームへ。6号車付近に乗車', alightNote: '6号車降車後エレベーターで改札へ' },
  '秋葉原|yamanote':  { car: 4, position: '中程',   boardNote: '電気街口のエレベーターでホームへ。4号車付近に乗車', alightNote: '4号車降車後エレベーターで電気街口へ' },
  '恵比寿|yamanote':  { car: 5, position: '中程',   boardNote: '東口のエレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで東口へ' },
  '目黒|yamanote':    { car: 5, position: '中程',   boardNote: '東口のエレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで東口へ' },
  // 中央線
  '東京|jr-chuo':     { car: 5, position: '中程',   boardNote: 'JR東京丸ノ内中央口のエレベーターでホームへ', alightNote: '5号車降車後エレベーターで丸ノ内口へ' },
  '新宿|jr-chuo':     { car: 5, position: '中程',   boardNote: 'JR新宿南改札のエレベーターでホームへ', alightNote: '5号車降車後エレベーターで南改札へ' },
  // 丸ノ内線
  '池袋|marunouchi':   { car: 1, position: '前寄り', boardNote: '地下1Fエレベーターで1番線へ。1号車はホーム前端', alightNote: '1号車降車後すぐエレベーター' },
  '銀座|marunouchi':   { car: 1, position: '後寄り', boardNote: 'エレベーターで改札階→ホームへ。1号車付近に乗車', alightNote: '1号車降車後エレベーターでA13出口（広い）へ' },
  '東京|marunouchi':   { car: 6, position: '後寄り', boardNote: '改札エレベーターでホームへ。6号車はホーム後端', alightNote: '6号車降車後エレベーターで丸ノ内中央口へ' },
  '新宿|marunouchi':   { car: 6, position: '前寄り', boardNote: '丸ノ内線新宿駅エレベーターでホームへ。6号車付近', alightNote: '6号車降車後エレベーターで改札へ' },
  '赤坂見附|marunouchi': { car: 3, position: '中程', boardNote: '赤坂見附駅エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
  '霞ヶ関|marunouchi': { car: 3, position: '中程',   boardNote: '霞ヶ関駅エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
  // 銀座線
  '渋谷|ginza':   { car: 1, position: '前寄り', boardNote: '銀座線は渋谷駅3F。エレベーターで3Fへ上がり1号車に乗車', alightNote: '1号車降車後エレベーターで地上へ' },
  '浅草|ginza':   { car: 6, position: '後寄り', boardNote: '1番出口エレベーターで改札へ。6号車はホーム後端', alightNote: '6号車降車後すぐ1番出口エレベーター' },
  '銀座|ginza':   { car: 3, position: '中程',   boardNote: '銀座駅エレベーターでホームへ。3号車付近に乗車', alightNote: '3号車降車後エレベーターでA13出口（広い）へ' },
  '上野|ginza':   { car: 3, position: '中程',   boardNote: '上野駅銀座線エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
  '表参道|ginza': { car: 2, position: '前寄り', boardNote: '表参道駅エレベーターでホームへ。2号車付近に乗車', alightNote: '2号車降車後エレベーターで改札へ' },
  // 日比谷線
  '六本木|hibiya':  { car: 3, position: '前寄り', boardNote: '六本木駅エレベーターでホームへ。3号車付近に乗車', alightNote: '3号車降車後エレベーターで出口2（広い）へ' },
  '銀座|hibiya':    { car: 4, position: '中程',   boardNote: '銀座駅日比谷線エレベーターでホームへ。4号車付近', alightNote: '4号車降車後エレベーターで改札へ' },
  '上野|hibiya':    { car: 4, position: '中程',   boardNote: '上野駅日比谷線エレベーターでホームへ', alightNote: '4号車降車後エレベーターで改札へ' },
  '恵比寿|hibiya':  { car: 4, position: '中程',   boardNote: '恵比寿駅日比谷線エレベーターでホームへ', alightNote: '4号車降車後エレベーターで改札へ' },
  '中目黒|hibiya':  { car: 1, position: '前寄り', boardNote: '中目黒駅エレベーターでホームへ。1号車はホーム前端', alightNote: '1号車降車後エレベーターで改札へ' },
  '秋葉原|hibiya':  { car: 4, position: '中程',   boardNote: '秋葉原駅日比谷線エレベーターでホームへ', alightNote: '4号車降車後エレベーターで電気街口へ' },
  '北千住|hibiya':  { car: 4, position: '中程',   boardNote: '北千住駅日比谷線エレベーターでホームへ', alightNote: '4号車降車後エレベーターで改札へ' },
  // 浅草線
  '浅草|asakusa':   { car: 4, position: '中程',   boardNote: '浅草駅都営浅草線エレベーターでホームへ', alightNote: '4号車降車後エレベーターで改札へ' },
  '新橋|asakusa':   { car: 4, position: '中程',   boardNote: '新橋駅都営浅草線エレベーターでホームへ', alightNote: '4号車降車後エレベーターで改札へ' },
  '五反田|asakusa': { car: 4, position: '中程',   boardNote: '五反田駅都営浅草線エレベーターでホームへ', alightNote: '4号車降車後エレベーターで改札へ' },
  '大門|asakusa':   { car: 4, position: '中程',   boardNote: '大門駅エレベーターでホームへ', alightNote: '4号車降車後エレベーターで改札・大門出口へ' },
  '押上|asakusa':   { car: 4, position: '中程',   boardNote: '押上駅エレベーターでホームへ', alightNote: '4号車降車後エレベーターでB3出口（広い）へ' },
  // 半蔵門線
  '渋谷|hanzomon':  { car: 5, position: '中程',   boardNote: '半蔵門線渋谷駅エレベーターでホームへ', alightNote: '5号車降車後エレベーターで改札へ' },
  '押上|hanzomon':  { car: 5, position: '中程',   boardNote: '押上駅エレベーターでホームへ', alightNote: '5号車降車後エレベーターでB3出口へ' },
  // 副都心線
  '渋谷|fukutoshin': { car: 5, position: '中程',   boardNote: '副都心線渋谷駅エレベーターでホームへ', alightNote: '5号車降車後エレベーターで改札へ' },
  // 東急東横線
  '渋谷|tokyu-toyoko': { car: 5, position: '中程', boardNote: '東横線渋谷駅エレベーターでホームへ', alightNote: '5号車降車後エレベーターで改札へ' },
  '横浜|tokyu-toyoko': { car: 3, position: '中程', boardNote: '横浜駅東横線エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
  // 田園都市線
  '渋谷|tokyu-denentoshi': { car: 5, position: '中程', boardNote: '田園都市線渋谷駅エレベーターでホームへ', alightNote: '5号車降車後エレベーターで改札へ' },
  // 小田急小田原線
  '新宿|odakyu':        { car: 8, position: '前寄り', boardNote: '小田急新宿駅エレベーターでホームへ。8号車付近に乗車', alightNote: '8号車降車後エレベーターで改札へ' },
  '代々木上原|odakyu':  { car: 5, position: '中程',   boardNote: '代々木上原駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '下北沢|odakyu':      { car: 5, position: '中程',   boardNote: '下北沢駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '成城学園前|odakyu':  { car: 5, position: '中程',   boardNote: '成城学園前駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '登戸|odakyu':        { car: 5, position: '中程',   boardNote: '登戸駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '新百合ヶ丘|odakyu':  { car: 5, position: '中程',   boardNote: '新百合ヶ丘駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '町田|odakyu':        { car: 5, position: '中程',   boardNote: '町田駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '本厚木|odakyu':      { car: 5, position: '中程',   boardNote: '本厚木駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '小田原|odakyu':      { car: 5, position: '中程',   boardNote: '小田原駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  // JR京葉線
  '東京|jr-keiyo':        { car: 5, position: '中程', boardNote: 'JR東京駅京葉線ホームはB1F。エレベーターで地下へ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで地上改札へ' },
  '舞浜|jr-keiyo':        { car: 5, position: '中程', boardNote: '舞浜駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ（ディズニーリゾート口）' },
  '新浦安|jr-keiyo':      { car: 5, position: '中程', boardNote: '新浦安駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '海浜幕張|jr-keiyo':    { car: 5, position: '中程', boardNote: '海浜幕張駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '葛西臨海公園|jr-keiyo':{ car: 5, position: '中程', boardNote: '葛西臨海公園駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  '新木場|jr-keiyo':      { car: 5, position: '中程', boardNote: '新木場駅エレベーターでホームへ。5号車付近に乗車', alightNote: '5号車降車後エレベーターで改札へ' },
  // ゆりかもめ（全駅エレベーター完備）
  '新橋|yurikamome':                    { car: 3, position: '中程', boardNote: '新橋駅ゆりかもめ改札横のエレベーターでホームへ。3号車付近に乗車', alightNote: '3号車降車後エレベーターで改札へ' },
  '汐留|yurikamome':                    { car: 3, position: '中程', boardNote: '汐留駅エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
  '竹芝|yurikamome':                    { car: 3, position: '中程', boardNote: '竹芝駅エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
  'お台場海浜公園|yurikamome':          { car: 3, position: '中程', boardNote: 'お台場海浜公園駅エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札・海浜公園方面へ' },
  '台場|yurikamome':                    { car: 3, position: '中程', boardNote: '台場駅エレベーターでホームへ', alightNote: '3号車降車後エレベーターでフジテレビ方面改札へ' },
  'テレコムセンター|yurikamome':        { car: 3, position: '中程', boardNote: 'テレコムセンター駅エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
  '青海|yurikamome':                    { car: 3, position: '中程', boardNote: '青海駅エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
  '有明|yurikamome':                    { car: 3, position: '中程', boardNote: '有明駅エレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
  '豊洲|yurikamome':                    { car: 3, position: '中程', boardNote: '豊洲駅ゆりかもめエレベーターでホームへ', alightNote: '3号車降車後エレベーターで改札へ' },
};

export function getElevatorRec(stationName: string, lineId: string, totalCars: number): ElevatorRec {
  const key: ElevatorKey = `${stationName}|${lineId}`;
  if (ELEVATOR_MAP[key]) return ELEVATOR_MAP[key];
  const mid = Math.ceil(totalCars / 2);
  return {
    car: mid,
    position: '中程',
    boardNote: `${stationName}駅のエレベーターでホームへ。${mid}号車付近に乗車`,
    alightNote: `${mid}号車降車後エレベーターで改札へ`,
  };
}
