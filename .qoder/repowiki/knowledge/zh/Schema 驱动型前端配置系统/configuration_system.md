本仓库采用「Schema 声明 + 自动发现」的前端配置体系，核心围绕域（domain）与数据源模式两个维度组织运行时配置。

## 1. 使用的系统与工具
- Vite：通过 import.meta.glob 在构建期扫描 src/domains/*/manifest.ts，实现域清单的自动发现与装配。
- React Context：通过 DataProvider 注入全局数据源策略。
- TypeScript 类型约束：以 DomainDataSourceConfig、Repository<T> 等接口统一契约，确保配置与实现一致。

## 2. 关键文件与位置
- hj-admin/src/config/domains.config.ts：集中声明每个域的数据源模式（mock / http），是切换前后端的唯一入口。
- hj-admin/src/shared/data/types.ts：定义 DataSourceMode、DomainDataSourceConfig、Repository<T> 等核心类型。
- hj-admin/src/app/bootstrap.ts：利用 Vite glob 自动发现所有域的 manifest.ts，并据此生成路由与菜单树。
- hj-admin/src/app/providers.tsx：组合全局 Provider（当前仅 DataProvider）。
- hj-admin/vite.config.ts：Vite 构建配置，无额外环境变量或插件注入。
- hj-admin/package.json：依赖与脚本声明，不包含运行时配置项。

## 3. 架构与约定
- 域即配置单元：每个业务域位于 src/domains/<name>/，其 manifest.ts 描述路由、菜单、Schema，由 bootstrap 自动聚合。
- 数据源模式可逐域切换：domains.config.ts 中按域名映射到 'mock' | 'http'，配合 HttpRepository / MockRepository 实现零代码改动切换后端。
- Provider 注入策略：DataProvider 读取 domainConfig，为各域选择对应 Repository 实现，页面组件无需感知数据来源。
- 菜单与路由从 manifest 派生：buildMenuTree() 将启用的路由与硬编码的「禁用占位」合并，形成最终侧边栏结构。

## 4. 开发者应遵循的规则
- 新增域时只需在 src/domains/<name>/manifest.ts 中声明路由与 Schema，无需手动注册；如需启用/禁用数据源，修改 config/domains.config.ts 即可。
- 不要直接 import 具体 Repository 实现，统一通过 useRepository / DataProvider 获取，以保证数据源模式可切换。
- 暂不支持 .env 或环境变量注入（仓库中未发现 process.env / import.meta.env 使用），如需接入后端地址等外部配置，应在 domains.config.ts 中以常量形式扩展。
- 菜单项若暂时不可用，沿用 bootstrap 中 disabledItems 的占位风格，保持分组顺序与 badge 语义一致。