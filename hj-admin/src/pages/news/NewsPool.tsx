import React, { useState } from 'react';
import { Table, Tag, Select, Input, Button, Space, Badge, DatePicker, Modal } from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockNewsList } from '../../mock/data';
import type { NewsItem, NewsStatus } from '../../types';

const { Option } = Select;
const { RangePicker } = DatePicker;

const sourceOptions = ['氢能聚焦', '氢智会', '中国氢能联盟', '势银能链', '香橙会', '高工氢电', '人民日报'];
const statusOptions: NewsStatus[] = ['草稿', '已发布', '已下架', '已归档'];
const linkStatusOptions = ['未关联', '部分关联', '已完整关联'];

const statusColorMap: Record<NewsStatus, string> = {
  '草稿': '#9a9da5',
  '已发布': '#00b365',
  '已下架': '#ff9500',
  '已归档': '#65676b',
};

const NewsPool: React.FC = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState<string | undefined>();
  const [status, setStatus] = useState<NewsStatus | undefined>();
  const [linkStatus, setLinkStatus] = useState<string | undefined>();
  const [keyword, setKeyword] = useState('');
  const [nerModalVisible, setNerModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const filtered = mockNewsList.filter(n => {
    if (source && n.source !== source) return false;
    if (status && n.status !== status) return false;
    if (keyword && !n.title.includes(keyword)) return false;
    return true;
  });

  const columns = [
    { title: '标题', dataIndex: 'title', key: 'title', width: 280, ellipsis: true,
      render: (t: string, r: NewsItem) => <a onClick={() => navigate(`/news/edit/${r.id}`)} style={{ color: '#1a6dff' }}>{t}</a>,
    },
    { title: '来源', dataIndex: 'source', key: 'source', width: 110 },
    { title: '标签', key: 'tags', width: 200,
      render: (_: unknown, r: NewsItem) => (
        <Space size={[4, 4]} wrap>
          {r.autoTags.map((tag, i) => (
            <Tag key={i} className="tag-auto" style={{ fontSize: 11, padding: '0 6px', margin: 0 }}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    { title: '识别企业', key: 'ent', width: 80, align: 'center' as const,
      render: (_: unknown, r: NewsItem) => <a style={{ color: '#1a6dff', fontWeight: 600 }} onClick={() => { setSelectedNews(r); setNerModalVisible(true); }}>{r.nerEntities.ent}</a>,
    },
    { title: '识别项目', key: 'prj', width: 80, align: 'center' as const,
      render: (_: unknown, r: NewsItem) => <span style={{ color: '#65676b' }}>{r.nerEntities.prj}</span>,
    },
    { title: '识别政策', key: 'pol', width: 80, align: 'center' as const,
      render: (_: unknown, r: NewsItem) => <span style={{ color: '#65676b' }}>{r.nerEntities.pol}</span>,
    },
    { title: '识别标准', key: 'std', width: 80, align: 'center' as const,
      render: (_: unknown, r: NewsItem) => <span style={{ color: '#65676b' }}>{r.nerEntities.std}</span>,
    },
    { title: '识别专利', key: 'pat', width: 80, align: 'center' as const,
      render: (_: unknown, r: NewsItem) => <span style={{ color: '#65676b' }}>{r.nerEntities.pat}</span>,
    },
    { title: '状态', dataIndex: 'status', key: 'status', width: 90,
      render: (s: NewsStatus) => <Badge color={statusColorMap[s]} text={<span style={{ fontSize: 12, color: statusColorMap[s] }}>{s}</span>} />,
    },
    { title: '发布时间', dataIndex: 'publishTime', key: 'publishTime', width: 110,
      render: (t: string) => t || <span style={{ color: '#ccc' }}>—</span>,
    },
    { title: '操作', key: 'action', width: 120, fixed: 'right' as const,
      render: (_: unknown, r: NewsItem) => (
        <Space size={4}>
          <a onClick={() => navigate(`/news/edit/${r.id}`)} style={{ fontSize: 12 }}>编辑</a>
          {r.status === '草稿' && <a style={{ fontSize: 12, color: '#00b365' }}>发布</a>}
          {r.status === '已发布' && <a style={{ fontSize: 12, color: '#ff9500' }}>下架</a>}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>资讯池</h2>
        <p style={{ color: '#9a9da5', fontSize: 13 }}>所有入库资讯的统一管理视图，共 1,247 条</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 8, padding: '16px 20px', marginBottom: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <Space wrap size={12}>
          <Select placeholder="来源" allowClear style={{ width: 140 }} value={source} onChange={setSource}>
            {sourceOptions.map(s => <Option key={s}>{s}</Option>)}
          </Select>
          <Select placeholder="状态" allowClear style={{ width: 120 }} value={status} onChange={setStatus}>
            {statusOptions.map(s => <Option key={s}>{s}</Option>)}
          </Select>
          <Select placeholder="关联状态" allowClear style={{ width: 120 }} value={linkStatus} onChange={setLinkStatus}>
            {linkStatusOptions.map(s => <Option key={s}>{s}</Option>)}
          </Select>
          <Input placeholder="标题/摘要关键词" prefix={<SearchOutlined />} style={{ width: 200 }} value={keyword} onChange={e => setKeyword(e.target.value)} />
          <RangePicker style={{ width: 240 }} />
          <Button type="primary" icon={<SearchOutlined />}>筛选</Button>
          <Button icon={<ReloadOutlined />} onClick={() => { setSource(undefined); setStatus(undefined); setLinkStatus(undefined); setKeyword(''); }}>重置</Button>
        </Space>
      </div>

      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filtered}
          scroll={{ x: 1400 }}
          pagination={{ total: 1247, pageSize: 20, showTotal: t => `共 ${t} 条`, showSizeChanger: false }}
          size="middle"
        />
      </div>

      <Modal title="NER识别实体清单" open={nerModalVisible} onCancel={() => setNerModalVisible(false)} footer={null} width={520}>
        {selectedNews && (
          <div>
            <p style={{ marginBottom: 12, color: '#65676b', fontSize: 13 }}>{selectedNews.title}</p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              {Object.entries(selectedNews.nerEntities).map(([k, v]) => {
                const labelMap: Record<string, string> = { ent: '企业', prj: '项目', pol: '政策', std: '标准', pat: '专利' };
                return <div key={k} style={{ flex: 1, textAlign: 'center', padding: 8, background: '#f8f9fb', borderRadius: 6 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1a6dff' }}>{v}</div>
                  <div style={{ fontSize: 12, color: '#9a9da5' }}>{labelMap[k]}</div>
                </div>;
              })}
            </div>
            <Button type="primary" block onClick={() => { setNerModalVisible(false); navigate(`/news/edit/${selectedNews.id}`); }}>前往处理</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NewsPool;
