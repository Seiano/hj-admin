// ===== 资讯域 - 域清单 =====
// 这是资讯域的"身份证"，声明路由、菜单、Schema
// AI Agent 看到此文件就知道这是一个域

import type { DomainManifest } from '../../shared/schema-engine/types';
import { newsPoolSchema, newsPublishedSchema, newsSourcesSchema } from './schema';

// 触发 mock 数据注册
import './repository';

export const newsManifest: DomainManifest = {
  name: 'news',
  label: '资讯库管理',
  icon: '📝',
  menuGroup: '内容管理',
  order: 2,
  collapsible: true,
  routes: [
    {
      path: '/news/pool',
      schema: newsPoolSchema,
      label: '资讯池',
    },
    {
      path: '/news/published',
      schema: newsPublishedSchema,
      label: '已发布资讯',
    },
    {
      path: '/news/sources',
      schema: newsSourcesSchema,
      label: '数据源管理',
    },
    {
      path: '/news/edit/:id',
      label: '资讯编辑',
      component: () => import('./pages/NewsEditPage'),
      hideInMenu: true,
    },
  ],
};
