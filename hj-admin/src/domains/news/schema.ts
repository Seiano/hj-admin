// ===== 资讯域 - Schema 定义 =====
// 从 142 行手写 JSX → 35 行声明式 Schema
// AI Agent 维护时只需改此文件

import type { PageSchema } from '../../shared/schema-engine/types';
import type { NewsItem, DataSource } from './types';

const newsStatusColorMap: Record<string, string> = {
  '草稿': '#9a9da5',
  '已发布': '#00b365',
  '已下架': '#ff9500',
  '已归档': '#65676b',
};

const sourceStatusColorMap: Record<string, string> = {
  '运行中': '#00b365',
  '异常': '#ff3b30',
  '已停用': '#9a9da5',
};

// ===== 资讯池 Schema =====
export const newsPoolSchema: PageSchema<NewsItem> = {
  id: 'news-pool',
  title: '资讯池',
  description: '所有入库资讯的统一管理视图，共 1,247 条',
  entity: 'news',
  filters: [
    { name: 'source', label: '来源', type: 'select', width: 140,
      options: ['氢能聚焦', '氢智会', '中国氢能联盟', '势银能链', '香橙会', '高工氢电', '人民日报'] },
    { name: 'status', label: '状态', type: 'select', width: 120,
      options: ['草稿', '已发布', '已下架', '已归档'] },
    { name: 'linkStatus', label: '关联状态', type: 'select', width: 120,
      options: ['未关联', '部分关联', '已完整关联'] },
    { name: 'keyword', label: '关键词', type: 'input', width: 200, placeholder: '标题/摘要关键词' },
    { name: 'dateRange', label: '发布时间', type: 'dateRange', width: 240 },
  ],
  columns: [
    { field: 'title', title: '标题', width: 280, ellipsis: true, render: 'link', renderProps: { to: '/news/edit/:id' } },
    { field: 'source', title: '来源', width: 110 },
    { field: 'autoTags', title: '标签', width: 200, render: 'tag-list', renderProps: { auto: true } },
    { field: 'nerEntities', title: '识别企业', width: 80, align: 'center', render: 'entity-count', renderProps: { entityKey: 'ent' } },
    { field: 'status', title: '状态', width: 90, render: 'status-badge', renderProps: { colorMap: newsStatusColorMap } },
    { field: 'publishTime', title: '发布时间', width: 110, render: 'date-or-dash' },
  ],
  rowKey: 'id',
  scrollX: 1400,
  pagination: { pageSize: 20, showTotal: true },
  rowActions: [
    { key: 'edit', label: '编辑', navigateTo: '/news/edit/:id' },
    { key: 'publish', label: '发布', type: 'success', visible: r => r.status === '草稿' },
    { key: 'offline', label: '下架', type: 'default', visible: r => r.status === '已发布' },
  ],
};

// ===== 已发布资讯 Schema =====
export const newsPublishedSchema: PageSchema<NewsItem> = {
  id: 'news-published',
  title: '已发布资讯',
  description: '运营已处理完成的资讯，共 318 条',
  entity: 'news',
  filters: [
    { name: 'source', label: '来源', type: 'select', width: 140,
      options: ['氢能聚焦', '氢智会', '中国氢能联盟', '势银能链', '香橙会', '高工氢电', '人民日报'] },
    { name: 'keyword', label: '关键词', type: 'input', width: 200, placeholder: '标题/摘要关键词' },
  ],
  quickFilters: {
    name: 'linkFilter',
    label: '关联状态',
    options: [
      { label: '全部 318', value: 'all' },
      { label: '已关联 297', value: 'linked' },
      { label: '⚠️待补关联 21', value: 'unlinked' },
    ],
  },
  columns: [
    { field: 'title', title: '标题', width: 280, ellipsis: true, render: 'link', renderProps: { to: '/news/edit/:id' } },
    { field: 'source', title: '来源', width: 110 },
    { field: 'autoTags', title: '标签', width: 200, render: 'tag-list' },
    { field: 'linkedEntities', title: '关联企业', width: 80, align: 'center', render: 'entity-count', renderProps: { entityKey: 'ent' } },
    { field: 'status', title: '状态', width: 90, render: 'status-badge', renderProps: { colorMap: newsStatusColorMap } },
    { field: 'publishTime', title: '发布时间', width: 110, render: 'date-or-dash' },
  ],
  rowKey: 'id',
  scrollX: 1200,
  pagination: { pageSize: 20, showTotal: true },
  rowActions: [
    { key: 'edit', label: '编辑', navigateTo: '/news/edit/:id' },
  ],
  tabs: [
    { key: 'all', label: '全部', count: 318, filter: () => true },
    { key: 'linked', label: '已关联', count: 297, filter: () => true },
    { key: 'unlinked', label: '待补关联', count: 21, filter: () => true },
  ],
};

// ===== 数据源管理 Schema =====
export const newsSourcesSchema: PageSchema<DataSource> = {
  id: 'news-sources',
  title: '数据源管理',
  description: '数据源总数 8 · 运行中 7 · 已停用 1 · 平均采集成功率 94.2%',
  entity: 'dataSources',
  filters: [
    { name: 'type', label: '类型', type: 'select', width: 140, options: ['爬虫采集', 'API接入', 'RSS订阅'] },
    { name: 'status', label: '状态', type: 'select', width: 120, options: ['运行中', '异常', '已停用'] },
    { name: 'keyword', label: '搜索', type: 'input', width: 200, placeholder: '来源名称' },
  ],
  columns: [
    { field: 'name', title: '来源名称', width: 150, render: 'text' },
    { field: 'type', title: '类型', width: 110, render: 'color-tag', renderProps: { color: '#1a6dff' } },
    { field: 'domain', title: '采集域名', width: 280, render: 'url' },
    { field: 'status', title: '状态', width: 100, render: 'status-badge', renderProps: { colorMap: sourceStatusColorMap } },
    { field: 'lastCrawl', title: '最近采集', width: 150, render: 'date-or-dash' },
    { field: 'successRate', title: '成功率', width: 120, render: 'success-rate' },
    { field: 'articleCount', title: '文章数', width: 100, align: 'right' },
  ],
  rowKey: 'id',
  pagination: { pageSize: 20, showTotal: true },
  rowActions: [
    { key: 'enable', label: '启用', type: 'success', visible: r => r.status === '已停用' },
    { key: 'disable', label: '停用', type: 'danger', visible: r => r.status === '运行中', confirm: '确认停用该数据源？' },
  ],
};
