---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: fd56c5ea6d25f8fba8bf37fe3d1dc0fc_7b48215bc3d511f19063525400393706
    ReservedCode1: bs5QAu5eLtCjvEW0UEf7Va39IooyDwuYWus9kllZpt084ENLfBNFB1qs55h33CThczw+DRotC4lcwL23P7frkBVq9/oMMPnLrn74pkIP8q9WxJ+SP1nC5dk+vbhH5+/vr532vEFE9cgQY7HsbuZmg2ljHNrsOYJJoswhva7h0kqIoTMUbHlD2xELAZk=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: fd56c5ea6d25f8fba8bf37fe3d1dc0fc_7b48215bc3d511f19063525400393706
    ReservedCode2: bs5QAu5eLtCjvEW0UEf7Va39IooyDwuYWus9kllZpt084ENLfBNFB1qs55h33CThczw+DRotC4lcwL23P7frkBVq9/oMMPnLrn74pkIP8q9WxJ+SP1nC5dk+vbhH5+/vr532vEFE9cgQY7HsbuZmg2ljHNrsOYJJoswhva7h0kqIoTMUbHlD2xELAZk=
---

# 涡轮火石官网（flint-site）

涡轮火石官方网站，基于 **Astro 5** 构建的静态站点。

## 技术栈

- [Astro 5](https://astro.build/)（内容集合 Content Collections + 静态生成）
- CSS：原生 CSS 变量 + 深空暗色主题（玻璃拟态 / 渐变光晕）
- 内容：Markdown（`src/content/posts`、`src/content/projects`）

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm install` | 安装依赖 |
| `npm run dev` | 本地开发（http://localhost:4321） |
| `npm run build` | 构建到 `dist/` |
| `npm run preview` | 本地预览构建产物 |

## 目录结构

```
src/
├── components/     # 组件（导航、页脚、Hero、卡片等）
├── content/        # Markdown 内容集合（posts / projects）
├── layouts/        # 全局布局 Layout.astro
├── pages/          # 页面路由
└── styles/         # 全局样式 global.css
public/image/       # 静态图片资源
```

## 部署

通过 Netlify 自动部署，配置文件见 `netlify.toml`（构建命令 `npm ci && npm run build`，发布目录 `dist`）。
*（内容由AI生成，仅供参考）*
