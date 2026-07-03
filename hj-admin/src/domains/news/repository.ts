// ===== 资讯域 - Repository 绑定 =====
// 注册该域的 mock 数据到 DataProvider

import { registerMockData } from '../../shared/data/DataProvider';
import { mockNewsList, mockDataSources } from './mock';

// 注册新闻数据
registerMockData('news', mockNewsList as unknown as Record<string, unknown>[]);
// 注册数据源
registerMockData('dataSources', mockDataSources as unknown as Record<string, unknown>[]);
