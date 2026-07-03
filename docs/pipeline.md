# 人+AI 协作开发全流程

本文档描述氢界大数据平台项目的完整协作流程，以 **GitHub 为唯一中枢**，所有流转都在 GitHub 内完成，Qoder 在每个环节增强自动化能力。

## 全景架构

```
GitHub = 唯一中枢
┌─────────────────────────────────────────────────────────────────┐
│  Issues ──→ Projects ──→ Branches ──→ PRs ──→ Actions ──→ Releases │
│  需求/任务   看板管理      分支开发     审查合入   自动化      版本发布  │
└─────────────────────────────────────────────────────────────────┘
       │          │           │          │         │           │
       ↓          ↓           ↓          ↓         ↓           ↓
     @qoder     看板自动     Qoder    Qoder     Qoder       Qoder
     细化需求    同步状态    Code     自动审查   生成Spec    生成Changelog
                         Review              自动测试
```

---

## 阶段一：需求输入与细化

**入口**：客户提出需求（可能是模糊的一句话）

**GitHub 操作**：
1. 创建 Issue，选择 **需求** 模板
2. 填入原始描述（尽量保留客户原话）
3. 自动打上 `type:requirement` + `status:new` 标签

**Qoder 自动响应**（`issue-refine.yml`）：
1. 自动添加 `status:refining` 标签
2. 在 Issue 评论中输出：
   - 需求意图理解
   - 补充的细节和边界条件
   - ❓ 歧义点
   - ⚠️ 待确认项
   - 客户确认清单（可勾选列表）

**人工操作**：
1. 分析师审查 AI 细化结果，必要时修改
2. 带着确认清单与客户对齐
3. 客户确认后，手动将标签改为 `status:confirmed`

**出口标准**：标签为 `status:confirmed`，需求描述清晰无歧义

---

## 阶段二：需求分析与 Spec 生成

### 2a. 调研与分析（分析师本地）

**入口**：`status:confirmed` 的需求

**操作**：
1. 使用 `.qoder/agents/requirements-analyst.md` Agent 指导调研
2. 调研记录存入 `docs/research/YYYYMMDD-<主题>.md`
3. 分析文档存入 `docs/analysis/<模块>-analysis.md`
4. 使用 `.qoder/agents/requirements-reviewer.md` Agent 本地评审
5. 评审通过（加权总分 ≥ 3.5，无维度 ≤ 1 分）

### 2b. GitHub 复审与 Spec 生成

**操作**：
1. 创建 PR 提交分析文档到 `docs/analysis/`
2. GitHub Actions 自动触发文档评审（`docs-review.yml`）
3. 评审通过后 PR 合并
4. 合并自动触发 Spec 生成（`spec-generation.yml`）
5. Qoder 创建新 PR，将 Spec 提交到 `docs/specs/`
6. 团队确认后合并 Spec PR

**标签流转**：
```
status:confirmed → status:analyzing → status:spec-ready
```

**出口标准**：`docs/specs/` 中有对应的 Spec 文件，标签为 `status:spec-ready`

---

## 阶段三：任务拆分与分配

**入口**：`status:spec-ready` 的需求

**操作**：
1. 基于 Spec 拆分开发任务（创建 Task Issue，选择 **开发任务** 模板）
2. 关联原始需求 Issue
3. 分配给开发人员（Assignees）
4. 设置 Milestone（版本号）
5. 标签为 `status:in-dev`

**GitHub Projects 看板**：
| 列 | 含义 |
|----|------|
| 需求池 | `status:new` 或 `status:refining` |
| 已确认 | `status:confirmed` |
| 分析中 | `status:analyzing` |
| 待开发 | `status:spec-ready` |
| 开发中 | `status:in-dev` |
| 审查中 | 有 open 的 PR |
| 已完成 | `status:done` |

---

## 阶段四：开发与代码审查

**入口**：分配好的开发任务

### 分支命名规范

| 类型 | 格式 | 示例 |
|------|------|------|
| 功能 | `feat/<issue>-<desc>` | `feat/12-ner-confirm-panel` |
| 修复 | `fix/<issue>-<desc>` | `fix/45-status-not-update` |
| 变更 | `change/<issue>-<desc>` | `change/78-batch-confirm` |
| 发布 | `release/v<ver>` | `release/v1.0` |

### 开发流程

1. 从 `main` 创建功能分支
2. 使用 Qoder 编码（Wiki 和 Spec 自动作为上下文）
3. 提交 PR 到 `main`
4. GitHub Actions 自动触发代码审查（`code-review.yml`）
5. 审查通过后合并
6. 关联 Issue 自动关闭

