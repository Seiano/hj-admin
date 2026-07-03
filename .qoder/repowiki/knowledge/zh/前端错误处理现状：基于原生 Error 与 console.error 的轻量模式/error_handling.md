本仓库为 Schema 驱动型 React Admin 前端，尚未建立统一的前端错误处理体系。当前错误处理呈现以下特征：

1. **异常类型**：全部使用 JavaScript 原生 `Error`，未定义领域错误类或错误码枚举。
2. **HTTP 层**：`HttpRepository.request` 在 `response.ok === false` 时直接 `throw new Error('HTTP ${status}: ${statusText}')`，将 HTTP 状态码拼接进消息字符串。
3. **Mock 层**：`MockRepository.get/update` 在找不到记录时 `throw new Error('Item not found: ${id}')`，仅用于开发阶段。
4. **调用方捕获**：`useSchemaPage.fetchData` 使用 `try/catch` 包裹 `repo.list`，失败时仅 `console.error('[useSchemaPage] Failed to fetch data:', err)` 并重置 loading 状态，未向用户展示任何提示。
5. **无全局拦截**：未发现 `window.onerror`、`unhandledrejection` 监听器、React Error Boundary、Axios 拦截器或统一的 toast/通知组件封装。
6. **无中间件/装饰器**：后端（若有）不在本仓库范围内，前端也未见对请求进行统一包装以转换后端业务错误码为可展示信息。

**结论**：该仓库目前处于“最小可用”的错误处理阶段——通过 Promise reject + try/catch + console.error 传递异常，缺少错误分类、用户可见反馈和全局兜底机制。后续如需完善，建议引入统一错误类型、HTTP 响应拦截器以及 Ant Design message/notification 的用户提示策略。