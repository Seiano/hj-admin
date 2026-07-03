本项目的 UI 样式体系以 Ant Design v6 为设计系统基础，辅以原生 CSS 与 CSS 自定义属性（CSS Variables）构建轻量级主题层，整体风格偏向简洁、中性的企业后台。

1. 样式系统与依赖
- 组件库：antd ^6.4.4 + @ant-design/icons ^6.2.5，所有业务页面通过 Ant Design 的 Table、Form、Card、Tag、Button、Badge 等原子组件拼装 CRUD 界面。
- 构建工具：Vite + @vitejs/plugin-react，未引入 Sass/Less/PostCSS/Tailwind 等预处理或原子化框架，全部使用原生 CSS。
- 样式入口：src/index.css 作为全局样式，被 src/main.tsx 统一 import；src/App.css 仅用于 Vite 模板示例页，实际业务页面不引用。

2. 主题与视觉约定
- 全局 CSS 变量集中在 :root，定义 --text / --text-h / --bg / --border / --code-bg / --accent / --accent-bg / --accent-border / --social-bg / --shadow 等语义化 token，并在 prefers-color-scheme: dark 下提供暗色覆盖，实现明暗双主题。
- 字体栈采用系统字体优先：-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif，正文 14px、行高 1.5，颜色 #1d2129，背景 #f5f6f8。
- 对 Ant Design 进行最小覆盖：表格头背景 #f8f9fb、加粗 600、字号 13px；悬停行背景 #f0f5ff；按钮主色覆盖为 #1a6dff；卡片圆角 8px、微阴影；标签圆角 4px；状态点尺寸 8×8。
- 业务专用类名：NER 实体高亮 .ner-l1/.ner-l2/.ner-l3/.ner-confirmed/.ner-ignored，自动标签虚线边框 .tag-auto 及其 hover 态。

3. 布局与响应式策略
- 应用壳 MainLayout 使用内联 style 实现 flex 三栏布局（侧边栏 + 顶栏 + 内容区），内容区 padding 20px 24px，背景 #f5f6f8。
- 全局根容器 #root 固定最大宽度 1126px 居中，配合媒体查询在 ≤1024px 时缩小字号与间距，属于“断点适配”而非流式栅格。
- 未使用 Ant Design ConfigProvider 的 theme.token 机制，而是通过全局 CSS 变量 + 少量 ant-* 类名覆盖完成定制。

4. 开发者应遵循的规则
- 新增样式优先写在全局 index.css 或独立 .css 文件，避免在组件内写大量内联 style（除 MainLayout 这类布局骨架）。
- 颜色、字号、圆角、阴影等视觉值一律走 :root 下的 CSS 变量，不要硬编码十六进制色值。
- 需要覆盖 Ant Design 组件外观时，使用 ant-* 类名选择器并加上 !important 保持优先级（当前项目已如此实践）。
- 不引入新的 CSS 预处理器或原子化框架，保持现有“Ant Design + 原生 CSS + CSS 变量”的最小技术栈。