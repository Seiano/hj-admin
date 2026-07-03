// ===== 标签域 - Schema 定义 =====
import type { PageSchema } from '../../shared/schema-engine/types';
import type { TagItem } from './types';

export const newsTagsSchema: PageSchema<TagItem> = {
  id: 'news-tags', title: '资讯标签', description: '标签总数 24 · 已使用 22 · 未使用 2', entity: 'newsTags',
  filters: [{ name: 'keyword', label: '搜索', type: 'input', width: 200, placeholder: '标签名称' }],
  columns: [
    { field: 'name', title: '标签名称', width: 160, render: 'color-tag' },
    { field: 'color', title: '颜色', width: 80, render: 'color-tag' },
    { field: 'usageCount', title: '使用次数', width: 100, align: 'center' },
    { field: 'createdAt', title: '创建时间', width: 120, render: 'date-or-dash' },
    { field: 'updatedAt', title: '更新时间', width: 120, render: 'date-or-dash' },
  ],
  rowKey: 'id', pagination: { pageSize: 20, showTotal: true },
  rowActions: [
    { key: 'edit', label: '编辑', type: 'primary' },
    { key: 'delete', label: '删除', type: 'danger', confirm: '确认删除该标签？删除后关联的资讯将移除该标签。' },
  ],
  toolbarActions: [{ key: 'add', label: '+ 新增标签', type: 'primary' }],
};

export const enterpriseTagsSchema: PageSchema<TagItem> = {
  id: 'enterprise-tags', title: '企业标签', description: '企业标签总数 34 · 标签使用总次数 892 · 本月新增 18', entity: 'enterpriseTags',
  filters: [{ name: 'keyword', label: '搜索', type: 'input', width: 200, placeholder: '标签名称' }],
  columns: [
    { field: 'name', title: '标签名称', width: 160, render: 'color-tag' },
    { field: 'color', title: '颜色', width: 80, render: 'color-tag' },
    { field: 'usageCount', title: '使用次数', width: 100, align: 'center' },
    { field: 'createdAt', title: '创建时间', width: 120, render: 'date-or-dash' },
    { field: 'updatedAt', title: '更新时间', width: 120, render: 'date-or-dash' },
  ],
  rowKey: 'id', pagination: { pageSize: 20, showTotal: true },
  rowActions: [
    { key: 'edit', label: '编辑', type: 'primary' },
    { key: 'delete', label: '删除', type: 'danger', confirm: '确认删除该标签？删除后关联的企业将移除该标签。' },
  ],
  toolbarActions: [{ key: 'add', label: '+ 新增标签', type: 'primary' }],
};