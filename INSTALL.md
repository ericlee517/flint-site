# Hexo Theme Turbo 安装脚本使用说明

## 功能说明

这个一键安装脚本会自动安装并配置以下组件：

1. **hexo-postcss** - PostCSS 渲染器插件
2. **TailwindCSS v4** - 最新版本的 TailwindCSS 框架
3. **DaisyUI** - 基于 TailwindCSS 的组件库

## 使用方法

### 1. 运行安装脚本

在 Hexo 项目根目录下运行：

```powershell
powershell -ExecutionPolicy Bypass -File install-theme.ps1
```

### 2. 确认安装

脚本会提示你是否继续安装，输入 `Y` 或 `y` 确认。

### 3. 等待安装完成

脚本会自动：
- 安装所有必需的 npm 包
- 创建 `.postcssrc.js` 配置文件
- 创建 `themes/flint/source/css/main.css` 文件

### 4. 构建项目

安装完成后，运行：

```bash
npm run build
```

### 5. 启动服务器

```bash
npm run server
```

## 安装输出示例

```
========================================
   Hexo Theme Turbo Installer
========================================

This script will install:
  1. hexo-postcss
  2. TailwindCSS v4
  3. DaisyUI

Continue installation? (Y/N): y

Starting installation...

Installing hexo-postcss...
hexo-postcss installed successfully!

Installing TailwindCSS v4 and DaisyUI...
TailwindCSS v4 and DaisyUI installed successfully!

Creating .postcssrc.js config file...
.postcssrc.js config file created successfully!
main.css file created successfully!

========================================
   Installation Complete!
========================================

Successfully installed:
  [OK] hexo-postcss
  [OK] TailwindCSS v4
  [OK] DaisyUI

Config files created:
  [OK] .postcssrc.js
  [OK] themes/flint/source/css/main.css

You can now run:
  npm run build    # Build project
  npm run server   # Start server
```

## 创建的文件

### .postcssrc.js
```javascript
module.exports = {
    from: undefined,
    plugins: {
        "@tailwindcss/postcss": {},
    }
}
```

### themes/flint/source/css/main.css
```css
@import "tailwindcss";
@plugin "daisyui" {
    themes: black --default;
}
```

## 注意事项

1. 确保在 Hexo 项目根目录运行脚本（需要有 `_config.yml` 文件）
2. 确保已安装 Node.js 和 npm
3. 如果 `themes/flint` 目录不存在，脚本会提示手动创建 `main.css` 文件

## 故障排除

### 权限错误
如果遇到权限问题，请以管理员身份运行 PowerShell。

### 网络问题
如果 npm 安装失败，请检查网络连接或使用 npm 镜像源。

### 编码问题
脚本使用 UTF-8 编码，如果遇到编码问题，请确保 PowerShell 终端使用正确的编码设置。

## 技术支持

如有问题，请参考：
- [hexo-postcss](https://github.com/siraisisatoru/hexo-postcss)
- [TailwindCSS v4](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)