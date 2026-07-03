// ===== 资源位域 - Mock 数据 =====
import type { Banner, IconItem, Promotion } from './types';

export const mockBanners: Banner[] = [
  { id: 'b1', name: '氢能产业洞察·2026夏季', frameCount: 3, status: '已上线', schedule: '2026-06-01 上线', sort: 1, jumpTarget: '小程序页面' },
  { id: 'b2', name: '2026国际氢能峰会', frameCount: 2, status: '排期中', schedule: '2026-06-15 08:00', sort: 2, jumpTarget: '外链' },
  { id: 'b3', name: '燃料电池产业周报', frameCount: 1, status: '已下线', schedule: '2026-06-05 下线', sort: 3, jumpTarget: '小程序页面' },
];

export const mockIcons: IconItem[] = [
  { id: 'i1', name: '找项目', emoji: '🏗️', color: '#00b365', jumpTarget: '项目库', status: 'enabled' },
  { id: 'i2', name: '找企业', emoji: '🏢', color: '#1a6dff', jumpTarget: '企业库', status: 'enabled' },
  { id: 'i3', name: '找政策', emoji: '📜', color: '#ff9500', jumpTarget: '基础数据库·政策库', status: 'enabled' },
  { id: 'i4', name: '招投标', emoji: '⚖️', color: '#999', jumpTarget: '项目库·应用项目', status: 'enabled' },
  { id: 'i5', name: '查价格', emoji: '💰', color: '#ff4d6d', jumpTarget: '市场观察·氢气价格', status: 'enabled' },
  { id: 'i6', name: '氢问氢答', emoji: '💬', color: '#00bcd4', jumpTarget: '氢问氢答', status: 'enabled' },
  { id: 'i7', name: '看报告', emoji: '📑', color: '#7c4dff', jumpTarget: '洞察频道·产业观察', status: 'enabled' },
  { id: 'i8', name: '重磅活动', emoji: '🎯', color: '#999', jumpTarget: '重磅活动', status: 'enabled' },
  { id: 'i9', name: '氢能领跑者', emoji: '🏆', color: '#999', jumpTarget: '氢能领跑者', status: 'disabled' },
  { id: 'i10', name: '质量万里行', emoji: '🎖️', color: '#999', jumpTarget: '质量万里行', status: 'disabled' },
];

export const mockPromotions: Promotion[] = [
  { id: 'p1', name: '2026国际氢能创新发展大会', date: '2026-06-20', location: '北京国家会议中心', status: '已上线', positions: ['与氢同行', '洞察专题'], jumpTarget: '外链' },
  { id: 'p2', name: '氢能装备技术创新展', date: '2026-07-01', location: '上海世博展览馆', status: '排期中', positions: ['与氢同行'], jumpTarget: '小程序页面' },
  { id: 'p3', name: '氢能产业链投资论坛（草案）', date: '待定', location: '待定', status: '草稿', positions: ['洞察专题'], jumpTarget: '待配置' },
  { id: 'p4', name: '2026Q1氢能产业白皮书发布会', date: '2026-03-15', location: '深圳', status: '已下线', positions: ['与氢同行', '洞察专题'], jumpTarget: '外链' },
];