export default function HeroSection() {
  return (
    <header>
      <div style={{
        background: 'linear-gradient(160deg, #1E3A5F 0%, #1B4F8A 60%, #1E3A5F 100%)',
        padding: '40px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 背景ドットグリッド */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          pointerEvents: 'none',
        }} />

        {/* 背景の大きい円 */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220,
          borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160,
          borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative' }}>
          {/* 可愛いアイコン */}
          <div className="float" style={{ fontSize: '72px', marginBottom: '16px', display: 'block', lineHeight: 1 }}>
            🍼
          </div>

          {/* アプリ名バッジ */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '999px', padding: '6px 18px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '14px' }}>🛗</span>
            <span style={{
              fontSize: '13px', fontWeight: 800, letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase',
            }}>Baby Stroller Navi</span>
          </div>

          <h1 style={{
            fontSize: '34px', fontWeight: 900, lineHeight: 1.35,
            color: '#fff', margin: '0 0 14px', letterSpacing: '-0.5px',
          }}>
            どの号車に乗れば<br />
            <span style={{ color: '#93C5FD' }}>エレベーターが近い？</span>
          </h1>

          <p style={{
            fontSize: '16px', fontWeight: 600,
            color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.7,
          }}>
            ベビーカーで電車に乗るときの<br />
            頼れるナビゲーター
          </p>
        </div>
      </div>

      {/* 波形カット */}
      <div style={{ lineHeight: 0, marginTop: '-1px', background: '#1E3A5F' }}>
        <svg viewBox="0 0 375 28" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
          <path d="M0,28 C100,4 275,20 375,0 L375,28 Z" fill="#F4F6F9" />
        </svg>
      </div>
    </header>
  );
}
