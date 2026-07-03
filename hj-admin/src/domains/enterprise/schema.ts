// ===== 企业域 - Schema 定义 =====

import type { PageSchema } from '../../shared/schema-engine/types';
import type { Enterprise } from './types';

// ===== 待处理池 Schema =====
export const enterprisePoolSchema: PageSchema<Enterprise> = {
  id: 'enterprise-pool',
  title: '企业库 · 待处理池',
  description: '系统导入的待处理企业',
  entity: 'enterprise',
  filters: [
    { name: 'keyword', label: '企业名称', type: 'input', width: 200, placeholder: '搜索企业名称' },
  ],
  columns: [
    { field: 'name', title: '企业名称', width: 280, render: 'link', renderProps: { to: '/enterprise/edit/:id' } },
    { field: 'source', title: '来源', width: 100 },
    { field: 'confirmedLinks', title: '关联进度', width: 160, render: 'link-progress' },
    { field: 'classifyStatus', title: '分类状态', width: 100, render: 'status-badge', renderProps: { colorMap: { '待分类': '#ff9500', '待确认': '#9a9da5' } } },
    { field: 'updatedAt', title: '更新时间', width: 110, render: 'date-or-dash' },
  ],
  rowKey: 'id',
  pagination: { pageSize: 20, showTotal: true },
  rowActions: [
    { key: 'process', label: '去处理', navigateTo: '/enterprise/edit/:id', type: 'primary' },
  ],
  tabs: [
    { key: 'need-link', label: '待关联', count: 24500, filter: r => r.stage === 'need-link' },
    { key: 'no-signal', label: '无关联待确认', count: 5500, filter: r => r.stage === 'no-signal' },
  ],
};

// ===== 已确认池 Schema =====
export const enterpriseConfirmedSchema: PageSchema<Enterprise> = {
  id: 'enterprise-confirmed',
  title: '企业库 · 已确认企业',
  description: '关联确认完成的企业',
  entity: 'enterprise',
  filters: [
    { name: 'dim1', label: '企业性质', type: 'select', width: 140, options: ['氢能核心企业', '氢能关联企业', '非氢能企业'] },
    { name: 'bizType', label: '企业类型', type: 'select', width: 140, options: ['投资运营型', '装备制造型', '投资金融型', '公共服务型'] },
    { name: 'keyword', label: '名称搜索', type: 'input', width: 200, placeholder: '搜索企业名称' },
  ],
  columns: [
    { field: 'name', title: '企业名称', width: 260, render: 'link', renderProps: { to: '/enterprise/edit/:id' } },
    { field: 'linkedNews', title: '关联资讯', width: 80, align: 'center' },
    { field: 'linkedProjects', title: '关联项目', width: 80, align: 'center' },
    { field: 'h2Score', title: '氢能关联度', width: 100, render: 'percent' },
    { field: 'dim1', title: '企业性质', width: 120, render: 'status-badge', renderProps: { colorMap: { '氢能核心企业': '#00b365', '氢能关联企业': '#1a6dff', '非氢能企业': '#9a9da5' } } },
    { field: 'classifyStatus', title: '状态', width: 80, render: 'status-badge', renderProps: { colorMap: { '待分类': '#ff9500', '已分类': '#00b365' } } },
    { field: 'updatedAt', title: '更新时间', width: 110, render: 'date-or-dash' },
  ],
  rowKey: 'id',
  pagination: { pageSize: 20, showTotal: true },
  rowActions: [
    { key: 'classify', label: '去分类', type: 'primary', navigateTo: '/enterprise/edit/:id', visible: r => r.classifyStatus === '待分类' },
    { key: 'view', label: '查看', navigateTo: '/enterprise/edit/:id' },
  ],
  tabs: [
    { key: 'need-classify', label: '待分类', count: 12, filter: r => r.classifyStatus === '待分类' },
    { key: 'classified', label: '已分类', count: 1272, filter: r => r.classifyStatus === '已分类' },
  ],
};
