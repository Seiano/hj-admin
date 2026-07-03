// ===== HTTP Repository 实现 =====
// 当后端 API 就绪时，替换 MockRepository
// 当前为占位实现，API 就绪后补充真实逻辑

import type { Repository, QueryParams, PageResult } from './types';

export class HttpRepository<T extends Record<string, unknown>> implements Repository<T> {
  private baseUrl: string;
  private domain: string;

  constructor(baseUrl: string, domain: string) {
    this.baseUrl = baseUrl;
    this.domain = domain;
  }

  private get endpoint(): string {
    return `${this.baseUrl}/${this.domain}`;
  }

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return response.json();
  }

  async list(params: QueryParams = {}): Promise<PageResult<T>> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set('page', String(params.page));
    if (params.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params.search) searchParams.set('search', params.search);
    if (params.sort) {
      searchParams.set('sortField', params.sort.field);
      searchParams.set('sortOrder', params.sort.order);
    }
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.set(`filter.${key}`, String(value));
        }
      });
    }
    return this.request<PageResult<T>>(`${this.endpoint}?${searchParams.toString()}`);
  }

  async get(id: string): Promise<T> {
    return this.request<T>(`${this.endpoint}/${id}`);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.request<T>(this.endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.request<T>(`${this.endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(id: string): Promise<void> {
    await this.request<void>(`${this.endpoint}/${id}`, { method: 'DELETE' });
  }
}
