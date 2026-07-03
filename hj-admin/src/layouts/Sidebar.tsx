// ===== Sidebar - 从 manifest 驱动菜单 =====
// 不再硬编码菜单项，改为从 bootstrap 的 buildMenuTree() 自动生成
// 新增域后菜单自动出现，无需手动修改

import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from 'antd';
import { buildMenuTree, type MenuGroup, type MenuGroupItem } from '../app/bootstrap';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const menuTree = useMemo(() => buildMenuTree(), []);

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const isActive = (key: string) => location.pathname === key;
  const isParentActive = (item: MenuGroupItem) =>
    !!item.children?.some(child => isActive(child.key));

  const renderItem = (item: MenuGroupItem) => {
    if (item.disabled) {
      return (
        <div key={item.key} style={{
          padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10,
          opacity: 0.38, cursor: 'not-allowed', fontSize: 13.5, color: '#b0b3bb',
        }}>
          <span style={{ width: 20, textAlign: 'center', fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
          {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
          {!collapsed && item.badge && (
            <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 3, background: 'rgba(255,255,255,0.1)', color: '#8a8d95' }}>
              {item.badge}
            </span>
          )}
        </div>
      );
    }

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedKeys.includes(item.key);
    const isGroupActive = hasChildren ? isParentActive(item) : item.children?.[0] && isActive(item.children[0].key);

    return (
      <div key={item.key}>
        <div
          style={{
            padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer', transition: 'all 0.2s',
            borderLeft: `3px solid ${isGroupActive ? '#1a6dff' : 'transparent'}`,
            background: isGroupActive ? '#2a2d35' : 'transparent',
            color: isGroupActive ? '#fff' : '#b0b3bb',
            fontWeight: isGroupActive ? 500 : 400, fontSize: 13.5,
          }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.key);
            } else if (item.children?.[0]) {
              navigate(item.children[0].key);
            }
          }}
          onMouseEnter={e => { if (!isGroupActive) { e.currentTarget.style.background = '#24272e'; e.currentTarget.style.color = '#d0d3db'; } }}
          onMouseLeave={e => { if (!isGroupActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b0b3bb'; } }}
        >
          <span style={{ width: 20, textAlign: 'center', fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
          {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
          {!collapsed && item.dot && <Badge color="#ff9500" style={{ marginLeft: 'auto' }} />}
          {!collapsed && hasChildren && (
            <span style={{
              marginLeft: 4, fontSize: 9, transition: 'transform 0.2s',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', color: '#6b6e77',
            }}>▶</span>
          )}
        </div>

        {hasChildren && isExpanded && !collapsed && (
          <div>
            {item.children!.map(child => (
              <div
                key={child.key}
                style={{
                  padding: '6px 16px 6px 48px', fontSize: 12.5,
                  color: isActive(child.key) ? '#fff' : '#8a8d95',
                  cursor: 'pointer', transition: 'all 0.2s',
                  borderLeft: `3px solid ${isActive(child.key) ? '#1a6dff' : 'transparent'}`,
                  background: isActive(child.key) ? '#2a2d35' : 'transparent',
                  fontWeight: isActive(child.key) ? 500 : 400,
                }}
                onClick={() => navigate(child.key)}
                onMouseEnter={e => { e.currentTarget.style.background = '#24272e'; e.currentTarget.style.color = '#c0c4ce'; }}
                onMouseLeave={e => { if (!isActive(child.key)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8a8d95'; } }}
              >
                {child.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside style={{
      width: collapsed ? 64 : 240, minWidth: collapsed ? 64 : 240,
      background: '#1a1d23', color: '#fff', display: 'flex', flexDirection: 'column',
      overflowY: 'auto', transition: 'width 0.2s, min-width 0.2s', zIndex: 10,
    }}>
      <div style={{
        padding: '16px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: 32, height: 32, background: '#1a6dff', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 13, flexShrink: 0,
        }}>H₂</div>
        {!collapsed && <span style={{ fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap' }}>氢界运营后台</span>}
      </div>

      <nav style={{ flex: 1, padding: '8px 0' }}>
        {menuTree.map((group: MenuGroup) => (
          <div key={group.group}>
            {!collapsed && (
              <div style={{
                padding: '8px 16px 4px', fontSize: 10.5, color: '#6b6e77',
                letterSpacing: 0.6, fontWeight: 600, textTransform: 'uppercase',
              }}>
                {group.group}
              </div>
            )}
            {group.items.map(item => renderItem(item))}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div style={{
          padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: 11, color: '#6b6e77',
        }}>
          氢界后台原型 v3.2 · BAT2
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
