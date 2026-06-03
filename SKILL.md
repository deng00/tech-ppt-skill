---
name: tech-ppt-skill
description: 生成「技术风、高信息密度」的单文件 HTML deck —— 全程等宽字体（Ubuntu Mono）、零动效、可快速连续翻页、每页带 #锚点、页数严格 ≤10 页、一页讲清一个模块/子问题。排版以表格 / 定义列表 / 指标 / 代码块为主，设计感克制，单页信息密度明显高于 guizang-ppt-skill / frontend-slides 那类"大字 + 留白"的演示。当用户要做技术分享、架构评审、协议/系统拆解、工程汇报，且强调"信息密度大""技术风""等宽""一页讲清一个模块""不要花哨动效"时使用。
---

# Tech PPT Skill

生成**单文件 HTML** 技术 deck。和 guizang-ppt-skill（瑞士/杂志风、动效丰富）、frontend-slides（探索式设计）相反，这个 skill 只为一件事服务：**在一页里把一个模块讲透，信息密度拉满**。

## 形态与硬约束

- **单文件**：CSS/JS 全内联（字体走 Google Fonts CDN）。
- **全程等宽字体**：英文/数字 `Ubuntu Mono`，中文回退 `Sarasa Mono SC → Noto Sans Mono CJK SC → 系统中文`。任何主题都不改字体。
- **零动效**：无 transition、无 animation、无入场效果。翻页 = 原生 scroll-snap 瞬切（`scroll-behavior:auto`），可**快速连续翻页**，永不卡顿。
- **页数 ≤ 10**（硬约束）：封面 1 + 中间 ≤8 + 收尾 1。一页一个模块/子问题。
- **每页 `#anchor`**：每个 `<section class="page" id="语义id">` 必须有唯一 kebab-case id；页眉显示 `#id`，URL 加 `#id` 可直接跳页，右侧 `.pager` 提供锚点索引。
- **信息密度优先 / 弱设计**：每页用 12 列网格塞 2–4 个信息块（定义 + 表格 + 指标 + 代码并排）。不靠装饰，靠**清晰的表格和列表**。
- **绝不溢出**：每页 `overflow:hidden`。写完必须跑溢出检测（见 Step 4），否则内容会被裁掉。

## 何时用 / 不用

- **用**：技术分享、架构/协议/系统拆解、工程汇报、benchmark 对比、设计评审 —— 内容密、要讲清、不要花哨。
- **不用**：对外发布会 / 品牌宣讲 / 需要叙事感和视觉冲击（用 guizang-ppt-skill）；需要每页自由探索不同美学（用 frontend-slides）。

## 工作流

### Step 1 · 拷贝模板
```bash
cp <SKILL_ROOT>/assets/template.html 目标/deck.html
```
模板**完整可运行**：CSS、键盘/锚点导航 JS、3 个示例页（封面/内容/收尾）齐备，只等你填内容。拷贝后先把 `<title>` 的 `[必填]` 改掉。

### Step 2 · 选主题
打开 `references/themes.md`，从 4 套里选一套（IKB 蓝 / 安全橙 / 暗终端 / 墨黑），把对应 `:root` 变量整体替换进模板。**不改字体、一份 deck 只用一套**。

### Step 3 · 填充 ≤10 页
打开 `references/layouts.md` 挑版式骨架（L2 模块剖析是主力），粘贴改文案。每页要点：
1. 一页只讲**一个**模块/子问题；
2. 但这一页要**塞满**——并排放定义/表格/指标/代码，密度高于普通 deck；
3. 每页给唯一 `id`，并在底部 `.pager` 同步加一条 `<a href="#id">NN</a>`；
4. 控制总页数 ≤ 10。

### Step 4 · 溢出检测（质量门，必跑）
这是本 skill 最重要的一步——高密度极易溢出，肉眼翻页不可靠：
```bash
<SKILL_ROOT>/scripts/check-overflow.sh 目标/deck.html
```
三个视口（1366×768 / 1280×800 / 1440×900）必须全部输出 `ALL_OK`。
若报 `overview:1100>768`，说明 `#overview` 页内容超出 768 视口 —— **精简文案 / 降一档间距 / 拆到下一页**，循环到全绿。不要用 `overflow:auto` 加滚动条糊弄。

### Step 5 · 自检
对照 `references/checklist.md` 逐项确认（等宽、单 accent、零动效、锚点齐全、页数、密度）。

## 核心原则（编辑式高密度）

1. **一页一焦点** —— 一页讲清一个模块；每页一个视觉焦点（超大数字 `.bignum` 或核心论点 `.statement`，关键词 `.hi` 高亮），读者一眼抓住重点。
2. **主-辅分区，不堆砌** —— 焦点区(`.c5`) + 支撑区(`.c7`)。禁止 N 个等权小块平铺。高密度来自支撑区"条目多"(表格行 / 定义项 / 要点)，不是缩字号硬塞。
3. **标题醒目** —— `.page-head` 大编号 + 大标题 + accent 粗线，每页可被一眼定位。
4. **大间距 + 填充** —— 块之间用大 `.col gap` 分隔留呼吸；内容填到 ~85% 高度，下半不留大块空白（但不注水）。
5. **等宽到底** —— 工程感来源，任何主题不改字体。
6. **零动效、可连翻** —— scroll-snap 瞬切，与其它两个 skill 的关键区别。
7. **检测优先于感觉** —— 交付前 `check-overflow.sh` 三视口必须全绿。

## 资源导览
```
tech-ppt-skill/
├── SKILL.md                    ← 本文件
├── assets/template.html        ← 种子模板（等宽 / 零动效 / 锚点导航，完整可运行）
├── references/
│   ├── themes.md               ← 4 套视觉基调（只换配色，不换字体/排版）
│   ├── layouts.md              ← 高密度版式骨架（L1–L7，可粘贴）
│   └── checklist.md            ← 交付前自检清单
└── scripts/
    └── check-overflow.sh       ← headless 溢出检测（质量门）
```
