# 氢界大数据平台 — 运营管理后台

## 项目简介

基于 Vite + React + Ant Design 的后台管理系统，核心功能是 **NER（命名实体识别）确认与管理**，用于新闻编辑流程中的实体关联校对。通过 Schema 声明式生成各域 CRUD 页面，并由 bootstrap 自动发现与装配路由、菜单和数据源。

## 核心架构

- **Schema 驱动**：通过 `PageSchema` 配置自动生成列表页、筛选栏、弹窗、操作列
- **域（Domain）组织**：每个业务模块自包含 `manifest.ts` + `schema.ts` + `repository.ts` + `pages/`
- **bootstrap 自动装配**：利用 Vite 的 `import.meta.glob` 构建时扫描所有域清单，零注册
- **Mock/HTTP 数据源切换**：通过 `src/config/domains.config.ts` 集中控制

## 目录结构

```
hj-admin/
├── src/
│   ├── app/              # 入口编排层（App、bootstrap、router、providers）
│   ├── domains/          # 业务域（enterprise/news/resource/tags）
│   │   └── <domain>/
│   │       ├── manifest.ts   # 域清单（路由、菜单、图标）
│   │       ├── schema.ts     # PageSchema 配置
│   │       ├── repository.ts # 数据仓库注册
│   │       ├── pages/        # 自定义页面
│   │       ├── types.ts      # 类型定义
│   │       └── mock.ts       # Mock 数据
│   ├── shared/           # 共享基础设施
│   │   ├── data/             # DataProvider、Repository、useHook
│   │   └── schema-engine/    # SchemaPage、渲染器、类型定义
│   ├── layouts/          # MainLayout、Sidebar、Topbar
│   └── config/           # 域配置文件
└── 数据表/                # Excel 参考数据（氢能产业链全环节）
```

## 编码规范

- **语言**：TypeScript，禁止使用 `any`
- **组件**：函数式组件 + Hooks，组件名 PascalCase
- **样式**：Ant Design + CSS 变量，不引入额外 CSS 框架
- **命名**：变量/函数 camelCase，常量 UPPER_SNAKE_CASE，文件 camelCase 或 PascalCase
- **注释**：使用中文注释，复杂逻辑必须说明业务背景
- **依赖方向**：app → domains → shared，shared 不反向依赖任何 domain

## NER 核心功能说明

NER（命名实体识别）确认面板是本项目的核心业务逻辑：

- **位置**：新闻编辑页右侧
- **功能**：运营人员校对 AI 自动识别出的企业/项目实体
- **置信度层级**：
  - L1：精确匹配，高置信度，可自动关联
  - L2：归一化匹配，中等置信度，需人工确认
  - L3：相似度匹配，低置信度，需重点审核
- **状态**：已确认 / 待分类 / 待匹配 / 已忽略（噪音）
- **操作**：确认关联 / 忽略 / 创建新实体 / 手动添加

## 审查重点

- 所有数据库查询必须使用参数化查询
- API 端点必须包含权限检查
- 敏感信息（密码、Token）不得硬编码
- Schema 配置中的类型定义必须完整
- 新增域必须遵循 manifest → schema → repository → pages 结构

## 忽略的检查

- `node_modules/` 和 `dist/` 目录
- Excel 数据表文件（`数据表/`）
- `.qoder/` 目录下的自动生成文件
