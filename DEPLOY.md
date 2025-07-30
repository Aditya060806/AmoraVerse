# AmoraVerse 部署指南

## 快速部署到 Vercel

### 方法 1：使用部署脚本（推荐）

```bash
npm run deploy
```

### 方法 2：手动部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到 Vercel**
   ```bash
   vercel --prod
   ```

### 方法 3：通过 Vercel Dashboard

1. 将代码推送到 GitHub
2. 在 [Vercel Dashboard](https://vercel.com/dashboard) 中导入项目
3. 选择项目根目录
4. 部署设置：
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 项目配置

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 环境变量

如果需要配置环境变量，可以在 Vercel Dashboard 中设置：

- `VITE_API_URL`: API 基础 URL（如果使用外部 API）

## 故障排除

### 构建失败
- 确保所有依赖已安装：`npm install`
- 检查 TypeScript 错误：`npm run lint`

### 部署失败
- 确保 Vercel CLI 已安装：`npm install -g vercel`
- 检查是否已登录 Vercel：`vercel login`

### 路由问题
- 确保 vercel.json 中的 rewrites 配置正确
- 检查 React Router 配置

## 项目结构

```
AmoraVerse/
├── src/                 # React 前端代码
├── public/             # 静态资源
├── dist/               # 构建输出（自动生成）
├── package.json        # 项目配置
├── vercel.json         # Vercel 配置
└── deploy-vercel.js    # 部署脚本
```

## 注意事项

- 这是一个纯前端项目，不包含后端 API
- 所有诗歌生成都在前端完成
- 确保在部署前测试本地构建：`npm run build` 