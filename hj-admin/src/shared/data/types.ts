// ===== 数据层抽象 - 核心类型 =====

/** 查询参数 */
export interface QueryParams {
  page?: number;
  pageSize?: number;
  filters?: Record<string, unknown>;
  sort?: { field: string; order: 'ascend' | 'descend' };
  search?: string;
}

/** 分页结果 */
export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/** Repository 泛型接口 - 所有数据访问的统一契约 */
export interface Repository<T> {
  list(params: QueryParams): Promise<PageResult<T>>;
  get(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

/** 数据源模式 */
export type DataSourceMode = 'mock' | 'http';

/** 域配置 */
export interface DomainDataSourceConfig {
  [domainName: string]: DataSourceMode;
}
