// ===== 自动路由生成 =====
// 从 bootstrap 发现的所有域清单中生成路由配置
// 有 schema 的路由 → SchemaPage 自动渲染
// 无 schema 的路由 → 懒加载自定义组件

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import MainLayout from '../layouts/MainLayout';
import SchemaPage from '../shared/schema-engine/SchemaPage';
import { getAllRoutes } from './bootstrap';

// Dashboard 始终为自定义组件
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));

function LazyPage({ loader }: { loader: () => Promise<{ default: React.ComponentType }> }) {
  const Component = lazy(loader);
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><Spin size="large" /></div>}>
      <Component />
    </Suspense>
  );
}

export function AppRoutes() {
  const routes = getAllRoutes();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Dashboard 始终存在 */}
        <Route path="/dashboard" element={
          <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><Spin size="large" /></div>}>
            <Dashboard />
          </Suspense>
        } />

        {/* 从域清单自动生成的路由 */}
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.schema
                ? <SchemaPage schema={route.schema} />
                : route.component
                  ? <LazyPage loader={route.component} />
                  : <div>页面未配置</div>
            }
          />
        ))}

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
