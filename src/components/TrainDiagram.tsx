import { useRef, useEffect } from 'react';

interface TrainDiagramProps {
  totalCars: number;
  recommendedCar: number;
  lineColor: string;
  positionLabel: string;
  lineName: string;
}

export default function TrainDiagram({
  totalCars, recommendedCar, lineColor, positionLabel, lineName,
}: TrainDiagramProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 推奨号車を中央にスクロール
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const carW = 52 + 6; // car width + gap
    const target = (recommendedCar - 1) * carW - el.clientWidth / 2 + carW / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [recommendedCar, totalCars]);

  return (
    <div className="rounded-3xl overflow-hidden border-2" style={{ borderColor: `${lineColor}40`, background: `${lineColor}0a` }}>
      {/* ヘッダー */}
      <div className="px-4 pt-3 pb-0 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider" style={{ color: lineColor }}>
          どの車両？
        </span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: lineColor }}
        >
          {totalCars}両編成
        </span>
      </div>

      {/* 列車ダイアグラム */}
      <div
        ref={scrollRef}
        className="overflow-x-auto py-3 px-4"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex gap-1.5 items-end" style={{ width: 'max-content' }}>
          {Array.from({ length: totalCars }, (_, i) => i + 1).map(n => {
            const isRec = n === recommendedCar;
            const isNear = Math.abs(n - recommendedCar) === 1;

            return (
              <div key={n} className="flex flex-col items-center gap-1 flex-shrink-0">
                {/* 上ラベル */}
                <div className="h-6 flex items-end justify-center">
                  {isRec && (
                    <div className="flex flex-col items-center">
                      <span className="text-lg leading-none">🛗</span>
                    </div>
                  )}
                </div>

                {/* 車両ボックス */}
                <div
                  className={`flex flex-col items-center justify-center rounded-xl font-black
                    transition-all duration-300
                    ${isRec
                      ? 'w-14 h-16 shadow-2xl'
                      : isNear ? 'w-11 h-13 opacity-60'
                      : 'w-10 h-12 opacity-40'
                    }`}
                  style={
                    isRec
                      ? { backgroundColor: lineColor, color: '#fff' }
                      : { backgroundColor: `${lineColor}22`, color: lineColor }
                  }
                >
                  <span className={isRec ? 'text-2xl' : isNear ? 'text-base' : 'text-sm'}>
                    {n}
                  </span>
                  <span className={`leading-none ${isRec ? 'text-[10px] opacity-80' : 'text-[9px]'}`}>
                    号車
                  </span>
                </div>

                {/* 下マーカー */}
                <div className="h-4 flex items-start justify-center">
                  {isRec && (
                    <svg width="12" height="8" viewBox="0 0 12 8">
                      <polygon points="6,0 0,8 12,8" fill={lineColor} />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 乗車位置テキスト */}
      <div
        className="mx-4 mb-3 rounded-2xl py-2.5 text-center"
        style={{ backgroundColor: `${lineColor}18` }}
      >
        <p className="text-base font-black" style={{ color: lineColor }}>
          {recommendedCar}号車
          <span className="font-bold text-sm ml-1 opacity-80">（{positionLabel}）</span>
          に乗ろう！
        </p>
      </div>
    </div>
  );
}
