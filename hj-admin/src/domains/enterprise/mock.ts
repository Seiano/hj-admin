// ===== 企业域 - Mock 数据 =====

import type { Enterprise, EntTagItem } from './types';

const entTags: EntTagItem[] = [
  { id: 'et1', name: '中国氢能联盟', color: '#1a6dff' },
  { id: 'et2', name: '专精特新', color: '#00b365' },
  { id: 'et3', name: '高新技术企业', color: '#ff9500' },
  { id: 'et4', name: '上市公司', color: '#7c4dff' },
  { id: 'et5', name: '央企', color: '#ff3b30' },
  { id: 'et6', name: '外资企业', color: '#00bcd4' },
];

export const mockEnterprises: Enterprise[] = [
  { id: 'e1', name: '中国石油化工股份有限公司', creditCode: '9111000010001131X8', shortName: '中国石化', legalPerson: '马永生', registeredCapital: '12,138,359.06', province: '北京市', city: '朝阳区', description: '中国最大的能源化工企业之一，积极布局氢能产业。', source: '系统导入', linkedNews: 247, linkedProjects: 8, linkedPatents: 12, h2Score: 92, dim1: '氢能核心企业', bizType: ['投资运营型'], subfields: ['制氢', '储运', '加氢站'], tags: [entTags[0], entTags[2], entTags[3], entTags[4]], confirmedLinks: 12, candidateLinks: 5, stage: 'need-link', classifyStatus: '待分类', updatedAt: '2026-06-08', hasUpdate: true, newCount: 5, isSeedSource: true, isComplete: true },
  { id: 'e2', name: '国家能源投资集团有限责任公司', creditCode: '91110000717825050X', shortName: '国能集团', legalPerson: '刘国跃', registeredCapital: '10,200,000', province: '北京市', city: '东城区', description: '全球最大的煤炭生产公司之一，积极布局氢能和新能源。', source: '系统导入', linkedNews: 128, linkedProjects: 5, linkedPatents: 8, h2Score: 88, dim1: '氢能核心企业', bizType: ['投资运营型'], subfields: ['制氢企业', '综合能源服务商'], tags: [entTags[0], entTags[4]], confirmedLinks: 8, candidateLinks: 3, stage: 'need-link', classifyStatus: '待分类', updatedAt: '2026-06-10', isSeedSource: true, isComplete: true },
  { id: 'e3', name: '隆基氢能科技有限公司', creditCode: '91610116MAB0XXXXXX', shortName: '隆基氢能', legalPerson: '李振国', registeredCapital: '50,000', province: '陕西省', city: '西安市', description: '隆基绿能旗下氢能科技公司，专注碱性电解槽和PEM电解槽。', source: '系统导入', linkedNews: 56, linkedProjects: 3, linkedPatents: 8, h2Score: 87, dim1: '氢能核心企业', bizType: ['装备制造型'], subfields: ['电解槽', 'PEM'], tags: [entTags[1], entTags[2]], confirmedLinks: 4, candidateLinks: 7, stage: 'need-link', classifyStatus: '待分类', updatedAt: '2026-06-09', isSeedSource: true, isComplete: true },
  { id: 'e4', name: '亿华通动力科技有限公司', creditCode: '91110108MA01XXXXXX', shortName: '亿华通', legalPerson: '张国强', registeredCapital: '12,000', province: '北京市', city: '海淀区', description: '中国氢燃料电池发动机龙头。', source: '系统导入', linkedNews: 34, linkedProjects: 2, linkedPatents: 5, h2Score: 78, dim1: '氢能核心企业', bizType: ['装备制造型'], subfields: ['燃料电池'], tags: [entTags[1]], confirmedLinks: 6, candidateLinks: 0, stage: 'need-classify', classifyStatus: '待分类', updatedAt: '2026-06-10', hasUpdate: true, newCount: 2, isSeedSource: true, isComplete: true },
  { id: 'e5', name: '中集安瑞科控股有限公司', creditCode: '91440300XXXXXXXXXX', shortName: '中集安瑞科', legalPerson: '杨晓虎', registeredCapital: '80,000', province: '广东省', city: '深圳市', description: '中集集团旗下清洁能源装备制造商。', source: '系统导入', linkedNews: 18, linkedProjects: 1, linkedPatents: 3, h2Score: 62, tags: [], confirmedLinks: 3, candidateLinks: 0, stage: 'need-classify', classifyStatus: '待分类', updatedAt: '2026-06-09', isSeedSource: false, isComplete: false },
  { id: 'e6', name: '深圳市创新投资集团有限公司', creditCode: '91440300XXXXXXXXXX', shortName: '深创投', legalPerson: '倪泽望', registeredCapital: '1,000,000', province: '广东省', city: '深圳市', description: '国内领先的创业投资机构。', source: '系统导入', linkedNews: 0, linkedProjects: 0, linkedPatents: 0, h2Score: 0, tags: [], confirmedLinks: 0, candidateLinks: 0, stage: 'no-signal', classifyStatus: '待确认', updatedAt: '2026-06-08', isSeedSource: false, isComplete: false },
  { id: 'e7', name: '杭州福斯特应用材料股份有限公司', creditCode: '91330000XXXXXXXXXX', shortName: '福斯特', legalPerson: '林建华', registeredCapital: '195,000', province: '浙江省', city: '杭州市', description: '新材料领域上市公司，涉足氢能膜材料。', source: '系统导入', linkedNews: 0, linkedProjects: 0, linkedPatents: 0, h2Score: 0, tags: [], confirmedLinks: 0, candidateLinks: 0, stage: 'no-signal', classifyStatus: '待确认', updatedAt: '2026-06-07', isSeedSource: false, isComplete: false },
  { id: 'e8', name: '中信产业投资基金管理有限公司', creditCode: '91110000XXXXXXXXXX', shortName: '中信产业基金', legalPerson: '刘乐飞', registeredCapital: '180,000', province: '北京市', city: '朝阳区', description: '中信集团旗下产业投资基金。', source: '手动新增', linkedNews: 1, linkedProjects: 1, linkedPatents: 0, h2Score: 8, dim1: '氢能关联企业', bizType: ['投资金融型'], subfields: ['VC/PE'], tags: [entTags[3]], confirmedLinks: 2, candidateLinks: 0, stage: 'need-link', classifyStatus: '已分类', updatedAt: '2026-06-09', isSeedSource: false, isComplete: true },
];
