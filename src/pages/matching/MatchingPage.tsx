import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { getItemById, getItems } from '../../services/storageService';
import { findMatches, getScoreColor, getScoreBgColor, getScoreLabel } from '../../services/matchingService';
import { PageHeader } from '../../components/common/PageHeader';
import { ItemCard } from '../../components/items/ItemCard';
import { EmptyState } from '../../components/common/EmptyState';

export const MatchingPage = () => {
  const { lostItemId } = useParams();
  const navigate = useNavigate();

  const lostItem = getItemById(lostItemId!);
  const allItems = getItems();
  const foundItems = allItems.filter(item => item.type === 'found');

  if (!lostItem) {
    return <div>ไม่พบรายการ</div>;
  }

  const matches = findMatches(lostItem, foundItems);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        ย้อนกลับ
      </button>

      <PageHeader
        title={`รายการที่ตรงกับ "${lostItem.title}"`}
        description="รายการของที่พบซึ่งอาจตรงกับสิ่งของที่หาย"
      />

      {/* Lost Item Reference */}
      <div className="card mb-6 bg-red-50 border-red-200">
        <h3 className="font-semibold text-slate-900 mb-3">รายการของหายของคุณ:</h3>
        <div className="flex gap-4">
          <img src={lostItem.images[0]} alt={lostItem.title} className="w-24 h-24 rounded-lg object-cover" />
          <div>
            <h4 className="font-medium text-slate-900">{lostItem.title}</h4>
            <p className="text-sm text-slate-600 mt-1">{lostItem.description}</p>
          </div>
        </div>
      </div>

      {matches.length > 0 ? (
        <div className="space-y-6">
          {matches.map((match) => {
            const foundItem = getItemById(match.foundItemId);
            if (!foundItem) return null;

            return (
              <div key={match.id} className="card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`px-4 py-2 rounded-lg ${getScoreBgColor(match.score)}`}>
                        <span className={`text-2xl font-bold ${getScoreColor(match.score)}`}>
                          {match.score}%
                        </span>
                      </div>
                      <div>
                        <p className={`font-semibold ${getScoreColor(match.score)}`}>
                          {getScoreLabel(match.score)}
                        </p>
                        <p className="text-sm text-slate-600">ความเข้ากันโดยรวม</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Matching Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">{match.breakdown.textSimilarity}%</p>
                    <p className="text-xs text-slate-600 mt-1">ความใกล้เคียง<br/>ของข้อความ</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">{match.breakdown.category}%</p>
                    <p className="text-xs text-slate-600 mt-1">หมวดหมู่</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">{match.breakdown.dateTime}%</p>
                    <p className="text-xs text-slate-600 mt-1">วันที่และเวลา</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">{match.breakdown.location}%</p>
                    <p className="text-xs text-slate-600 mt-1">สถานที่</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">{match.breakdown.image}%</p>
                    <p className="text-xs text-slate-600 mt-1">รูปภาพ</p>
                  </div>
                </div>

                {/* Item Card */}
                <ItemCard item={foundItem} matchScore={match.score} />

                <div className="mt-4 flex gap-3">
                  <Link to={`/items/${foundItem.id}`} className="btn-primary flex-1 text-center">
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            );
          })}

          <div className="card bg-amber-50 border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>หมายเหตุ:</strong> ระบบจับคู่นี้เป็นการสาธิตเท่านั้น คำนวณจาก Mock Score
              ไม่ใช่ AI หรือ Image Recognition จริง ในระบบจริงควรใช้เทคโนโลยีที่ซับซ้อนกว่า
            </p>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={TrendingUp}
          title="ไม่พบรายการที่ตรงกัน"
          description="ยังไม่มีรายการของที่พบซึ่งตรงกับของหายของคุณ"
        />
      )}
    </div>
  );
};