---

## 阶段五：需求变更管理

**入口**：客户改主意了

**GitHub 操作**：
1. 创建 Issue，选择 **需求变更** 模板
2. 填入关联原始需求编号、变更原因
3. 自动打上 `type:change-request` + `status:pending-review` 标签

**Qoder 自动响应**（`change-impact.yml`）：
1. 找到关联的原始需求和 Spec
2. 评估影响范围：
   - 受影响的 Spec 文档
   - 受影响的代码文件
   - 受影响的关联任务
   - 预估工时影响
3. 在 Issue 评论中输出【变更评估报告】
4. 给出建议（批准/延迟/拒绝）

**人工操作**：
1. 基于评估报告决策
2. 批准后标签改为 `status:approved`
3. 创建对应的开发任务

**标签流转**：
```
status:pending-review → status:impact-assessed → status:approved
                                               → status:rejected
```

---

## 阶段六：版本管理与发布

### Milestone 管理

- 每个版本一个 Milestone（如 `v1.0`、`v1.1`）
- Issue 关联到对应 Milestone
- Milestone 完成度 = 关联 Issue 的关闭比例

### 发布流程

1. 所有目标 Issue 关闭后，关闭 Milestone
2. 创建 Release（tag 格式 `v1.0.0`）
3. GitHub Actions 自动触发（`auto-changelog.yml`）
4. Qoder 生成 Changelog 并评论到 Release

### 版本号规则

- `v1.0.0` — 首个正式版
- `v1.1.0` — 功能更新（向下兼容）
- `v1.0.1` — Bug 修复
- `v2.0.0` — 重大版本（不兼容变更）

---

## 阶段七：反馈闭环

**入口**：线上问题或用户反馈

**操作**：
1. 创建 Bug Issue（选择 **Bug 报告** 模板）
2. 关联原始需求（追溯到最初的需求 Issue）
3. 评估严重程度
4. 进入开发修复流程

**闭环**：
```
用户反馈 → Bug Issue → 关联原始需求 → 修复 → 验证 → 更新 Spec
                                                    ↓
                                           下次迭代纳入改进
```

---

## GitHub Actions 工作流总览

| 工作流 | 触发条件 | 作用 |
|--------|---------|------|
| `issue-refine.yml` | Issue 添加 `type:requirement` 标签 | 自动细化需求 |
| `change-impact.yml` | Issue 添加 `type:change-request` 标签 | 变更影响评估 |
| `docs-review.yml` | PR 涉及 `docs/research/` 或 `docs/analysis/` | 自动评审文档 |
| `spec-generation.yml` | `docs/analysis/` 的 PR 被合并 | 自动生成 Spec |
| `code-review.yml` | 任何代码 PR | 自动审查代码 |
| `assistant.yml` | Issue/PR 中 @qoder | 按需互动问答 |
| `auto-changelog.yml` | Release 创建时 | 自动生成 Changelog |

---

## 目录结构

```
.github/
├── ISSUE_TEMPLATE/
│   ├── requirement.yml      # 需求模板
│   ├── change-request.yml   # 变更请求模板
│   ├── bug.yml              # Bug 报告模板
│   └── task.yml             # 开发任务模板
├── workflows/
│   ├── issue-refine.yml     # 需求自动细化
│   ├── change-impact.yml    # 变更影响评估
│   ├── docs-review.yml      # 文档评审
│   ├── spec-generation.yml  # Spec 自动生成
│   ├── code-review.yml      # 代码审查
│   ├── assistant.yml        # @qoder 互动
│   └── auto-changelog.yml   # Changelog 生成
└── labels.yml               # 标签体系定义

docs/
├── pipeline.md              # 本文档
├── templates/               # 文档模板
│   ├── user-research.md     # 用户调研模板
│   ├── analysis.md          # 需求分析模板
│   └── spec-template.md     # Spec 输出模板
├── research/                # 原始调研材料
├── analysis/                # 需求分析产出
└── specs/                   # 审核通过的规格文档

.qoder/
└── agents/
    ├── requirements-analyst.md   # 需求分析指导 Agent
    └── requirements-reviewer.md  # 需求评审 Agent
```

---

## Label 状态流转

```
需求流:
status:new → status:refining → status:confirmed → status:analyzing
    → status:spec-ready → status:in-dev → status:done

变更流:
status:pending-review → status:impact-assessed → status:approved
                                             → status:rejected
```
