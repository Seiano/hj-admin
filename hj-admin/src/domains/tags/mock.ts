// ===== 标签域 - Mock 数据 =====
import type { TagItem } from './types';

export const mockNewsTags: TagItem[] = [
  { id: 't1', name: '绿氢', color: '#1a6dff', usageCount: 287, createdAt: '2026-01-15', updatedAt: '2026-06-08', type: 'news' },
  { id: 't2', name: '制氢', color: '#00b365', usageCount: 234, createdAt: '2026-01-15', updatedAt: '2026-06-06', type: 'news' },
  { id: 't3', name: '储运', color: '#ff9500', usageCount: 198, createdAt: '2026-01-16', updatedAt: '2026-06-05', type: 'news' },
  { id: 't4', name: '加氢站', color: '#ff3b30', usageCount: 156, createdAt: '2026-01-18', updatedAt: '2026-06-08', type: 'news' },
  { id: 't5', name: '燃料电池', color: '#7c4dff', usageCount: 143, createdAt: '2026-02-01', updatedAt: '2026-06-07', type: 'news' },
  { id: 't6', name: '国际', color: '#00bcd4', usageCount: 112, createdAt: '2026-02-10', updatedAt: '2026-06-04', type: 'news' },
];

export const mockEntTags: TagItem[] = [
  { id: 'et1', name: '中国氢能联盟', color: '#1a6dff', usageCount: 127, createdAt: '2026-02-01', updatedAt: '2026-06-08', type: 'enterprise' },
  { id: 'et2', name: '专精特新', color: '#00b365', usageCount: 89, createdAt: '2026-02-10', updatedAt: '2026-06-06', type: 'enterprise' },
  { id: 'et3', name: '高新技术企业', color: '#ff9500', usageCount: 203, createdAt: '2026-01-20', updatedAt: '2026-06-07', type: 'enterprise' },
  { id: 'et4', name: '上市公司', color: '#7c4dff', usageCount: 156, createdAt: '2026-01-15', updatedAt: '2026-06-05', type: 'enterprise' },
  { id: 'et5', name: '央企', color: '#ff3b30', usageCount: 67, createdAt: '2026-03-01', updatedAt: '2026-06-03', type: 'enterprise' },
  { id: 'et6', name: '外资企业', color: '#00bcd4', usageCount: 43, createdAt: '2026-03-15', updatedAt: '2026-06-01', type: 'enterprise' },
];