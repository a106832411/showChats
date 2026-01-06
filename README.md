
  # AI 助手中心（左右布局菜单页面）

  基于 Figma 设计稿（https://www.figma.com/design/tg8Hn9JMWaSXsZQWDyfehN/%E5%B7%A6%E5%8F%B3%E5%B8%83%E5%B1%80%E8%8F%9C%E5%8D%95%E9%A1%B5%E9%9D%A2）实现的单页应用，提供三个预置 AI 助手的快速入口与嵌入式体验。

  ## 页面功能
  - 左侧栏/移动下拉：在桌面端以侧边栏展示助手列表，移动端使用可折叠菜单，支持状态同步与高亮
  - 顶部栏：展示当前助手名称、标语，并提供“在新窗口打开”外链按钮
  - 主内容区：通过 iframe 直接嵌入对应助手站点，保持全屏自适应
  - 主题与动效：渐变色卡片、阴影与圆角，让不同助手在视觉上快速区分

  ## 快速开始
  - 安装依赖：pnpm i（或 npm i）
  - 本地开发：pnpm dev（或 npm run dev），默认启动 http://localhost:5173
  - 构建产物：pnpm build（或 npm run build），输出位于 dist，可直接部署为静态站点

  ## 关键文件
  - 入口渲染：[src/main.tsx](src/main.tsx)
  - 页面逻辑与布局：[src/app/App.tsx](src/app/App.tsx)
  - 全局样式与主题：[src/styles/index.css](src/styles/index.css)、[src/styles/theme.css](src/styles/theme.css)

  ## 技术栈
  - React 18 + Vite + TypeScript
  - Tailwind CSS 4（原子化样式）
  - lucide-react 图标、Radix UI 组件依赖（部分组件库备用）

  ## 开发提示
  - 如需新增助手，向 App.tsx 的 aiAssistants 数组追加配置项（含名称、渐变配色、链接等）
  - 生产部署时使用构建产物 dist，若需嵌入外部站点，确保目标域名允许被 iframe 访问
  