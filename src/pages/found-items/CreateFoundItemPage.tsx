import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { useToast } from '../../components/common/Toast';
import { getCurrentUser } from '../../data/mockUsers';
import { addItem, getItemById, updateItem } from '../../services/storageService';
import { generateId, getAllCategories, getCategoryLabel } from '../../utils/helpers';
import { Category } from '../../types';

export const CreateFoundItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const currentUser = getCurrentUser();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '' as Category | '',
    color: '',
    description: '',
    date: '',
    time: '',
    location: '',
    additionalDetails: ''
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && id) {
      const item = getItemById(id);
      if (item && item.userId === currentUser.id) {
        setFormData({
          title: item.title,
          category: item.category,
          color: item.color || '',
          description: item.description,
          date: item.date,
          time: item.time || '',
          location: item.location,
          additionalDetails: item.additionalDetails || ''
        });
        setImageUrls(item.images);
      } else {
        navigate('/my/found-items');
      }
    }
  }, [id, isEdit, currentUser.id, navigate]);

  const handleAddImage = () => {
    const url = prompt('กรุณาใส่ URL รูปภาพ:');
    if (url) {
      setImageUrls([...imageUrls, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'กรุณาระบุชื่อสิ่งของ';
    if (!formData.category) newErrors.category = 'กรุณาเลือกหมวดหมู่';
    if (!formData.description.trim()) newErrors.description = 'กรุณาระบุรายละเอียด';
    if (!formData.date) newErrors.date = 'กรุณาระบุวันที่';
    if (!formData.location.trim()) newErrors.location = 'กรุณาระบุสถานที่';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
      return;
    }

    const itemData = {
      title: formData.title,
      category: formData.category as Category,
      color: formData.color || undefined,
      description: formData.description,
      date: formData.date,
      time: formData.time || undefined,
      location: formData.location,
      images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400'],
      additionalDetails: formData.additionalDetails || undefined,
      status: 'searching' as const
    };

    if (isEdit && id) {
      updateItem(id, itemData);
      showToast('แก้ไขรายการเรียบร้อยแล้ว');
    } else {
      const newItem = {
        id: generateId('found'),
        type: 'found' as const,
        ...itemData,
        userId: currentUser.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      addItem(newItem);
      showToast('บันทึกรายการเรียบร้อยแล้ว');
    }

    navigate('/my/found-items');
  };

  return (
    <div>
      <button
        onClick={() => navigate('/my/found-items')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        ย้อนกลับ
      </button>

      <PageHeader
        title={isEdit ? 'แก้ไขรายการของพบ' : 'แจ้งของที่พบ'}
        description={isEdit ? 'แก้ไขข้อมูลรายการของพบ' : 'กรอกข้อมูลสิ่งของที่พบเจอ'}
      />

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="card space-y-6">
          <div>
            <label className="label">
              ชื่อสิ่งของ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`input ${errors.title ? 'border-red-500' : ''}`}
              placeholder="เช่น มือถือ iPhone สีดำ"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                หมวดหมู่ <span className="text-red-500">*</span>
              </label>
              <select
                className={`input ${errors.category ? 'border-red-500' : ''}`}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
              >
                <option value="">เลือกหมวดหมู่</option>
                {getAllCategories().map(cat => (
                  <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
                ))}
              </select>
              {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="label">สี</label>
              <input
                type="text"
                className="input"
                placeholder="เช่น ดำ, ขาว, น้ำเงิน"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="label">
              รายละเอียด <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`input min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
              placeholder="อธิบายลักษณะสิ่งของที่พบ"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                วันที่พบ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`input ${errors.date ? 'border-red-500' : ''}`}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="label">เวลาที่พบ</label>
              <input
                type="time"
                className="input"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="label">
              สถานที่ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`input ${errors.location ? 'border-red-500' : ''}`}
              placeholder="เช่น ห้างสรรพสินค้าเซ็นทรัลเวิลด์ ชั้น 3"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="label">รายละเอียดเพิ่มเติม</label>
            <textarea
              className="input min-h-[80px]"
              placeholder="ข้อมูลอื่นๆ เกี่ยวกับสิ่งของที่พบ"
              value={formData.additionalDetails}
              onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
            />
          </div>

          <div>
            <label className="label">รูปภาพ</label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img src={url} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddImage}
                className="h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center hover:border-emerald-500 transition-colors"
              >
                <Upload className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <p className="text-sm text-slate-500">คลิกปุ่ม + เพื่อเพิ่ม URL รูปภาพ</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/my/found-items')}
            className="btn-secondary flex-1"
          >
            ยกเลิก
          </button>
          <button type="submit" className="btn-primary flex-1">
            {isEdit ? 'บันทึกการแก้ไข' : 'บันทึกรายการ'}
          </button>
        </div>
      </form>
    </div>
  );
};
