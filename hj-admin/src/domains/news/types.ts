// ===== 资讯域 - 类型定义 =====

export type NewsStatus = '草稿' | '已发布' | '已下架' | '已归档';

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  tags: NewsTagItem[];
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

export interface NewsTagItem {
  id: string;
  name: string;
  color: string;
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
