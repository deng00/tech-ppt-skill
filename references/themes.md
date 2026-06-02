# 视觉基调（主题）

本 skill 的视觉哲学：**信息密度优先、设计感克制、排版清晰、全程等宽字体、零动效**。
主题之间只换「配色」，不换字体（永远等宽）、不换排版逻辑。一份 deck 只用一套主题，不要中途换。

切换方法：把模板 `:root{}` 里**标了「主题色」「基底」的那几个变量整体替换**为下面某一套即可，其余 `var(--…)` 引用无需改动。字体变量（`--mono` / `--sans`）任何主题都不要改。

---

## 1 · IKB 蓝（默认 · 白底）

通用、工程汇报、架构评审。最稳的默认。

```css
--accent:#002FA7; --accent-ink:#ffffff; --accent-tint:#eaeefb;
/* 基底用模板默认白色系，无需改动 */
```

## 2 · 安全橙（白底）

运维 / 事故复盘 / 风险评估 / 需要警示感。

```css
--accent:#FF5800; --accent-ink:#ffffff; --accent-tint:#fff0e8;
/* 基底用模板默认白色系，无需改动 */
```

## 3 · 暗终端（深色 IDE）

偏代码 / CLI / 底层系统的内容，终端感最强。整组基底反色：

```css
--accent:#3fb950; --accent-ink:#0d1117; --accent-tint:#11261a;
--paper:#0d1117; --ink:#e6edf3; --ink-2:#b9c2cc; --ink-3:#8b949e; --ink-4:#56606b;
--line:#21262d; --line-strong:#e6edf3; --grey-bg:#161b22;
/* dark 节奏页（.page.dark）此主题下改用浅色做对比，替换 --dk-* ： */
--dk-paper:#e6edf3; --dk-ink:#0d1117; --dk-ink-3:#3d4753; --dk-line:#c8d1da; --dk-grey-bg:#d6dde4;
```

> 暗终端主题下 `.page` 默认即深色，`.page.dark` 反而是浅色对比页——节奏规则不变（仍是「连续不超过 2 页同色」）。

## 4 · 墨黑（白底 · 纯黑强调 · 无彩色）

打印友好 / 极致中性 / 文档化。强调靠黑块与字重，不靠颜色。

```css
--accent:#0a0a0a; --accent-ink:#ffffff; --accent-tint:#ededed;
/* 基底用模板默认白色系，无需改动 */
```

---

## 硬规则

- **字体永远等宽**：英文/数字 `Ubuntu Mono`，中文回退 `Sarasa Mono SC → Noto Sans Mono CJK SC → 系统中文`。任何主题都不改 `--mono` / `--sans`。
- **单一强调色**：一份 deck 只有一个 `--accent`，不要多色高亮拼贴。
- **直角纯色**：无圆角、无阴影、无渐变（hairline 分隔线除外）。
- **不接受自定义 hex**：从上面 4 套里选一套；要新配色先按这 4 套的结构调好对比度再加进本文件，不要在 deck 里临时塞颜色。
