import type { NewsItem, TagItem, DataSource, Enterprise, Banner, IconItem, Promotion, PageTreeNode, EntityItem } from '../types';

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

export const mockEnterprises: Enterprise[] = [
  {
    id: 'e1', name: '中国石油化工股份有限公司', creditCode: '9111000010001131X8', shortName: '中国石化',
    legalPerson: '马永生', registeredCapital: '12,138,359.06', province: '北京市', city: '朝阳区',
    description: '中国最大的能源化工企业之一，积极布局氢能产业，在新疆库车建成全球最大绿氢示范项目。',
    source: '系统导入', linkedNews: 247, linkedProjects: 8, linkedPatents: 12, h2Score: 92,
    dim1: '氢能核心企业', bizType: ['投资运营型'], subfields: ['制氢', '储运', '加氢站'],
    tags: [mockEntTags[0], mockEntTags[2], mockEntTags[3], mockEntTags[4]],
    confirmedLinks: 12, candidateLinks: 5, stage: 'need-link', classifyStatus: '待分类',
    updatedAt: '2026-06-08', hasUpdate: true, newCount: 5, isSeedSource: true, isComplete: true,
  },
  {
    id: 'e2', name: '国家能源投资集团有限责任公司', creditCode: '91110000717825050X', shortName: '国能集团',
    legalPerson: '刘国跃', registeredCapital: '10,200,000', province: '北京市', city: '东城区',
    description: '全球最大的煤炭生产公司和火力发电公司之一，积极布局氢能和新能源领域。',
    source: '系统导入', linkedNews: 128, linkedProjects: 5, linkedPatents: 8, h2Score: 88,
    dim1: '氢能核心企业', bizType: ['投资运营型'], subfields: ['制氢企业', '综合能源服务商'],
    tags: [mockEntTags[0], mockEntTags[4]],
    confirmedLinks: 8, candidateLinks: 3, stage: 'need-link', classifyStatus: '待分类',
    updatedAt: '2026-06-10', isSeedSource: true, isComplete: true,
  },
  {
    id: 'e3', name: '隆基氢能科技有限公司', creditCode: '91610116MAB0XXXXXX', shortName: '隆基氢能',
    legalPerson: '李振国', registeredCapital: '50,000', province: '陕西省', city: '西安市',
    description: '隆基绿能旗下氢能科技公司，专注于碱性电解槽和PEM电解槽的研发与制造。',
    source: '系统导入', linkedNews: 56, linkedProjects: 3, linkedPatents: 8, h2Score: 87,
    dim1: '氢能核心企业', bizType: ['装备制造型'], subfields: ['电解槽', 'PEM'],
    tags: [mockEntTags[1], mockEntTags[2]],
    confirmedLinks: 4, candidateLinks: 7, stage: 'need-link', classifyStatus: '待分类',
    updatedAt: '2026-06-09', isSeedSource: true, isComplete: true,
  },
  {
    id: 'e4', name: '亿华通动力科技有限公司', creditCode: '91110108MA01XXXXXX', shortName: '亿华通',
    legalPerson: '张国强', registeredCapital: '12,000', province: '北京市', city: '海淀区',
    description: '中国氢燃料电池发动机龙头，专注于燃料电池系统及电堆研发。',
    source: '系统导入', linkedNews: 34, linkedProjects: 2, linkedPatents: 5, h2Score: 78,
    dim1: '氢能核心企业', bizType: ['装备制造型'], subfields: ['燃料电池'],
    tags: [mockEntTags[1]],
    confirmedLinks: 6, candidateLinks: 0, stage: 'need-classify', classifyStatus: '待分类',
    updatedAt: '2026-06-10', hasUpdate: true, newCount: 2, isSeedSource: true, isComplete: true,
  },
  {
    id: 'e5', name: '中集安瑞科控股有限公司', creditCode: '91440300XXXXXXXXXX', shortName: '中集安瑞科',
    legalPerson: '杨晓虎', registeredCapital: '80,000', province: '广东省', city: '深圳市',
    description: '中集集团旗下清洁能源装备制造商，专注氢能储运设备。',
    source: '系统导入', linkedNews: 18, linkedProjects: 1, linkedPatents: 3, h2Score: 62,
    tags: [], confirmedLinks: 3, candidateLinks: 0, stage: 'need-classify', classifyStatus: '待分类',
    updatedAt: '2026-06-09', isSeedSource: false, isComplete: false,
  },
  {
    id: 'e6', name: '深圳市创新投资集团有限公司', creditCode: '91440300XXXXXXXXXX', shortName: '深创投',
    legalPerson: '倪泽望', registeredCapital: '1,000,000', province: '广东省', city: '深圳市',
    description: '国内领先的创业投资机构，投资了多家氢能产业链企业。',
    source: '系统导入', linkedNews: 0, linkedProjects: 0, linkedPatents: 0, h2Score: 0,
    tags: [], confirmedLinks: 0, candidateLinks: 0, stage: 'no-signal', classifyStatus: '待确认',
    updatedAt: '2026-06-08', isSeedSource: false, isComplete: false,
  },
  {
    id: 'e7', name: '杭州福斯特应用材料股份有限公司', creditCode: '91330000XXXXXXXXXX', shortName: '福斯特',
    legalPerson: '林建华', registeredCapital: '195,000', province: '浙江省', city: '杭州市',
    description: '新材料领域上市公司，涉足氢能膜材料。',
    source: '系统导入', linkedNews: 0, linkedProjects: 0, linkedPatents: 0, h2Score: 0,
    tags: [], confirmedLinks: 0, candidateLinks: 0, stage: 'no-signal', classifyStatus: '待确认',
    updatedAt: '2026-06-07', isSeedSource: false, isComplete: false,
  },
  {
    id: 'e8', name: '中信产业投资基金管理有限公司', creditCode: '91110000XXXXXXXXXX', shortName: '中信产业基金',
    legalPerson: '刘乐飞', registeredCapital: '180,000', province: '北京市', city: '朝阳区',
    description: '中信集团旗下产业投资基金，投资布局氢能产业链。',
    source: '手动新增', linkedNews: 1, linkedProjects: 1, linkedPatents: 0, h2Score: 8,
    dim1: '氢能关联企业', bizType: ['投资金融型'], subfields: ['VC/PE'],
    tags: [mockEntTags[3]],
    confirmedLinks: 2, candidateLinks: 0, stage: 'need-link', classifyStatus: '已分类',
    updatedAt: '2026-06-09', isSeedSource: false, isComplete: true,
  },
];

