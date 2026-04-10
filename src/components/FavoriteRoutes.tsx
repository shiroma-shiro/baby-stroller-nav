import { Favorite } from '../types';

interface FavoriteRoutesProps {
  favorites: Favorite[];
  onSelect: (fav: Favorite) => void;
  onDelete: (id: string) => void;
}

export default function FavoriteRoutes({ favorites, onSelect, onDelete }: FavoriteRoutesProps) {
  if (favorites.length === 0) return null;

  return (
    <div className="px-4 pt-5">
      <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">❤️ お気に入り</p>
      <div className="space-y-2">
        {favorites.map(fav => (
          <div key={fav.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3.5
                       flex items-center gap-3 group hover:border-emerald-200 transition-colors">
            <button onClick={() => onSelect(fav)} className="flex-1 text-left">
              <p className="text-base font-black text-gray-800">
                {fav.from}<span className="text-gray-300 mx-2">→</span>{fav.to}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 font-medium">{fav.label}</p>
            </button>
            <button onClick={() => onDelete(fav.id)}
              className="text-gray-200 hover:text-red-400 text-2xl w-8 h-8 flex items-center
                         justify-center rounded-full hover:bg-red-50 transition-colors">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
