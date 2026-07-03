// ===== 资源位域 - Schema 定义 =====
import type { PageSchema } from '../../shared/schema-engine/types';
import type { Banner, IconItem, Promotion } from './types';

const resourceStatusColorMap: Record<string, string> = { '已上线': '#00b365', '排期中': '#1a6dff', '已下线': '#9a9da5', '草稿': '#ff9500' };

export const bannerSchema: PageSchema<Banner> = {
  id: 'banner-list', title: 'Banner管理', description: '管理首页轮播Banner，最多5帧，686×280px', entity: 'banner',
  filters: [{ name: 'status', label: '状态', type: 'select', width: 120, options: ['已上线', '排期中', '已下线'] }],
  columns: [
    { field: 'name', title: 'Banner名称', width: 250 },
    { field: 'frameCount', title: '帧数', width: 80, align: 'center' },
    { field: 'status', title: '状态', width: 100, render: 'status-badge', renderProps: { colorMap: resourceStatusColorMap } },
    { field: 'schedule', title: '排期', width: 160, render: 'date-or-dash' },
    { field: 'sort', title: '排序', width: 80, align: 'center' },
    { field: 'jumpTarget', title: '跳转目标', width: 120 },
  ],
  rowKey: 'id', pagination: { pageSize: 20, showTotal: true },
  rowActions: [{ key: 'edit', label: '编辑', type: 'primary' }],
};

export const iconSchema: PageSchema<IconItem> = {
  id: 'icon-list', title: 'Icon管理', description: '管理首页快捷入口Icon，固定10个（5列×2行），已用 8/10', entity: 'icon',
  filters: [{ name: 'status', label: '状态', type: 'select', width: 120, options: ['已启用', '已停用'] }],
  columns: [
    { field: 'emoji', title: '图标', width: 60, align: 'center', render: 'text' },
    { field: 'name', title: '名称', width: 150 },
    { field: 'jumpTarget', title: '跳转目标', width: 180 },
    { field: 'status', title: '状态', width: 100, render: 'status-badge', renderProps: { colorMap: { enabled: '#00b365', disabled: '#9a9da5' } } },
  ],
  rowKey: 'id', pagination: { pageSize: 20, showTotal: true },
  rowActions: [
    { key: 'edit', label: '编辑', type: 'primary' },
    { key: 'toggle', label: '停用', visible: r => r.status === 'enabled' },
    { key: 'toggle', label: '启用', type: 'success', visible: r => r.status === 'disabled' },
  ],
};

export const promotionSchema: PageSchema<Promotion> = {
  id: 'promotion-list', title: '推广活动管理', description: '管理首页「与氢同行」+ 洞察频道「洞察专题」推广位，各≤2个', entity: 'promotion',
  filters: [{ name: 'status', label: '状态', type: 'select', width: 120, options: ['已上线', '排期中', '已下线', '草稿'] }],
  columns: [
    { field: 'name', title: '活动标题', width: 250 },
    { field: 'date', title: '日期', width: 120, render: 'date-or-dash' },
    { field: 'location', title: '地点', width: 150 },
    { field: 'positions', title: '展示位置', width: 160, render: 'position-tags' },
    { field: 'status', title: '状态', width: 100, render: 'status-badge', renderProps: { colorMap: resourceStatusColorMap } },
  ],
  rowKey: 'id', pagination: { pageSize: 20, showTotal: true },
  rowActions: [{ key: 'edit', label: '编辑', type: 'primary' }],
};