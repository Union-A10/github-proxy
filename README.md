# GitHub Proxy Worker

基于 Cloudflare Workers 的 GitHub 代理加速服务。

## 使用方式

部署后获得地址 `https://your-worker.xxx.workers.dev`，然后：

```bash
# git clone 加速
git clone https://your-worker/https://github.com/user/repo.git

# 网页浏览
https://your-worker/https://github.com/torvalds/linux

# 下载Release
https://your-worker/https://github.com/user/repo/releases/download/v1.0/file.zip
```

## 功能

- ✅ git clone / pull / push 加速
- ✅ 网页浏览（自动替换页面内链接）
- ✅ Release / Archive 下载加速
- ✅ raw.githubusercontent.com 文件加速
- ✅ 支持大文件流式传输
