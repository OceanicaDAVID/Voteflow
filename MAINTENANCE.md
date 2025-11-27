# 🛠️ VoteFlow 站长维护手册 (Founder's Manual)

这份文档是专门为您准备的。当志愿者完成了开发，或者网站出现问题时，您只需要按照这里的步骤，像“复制粘贴”一样操作即可。

## 场景一：志愿者修好了 Bug，我要更新网站

当志愿者通知您“代码已经合并了” (Merged)，或者是您在 GitHub 上看到代码更新了，请按以下步骤操作：

1. **登录您的 VPS 服务器** (使用 SSH 终端)。

2. **进入项目目录**：
   ```bash
   cd voteflow
   ```

3. **下载最新代码 (这就是 "Pull")**：
   ```bash
   git pull
   ```

4. **更新数据库 (以防万一他们改了数据库结构)**：
   ```bash
   npx prisma migrate deploy
   ```

5. **重启网站以应用更改**：
   ```bash
   docker compose restart
   ```
   *(或者如果他们添加了新依赖，运行: `docker compose up -d --build`)*

---

## 场景二：网站突然打不开了，我想重启一下

1. **进入目录**：
   ```bash
   cd voteflow
   ```

2. **重启所有服务**：
   ```bash
   docker compose restart
   ```

---

## 场景三：查看网站运行日志 (Debug)

如果志愿者问您“报错日志是什么”，您可以运行这个命令，然后截图发给他们：

```bash
docker compose logs --tail=100 -f
```
*(按 `Ctrl + C` 退出日志查看)*

---

## ⚠️ 遇到不懂的情况怎么办？

永远不要凭感觉乱敲命令。您可以把志愿者的要求（比如“请更新一下依赖”）复制给 AI（ChatGPT/Gemini/Claude），问它：“志愿者让我更新依赖，我的服务器是 Docker 部署的，我应该输入什么命令？”

AI 会给您生成那个时刻最准确的命令。

