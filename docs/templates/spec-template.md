---
title: Spec文档模板
version: 1.0
status: draft
author: C
created: YYYY-MM-DD
updated: YYYY-MM-DD
related_issue: 0
changelog:
  - version: 1.0
    date: YYYY-MM-DD
    author: C
    summary: 初始版本
---

# Spec：[功能名称]

## 1. 功能概述
一句话描述功能目标和业务价值。

## 2. 数据模型

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | UUID | PK | 主键 |

## 3. 接口契约

### 3.1 创建接口
- **路径**: POST /api/xxx
- **入参**: (JSON Schema)
- **出参**: (JSON Schema)
- **异常**: 错误码定义

## 4. 业务流程
`mermaid
graph TD
    A[开始] --> B[处理]
    B --> C[结束]
`

## 5. 边界用例
- 边界case 1: ...
- 边界case 2: ...

## 6. 验收标准
- [ ] AC-1: ...
- [ ] AC-2: ...

## 7. 关联文档
- 需求来源: docs/02-analysis/xxx.md
- 上游变更: 无