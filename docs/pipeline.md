# 需求分析管线（Pipeline）

本文档说明氢界大数据平台项目的需求分析管线流程，适用于需求分析师、开发人员和项目管理人员。

## 整体流程

```
分析师本地工作                              GitHub 自动化
─────────────                            ─────────────
客户调研 → Qoder 指导Agent 实时辅导
         → Qoder 评审Agent 本地审核
         → 审核通过，提交 PR  ─────────→ Qoder Actions 复审
                                              ↓
                                    复审通过 → PR 合并
                                              ↓
                                    自动触发 Spec 生成
                                              ↓
                                    Spec PR → 确认 → 合入 docs/specs/
```

## 阶段说明

### 阶段 1：调研准备

**准入条件**：确定要分析的功能模块

**操作**：
1. Clone 项目仓库到本地
2. 阅读 `docs/pipeline.md`（本文档）了解流程
3. 阅读 `docs/templates/user-research.md` 获取调研模板
4. 与 Qoder 指导 Agent 讨论调研计划

**出口标准**：调研计划已制定（目标、对象、方法、时间明确）

### 阶段 2：调研执行

**准入条件**：调研计划已确认

**操作**：
1. 按计划执行调研（访谈、问卷、观察等）
2. 将原始记录存入 `docs/research/` 目录
3. 每个调研 session 单独一个文件
4. 命名格式：`YYYYMMDD-<主题>.md`

**出口标准**：调研记录完整、使用标准模板格式

### 阶段 3：需求分析

**准入条件**：调研记录已存档

**操作**：
1. 使用 `docs/templates/analysis.md` 模板进行分析
2. 将分析文档存入 `docs/analysis/` 目录
3. 命名格式：`<功能模块>-analysis.md`
4. Qoder 指导 Agent 实时检查分析质量

**出口标准**：分析文档覆盖所有维度（用户角色、场景、功能需求、非功能需求、边界条件）

### 阶段 4：本地评审

**准入条件**：分析文档完成

**操作**：
1. Qoder 评审 Agent 对文档进行评审
2. 输出评审报告（评分 + 问题清单）
3. 如不通过，按建议修改后重新评审
4. 通过后准备提交 PR

**出口标准**：评审 Agent 判定"通过"（加权总分 ≥ 3.5，无任何维度 ≤ 1 分）

### 阶段 5：GitHub 复审

**准入条件**：本地评审通过

**操作**：
1. 创建 PR，将文档提交到 `docs/research/` 或 `docs/analysis/`
2. GitHub Actions 自动触发 Qoder 复审（`docs-review.yml`）
3. Qoder 在 PR 评论中输出评审报告
4. 如复审不通过，修改后更新 PR

**出口标准**：GitHub 复审通过，PR 可合并

### 阶段 6：Spec 生成

**准入条件**：分析文档 PR 已合并

**操作**：
1. GitHub Actions 自动触发 Spec 生成（`spec-generation.yml`）
2. Qoder 基于审核通过分析文档生成 Spec
3. 创建新 PR 将 Spec 提交到 `docs/specs/`
4. 团队成员查看 Spec PR，确认后合并

**出口标准**：Spec 文档合入 `docs/specs/`，可作为开发依据

## 目录结构

```
docs/
├── pipeline.md              # 本文档
├── templates/               # 文档模板
│   ├── user-research.md     # 用户调研模板
│   ├── analysis.md          # 需求分析模板
│   └── spec-template.md     # Spec 输出模板
├── research/                # 原始调研材料
├── analysis/                # 需求分析产出
└── specs/                   # 审核通过的规格文档
```

## Qoder Agent 说明

### 指导 Agent（requirements-analyst）

- 配置文件：`.qoder/agents/requirements-analyst.md`
- 角色：分析师的本地教练
- 能力：指导调研方向、提供方法论、实时检查质量、给出改进建议

### 评审 Agent（requirements-reviewer）

- 配置文件：`.qoder/agents/requirements-reviewer.md`
- 角色：质量守门人
- 能力：按标准评分、输出评审报告、判定通过/不通过

## 评审标准摘要

### 调研文档（docs/research/）

核心维度：调研目标(15%)、调研对象(15%)、调研方法(10%)、原始记录(20%)、关键发现(25%)、文档规范(15%)

### 分析文档（docs/analysis/）

核心维度：用户角色(15%)、业务场景(20%)、功能需求(25%)、非功能需求(15%)、边界条件(15%)、文档规范(10%)

### 评分规则

每个维度 1-5 分，加权平均 ≥ 3.5 分通过，任何维度 ≤ 1 分不通过。

## GitHub Actions 工作流

| 工作流 | 触发条件 | 作用 |
|--------|---------|------|
| `docs-review.yml` | PR 涉及 `docs/research/` 或 `docs/analysis/` | 自动评审文档质量 |
| `spec-generation.yml` | `docs/analysis/` 的 PR 被合并 | 自动生成 Spec 文档 |
| `code-review.yml` | 任何代码 PR | 自动审查代码 |
| `assistant.yml` | PR/Issue 中 @qoder | 按需互动问答 |

## 与 Wiki 的关联

当 Spec 文档合入 `docs/specs/` 后，Qoder 的 RepoWiki 会自动扫描并更新项目知识库，将新的功能规格纳入 Wiki 体系，确保开发人员在 Qoder 中编码时能直接获取需求上下文。
