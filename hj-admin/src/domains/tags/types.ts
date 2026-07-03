// ===== 标签域 - 类型定义 =====
export interface TagItem {
  id: string;
  name: string;
  color: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  type: 'news' | 'enterprise';
}