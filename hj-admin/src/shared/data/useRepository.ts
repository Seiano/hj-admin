// ===== useRepository Hook =====
// 在 SchemaPage 或任意组件中获取域 Repository

import { useContext } from 'react';
import type { Repository } from './types';
import { DataContext } from './DataProvider';

export function useRepository<T = Record<string, unknown>>(entity: string): Repository<T> {
  const repos = useContext(DataContext);
  const repo = repos[entity];
  if (!repo) {
    // 返回空操作的 fallback Repository，避免运行时崩溃
    console.warn(`[DataProvider] Repository not found for entity: "${entity}". Did you register it in config/domains.config.ts?`);
    return {
      list: async () => ({ list: [], total: 0, page: 1, pageSize: 20 }),
      get: async () => ({} as T),
      create: async () => ({} as T),
      update: async () => ({} as T),
      delete: async () => {},
    } as Repository<T>;
  }
  return repo as Repository<T>;
}