export const mockBanners: Banner[] = [
  { id: 'b1', name: '氢能产业洞察·2026夏季', frameCount: 3, status: '已上线', schedule: '2026-06-01 上线', sort: 1, jumpTarget: '小程序页面' },
  { id: 'b2', name: '2026国际氢能峰会', frameCount: 2, status: '排期中', schedule: '2026-06-15 08:00', sort: 2, jumpTarget: '外链' },
  { id: 'b3', name: '燃料电池产业周报', frameCount: 1, status: '已下线', schedule: '2026-06-05 下线', sort: 3, jumpTarget: '小程序页面' },
];

export const mockIcons: IconItem[] = [
  { id: 'i1', name: '找项目', emoji: '🏗️', color: '#00b365', jumpTarget: '项目库', status: 'enabled' },
  { id: 'i2', name: '找企业', emoji: '🏢', color: '#1a6dff', jumpTarget: '企业库', status: 'enabled' },
  { id: 'i3', name: '找政策', emoji: '📜', color: '#ff9500', jumpTarget: '基础数据库·政策库', status: 'enabled' },
  { id: 'i4', name: '招投标', emoji: '⚖️', color: '#999', jumpTarget: '项目库·应用项目', status: 'enabled' },
  { id: 'i5', name: '查价格', emoji: '💰', color: '#ff4d6d', jumpTarget: '市场观察·氢气价格', status: 'enabled' },
  { id: 'i6', name: '氢问氢答', emoji: '💬', color: '#00bcd4', jumpTarget: '氢问氢答', status: 'enabled' },
  { id: 'i7', name: '看报告', emoji: '📑', color: '#7c4dff', jumpTarget: '洞察频道·产业观察', status: 'enabled' },
  { id: 'i8', name: '重磅活动', emoji: '🎯', color: '#999', jumpTarget: '重磅活动', status: 'enabled' },
  { id: 'i9', name: '氢能领跑者', emoji: '🏆', color: '#999', jumpTarget: '氢能领跑者', status: 'disabled' },
  { id: 'i10', name: '质量万里行', emoji: '🎖️', color: '#999', jumpTarget: '质量万里行', status: 'disabled' },
];

