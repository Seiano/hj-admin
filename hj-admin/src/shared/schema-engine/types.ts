// ===== Schema 驱动引擎 - 核心类型定义 =====
// 此文件是整个架构的类型基石，所有域的 Schema 都基于这些类型

import type { ReactNode } from 'react';

// ===== 筛选字段 =====
export type FilterType = 'select' | 'input' | 'dateRange' | 'cascader' | 'treeSelect' | 'radioGroup';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterField {
  name: string;
  label: string;
  type: FilterType;
  options?: string[] | FilterOption[];
  width?: number;
  placeholder?: string;
  defaultValue?: unknown;
  /** 异步加载选项 */
  fetchOptions?: () => Promise<FilterOption[]>;
}

// ===== 列定义 =====
export interface ColumnDef<T = Record<string, unknown>> {
  field: keyof T & string;
  title: string;
  width?: number;
  minWidth?: number;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  /** 字符串引用渲染器注册表中的渲染器，或自定义渲染函数 */
  render?: string | ((value: unknown, record: T, index: number) => ReactNode);
  /** 传递给渲染器的额外参数 */
  renderProps?: Record<string, unknown>;
  /** 是否可排序 */
  sorter?: boolean | ((a: T, b: T) => number);
}

// ===== 行操作 =====
export interface RowAction<T = Record<string, unknown>> {
  key: string;
  label: string;
  type?: 'primary' | 'default' | 'danger' | 'success';
  /** 条件显示 */
  visible?: (record: T) => boolean;
  /** 点击回调 */
  onClick?: (record: T, ctx: PageActionContext) => void;
  /** 声明式导航，如 '/news/edit/:id' */
  navigateTo?: string;
  /** 是否需要确认 */
  confirm?: string;
}

// ===== 批量操作 =====
export interface BatchAction {
  key: string;
  label: string;
  type?: 'primary' | 'default' | 'danger';
  onClick: (ids: string[]) => void;
  confirm?: string;
}

// ===== 工具栏操作 =====
export interface ToolbarAction {
  key: string;
  label: string;
  type?: 'primary' | 'default';
  icon?: string;
  onClick: () => void;
}

// ===== 弹窗/抽屉声明 =====
export type ModalTrigger = 'rowAction' | 'batchAction' | 'toolbar';
export type ModalType = 'modal' | 'drawer';

export interface ModalDef<T = Record<string, unknown>> {
  key: string;
  title: string;
  trigger: ModalTrigger;
  type?: ModalType;
  width?: number;
  /** 表单 Schema（用于新增/编辑弹窗） */
  formSchema?: FormSchema;
  /** 引用自定义组件名（如 'NerScanModal'） */
  customComponent?: string;
  /** 自定义渲染 */
  customRender?: (record: T, ctx: PageActionContext) => ReactNode;
}

// ===== Tab 分组 =====
export interface TabDef<T = Record<string, unknown>> {
  key: string;
  label: string;
  /** 显示在 Tab 上的数量字段，如 'totalCount' */
  countField?: string;
  /** 静态数量（优先于 countField） */
  count?: number;
  /** 过滤函数 */
  filter: (record: T) => boolean;
}

// ===== 表单 Schema =====
export type FormFieldType = 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'datePicker' | 'rangePicker' | 'number' | 'colorPicker' | 'treeSelect' | 'cascader';

export interface FormFieldDef {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  options?: FilterOption[];
  placeholder?: string;
  defaultValue?: unknown;
  colSpan?: number;
  /** 联动：当某字段变化时重新计算选项 */
  linkage?: {
    field: string;
    handler: (parentValue: unknown) => FilterOption[];
  };
}

export interface FormSchema {
  fields: FormFieldDef[];
  layout?: 'horizontal' | 'vertical' | 'inline';
  columns?: number;
}

// ===== 完整页面 Schema =====
export interface PageSchema<T = Record<string, unknown>> {
  /** 页面唯一标识 */
  id: string;
  /** 页面标题 */
  title: string;
  /** 页面描述 */
  description?: string;
  /** 绑定的 Repository key（对应 DataProvider 中的注册名） */
  entity: string;

  // ── 筛选栏 ──
  filters: FilterField[];

  // ── 表格 ──
  columns: ColumnDef<T>[];
  rowKey: keyof T & string;
  scrollX?: number;

  // ── 分页 ──
  pagination: {
    pageSize: number;
    showTotal?: boolean;
    showSizeChanger?: boolean;
  };

  // ── 操作 ──
  rowActions: RowAction<T>[];
  batchActions?: BatchAction[];
  toolbarActions?: ToolbarAction[];

  // ── 弹窗 ──
  modals?: ModalDef<T>[];

  // ── Tab 分组 ──
  tabs?: TabDef<T>[];

  // ── 快捷筛选 Chips ──
  quickFilters?: {
    name: string;
    label: string;
    options: FilterOption[];
  };
}

// ===== 域清单类型 =====
export interface RouteDef {
  path: string;
  label: string;
  /** 有 schema → SchemaPage 自动渲染 */
  schema?: PageSchema;
  /** 无 schema → 自定义组件（懒加载） */
  component?: () => Promise<{ default: React.ComponentType }>;
  /** 是否在菜单中隐藏 */
  hideInMenu?: boolean;
}

export interface DomainManifest {
  /** 域唯一名 */
  name: string;
  /** 域显示名 */
  label: string;
  /** 域图标 */
  icon?: string;
  /** 所属菜单分组 */
  menuGroup: string;
  /** 排序权重（越小越靠前） */
  order: number;
  /** 是否有子菜单展开 */
  collapsible?: boolean;
  /** 是否显示小圆点 */
  dot?: boolean;
  /** 路由列表 */
  routes: RouteDef[];
  /** 禁用状态（未来批次） */
  disabled?: boolean;
  badge?: string;
}

// ===== 页面操作上下文 =====
export interface PageActionContext {
  refresh: () => void;
  navigate: (path: string) => void;
  showModal: (key: string, record?: unknown) => void;
}
