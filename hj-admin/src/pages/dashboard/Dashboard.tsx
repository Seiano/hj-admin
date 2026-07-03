import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { DatabaseOutlined, FileTextOutlined, TeamOutlined, ThunderboltOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const stats = [
    { title: '资讯总数', value: 1247, icon: <FileTextOutlined />, color: '#1a6dff' },
    { title: '已发布资讯', value: 318, icon: <FileTextOutlined />, color: '#00b365' },
    { title: '待处理企业', value: 30000, icon: <TeamOutlined />, color: '#ff9500' },
    { title: '已确认企业', value: 1284, icon: <DatabaseOutlined />, color: '#7c4dff' },
    { title: '数据源', value: 8, icon: <ThunderboltOutlined />, color: '#00bcd4' },
    { title: '资讯标签', value: 24, icon: <FileTextOutlined />, color: '#e91e8c' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>数据概览</h2>
        <p style={{ color: '#65676b', fontSize: 13 }}>氢界大数据平台核心运营指标一览</p>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map(s => (
          <Col xs={24} sm={12} md={8} lg={4} key={s.title}>
            <Card hoverable style={{ textAlign: 'center' }}>
              <Statistic
                title={<span style={{ color: '#9a9da5', fontSize: 12 }}>{s.title}</span>}
                value={s.value}
                prefix={<span style={{ color: s.color, fontSize: 20, marginRight: 8 }}>{s.icon}</span>}
                valueStyle={{ color: s.color, fontWeight: 700, fontSize: 28 }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="📈 近7日资讯采集趋势" size="small">
            <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '0 16px' }}>
              {[42, 35, 51, 28, 39, 47, 33].map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: `${v * 3}px`, background: '#1a6dff', borderRadius: '4px 4px 0 0', transition: 'height 0.3s' }} />
                  <span style={{ fontSize: 11, color: '#9a9da5' }}>{['一', '二', '三', '四', '五', '六', '日'][i]}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="🏭 企业分类分布" size="small">
            <div style={{ padding: '8px 16px' }}>
              {[
                { label: '氢能核心企业', count: 891, pct: 69, color: '#00b365' },
                { label: '氢能关联企业', count: 362, pct: 28, color: '#1a6dff' },
                { label: '非氢能企业', count: 19, pct: 2, color: '#9a9da5' },
                { label: '待分类', count: 12, pct: 1, color: '#ff9500' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span>{item.label}</span>
                    <span style={{ fontWeight: 600, color: item.color }}>{item.count}家</span>
                  </div>
                  <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 4, transition: 'width 0.3s' }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="⚠️ 待办事项" size="small">
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { label: '待补关联资讯', count: 21, color: '#ff9500' },
                { label: '待关联企业', count: 24500, color: '#ff9500' },
                { label: '无关联待确认', count: 5500, color: '#ff3b30' },
                { label: '待分类企业', count: 12, color: '#ff9500' },
                { label: '数据源异常', count: 1, color: '#ff3b30' },
              ].map(item => (
                <div key={item.label} style={{
                  flex: '1 1 150px',
                  padding: '12px 16px',
                  background: '#f8f9fb',
                  borderRadius: 8,
                  borderLeft: `3px solid ${item.color}`,
                }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: item.color }}>{item.count.toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: '#9a9da5', marginTop: 2 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
