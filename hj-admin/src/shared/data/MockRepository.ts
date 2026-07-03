// ===== Mock Repository 实现 =====
// 内存过滤/分页/排序，模拟网络延迟，返回 Promise
// 让前端开发体验与真实 API 一致（异步、loading 态、分页）

import type { Repository, QueryParams, PageResult } from './types';

export class MockRepository<T extends Record<string, unknown>> implements Repository<T> {
  private data: T[];
  private delayMs: number;

  constructor(initialData: T[], delayMs = 300) {
    this.data = [...initialData];
    this.delayMs = delayMs;
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.delayMs));
  }

  async list(params: QueryParams = {}): Promise<PageResult<T>> {
    await this.simulateDelay();
    let filtered = [...this.data];

    // 关键词搜索
    if (params.search) {
      const keyword = params.search.toLowerCase();
      filtered = filtered.filter(item =>
        Object.values(item).some(
          val => typeof val === 'string' && val.toLowerCase().includes(keyword)
        )
      );
    }

    // 筛选条件
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          filtered = filtered.filter(item => {
            const fieldValue = item[key];
            if (fieldValue === undefined) return true;
            return String(fieldValue) === String(value);
          });
        }
      });
    }

    // 排序
    if (params.sort) {
      const { field, order } = params.sort;
      filtered.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        const cmp = String(aVal).localeCompare(String(bVal), 'zh-CN', { numeric: true });
        return order === 'descend' ? -cmp : cmp;
      });
    }

    // 分页
    const page = params.page || 1;
    const pageSize = params.pageSize || 20;
    const start = (page - 1) * pageSize;
    const list = filtered.slice(start, start + pageSize);

    return { list, total: filtered.length, page, pageSize };
  }

  async get(id: string): Promise<T> {
    await this.simulateDelay();
    const item = this.data.find(item => (item as Record<string, unknown>).id === id);
    if (!item) throw new Error(`Item not found: ${id}`);
    return item;
  }

  async create(data: Partial<T>): Promise<T> {
    await this.simulateDelay();
    const newItem = { ...data, id: `mock_${Date.now()}` } as T;
    this.data = [newItem, ...this.data];
    return newItem;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    await this.simulateDelay();
    const index = this.data.findIndex(item => (item as Record<string, unknown>).id === id);
    if (index === -1) throw new Error(`Item not found: ${id}`);
    this.data[index] = { ...this.data[index], ...data };
    return this.data[index];
  }

  async delete(id: string): Promise<void> {
    await this.simulateDelay();
    this.data = this.data.filter(item => (item as Record<string, unknown>).id !== id);
  }

  /** 获取全量数据（供 Schema 页面的 Tab 计数等使用） */
  getAll(): T[] {
    return [...this.data];
  }
}
