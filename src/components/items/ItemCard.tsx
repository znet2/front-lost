import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Item } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { getCategoryLabel, formatDate } from '../../utils/helpers';

interface ItemCardProps {
  item: Item;
  matchScore?: number;
  showMatchScore?: boolean;
}

export const ItemCard = ({ item, matchScore, showMatchScore }: ItemCardProps) => {
  return (
    <Link
      to={`/items/${item.id}`}
      className="card hover:shadow-lg transition-all duration-200 group"
    >
      <div className="relative">
        <img
          src={item.images[0] || '/placeholder.png'}
          alt={item.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        {showMatchScore && matchScore !== undefined && (
          <div className="absolute top-2 right-2 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {matchScore}%
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {item.title}
          </h3>
          <StatusBadge status={item.status} type="item" />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Tag className="w-4 h-4" />
          <span>{getCategoryLabel(item.category)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(item.date)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{item.location}</span>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
      </div>
    </Link>
  );
};
