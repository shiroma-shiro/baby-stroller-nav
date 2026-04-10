import { useState, useCallback, useEffect, useRef } from 'react';
import { Route, SearchParams, Favorite } from './types';
import { findRoutes, getSupportedStations } from './logic/routeFinder';
import HeroSection from './components/HeroSection';
import SearchForm from './components/SearchForm';
import RouteCard from './components/RouteCard';

const FAVES_KEY = 'babyNavFaves_v3';
const load = (): Favorite[] => {
  try { return JSON.parse(localStorage.getItem(FAVES_KEY) ?? '[]'); } catch { return []; }
};

// ── ローディング ─────────────────────────────────────────
const STATIONS = ['渋谷','新宿','池袋','上野','東京','品川','六本木','表参道'];
function TrainLoading() {
  const [stIdx, setStIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStIdx(i => (i + 1) % STATIONS.length), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: '40px 0 32px', overflow: 'hidden' }}>
      <p style={{ textAlign: 'center', fontSize: '26px', fontWeight: 900, color: '#1E3A5F', margin: '0 0 4px' }}>
        ルートを探しています
      </p>
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#64748B', fontWeight: 600, margin: '0 0 20px' }}>
        <span key={stIdx} style={{ display: 'inline-block', animation: 'stationFade 0.7s ease both' }}>
          {STATIONS[stIdx]}
        </span>
        {' '}を確認中…
      </p>

      {/* 電車アニメーション（右→左） */}
      <div style={{ position: 'relative', height: '100px', overflow: 'hidden' }}>
        <div className="train-run"
          style={{ position: 'absolute', top: '6px', fontSize: '68px', lineHeight: 1, letterSpacing: '-10px', whiteSpace: 'nowrap' }}>
          🚃🚃🚃🚃🚃
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, height: '5px', overflow: 'hidden' }}>
          <div className="track-slide" style={{ display: 'flex', gap: '6px', width: '200%' }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} style={{
                width: '22px', height: '5px', borderRadius: '2px', flexShrink: 0,
                background: i % 2 === 0 ? '#1E3A5F' : '#CBD5E1',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* 進捗バー */}
      <div style={{ margin: '16px 24px 0' }}>
        <div style={{ height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #1E3A5F, #3B9EE8)',
            borderRadius: '2px',
            animation: 'trackSlide 0.5s linear infinite',
            width: '40%',
          }} />
        </div>
      </div>
    </div>
  );
}

// ── メインアプリ ──────────────────────────────────────────
export default function App() {
  const [params, setParams]       = useState<SearchParams | null>(null);
  const [routes, setRoutes]       = useState<Route[] | null>(null);
  const [loading, setLoading]     = useState(false);
  const [noResult, setNoResult]   = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>(load);
  const [activeCard, setActiveCard] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(FAVES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const doSearch = useCallback((p: SearchParams) => {
    setParams(p);
    setLoading(true);
    setNoResult(false);
    setRoutes(null);
    setActiveCard(0);
    setTimeout(() => {
      const r = findRoutes(p);
      if (r && r.length > 0) {
        setRoutes(r);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      } else {
        setNoResult(true);
      }
      setLoading(false);
    }, 1400);
  }, []);

  const handleSave = useCallback((route: Route) => {
    if (!params) return;
    const fav: Favorite = {
      id: `${Date.now()}`,
      label: `${params.from}→${params.to}（${params.time}頃）`,
      from: params.from, to: params.to,
      savedAt: new Date().toISOString(),
    };
    setFavorites(prev => [fav, ...prev.filter(f => !(f.from === fav.from && f.to === fav.to))]);
  }, [params]);

  const supportedStations = getSupportedStations();
  const showResults = routes || loading || noResult;

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'inherit' }}>

      {/* ヒーロー — 結果表示中は非表示 */}
      {!showResults && <HeroSection />}

      {/* 検索フォーム */}
      <div style={{
        padding: showResults ? '12px 12px 0' : '0 12px',
        marginTop: showResults ? 0 : '-20px',
        position: 'relative', zIndex: 10,
      }}>
        <div style={{
          background: '#F4F6F9',
          borderRadius: showResults ? '20px' : '24px',
          boxShadow: '0 4px 24px rgba(30,58,95,0.12)',
          overflow: 'hidden',
        }}>
          <SearchForm initial={params ?? undefined} onSearch={doSearch} loading={loading} />
        </div>
      </div>

      {/* 結果エリア */}
      <div ref={resultsRef} style={{ paddingBottom: '48px' }}>

        {/* ローディング */}
        {loading && <TrainLoading />}

        {/* 結果なし */}
        {noResult && !loading && (
          <div style={{ padding: '16px 14px' }}>
            <div style={{
              background: '#fff', borderRadius: '20px', padding: '28px 20px',
              textAlign: 'center', border: '1px solid #E2E8F0',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '14px' }}>😢</div>
              <p style={{ fontSize: '20px', fontWeight: 900, color: '#0F1923', margin: '0 0 8px' }}>
                見つかりませんでした
              </p>
              <p style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 500, margin: '0 0 22px', lineHeight: 1.7 }}>
                対応駅をタップして入力できます
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {supportedStations.slice(0, 20).map(s => (
                  <button key={s} className="pressable"
                    onClick={() => doSearch({
                      from: params?.from || s,
                      to: params?.from ? s : '',
                      time: params?.time ?? new Date().toTimeString().slice(0, 5),
                    })}
                    style={{
                      fontSize: '14px', fontWeight: 700, padding: '7px 16px',
                      borderRadius: '999px', border: '2px solid #E2E8F0',
                      background: '#F8FAFC', color: '#1E3A5F', cursor: 'pointer',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ルート結果 */}
        {routes && !loading && (
          <>
            {/* ルート切替ナビバー */}
            <div style={{
              background: '#0F2040',
              padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: '12px',
            }}>
              <p style={{ fontSize: '24px', fontWeight: 900, color: '#fff', margin: 0 }}>
                {params?.from}
                <span style={{ color: '#3B9EE8', margin: '0 8px' }}>→</span>
                {params?.to}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  disabled={activeCard === 0}
                  onClick={() => setActiveCard(c => Math.max(0, c - 1))}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)', color: '#fff',
                    fontSize: '18px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: activeCard === 0 ? 0.3 : 1, transition: 'opacity 0.15s',
                  }}>‹</button>
                <span style={{ fontSize: '15px', fontWeight: 900, color: '#93C5FD', minWidth: '40px', textAlign: 'center' }}>
                  {activeCard + 1} / {routes.length}
                </span>
                <button
                  disabled={activeCard === routes.length - 1}
                  onClick={() => setActiveCard(c => Math.min(routes.length - 1, c + 1))}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)', color: '#fff',
                    fontSize: '18px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: activeCard === routes.length - 1 ? 0.3 : 1, transition: 'opacity 0.15s',
                  }}>›</button>
              </div>
            </div>

            <RouteCard
              key={activeCard}
              route={routes[activeCard]}
              rank={activeCard + 1}
              onSave={handleSave}
            />
          </>
        )}

        {/* 初期状態 — 何も表示しない */}
        {!routes && !loading && !noResult && null}
      </div>
    </div>
  );
}
