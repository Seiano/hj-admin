// ===== 渲染器注册表 =====
// Schema 中 render 字段用字符串引用渲染器，保持可序列化（AI 友好）
// 新增渲染器：在此注册即可，Schema 中用 render: 'renderer-name' 引用

import React from 'react';
import { Tag, Badge, Space } from 'antd';
import { Link } from 'react-router-dom';

export interface RendererProps {
  value: unknown;
  record: Record<string, unknown>;
  index: number;
  renderProps?: Record<string, unknown>;
  onAction?: (action: string, payload?: unknown) => void;
}

export type Renderer = (props: RendererProps) => React.ReactNode;

const registry: Record<string, Renderer> = {};

/** 注册渲染器 */
export function registerRenderer(name: string, renderer: Renderer): void {
  registry[name] = renderer;
}

/** 获取渲染器 */
export function getRenderer(name: string): Renderer | undefined {
  return registry[name];
}

/** 查找并执行渲染 */
export function renderWithRegistry(
  name: string,
  value: unknown,
  record: Record<string, unknown>,
  index: number,
  renderProps?: Record<string, unknown>,
  onAction?: (action: string, payload?: unknown) => void,
): React.ReactNode {
  const renderer = registry[name];
  if (!renderer) {
    console.warn(`[SchemaEngine] Renderer "${name}" not found in registry`);
    return String(value ?? '—');
  }
  return renderer({ value, record, index, renderProps, onAction });
}

// ===== 内置渲染器 =====

// 标签列表渲染器
registerRenderer('tag-list', ({ value, renderProps }) => {
  const tags = (value as string[]) || [];
  const isAuto = renderProps?.auto as boolean;
  return (
    <Space size={[4, 4]} wrap>
      {tags.map((tag, i) => (
        <Tag
          key={i}
          className={isAuto ? 'tag-auto' : undefined}
          style={{ fontSize: 11, padding: '0 6px', margin: 0 }}
        >
          {tag}
        </Tag>
      ))}
    </Space>
  );
});

// 状态徽章渲染器
registerRenderer('status-badge', ({ value, renderProps }) => {
  const colorMap = (renderProps?.colorMap as Record<string, string>) || {};
  const status = String(value);
  const color = colorMap[status] || '#9a9da5';
  return <Badge color={color} text={<span style={{ fontSize: 12, color }}>{status}</span>} />;
});

// 实体计数渲染器
registerRenderer('entity-count', ({ value, onAction, renderProps }) => {
  const count = Number(value) || 0;
  const entityKey = String(renderProps?.entityKey || '');
  return (
    <a
      style={{ color: '#1a6dff', fontWeight: 600 }}
      onClick={() => onAction?.('entity-click', { entityKey, count })}
    >
      {count}
    </a>
  );
});

// 可导航链接渲染器
registerRenderer('link', ({ value, record, renderProps }) => {
  const toTemplate = String(renderProps?.to || '');
  const id = String(record.id || '');
  const to = toTemplate.replace(':id', id);
  return (
    <Link to={to} style={{ color: '#1a6dff' }}>
      {String(value)}
    </Link>
  );
});

// 日期或破折号渲染器
registerRenderer('date-or-dash', ({ value }) => {
  const str = String(value || '');
  return str ? <span>{str}</span> : <span style={{ color: '#ccc' }}>—</span>;
});

// 纯文本渲染器
registerRenderer('text', ({ value }) => <span>{String(value ?? '—')}</span>);

// 颜色标签渲染器
registerRenderer('color-tag', ({ value, renderProps }) => {
  const color = String(renderProps?.color || '#1a6dff');
  return <Tag color={color}>{String(value)}</Tag>;
});

// 百分比渲染器
registerRenderer('percent', ({ value }) => {
  const num = Number(value) || 0;
  const color = num >= 95 ? '#00b365' : num >= 80 ? '#ff9500' : '#ff3b30';
  return <span style={{ color, fontWeight: 600 }}>{num}%</span>;
});

// URL 链接渲染器
registerRenderer('url', ({ value }) => {
  const url = String(value || '');
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#1a6dff', fontSize: 12 }}>
      {url.length > 30 ? url.substring(0, 30) + '...' : url}
    </a>
  ) : <span style={{ color: '#ccc' }}>—</span>;
});

// 成功率渲染器（高/中/低）
registerRenderer('success-rate', ({ value }) => {
  const rate = Number(value) || 0;
  let level: string;
  let color: string;
  if (rate >= 95) { level = '高'; color = '#00b365'; }
  else if (rate >= 80) { level = '中'; color = '#ff9500'; }
  else { level = '低'; color = '#ff3b30'; }
  return <span style={{ color, fontWeight: 600 }}>{rate}% · {level}</span>;
});

// 关联进度渲染器
registerRenderer('link-progress', ({ value }) => {
  const str = String(value || '');
  return <span style={{ fontSize: 12, color: '#65676b' }}>{str}</span>;
});

// 位置标签渲染器
registerRenderer('position-tags', ({ value }) => {
  const positions = (value as string[]) || [];
  return (
    <Space size={[4, 4]} wrap>
      {positions.map((p, i) => (
        <Tag key={i} color={p === '与氢同行' ? 'blue' : 'purple'} style={{ fontSize: 11 }}>{p}</Tag>
      ))}
    </Space>
  );
});
