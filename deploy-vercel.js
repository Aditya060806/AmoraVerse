#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 开始部署 AmoraVerse 到 Vercel...\n');

try {
  // 检查是否在正确的目录
  if (!fs.existsSync('package.json')) {
    throw new Error('请在项目根目录运行此脚本');
  }

  // 检查 vercel.json 是否存在
  if (!fs.existsSync('vercel.json')) {
    throw new Error('vercel.json 配置文件不存在');
  }

  console.log('📦 构建项目...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n✅ 构建完成！');

  console.log('\n🌐 部署到 Vercel...');
  console.log('提示：如果是第一次部署，请按照提示登录 Vercel 账户');
  
  execSync('vercel --prod', { stdio: 'inherit' });

  console.log('\n🎉 部署完成！');
  console.log('您的应用现在应该可以在 Vercel 上访问了。');

} catch (error) {
  console.error('\n❌ 部署失败:', error.message);
  process.exit(1);
} 