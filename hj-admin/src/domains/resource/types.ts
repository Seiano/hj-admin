// ===== 资源位域 - 类型定义 =====
export type ResourceStatus = '已上线' | '排期中' | '已下线' | '草稿';

export interface Banner {
  id: string;
  name: string;
  frameCount: number;
  status: ResourceStatus;
  schedule: string;
  sort: number;
  jumpTarget: string;
}

export interface IconItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
  jumpTarget: string;
  status: 'enabled' | 'disabled';
}

export interface Promotion {
  id: string;
  name: string;
  date: string;
  location: string;
  status: ResourceStatus;
  positions: string[];
  jumpTarget: string;
}