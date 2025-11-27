# 开发计划：VoteFlow (仿 X.COM 风格投票社交应用)

## Phase 1: 项目初始化与基础架构
- [ ] **Step 1.1**: 初始化 Next.js 项目 (TypeScript, Tailwind CSS, ESLint).
- [ ] **Step 1.2**: 安装并配置 Shadcn/UI 及必要的 UI 组件 (Button, Dialog, Avatar, etc.).
- [ ] **Step 1.3**: 配置项目目录结构 (components, lib, app, types).
- [ ] **Step 1.4**: 设置 Docker 开发环境 (PostgreSQL 容器).

## Phase 2: 数据库与认证系统
- [ ] **Step 2.1**: 初始化 Prisma ORM 并连接 PostgreSQL.
- [ ] **Step 2.2**: 设计数据库 Schema (User, Post, Poll, Option, Vote).
- [ ] **Step 2.3**: 配置 NextAuth.js (使用 Credentials 和 OAuth 预留).
- [ ] **Step 2.4**: 创建注册与登录页面 UI (仿 X 风格模态框).

## Phase 3: 核心 UI 布局 (X.COM 风格)
- [ ] **Step 3.1**: 实现响应式主布局 (Left Sidebar, Main Feed, Right Widgets).
- [ ] **Step 3.2**: 开发左侧导航栏组件 (NavLinks, UserProfile).
- [ ] **Step 3.3**: 开发右侧推荐/搜索栏组件 (占位符).
- [ ] **Step 3.4**: 实现移动端底部导航栏.

## Phase 4: 核心功能 - 发布与投票
- [ ] **Step 4.1**: 开发“发布推文/投票”组件 (Rich Text Input + Poll Creator).
- [ ] **Step 4.2**: 实现后端 API: 创建带投票的帖子.
- [ ] **Step 4.3**: 开发信息流组件 (Post Feed) 展示帖子.
- [ ] **Step 4.4**: 实现投票交互逻辑 (前端乐观更新 + 后端 API).
- [ ] **Step 4.5**: 实现投票结果的实时/动态计算与展示.

## Phase 5: 完善与优化
- [ ] **Step 5.1**: 添加简单的个人主页 (User Profile).
- [ ] **Step 5.2**: 优化 UI 细节 (Loading 骨架屏, Toast 通知, Dark Mode).
- [ ] **Step 5.3**: 代码清理与 Lint 检查.

## Phase 6: 生产环境部署准备
- [ ] **Step 6.1**: 编写生产环境 Dockerfile.
- [ ] **Step 6.2**: 编写 docker-compose.prod.yml (App + DB + Nginx/Proxy).
- [ ] **Step 6.3**: 编写部署说明文档 (README.md).

