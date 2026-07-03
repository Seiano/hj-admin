// ===== Provider 组合层 =====
// 所有全局 Provider 在此组合，App.tsx 只需引用这一个

import React from 'react';
import { DataProvider } from '../shared/data/DataProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      {children}
    </DataProvider>
  );
}
