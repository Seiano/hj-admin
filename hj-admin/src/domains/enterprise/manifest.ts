// ===== 企业域 - 域清单 =====
import type { DomainManifest } from '../../shared/schema-engine/types';
import { enterprisePoolSchema, enterpriseConfirmedSchema } from './schema';
import './repository';

export const enterpriseManifest: DomainManifest = {
  name: 'enterprise',
  label: '企业库',
  icon: '🏢',
  menuGroup: '数据库管理',
  order: 4,
  collapsible: true,
  dot: true,
  routes: [
    { path: '/enterprise/pool', schema: enterprisePoolSchema, label: '待处理池' },
    { path: '/enterprise/confirmed', schema: enterpriseConfirmedSchema, label: '已确认企业' },
    { path: '/enterprise/edit/:id', label: '企业编辑', component: () => import('./pages/EnterpriseEditPage'), hideInMenu: true },
  ],
};
