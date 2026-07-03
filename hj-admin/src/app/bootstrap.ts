// ===== Bootstrap - 自动发现所有域清单 =====
// 利用 Vite 的 import.meta.glob 在构建时扫描所有 domains/*/manifest.ts
// 新增域后无需手动注册，路由和菜单自动生成

import type { DomainManifest } from '../shared/schema-engine/types';

// ★ 自动发现：所有 domains/*/manifest.ts
const modules = import.meta.glob('../domains/*/manifest.ts', { eager: true });

// 提取并排序所有域清单
export const allManifests: DomainManifest[] = Object.entries(modules)
  .map(([_path, mod]: [string, unknown]) => {
    const m = mod as { default?: DomainManifest };
    return m.default;
  })
  .filter((m): m is DomainManifest => m !== undefined)
  .sort((a, b) => a.order - b.order);

// 从所有清单中提取路由
export function getAllRoutes() {
  return allManifests.flatMap(m => m.routes);
}

// 构建菜单树（按 menuGroup 分组）
export interface MenuGroup {
  group: string;
  items: MenuGroupItem[];
}

export interface MenuGroupItem {
  key: string;
  label: string;
  icon?: string;
  dot?: boolean;
  disabled?: boolean;
  badge?: string;
  children?: { key: string; label: string }[];
}

export function buildMenuTree(): MenuGroup[] {
  const groupMap = new Map<string, MenuGroupItem[]>();

  // 硬编码的禁用菜单项（未来批次）
  const disabledItems: Record<string, MenuGroupItem[]> = {
    '概览': [{ key: '_quality', label: '数据质量看板', disabled: true, badge: 'P6' }],
    '标签管理': [
      { key: '_report', label: '报告管理', icon: '📄', disabled: true, badge: 'P5' },
      { key: '_qanda', label: '氢问氢答管理', icon: '💬', disabled: true, badge: 'P4' },
    ],
    '数据库管理': [
      { key: '_project', label: '项目库', icon: '🏗️', disabled: true, badge: 'P2' },
      { key: '_policy', label: '政策库', icon: '📜', disabled: true, badge: 'P3' },
      { key: '_equipment', label: '装备库', icon: '⚙️', disabled: true, badge: 'P6' },
      { key: '_base', label: '基础库', icon: '📚', disabled: true, badge: 'P6' },
      { key: '_price', label: '价格域管理', icon: '💰', disabled: true, badge: 'P6' },
    ],
    '资源位管理': [
      { key: '_quicknews', label: '快讯Tab管理', icon: '⚡', disabled: true, badge: 'P2' },
    ],
    '洞察频道': [
      { key: '_insight', label: '洞察频道管理', icon: '🔍', disabled: true, badge: 'P4' },
    ],
    '系统': [
      { key: '_system', label: '系统管理', icon: '⚙️', disabled: true, badge: 'P5' },
      { key: '_activity', label: '活动管理', icon: '🎪', disabled: true, badge: 'P6' },
    ],
  };

  // 从 manifest 构建启用的菜单项
  for (const manifest of allManifests) {
    const group = manifest.menuGroup;
    if (!groupMap.has(group)) groupMap.set(group, []);

    const menuRoutes = manifest.routes.filter(r => !r.hideInMenu);
    if (menuRoutes.length === 1) {
      groupMap.get(group)!.push({
        key: manifest.name,
        label: manifest.label,
        icon: manifest.icon,
        dot: manifest.dot,
        children: [{ key: menuRoutes[0].path, label: menuRoutes[0].label }],
      });
    } else if (menuRoutes.length > 1) {
      groupMap.set(group, [
        ...(groupMap.get(group) || []),
        {
          key: manifest.name,
          label: manifest.label,
          icon: manifest.icon,
          dot: manifest.dot,
          children: menuRoutes.map(r => ({ key: r.path, label: r.label })),
        },
      ]);
    }
  }

  // 组装最终菜单（启用的 + 禁用的）
  const groupOrder = ['概览', '内容管理', '标签管理', '数据库管理', '资源位管理', '洞察频道', '系统'];
  return groupOrder.map(group => ({
    group,
    items: [...(groupMap.get(group) || []), ...(disabledItems[group] || [])],
  }));
}
