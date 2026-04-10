import { useState, useEffect } from 'react';
import { SearchParams } from '../types';
import { STATION_NAMES } from '../data/stations';

interface SearchFormProps {
  initial?: SearchParams;
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

export default function SearchForm({ initial, onSearch, loading }: SearchFormProps) {
  const now = new Date();
  const defaultTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  const [from, setFrom]         = useState(initial?.from ?? '');
  const [to, setTo]             = useState(initial?.to   ?? '');
  const [time, setTime]         = useState(initial?.time  ?? defaultTime);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (initial) { setFrom(initial.from); setTo(initial.to); setTime(initial.time); }
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) return;
    onSearch({ from: from.trim(), to: to.trim(), time });
  };

  const swap = () => {
    setSwapping(true);
    setTimeout(() => setSwapping(false), 450);
    setFrom(to); setTo(from);
  };

  const inputStyle: React.CSSProperties = {
    flex: 1, border: 'none', outline: 'none', background: 'transparent',
    fontSize: '32px', fontWeight: 900, color: '#0F1923',
    width: '100%', padding: 0, minWidth: 0,
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '16px' }}>

      {/* ── 発 / 着 縦並び ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px', position: 'relative' }}>

        {/* 出発駅 */}
        <div style={{
          background: '#fff', border: '2px solid #E2E8F0',
          borderRadius: '16px', padding: '14px 16px',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 800, color: '#1E3A5F',
            letterSpacing: '0.12em', margin: '0 0 8px', textTransform: 'uppercase',
          }}>出発駅</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
              background: '#1E3A5F',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 900, color: '#fff',
            }}>発</div>
            <input
              list="station-list"
              value={from}
              onChange={e => setFrom(e.target.value)}
              placeholder="駅名を入力"
              required
              style={inputStyle}
            />
          </div>
        </div>

        {/* スワップボタン（中央に浮かせる） */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '-4px 0', zIndex: 1 }}>
          <button type="button" onClick={swap}
            className={swapping ? 'swap-go' : ''}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: '#1E3A5F',
              border: '3px solid #F4F6F9',
              color: '#fff', fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(30,58,95,0.35)',
              lineHeight: 1,
            }}
            aria-label="出発・到着を入れ替え">⇅</button>
        </div>

        {/* 到着駅 */}
        <div style={{
          background: '#fff', border: '2px solid #E2E8F0',
          borderRadius: '16px', padding: '14px 16px',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 800, color: '#3B9EE8',
            letterSpacing: '0.12em', margin: '0 0 8px', textTransform: 'uppercase',
          }}>到着駅</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
              background: '#3B9EE8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 900, color: '#fff',
            }}>着</div>
            <input
              list="station-list"
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="駅名を入力"
              required
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* ── 時刻 + 検索ボタン ── */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
        <div style={{
          flex: '0 0 auto',
          background: '#fff',
          border: '2px solid #E2E8F0',
          borderRadius: '14px', padding: '10px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <p style={{
            fontSize: '10px', fontWeight: 800, color: '#94A3B8',
            letterSpacing: '0.1em', margin: '0 0 3px', textTransform: 'uppercase',
          }}>出発時刻</p>
          <input
            type="time" value={time} onChange={e => setTime(e.target.value)}
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: '22px', fontWeight: 900, color: '#0F1923',
              padding: 0, width: '108px',
            }}
          />
        </div>

        <button type="submit" disabled={loading}
          className="pressable"
          style={{
            flex: 1, border: 'none', borderRadius: '14px',
            fontSize: '20px', fontWeight: 900,
            background: loading ? '#94A3B8' : '#1E3A5F',
            color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 6px 20px rgba(30,58,95,0.4)',
            transition: 'all 0.2s', letterSpacing: '0.03em',
            padding: '0 8px',
          }}>
          {loading ? '検索中…' : '🛗 ルートを探す'}
        </button>
      </div>

      <datalist id="station-list">
        {STATION_NAMES.map(n => <option key={n} value={n} />)}
      </datalist>
    </form>
  );
}
