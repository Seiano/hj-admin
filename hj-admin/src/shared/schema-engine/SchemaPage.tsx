// ===== SchemaPage - 通用列表页渲染器 =====
// 根据 PageSchema 自动渲染：筛选栏 + Tab + 表格 + 分页 + 弹窗
// 这是架构的核心组件，把"写页面"降维成"写配置"

import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Select, Input, Button, Space, Badge, Tabs, Modal, DatePicker } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { PageSchema, ColumnDef, FilterField, PageActionContext } from './types';
import { useSchemaPage } from './hooks';
import { renderWithRegistry } from './renderers';

const { RangePicker } = DatePicker;

// ===== 筛选栏渲染 =====
function FilterBar({ filters, values, onChange, onReset }: {
  filters: FilterField[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  onReset: () => void;
}) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: '16px 20px', marginBottom: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
      <Space wrap size={12}>
        {filters.map(f => (
          <FilterFieldRenderer key={f.name} field={f} value={values[f.name]} onChange={v => onChange(f.name, v)} />
        ))}
        <Button type="primary" icon={<SearchOutlined />}>筛选</Button>
        <Button icon={<ReloadOutlined />} onClick={onReset}>重置</Button>
      </Space>
    </div>
  );
}

function FilterFieldRenderer({ field, value, onChange }: {
  field: FilterField;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (field.type) {
    case 'select':
      return (
        <Select
          placeholder={field.placeholder || field.label}
          allowClear
          style={{ width: field.width || 140 }}
          value={value as string | undefined}
          onChange={v => onChange(v)}
        >
          {(field.options || []).map(opt => {
            const label = typeof opt === 'string' ? opt : opt.label;
            const val = typeof opt === 'string' ? opt : opt.value;
            return <Select.Option key={val} value={val}>{label}</Select.Option>;
          })}
        </Select>
      );
    case 'input':
      return (
        <Input
          placeholder={field.placeholder || field.label}
          prefix={<SearchOutlined />}
          style={{ width: field.width || 200 }}
          value={value as string || ''}
          onChange={e => onChange(e.target.value)}
          allowClear
        />
      );
    case 'dateRange':
      return <RangePicker style={{ width: field.width || 240 }} />;
    default:
      return <Input placeholder={field.label} style={{ width: field.width || 200 }} />;
  }
}

// ===== SchemaPage 主组件 =====
function SchemaPage<T extends Record<string, unknown>>({ schema }: { schema: PageSchema<T> }) {
  const navigate = useNavigate();
  const {
    state, setFilter, resetFilters, setPage, setActiveTab, setSelectedRowKeys, refresh,
  } = useSchemaPage<T>(schema);

  // 操作上下文
  const ctx: PageActionContext = useMemo(() => ({
    refresh,
    navigate: (path: string) => navigate(path),
    showModal: () => {},
  }), [refresh, navigate]);

  // 列渲染：字符串渲染器 or 自定义函数
  const columns = useMemo(() =>
    schema.columns.map((col: ColumnDef<T>) => ({
      title: col.title,
      dataIndex: col.field as string,
      key: col.field as string,
      width: col.width,
      fixed: col.fixed,
      align: col.align,
      ellipsis: col.ellipsis,
      sorter: col.sorter,
      render: col.render
        ? (typeof col.render === 'string'
          ? (value: unknown, record: T, index: number) =>
              renderWithRegistry(col.render as string, value, record as Record<string, unknown>, index, col.renderProps)
          : (value: unknown, record: T, index: number) =>
              col.render!(value, record, index)
        )
        : undefined,
    })),
    [schema.columns]
  );

  // 行操作列
  const actionColumn = useMemo(() => {
    if (!schema.rowActions || schema.rowActions.length === 0) return null;
    return {
      title: '操作',
      key: '__actions',
      width: Math.max(schema.rowActions.length * 56, 100),
      fixed: 'right' as const,
      render: (_: unknown, record: T) => (
        <Space size={4}>
          {schema.rowActions!.map(action => {
            if (action.visible && !action.visible(record)) return null;
            const handleClick = () => {
              if (action.confirm && !window.confirm(action.confirm)) return;
              if (action.navigateTo) {
                const id = String((record as Record<string, unknown>).id || '');
                navigate(action.navigateTo.replace(':id', id));
              }
              action.onClick?.(record, ctx);
            };
            const colorMap: Record<string, string> = { primary: '#1a6dff', danger: '#ff3b30', success: '#00b365' };
            return (
              <a key={action.key} onClick={handleClick} style={{ fontSize: 12, color: colorMap[action.type || 'primary'] || '#1a6dff' }}>
                {action.label}
              </a>
            );
          })}
        </Space>
      ),
    };
  }, [schema.rowActions, navigate, ctx]);

  const finalColumns = actionColumn ? [...columns, actionColumn] : columns;

  // Tab 过滤
  const displayData = useMemo(() => {
    if (!schema.tabs || !state.activeTab) return state.data;
    const activeTab = schema.tabs.find(t => t.key === state.activeTab);
    if (activeTab?.filter) return state.data.filter(activeTab.filter as (item: T) => boolean);
    return state.data;
  }, [state.data, state.activeTab, schema.tabs]);

  return (
    <div>
      {/* 页面标题 */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{schema.title}</h2>
        {schema.description && <p style={{ color: '#9a9da5', fontSize: 13 }}>{schema.description}</p>}
      </div>

      {/* Tab 分组 */}
      {schema.tabs && schema.tabs.length > 0 && (
        <Tabs
          activeKey={state.activeTab}
          onChange={setActiveTab}
          items={schema.tabs.map(tab => ({
            key: tab.key,
            label: (
              <span>
                {tab.label}
                {tab.count !== undefined && (
                  <Badge count={tab.count} style={{ marginLeft: 6, backgroundColor: '#1a6dff' }} />
                )}
              </span>
            ),
          }))}
          style={{ marginBottom: 16, background: '#fff', borderRadius: 8, padding: '0 16px' }}
        />
      )}

      {/* 筛选栏 */}
      <FilterBar filters={schema.filters} values={state.filters} onChange={setFilter} onReset={resetFilters} />

      {/* 工具栏操作 */}
      {schema.toolbarActions && schema.toolbarActions.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <Space>
            {schema.toolbarActions.map(action => (
              <Button key={action.key} type={action.type as "primary" | "default" | undefined} onClick={action.onClick}>
                {action.label}
              </Button>
            ))}
          </Space>
        </div>
      )}

      {/* 表格 */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <Table
          rowKey={schema.rowKey as string}
          columns={finalColumns}
          dataSource={displayData}
          loading={state.loading}
          scroll={schema.scrollX ? { x: schema.scrollX } : undefined}
          rowSelection={schema.batchActions ? {
            selectedRowKeys: state.selectedRowKeys,
            onChange: keys => setSelectedRowKeys(keys as string[]),
          } : undefined}
          pagination={{
            current: state.page,
            pageSize: state.pageSize,
            total: state.total,
            showTotal: schema.pagination.showTotal ? (t: number) => `共 ${t} 条` : undefined,
            showSizeChanger: schema.pagination.showSizeChanger,
            onChange: (page, pageSize) => setPage(page, pageSize),
          }}
          size="middle"
        />
      </div>
    </div>
  );
}

export default SchemaPage;
