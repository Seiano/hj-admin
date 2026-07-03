本仓库为单前端项目 `hj-admin`，采用 npm 作为包管理器，通过 `package.json` 声明运行时与开发期依赖，并通过 `package-lock.json`（lockfileVersion 3）锁定精确版本，确保团队与 CI 环境安装一致性。构建工具链基于 Vite + React + TypeScript，无私有仓库或 vendoring 策略，所有第三方包均从 npm 镜像源（`registry.npmmirror.com`）拉取。

- 包管理器与锁文件：使用 npm，根目录存在 `package-lock.json`，未启用 workspaces、pnpm/yarn 等替代方案。
- 依赖分类：运行时代码仅依赖 `react`、`react-dom`、`react-router-dom`、`antd`、`@ant-design/icons`、`dayjs`；类型定义、ESLint、Vite 插件、TypeScript 等均放在 `devDependencies` 中，保持生产产物最小化。
- 版本策略：核心库使用 `^` 语义化版本范围（如 `antd ^6.4.4`、`react ^19.2.6`），由 lockfile 固定实际解析版本；TypeScript 使用 `~` 限定次版本（`~6.0.2`），在兼容范围内允许小更新。
- 构建与脚本：`package.json` 的 scripts 提供 `dev`/`build`/`lint`/`preview` 四个入口，`build` 先执行 `tsc -b` 再做 `vite build`，将类型检查纳入构建流程。
- 插件与配置：`vite.config.ts` 仅引入 `@vitejs/plugin-react`，未自定义依赖别名或代理，依赖解析完全交给 Vite 默认行为。
- 无私有注册表/代理配置：未发现 `.npmrc`、`.yarnrc`、`pnpm-workspace.yaml` 等文件，也未见 GOPRIVATE 或 Go module proxy 相关配置，说明该项目不涉及后端 Go 依赖管理。

开发者约定：
- 新增依赖应区分 `dependencies` 与 `devDependencies`，避免把构建期工具带入生产包。
- 升级依赖后需提交更新后的 `package-lock.json`，保证可重现安装。
- 若未来引入私有包，应在 `.npmrc` 中配置 registry/token，并在 CI 中注入对应环境变量。