export const mockPromotions: Promotion[] = [
  { id: 'p1', name: '2026国际氢能创新发展大会', date: '2026-06-20', location: '北京国家会议中心', status: '已上线', positions: ['与氢同行', '洞察专题'], jumpTarget: '外链' },
  { id: 'p2', name: '氢能装备技术创新展', date: '2026-07-01', location: '上海世博展览馆', status: '排期中', positions: ['与氢同行'], jumpTarget: '小程序页面' },
  { id: 'p3', name: '氢能产业链投资论坛（草案）', date: '待定', location: '待定', status: '草稿', positions: ['洞察专题'], jumpTarget: '待配置' },
  { id: 'p4', name: '2026Q1氢能产业白皮书发布会', date: '2026-03-15', location: '深圳', status: '已下线', positions: ['与氢同行', '洞察专题'], jumpTarget: '外链' },
];

export const PAGE_TREE: PageTreeNode[] = [
  {
    id: 'data-landing', icon: '📊', label: '数据频道', children: [
      { id: 'data-project', icon: '🏗️', label: '项目库', children: [
        { id: 'page-project-factory', label: '制氢工厂列表' },
        { id: 'page-project-storage', label: '储氢基地列表' },
        { id: 'page-project-trans', label: '输氢设施列表' },
        { id: 'page-project-station', label: '加氢站列表' },
        { id: 'page-project-app', label: '应用项目列表' },
        { id: 'entity-project', label: '项目详情', needEntity: 'prj' },
      ]},
      { id: 'data-company', label: '企业库', children: [
        { id: 'page-company-invest', label: '投资运营类列表' },
        { id: 'page-company-equip', label: '装备制造类列表' },
        { id: 'page-company-finance', label: '投资金融类列表' },
        { id: 'page-company-public', label: '公共服务类列表' },
        { id: 'entity-company', label: '企业详情', needEntity: 'ent' },
      ]},
      { id: 'data-equip', label: '装备库', children: [
        { id: 'page-electrolyzer', label: '电解槽列表' },
        { id: 'page-fuelcell', label: '燃料电池列表' },
      ]},
      { id: 'data-base', label: '基础数据库', children: [
        { id: 'page-policy', label: '政策库列表' },
        { id: 'page-standard', label: '标准库列表' },
      ]},
    ]
  },
  { id: 'insight', icon: '🔍', label: '洞察频道', children: [
    { id: 'page-insight-industry', label: '产业观察首页' },
    { id: 'page-insight-region', label: '区域发展首页' },
    { id: 'page-insight-market', label: '市场观察首页' },
  ]},
  { id: 'qanda', label: '氢问氢答', children: [] },
  { id: 'url', label: '外链（手动输入URL）' },
  { id: 'none', label: '暂无跳转' },
];

export const ENTITY_MOCK: EntityItem[] = [
  { id: 'prj_10001', name: '宁东绿氢示范项目', meta: '制氢工厂 · 宁夏', type: 'prj' },
  { id: 'prj_10002', name: '中石化库车绿氢项目', meta: '制氢工厂 · 新疆', type: 'prj' },
  { id: 'ent_10001', name: '中国石油化工股份有限公司', meta: '投资运营类 · 北京', type: 'ent' },
  { id: 'ent_10002', name: '国家能源投资集团', meta: '投资运营类 · 北京', type: 'ent' },
  { id: 'ent_10003', name: '隆基氢能科技有限公司', meta: '装备制造类 · 陕西', type: 'ent' },
  { id: 'pol_30001', name: '关于加快氢能产业发展指导意见', meta: '国家政策 · 国务院', type: 'pol' },
];

export const BIZ_TYPE_SUBFIELDS: Record<string, string[]> = {
  '投资运营型': ['制氢企业', '加氢站运营企业', '综合能源服务商', '应用运营商'],
  '装备制造型': ['电解槽企业', '燃料电池企业', '压缩机企业', '加氢机企业', '储氢容器企业', '其他装备企业'],
  '投资金融型': ['产业投资基金', 'VC/PE机构', '银行', '证券公司', '融资租赁公司'],
  '公共服务型': ['检验检测机构', '认证认可机构', '设计咨询机构', '工程建设机构', '运维服务机构'],
};
