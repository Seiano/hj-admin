// ===== 资讯相关类型 =====
export type NewsStatus = '草稿' | '已发布' | '已下架' | '已归档';

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  tags: TagItem[];
  autoTags: string[];
  nerEntities: {
    ent: number;
    prj: number;
    pol: number;
    std: number;
    pat: number;
  };
  linkedEntities: {
    ent: number;
    prj: number;
    pol: number;
    std: number;
    pat: number;
  };
  status: NewsStatus;
  publishTime: string;
  province: string;
}

// ===== 标签相关类型 =====
export interface TagItem {
  id: string;
  name: string;
  color: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  type: 'news' | 'enterprise';
}

// ===== 数据源类型 =====
export type SourceType = '爬虫采集' | 'API接入' | 'RSS订阅';
export type SourceStatus = '运行中' | '异常' | '已停用';

export interface DataSource {
  id: string;
  name: string;
  type: SourceType;
  domain: string;
  status: SourceStatus;
  lastCrawl: string;
  successRate: number;
  articleCount: number;
}

// ===== NER 相关类型 =====
export type NERLevel = 'L1' | 'L2' | 'L3';
export type NERStatus = '已关联' | '待确认' | '已确认' | '已忽略';
export type EntityType = 'ent' | 'prj' | 'pol' | 'std' | 'pat';

export interface NERBlock {
  id: string;
  level: NERLevel;
  entityType: EntityType;
  originalWord: string;
  context: string;
  candidates: NERCandidate[];
  status: NERStatus;
  matchedEntityId?: string;
  matchedEntityName?: string;
}

export interface NERCandidate {
  id: string;
  name: string;
  status: '已确认' | '待分类' | '待匹配';
  similarity: number;
}

// ===== 企业相关类型 =====
export type EnterpriseDim1 = '氢能核心企业' | '氢能关联企业' | '非氢能企业';
export type EnterpriseBizType = '投资运营型' | '装备制造型' | '投资金融型' | '公共服务型';
export type EnterpriseStage = 'need-link' | 'need-classify' | 'no-signal';

export interface Enterprise {
  id: string;
  name: string;
  creditCode: string;
  shortName: string;
  legalPerson: string;
  registeredCapital: string;
  province: string;
  city: string;
  description: string;
  source: string;
  linkedNews: number;
  linkedProjects: number;
  linkedPatents: number;
  h2Score: number;
  dim1?: EnterpriseDim1;
  bizType?: EnterpriseBizType[];
  subfields?: string[];
  tags: TagItem[];
  confirmedLinks: number;
  candidateLinks: number;
  stage: EnterpriseStage;
  classifyStatus: '待分类' | '已分类' | '待确认';
  updatedAt: string;
  hasUpdate?: boolean;
  newCount?: number;
  isSeedSource?: boolean;
  isComplete: boolean;
}

// ===== 资源位相关类型 =====
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

// ===== 页面树类型 =====
export interface PageTreeNode {
  id: string;
  label: string;
  icon?: string;
  needEntity?: EntityType;
  children?: PageTreeNode[];
}

// ===== 实体类型 =====
export interface EntityItem {
  id: string;
  name: string;
  meta: string;
  type: EntityType;
}
