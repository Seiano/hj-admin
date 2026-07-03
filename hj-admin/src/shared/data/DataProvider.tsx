// ===== DataProvider - 数据上下文 =====
// 按 domain 注册 Repository 实例，SchemaPage 通过 useRepository 获取

import React, { createContext, useMemo } from 'react';
import type { Repository } from './types';
import { MockRepository } from './MockRepository';
import { HttpRepository } from './HttpRepository';
import { domainConfig } from '../../config/domains.config';

// 各域的 mock 数据注册表（由域的 repository.ts 填充）
interface MockDataEntry {
  data: Record<string, unknown>[];
}

const mockDataRegistry: Record<string, MockDataEntry> = {};

/** 域注册 mock 数据（在 bootstrap 阶段调用） */
export function registerMockData(domainName: string, data: Record<string, unknown>[]): void {
  mockDataRegistry[domainName] = { data };
}

const DataContext = createContext<Record<string, Repository<Record<string, unknown>>>>({});

const API_BASE = '/api/v1';

export function DataProvider({ children }: { children: React.ReactNode }) {
  const repos = useMemo(() => {
    const map: Record<string, Repository<Record<string, unknown>>> = {};
    for (const [domain, mode] of Object.entries(domainConfig)) {
      if (mode === 'mock') {
        const mockData = mockDataRegistry[domain]?.data || [];
        map[domain] = new MockRepository(mockData, 200) as Repository<Record<string, unknown>>;
      } else {
        map[domain] = new HttpRepository(API_BASE, domain) as Repository<Record<string, unknown>>;
      }
    }
    return map;
  }, []);

  return <DataContext.Provider value={repos}>{children}</DataContext.Provider>;
}

export { DataContext };
