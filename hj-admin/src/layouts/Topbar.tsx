import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const breadcrumbMap: Record<string, string> = {
  '/dashboard': '概览 › 数据概览',
  '/news/pool': '内容管理 › 资讯库管理 › 资讯池',
  '/news/published': '内容管理 › 资讯库管理 › 已发布资讯',
  '/news/sources': '内容管理 › 资讯库管理 › 数据源管理',
  '/news/edit': '内容管理 › 资讯库管理 › 资讯编辑页',
  '/tags/news': '标签管理 › 资讯标签',
  '/tags/enterprise': '标签管理 › 企业标签',
  '/enterprise/pool': '数据库管理 › 企业库 › 待处理池',
  '/enterprise/confirmed': '数据库管理 › 企业库 › 已确认企业',
  '/enterprise/edit': '数据库管理 › 企业库 › 企业编辑页',
  '/resource/banner': '资源位管理 › Banner管理',
  '/resource/icon': '资源位管理 › Icon管理',
  '/resource/promotion': '资源位管理 › 推广活动管理',
};

const Topbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const bcText = breadcrumbMap[path] || '';
  const parts = bcText.split(' › ');

  return (
    <header style={{
      height: 52,
      background: '#fff',
      borderBottom: '1px solid #dfe1e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#65676b' }}>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: '#9a9da5', fontSize: 11, margin: '0 2px' }}>›</span>}
            <span style={i === parts.length - 1 ? { color: '#1d2129', fontWeight: 500 } : { cursor: 'pointer' }}
              onClick={() => {
                if (i === 0 && part === '内容管理') navigate('/news/pool');
                if (i === 0 && part === '数据库管理') navigate('/enterprise/pool');
              }}
            >{part}</span>
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ position: 'relative', cursor: 'pointer', width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}
          title="质量告警：3项待处理逾期">
          ⚠️<span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: '#ff9500', borderRadius: '50%', border: '2px solid #fff' }} />
        </div>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', background: '#e8f2ff', color: '#1a6dff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14, cursor: 'pointer',
        }}>运</div>
      </div>
    </header>
  );
};

export default Topbar;
