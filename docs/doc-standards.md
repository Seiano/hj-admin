# 文档版本管理规范

## 文档 Frontmatter 格式

每份正式文档必须在文件头部包含 YAML frontmatter：

`yaml
---
title: 文档标题
version: 1.0
status: approved  # draft / review / approved / archived
author: 角色代号（A/B/C/D/E）
created: 2026-01-01
updated: 2026-01-15
related_issue: 12
changelog:
  - version: 1.0
    date: 2026-01-01
    author: B
    summary: 初始版本
  - version: 1.1
    date: 2026-01-15
    author: B
    summary: 根据客户反馈新增验收标准第3条
---
`

## 状态流转

`
draft → review → approved → archived
               ↓
            draft（驳回后重新修改）
`

- **draft**: 初稿编写中，不可作为开发依据
- **review**: 提交评审中，等待交叉审核
- **approved**: 评审通过，可作为开发和验收依据
- **archived**: 已归档（被新版本替代或项目结项）

## 版本号规则

- **主版本 (x.0)**: 重大结构变更、需求方向调整
- **次版本 (x.y)**: 内容补充、细节修正
- 每次变更必须在 changelog 中记录

## 文档目录结构

`
docs/
  01-research/        # 调研阶段产出（调研报告、竞品分析、可行性分析）
  02-analysis/        # 分析阶段产出（需求分析、业务规则、验收标准）
  03-spec/            # Ultra Spec（技术方案、接口契约、数据库设计）
  archived/           # 已归档的旧版本文档
`

## 变更传播规则

1. **需求文档变更** → 自动检测关联的分析文档和Spec，创建更新提醒Issue
2. **分析文档变更** → 自动检测关联的Spec，通知对应开发人员
3. **Spec变更** → 自动通知所有关联该Spec的开发Issue，提醒检查代码对齐
4. 所有变更必须在 changelog 中记录，旧版本移入 archived/ 目录