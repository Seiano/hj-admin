// ===== 资讯编辑页 - 自定义组件 =====
// 编辑页含 NER 面板、富文本等复杂交互，不适合 Schema 化

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Space, Tag, Badge, Select, Input, Card, Tooltip } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, SendOutlined, RobotOutlined } from '@ant-design/icons';
import { mockNewsList } from '../mock';

const NewsEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const news = mockNewsList.find(n => n.id === id);
  const [title, setTitle] = useState(news?.title || '');

  if (!news) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#9a9da5' }}>资讯未找到 (id: {id})</div>;
  }

  return (
    <div>
      {/* 顶部操作栏 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/news/pool')}>返回列表</Button>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ flex: 1, fontSize: 16, fontWeight: 600, border: 'none', borderBottom: '2px solid #eee', borderRadius: 0 }}
        />
        <Badge color={{ '草稿': '#9a9da5', '已发布': '#00b365', '已下架': '#ff9500', '已归档': '#65676b' }[news.status]}
          text={news.status} />
        <Select defaultValue={news.province} style={{ width: 120 }} />
        <Space>
          <Button icon={<SaveOutlined />}>保存草稿</Button>
          <Button type="primary" icon={<SendOutlined />}>发布</Button>
        </Space>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        {/* 左栏：标签+原文+摘要 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 标签区 */}
          <Card size="small" title="标签" style={{ marginBottom: 12 }}
            extra={<Button size="small" type="link">全部采用</Button>}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              {news.autoTags.map((tag, i) => (
                <Tag key={i} className="tag-auto" style={{ cursor: 'pointer' }}>
                  {tag} <span style={{ color: '#ff3b30', marginLeft: 4, cursor: 'pointer' }}>✕</span>
                </Tag>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9a9da5', fontSize: 12 }}>
              <RobotOutlined /> AI自动打标 · 虚线=系统推荐，点击采用
            </div>
          </Card>

          {/* 原文编辑区 */}
          <Card size="small" title="正文" style={{ marginBottom: 12 }}
            extra={<Space><Button size="small">自动排版</Button><Button size="small">保存快照</Button></Space>}>
            <div
              style={{ minHeight: 300, padding: 12, border: '1px solid #eee', borderRadius: 6, lineHeight: 2, fontSize: 14 }}
              contentEditable
              suppressContentEditableWarning
            >
              <p>中国石化新疆库车绿氢示范项目于近日全面投产，年产绿氢2万吨。该项目是全球最大的绿氢示范项目，采用了...</p>
              <p>项目总投资约30亿元，建设规模为年产绿氢2万吨，配置了52台1000Nm³/h碱性电解槽，配套光伏发电装机容量约...</p>
              <p>
                <span className="ner-l1">中国石化</span>在氢能领域的布局不止于此。近年来，<span className="ner-l1">中国石化</span>已在广东、上海、浙江等多地建设加氢站，并计划到2025年建成1000座加氢站。
              </p>
              <p>国际方面，<span className="ner-l2">NEDO</span>近日发布了2030年氢能战略升级版，聚焦液氢储运技术路线。同时，<span className="ner-l3">某新能源公司</span>宣布了新的绿氢项目计划。</p>
            </div>
          </Card>

          {/* 摘要区 */}
          <Card size="small" title="摘要" extra={<Button size="small" icon={<RobotOutlined />}>AI生成</Button>}>
            <Input.TextArea rows={4} defaultValue="中石化新疆库车绿氢项目全面投产，年产绿氢2万吨，采用52台碱性电解槽，是全球最大的绿氢示范项目。" />
          </Card>
        </div>

        {/* 右栏：NER关联确认面板 */}
        <div style={{ width: 420, flexShrink: 0 }}>
          <Card size="small" title="NER 关联确认" style={{ position: 'sticky', top: 0 }}>
            {/* NER 统计卡片 */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {[
                { type: '企业', count: 4, color: '#1a6dff' },
                { type: '项目', count: 1, color: '#00b365' },
                { type: '政策', count: 2, color: '#ff9500' },
                { type: '标准', count: 0, color: '#7c4dff' },
                { type: '专利', count: 3, color: '#ff3b30' },
              ].map(e => (
                <div key={e.type} style={{ flex: 1, textAlign: 'center', padding: '6px 0', background: '#f8f9fb', borderRadius: 6 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: e.color }}>{e.count}</div>
                  <div style={{ fontSize: 11, color: '#9a9da5' }}>{e.type}</div>
                </div>
              ))}
            </div>

            {/* NER Block 示例 */}
            <div style={{ padding: 12, background: '#f8f9fb', borderRadius: 8, marginBottom: 8, borderLeft: '3px solid #1a6dff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Tag color="blue" style={{ margin: 0 }}>L1 精确匹配</Tag>
                <span style={{ fontSize: 11, color: '#9a9da5' }}>企业</span>
              </div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>中国石化</div>
              <div style={{ fontSize: 12, color: '#65676b', marginBottom: 8 }}>
                候选: <span style={{ color: '#00b365', fontWeight: 600 }}>中国石油化工股份有限公司</span> (100%)
              </div>
              <Space size={4}>
                <Button size="small" type="primary">确认关联</Button>
                <Button size="small" danger>忽略</Button>
              </Space>
            </div>

            <div style={{ padding: 12, background: '#f8f9fb', borderRadius: 8, marginBottom: 8, borderLeft: '3px solid #ffc107' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Tag color="warning" style={{ margin: 0 }}>L2 归一化</Tag>
                <span style={{ fontSize: 11, color: '#9a9da5' }}>企业</span>
              </div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>NEDO</div>
              <div style={{ fontSize: 12, color: '#65676b', marginBottom: 8 }}>
                候选: <span style={{ color: '#ff9500', fontWeight: 600 }}>日本新能源产业技术综合开发机构</span> (82%)
              </div>
              <Space size={4}>
                <Button size="small" type="primary">确认关联</Button>
                <Button size="small">忽略</Button>
                <Button size="small">创建新实体</Button>
              </Space>
            </div>

            <div style={{ padding: 12, background: '#f8f9fb', borderRadius: 8, borderLeft: '3px solid #ff9500' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Tag color="orange" style={{ margin: 0 }}>L3 相似度</Tag>
                <span style={{ fontSize: 11, color: '#9a9da5' }}>企业</span>
              </div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>某新能源公司</div>
              <div style={{ fontSize: 12, color: '#65676b', marginBottom: 8 }}>
                候选: <span style={{ color: '#ff9500' }}>隆基氢能科技有限公司</span> (45%)
              </div>
              <Space size={4}>
                <Button size="small" type="primary">确认关联</Button>
                <Button size="small" danger>忽略</Button>
                <Button size="small">创建新实体</Button>
              </Space>
            </div>

            <Button block style={{ marginTop: 8 }} type="dashed">+ 手动添加关联</Button>
          </Card>
        </div>
      </div>

      {/* 底部信息栏 */}
      <div style={{ marginTop: 12, padding: '8px 12px', background: '#f8f9fb', borderRadius: 6, display: 'flex', gap: 24, fontSize: 12, color: '#9a9da5' }}>
        <span>来源: {news.source}</span>
        <span>采集时间: 2026-06-08 14:32</span>
        <span>编辑人: 运营A</span>
        <span>版本: v3</span>
        <a style={{ marginLeft: 'auto' }}>版本历史</a>
        <a>导出关联</a>
      </div>
    </div>
  );
};

export default NewsEditPage;
