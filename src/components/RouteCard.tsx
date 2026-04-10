import { Route, RouteSegment } from '../types';

const RANK_CONFIG = {
  1: { bg: '#1E3A5F', accent: '#3B9EE8', label: 'いちばんおすすめ', rank: '01' },
  2: { bg: '#0C4A6E', accent: '#0284C7', label: 'おすすめ',         rank: '02' },
  3: { bg: '#374151', accent: '#6B7280', label: 'これもあり',        rank: '03' },
} as const;

// 路線図スタイルのステーションRow
function StationRow({
  label,
  sub,
  isFirst,
  isLast,
  dotColor,
  lineColor,
  children,
}: {
  label: string;
  sub?: string;
  isFirst?: boolean;
  isLast?: boolean;
  dotColor: string;
  lineColor: string;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {/* 左の路線ライン */}
      <div style={{ width: '48px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 上のライン */}
        <div style={{
          width: '4px', flex: isFirst ? '0 0 20px' : '1',
          background: isFirst ? 'transparent' : lineColor,
          minHeight: isFirst ? '20px' : undefined,
        }} />
        {/* 駅ドット */}
        <div style={{
          width: '18px', height: '18px', borderRadius: '50%',
          background: '#fff', border: `4px solid ${dotColor}`,
          flexShrink: 0, zIndex: 1,
        }} />
        {/* 下のライン */}
        <div style={{
          width: '4px', flex: isLast ? '0 0 0px' : '1',
          background: isLast ? 'transparent' : lineColor,
        }} />
      </div>

      {/* 右のコンテンツ */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : '4px' }}>
        <div style={{ paddingTop: '2px', paddingBottom: children ? '16px' : '20px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '22px', fontWeight: 900, color: '#0F1923' }}>{label}</span>
            {sub && <span style={{ fontSize: '16px', fontWeight: 600, color: '#64748B' }}>{sub}</span>}
          </div>
          {children && <div style={{ marginTop: '12px' }}>{children}</div>}
        </div>
      </div>
    </div>
  );
}

function SegmentBlock({ seg, isLast }: { seg: RouteSegment; isLast: boolean }) {
  const lineName = seg.lineName
    .replace('東京メトロ', '').replace('JR', '').replace('都営', '').replace('東急', '').trim();

  return (
    <>
      {/* 乗車駅 */}
      <StationRow
        label={seg.fromStation}
        sub={`${seg.departureTime} 発`}
        isFirst={true}
        dotColor={seg.lineColor}
        lineColor={seg.lineColor}
      >
        {/* 路線バッジ + 号車ボード */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: seg.lineColor, color: '#fff',
            fontSize: '18px', fontWeight: 900,
            padding: '7px 18px', borderRadius: '999px',
            alignSelf: 'flex-start',
          }}>🚃 {lineName}</span>

          {/* 号車カード */}
          <div style={{
            background: '#F8FAFC', border: '2px solid #E2E8F0',
            borderRadius: '18px', padding: '18px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                fontSize: '11px', fontWeight: 900, color: '#94A3B8',
                letterSpacing: '0.2em', margin: '0 0 2px', textTransform: 'uppercase',
              }}>乗車号車</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', lineHeight: 1 }}>
                <span style={{
                  fontSize: '110px', fontWeight: 900, color: seg.lineColor,
                  lineHeight: 1, letterSpacing: '-6px',
                }}>{seg.boarding.car}</span>
                <span style={{
                  fontSize: '34px', fontWeight: 900, color: seg.lineColor,
                  paddingBottom: '18px', marginLeft: '4px',
                }}>号車</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '76px', height: '76px', borderRadius: '20px',
                background: seg.lineColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '34px',
              }}>🛗</div>
              <span style={{
                fontSize: '19px', fontWeight: 900, padding: '8px 18px',
                borderRadius: '999px', background: seg.lineColor, color: '#fff',
              }}>{seg.boarding.positionLabel}</span>
            </div>
          </div>

          {/* エレベーター情報 */}
          <div style={{
            background: '#EFF6FF', borderRadius: '14px',
            padding: '14px 18px',
            borderLeft: `5px solid ${seg.lineColor}`,
          }}>
            <p style={{ fontSize: '13px', fontWeight: 800, color: '#3B9EE8', margin: '0 0 4px', letterSpacing: '0.05em' }}>
              🛗 エレベーターの場所
            </p>
            <p style={{ fontSize: '24px', fontWeight: 700, color: '#1E293B', margin: 0, lineHeight: 1.6 }}>
              {seg.boarding.elevatorNote}
            </p>
          </div>
        </div>
      </StationRow>

      {/* 降車駅 */}
      <StationRow
        label={seg.toStation}
        sub={`${seg.arrivalTime} 着`}
        isLast={isLast}
        dotColor={isLast ? '#22C55E' : seg.lineColor}
        lineColor={seg.lineColor}
      />
    </>
  );
}

export default function RouteCard({ route, rank, onSave }: {
  route: Route; rank: number; onSave: (r: Route) => void;
}) {
  const cfg = RANK_CONFIG[rank as 1 | 2 | 3] ?? RANK_CONFIG[3];
  const firstSeg = route.segments[0];
  const lastSeg  = route.segments[route.segments.length - 1];

  return (
    <div style={{ width: '100%' }}>

      {/* ── ヘッダー ── */}
      <div style={{
        background: cfg.bg,
        padding: '24px 20px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '20px 20px', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '999px', padding: '5px 16px',
            }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: cfg.accent, letterSpacing: '-1px' }}>
                {cfg.rank}
              </span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'rgba(255,255,255,0.9)' }}>
                {cfg.label}
              </span>
            </div>

            <button onClick={() => onSave(route)} className="pressable"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                width: '46px', height: '46px', fontSize: '22px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>🤍</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <span style={{ fontSize: '56px', fontWeight: 900, color: '#fff', letterSpacing: '-3px' }}>
              {firstSeg.departureTime}
            </span>
            <span style={{ fontSize: '32px', color: 'rgba(255,255,255,0.4)' }}>→</span>
            <span style={{ fontSize: '56px', fontWeight: 900, color: '#fff', letterSpacing: '-3px' }}>
              {lastSeg.arrivalTime}
            </span>
          </div>

          <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.8)', fontWeight: 700, margin: 0 }}>
            {route.highlight}
          </p>
        </div>
      </div>

      {/* ── 路線図スタイル本体 ── */}
      <div style={{ background: '#fff', padding: '24px 16px 24px 8px' }}>
        {route.segments.map((seg, idx) => (
          <SegmentBlock
            key={`${seg.fromStation}-${seg.lineId}`}
            seg={seg}
            isLast={idx === route.segments.length - 1}
          />
        ))}

        {/* 到着メッセージ */}
        <div style={{
          marginTop: '16px', marginLeft: '48px',
          background: '#F0FDF4', borderRadius: '16px',
          padding: '16px 18px',
          borderLeft: '5px solid #22C55E',
        }}>
          <p style={{ fontSize: '13px', fontWeight: 800, color: '#22C55E', margin: '0 0 4px', letterSpacing: '0.05em' }}>
            ✓ 到着後
          </p>
          <p style={{ fontSize: '26px', fontWeight: 700, color: '#1E293B', margin: 0, lineHeight: 1.6 }}>
            {route.arrivalNote}
          </p>
        </div>
      </div>
    </div>
  );
}
