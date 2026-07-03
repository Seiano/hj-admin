// ===== 企业编辑页 - 自定义组件 =====
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Input, Select, Tag, Badge, Space, Steps, Radio, Checkbox, Progress, Tooltip } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, CheckCircleOutlined, RobotOutlined } from '@ant-design/icons';
import { mockEnterprises } from '../mock';
import { BIZ_TYPE_SUBFIELDS } from '../types';

const EnterpriseEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const ent = mockEnterprises.find(e => e.id === id);

  if (!ent) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#9a9da5' }}>企业未找到 (id: {id})</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>返回</Button>
        <h2 style={{ flex: 1, fontSize: 18, fontWeight: 600 }}>{ent.name}</h2>
        <Space>
          <Button icon={<SaveOutlined />}>暂存</Button>
          <Button type="primary" icon={<CheckCircleOutlined />}>完成</Button>
        </Space>
      </div>

      {/* 第一部分：基本信息 */}
      <Card size="small" title="基本信息" style={{ marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px 24px' }}>
          {[
            { label: '企业全称', value: ent.name, source: 'API' },
            { label: '社会信用代码', value: ent.creditCode, source: 'API' },
            { label: '简称', value: ent.shortName, source: '手动' },
            { label: '法定代表人', value: ent.legalPerson, source: 'API' },
            { label: '注册资本', value: ent.registeredCapital + ' 万元', source: 'API' },
            { label: '省市', value: `${ent.province} ${ent.city}`, source: '映射' },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize: 12, color: '#9a9da5', marginBottom: 2 }}>
                {f.label}
                <Tag style={{ marginLeft: 6, fontSize: 10, padding: '0 4px' }} color={f.source === 'API' ? 'blue' : f.source === '映射' ? 'orange' : 'green'}>{f.source}</Tag>
              </div>
              <div style={{ fontWeight: 500 }}>{f.value || '—'}</div>
            </div>
          ))}
        </div>
        <Input.TextArea rows={2} defaultValue={ent.description} style={{ marginTop: 12 }} placeholder="企业简介" />
      </Card>

      {/* 第二部分：关联确认 */}
      <Card size="small" title={
        <span>关联确认 <Tag color="blue" style={{ marginLeft: 8 }}>氢能关联度: {ent.h2Score}分</Tag>
          {ent.h2Score >= 70 ? <Tag color="green">种子源企业</Tag> : <Tag>非种子源企业</Tag>}
        </span>
      } style={{ marginBottom: 12 }}>
        <div style={{ background: '#fffbe6', padding: '8px 12px', borderRadius: 6, marginBottom: 12, border: '1px solid #ffe58f', fontSize: 13 }}>
          💡 第一步：确认关联 → 氢能关联度将实时计算更新
        </div>
        <Tabs简易关联 ent={ent} />
      </Card>

      {/* 第三部分：企业分类（关联确认后解锁） */}
      <Card size="small" title="企业分类" style={{ opacity: ent.confirmedLinks > 0 ? 1 : 0.5, pointerEvents: ent.confirmedLinks > 0 ? 'auto' : 'none' }}>
        {ent.confirmedLinks === 0 && <div style={{ color: '#9a9da5', fontSize: 13, marginBottom: 12 }}>🔒 请先完成关联确认后解锁分类</div>}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>判断氢能企业 *</div>
          <Radio.Group defaultValue={ent.dim1}>
            <Space direction="vertical">
              <Radio value="氢能核心企业">氢能核心企业</Radio>
              <Radio value="氢能关联企业">氢能关联企业</Radio>
              <Radio value="非氢能企业">非氢能企业</Radio>
            </Space>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>判断企业类型</div>
          <Checkbox.Group defaultValue={ent.bizType} options={['投资运营型', '装备制造型', '投资金融型', '公共服务型']} />
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>判断细分领域 * <Tag color="blue" style={{ marginLeft: 4 }}>🤖 系统推荐</Tag></div>
          <Select mode="multiple" style={{ width: '100%' }} defaultValue={ent.subfields} options={Object.entries(BIZ_TYPE_SUBFIELDS).flatMap(([_, subs]) => subs.map(s => ({ label: s, value: s })))} />
        </div>
      </Card>
    </div>
  );
};

// 简易关联 Tab 组件
function Tabs简易关联({ ent }: { ent: { linkedNews: number; linkedProjects: number; linkedPatents: number; confirmedLinks: number; candidateLinks: number } }) {
  const [activeTab, setActiveTab] = React.useState('news');
  const tabs = [
    { key: 'news', label: `资讯 (${ent.linkedNews})` },
    { key: 'project', label: `项目 (${ent.linkedProjects})` },
    { key: 'patent', label: `专利 (${ent.linkedPatents})` },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {tabs.map(t => (
          <div key={t.key} onClick={() => setActiveTab(t.key)}
            style={{ padding: '6px 16px', borderRadius: 6, cursor: 'pointer', background: activeTab === t.key ? '#1a6dff' : '#f0f5ff', color: activeTab === t.key ? '#fff' : '#1a6dff', fontWeight: 500, fontSize: 13 }}>
            {t.label}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8f9fb', borderRadius: 6 }}>
        <span style={{ fontSize: 13, color: '#65676b' }}>已确认 {ent.confirmedLinks} 项 · 候选 {ent.candidateLinks} 项</span>
        <Space><Button size="small" type="primary">批量确认</Button><Button size="small">全部忽略</Button></Space>
      </div>
    </div>
  );
}

export default EnterpriseEditPage;
