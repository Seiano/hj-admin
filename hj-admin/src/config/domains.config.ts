// ===== 域配置 =====
// 每个域的数据源模式：'mock' = 使用 MockRepository，'http' = 使用 HttpRepository
// 切换时只需修改此处，Schema 和页面代码零改动

import type { DomainDataSourceConfig } from '../shared/data/types';

export const domainConfig: DomainDataSourceConfig = {
  // 当前所有域均使用 mock，后端 API 就绪后逐个切换为 'http'
  news: 'mock',
  dataSources: 'mock',
  enterprise: 'mock',
  banner: 'mock',
  icon: 'mock',
  promotion: 'mock',
  newsTags: 'mock',
  enterpriseTags: 'mock',
  dashboard: 'mock',
};