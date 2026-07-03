// ===== 企业域 - 类型定义 =====

export type EnterpriseDim1 = '氢能核心企业' | '氢能关联企业' | '非氢能企业';
export type EnterpriseBizType = '投资运营型' | '装备制造型' | '投资金融型' | '公共服务型';
export type EnterpriseStage = 'need-link' | 'need-classify' | 'no-signal';
export type ClassifyStatus = '待分类' | '已分类' | '待确认';

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
  tags: EntTagItem[];
  confirmedLinks: number;
  candidateLinks: number;
  stage: EnterpriseStage;
  classifyStatus: ClassifyStatus;
  updatedAt: string;
  hasUpdate?: boolean;
  newCount?: number;
  isSeedSource?: boolean;
  isComplete: boolean;
}

export interface EntTagItem {
  id: string;
  name: string;
  color: string;
}

export const BIZ_TYPE_SUBFIELDS: Record<string, string[]> = {
  '投资运营型': ['制氢企业', '加氢站运营企业', '综合能源服务商', '应用运营商'],
  '装备制造型': ['电解槽企业', '燃料电池企业', '压缩机企业', '加氢机企业', '储氢容器企业', '其他装备企业'],
  '投资金融型': ['产业投资基金', 'VC/PE机构', '银行', '证券公司', '融资租赁公司'],
  '公共服务型': ['检验检测机构', '认证认可机构', '设计咨询机构', '工程建设机构', '运维服务机构'],
};
