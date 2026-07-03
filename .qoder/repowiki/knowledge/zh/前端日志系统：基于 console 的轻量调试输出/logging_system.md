本仓库未引入任何第三方日志框架（如 winston、pino、log4js、debug 等），也未定义统一的 Logger 抽象或日志中间件。当前日志体系完全依赖浏览器原生 `console` API，属于最轻量的调试输出方式。

**使用现状**
- 仅在共享层核心路径中出现少量 `console.warn` / `console.error` 调用，用于提示缺失配置或数据请求失败等异常场景：
  - `src/shared/data/useRepository.ts`：当 DataProvider 找不到对应 entity 的 Repository 时打印警告。
  - `src/shared/schema-engine/hooks.ts`：Schema 页面数据拉取失败时打印错误堆栈。
  - `src/shared/schema-engine/renderers/index.ts`：渲染器未注册时发出警告。
- `.gitignore` 中仅忽略 npm/yarn/pnpm 等包管理器的 debug.log 文件，未对应用日志做特殊处理。
- 根目录下的 `氢界大数据平台 — 运营管理后台 v3.2.html` 是静态导出产物，内嵌了 Beacon 埋点 SDK 与一行 `console.error('RUNTIME ERROR at line', ...)` 的全局错误捕获，不属于业务代码。

**架构与约定**
- 无统一日志级别策略、无结构化字段规范、无日志收集/上报通道。
- 所有日志直接输出到浏览器控制台，无法在 Node 环境或生产构建中被重定向或过滤。
- 未发现任何自定义 logger 模块、日志拦截器或全局 error handler。

**开发者应遵循的规则**
- 如需新增日志，建议优先使用 `console.warn` / `console.error` 并带上 `[模块名]` 前缀以区分来源（现有代码已采用此风格）。
- 若后续需要结构化日志或集中采集，应在 `src/utils/` 下新建 `logger.ts` 封装统一入口，再逐步替换散落的 `console.*` 调用。
- 避免在高频渲染路径中使用 `console.log`，以免污染控制台影响性能。

由于本项目为纯前端 Schema 驱动 Admin，且处于早期开发阶段，日志系统尚未形成正式架构，整体成熟度较低。