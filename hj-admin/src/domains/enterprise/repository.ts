// ===== 企业域 - Repository 绑定 =====
import { registerMockData } from '../../shared/data/DataProvider';
import { mockEnterprises } from './mock';

registerMockData('enterprise', mockEnterprises as unknown as Record<string, unknown>[]);
