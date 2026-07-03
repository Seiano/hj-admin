// ===== 资源位域 - Repository + Manifest =====
import { registerMockData } from '../../shared/data/DataProvider';
import { mockBanners, mockIcons, mockPromotions } from './mock';
import type { DomainManifest } from '../../shared/schema-engine/types';
import { bannerSchema, iconSchema, promotionSchema } from './schema';

registerMockData('banner', mockBanners as unknown as Record<string, unknown>[]);
registerMockData('icon', mockIcons as unknown as Record<string, unknown>[]);
registerMockData('promotion', mockPromotions as unknown as Record<string, unknown>[]);

export const resourceManifest: DomainManifest = {
  name: 'resource-banner',
  label: 'Banner管理',
  icon: '🎯',
  menuGroup: '资源位管理',
  order: 5,
  routes: [
    { path: '/resource/banner', schema: bannerSchema, label: 'Banner管理' },
    { path: '/resource/icon', schema: iconSchema, label: 'Icon管理' },
    { path: '/resource/promotion', schema: promotionSchema, label: '推广活动管理' },
  ],
};