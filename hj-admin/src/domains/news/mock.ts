// ===== 资讯域 - Mock 数据 =====

import type { NewsItem, DataSource } from './types';

export const mockNewsList: NewsItem[] = [
  {
    id: 'n1', title: '中石化新疆库车绿氢项目全面投产 年产绿氢2万吨', source: '氢能聚焦',
    tags: [], autoTags: ['绿氢', '制氢', '项目', '央企'],
    nerEntities: { ent: 4, prj: 1, pol: 2, std: 0, pat: 3 },
    linkedEntities: { ent: 0, prj: 0, pol: 0, std: 0, pat: 0 },
    status: '已发布', publishTime: '2026-06-08', province: '新疆',
  },
  {
    id: 'n2', title: '2025年全球氢能产业投融资报告：中国占比超40%', source: '香橙会',
    tags: [], autoTags: ['投融资', '全球'],
    nerEntities: { ent: 0, prj: 0, pol: 0, std: 0, pat: 0 },
    linkedEntities: { ent: 0, prj: 0, pol: 0, std: 0, pat: 0 },
    status: '草稿', publishTime: '', province: '全国',
  },
  {
    id: 'n3', title: '日本NEDO发布2030年氢能战略升级版 聚焦液氢储运', source: '势银能链',
    tags: [], autoTags: ['国际', '储运'],
    nerEntities: { ent: 1, prj: 0, pol: 1, std: 0, pat: 0 },
    linkedEntities: { ent: 0, prj: 0, pol: 0, std: 0, pat: 0 },
    status: '已发布', publishTime: '2026-06-07', province: '全国',
  },
  {
    id: 'n4', title: '广东燃料电池汽车示范城市群年度运营数据出炉', source: '高工氢电',
    tags: [], autoTags: ['燃料电池', '广东'],
    nerEntities: { ent: 5, prj: 2, pol: 0, std: 1, pat: 0 },
    linkedEntities: { ent: 0, prj: 0, pol: 0, std: 0, pat: 0 },
    status: '已下架', publishTime: '2026-06-05', province: '广东省',
  },
  {
    id: 'n5', title: '2025年氢能政策汇编：国家级+地方级文件清单', source: '中国氢能联盟',
    tags: [], autoTags: ['政策', '年度汇总'],
    nerEntities: { ent: 0, prj: 0, pol: 8, std: 2, pat: 0 },
    linkedEntities: { ent: 0, prj: 0, pol: 0, std: 0, pat: 0 },
    status: '已归档', publishTime: '2026-01-15', province: '全国',
  },
  {
    id: 'n6', title: '欧洲氢能银行第二轮拍卖结果：绿氢成本降至€3/kg', source: '人民日报',
    tags: [], autoTags: ['国际', '绿氢', '成本'],
    nerEntities: { ent: 2, prj: 0, pol: 1, std: 0, pat: 0 },
    linkedEntities: { ent: 0, prj: 0, pol: 0, std: 0, pat: 0 },
    status: '草稿', publishTime: '', province: '全国',
  },
];

export const mockDataSources: DataSource[] = [
  { id: 's1', name: '氢能聚焦', type: '爬虫采集', domain: 'https://hydrogenfocus.com/news', status: '运行中', lastCrawl: '2026-06-09 14:32', successRate: 98.5, articleCount: 1247 },
  { id: 's2', name: '香橙会', type: '爬虫采集', domain: 'https://www.chunghui.com/hydrogen', status: '运行中', lastCrawl: '2026-06-09 14:28', successRate: 96.8, articleCount: 892 },
  { id: 's3', name: '中国氢能联盟', type: '爬虫采集', domain: 'https://www.h2cn.org/news', status: '运行中', lastCrawl: '2026-06-09 14:25', successRate: 95.1, articleCount: 678 },
  { id: 's4', name: '势银能链', type: '爬虫采集', domain: 'https://www.shinyin.com/hydrogen', status: '运行中', lastCrawl: '2026-06-09 14:20', successRate: 91.3, articleCount: 534 },
  { id: 's5', name: '高工氢电', type: '爬虫采集', domain: 'https://www.gg-lb.com/hydrogen', status: '运行中', lastCrawl: '2026-06-09 14:15', successRate: 97.2, articleCount: 421 },
  { id: 's6', name: '国际氢能网', type: '爬虫采集', domain: 'https://www.hydrogenintl.com', status: '运行中', lastCrawl: '2026-06-09 13:58', successRate: 94.6, articleCount: 315 },
  { id: 's7', name: '中国能源报', type: '爬虫采集', domain: 'https://www.cnenergy.org/h2', status: '异常', lastCrawl: '2026-06-09 14:30', successRate: 68.2, articleCount: 198 },
  { id: 's8', name: '中国产经新闻', type: 'RSS订阅', domain: 'https://www.cien.com.cn/rss/h2', status: '已停用', lastCrawl: '2026-05-12 08:15', successRate: 0, articleCount: 0 },
];
