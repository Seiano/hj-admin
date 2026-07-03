// ===== useSchemaPage Hook =====
// 封装 Schema 页面的状态管理：筛选/分页/Tab/选中行/数据加载

import { useState, useCallback, useEffect } from 'react';
import type { PageSchema, PageActionContext } from './types';
import { useRepository } from '../data/useRepository';
import type { QueryParams, PageResult } from '../data/types';

export interface SchemaPageState<T> {
  loading: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  filters: Record<string, unknown>;
  activeTab?: string;
  selectedRowKeys: string[];
}

export function useSchemaPage<T extends Record<string, unknown>>(schema: PageSchema<T>) {
  const repo = useRepository<T>(schema.entity);

  const [state, setState] = useState<SchemaPageState<T>>({
    loading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: schema.pagination.pageSize,
    filters: {},
    activeTab: schema.tabs?.[0]?.key,
    selectedRowKeys: [],
  });

  const [result, setResult] = useState<PageResult<T>>({ list: [], total: 0, page: 1, pageSize: schema.pagination.pageSize });

  const fetchData = useCallback(async (overrides?: Partial<QueryParams>) => {
    setState(s => ({ ...s, loading: true }));
    try {
      const params: QueryParams = {
        page: state.page,
        pageSize: state.pageSize,
        filters: { ...state.filters },
        ...overrides,
      };
      const res = await repo.list(params);
      setResult(res);
      setState(s => ({ ...s, data: res.list, total: res.total, loading: false }));
    } catch (err) {
      console.error('[useSchemaPage] Failed to fetch data:', err);
      setState(s => ({ ...s, loading: false }));
    }
  }, [repo, state.page, state.pageSize, state.filters]);

  // 初次加载 + 依赖变化时重新加载
  useEffect(() => {
    fetchData();
  }, [state.page, state.pageSize, state.filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const setFilter = useCallback((name: string, value: unknown) => {
    setState(s => ({
      ...s,
      filters: { ...s.filters, [name]: value },
      page: 1, // 筛选变化时回到第一页
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setState(s => ({ ...s, filters: {}, page: 1 }));
  }, []);

  const setPage = useCallback((page: number, pageSize?: number) => {
    setState(s => ({ ...s, page, pageSize: pageSize || s.pageSize }));
  }, []);

  const setActiveTab = useCallback((key: string) => {
    setState(s => ({ ...s, activeTab: key, page: 1 }));
  }, []);

  const setSelectedRowKeys = useCallback((keys: string[]) => {
    setState(s => ({ ...s, selectedRowKeys: keys }));
  }, []);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // 操作上下文
  const ctx: PageActionContext = {
    refresh,
    navigate: () => {}, // 由 SchemaPage 注入真实 navigate
    showModal: () => {}, // 由 SchemaPage 注入
  };

  return {
    state,
    result,
    setFilter,
    resetFilters,
    setPage,
    setActiveTab,
    setSelectedRowKeys,
    refresh,
    ctx,
  };
}
