// ===== 标签域 - Repository + Manifest =====
import { registerMockData } from '../../shared/data/DataProvider';
import { mockNewsTags, mockEntTags } from './mock';
import type { DomainManifest } from '../../shared/schema-engine/types';
import { newsTagsSchema, enterpriseTagsSchema } from './schema';

registerMockData('newsTags', mockNewsTags as unknown as Record<string, unknown>[]);
registerMockData('enterpriseTags', mockEntTags as unknown as Record<string, unknown>[]);

export const tagsManifest: DomainManifest = {
  name: 'tags',
  label: '标签管理',
  icon: '🏷️',
  menuGroup: '标签管理',
  order: 3,
  collapsible: true,
  routes: [
    { path: '/tags/news', schema: newsTagsSchema, label: '资讯标签' },
    { path: '/tags/enterprise', schema: enterpriseTagsSchema, label: '企业标签' },
  ],
};