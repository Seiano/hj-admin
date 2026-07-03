本仓库为纯前端项目，构建体系集中在 `hj-admin/` 子目录中，采用 Vite + React + TypeScript 技术栈，无后端、无容器化或 CI 配置。

1. 使用的系统与工具
- 构建工具：Vite 8（`vite.config.ts` 仅启用 `@vitejs/plugin-react`，未做额外插件或别名配置）
- 类型检查与编译：TypeScript 6，通过 `tsc -b` 进行跨包增量编译（见 `package.json` scripts）
- 代码质量：ESLint 10 + typescript-eslint，脚本命令 `npm run lint`
- 预览：`vite preview` 用于本地预览生产产物

2. 关键文件与位置
- `hj-admin/package.json`：定义依赖、devDependencies 及 npm scripts（`dev` / `build` / `lint` / `preview`）
- `hj-admin/vite.config.ts`：Vite 入口配置，当前仅注册 React 插件
- `hj-admin/tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json`：TS 多配置拆分（由 `tsc -b` 协调）
- `hj-admin/eslint.config.js`：ESLint Flat Config 入口

3. 架构与约定
- 单包结构：整个前端位于单一 `hj-admin/` 目录，无 monorepo 或 workspace 划分
- 构建流程：`npm run build` 先执行 `tsc -b` 生成 `.tsbuildinfo` 并校验类型，再调用 `vite build` 输出静态资源到 `dist/`（默认）
- 开发体验：`npm run dev` 启动 Vite HMR 开发服务器；`npm run preview` 基于 `dist/` 提供静态预览
- 无环境变量区分：`vite.config.ts` 未使用 `import.meta.env` 或 `--mode` 参数，也未定义 `publicEnv` 等自定义变量

4. 开发者应遵循的规则
- 新增依赖后需同步更新 `package.json`，并通过 `npm install` 锁定版本（仓库已包含 `package-lock.json`）
- 修改 TS 配置时注意 `tsc -b` 的引用顺序，确保 `tsconfig.app.json` 被正确引用
- 如需多环境构建（如 staging/prod），应在 `package.json` 的 scripts 中扩展 `--mode` 参数并在 `vite.config.ts` 中读取 `import.meta.env`，目前尚未实现
- 本项目未包含 Makefile、Dockerfile、CI 流水线或部署脚本，发布产物为 `dist/` 下的静态文件，可直接交由 Nginx 或其他静态服务器托管