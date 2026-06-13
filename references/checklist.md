# 交付前自检清单

## P0 · 必须全过（否则不算完成）

- [ ] **页数 ≤ 16**。`grep -c 'class="page"' deck.html` ≤ 16。
- [ ] **溢出检测全绿**。`scripts/check-overflow.sh deck.html` 三视口都 `ALL_OK`。这是头号杀手，肉眼翻页不算数。
- [ ] **全程等宽**。无任何 `Inter / Helvetica / serif / sans-serif` 实际生效；`--mono`/`--sans` 未被改动，正文标题数字全等宽。
- [ ] **每页有唯一 `id`**，且底部 `.pager` 的 `<a href="#id">` 与实际页一一对应（数量、id 都对得上）。随手开 `deck.html#某id` 能直接跳到那页。
- [ ] **零动效**。无 `transition`（导航 `scrollIntoView` 用 `behavior:'auto'`）、无 `@keyframes`、无 `animation`。连续翻页不卡。
- [ ] **单一 accent 色**。整份 deck 只有一个 `--accent`，没有多色高亮拼贴。
- [ ] **`<title>` 已替换**，无 `[必填]` 残留。

## P1 · 质量

- [ ] **一页一模块**：每页 `page-sub` 能用一句话说清"这页讲哪个子问题"。
- [ ] **密度达标**：每页 ≥ 2 个信息块（定义/表格/指标/代码并排），没有"一句话占一页"。信息密度应明显高于 guizang / frontend 那类大字 deck。
- [ ] **版式不雷同**：相邻页骨架不同；L2（c5/c7 左右分栏）未连用超 2 页；≥6 页的 deck ≥ 4 种不同版式（L1–L12）。截全图缩略扫一遍，不该"前几页长得一样"。
- [ ] **排版清晰**：多用 `table.tbl` / `dl.kv` 组织密集事实；数字 `tabular-nums` 对齐。
- [ ] **直角纯色**：无 `border-radius`、`box-shadow`、`linear-gradient`（hairline 分隔线除外）。
- [ ] **背景统一**：整份 deck 全浅或全深，无逐页深浅混用（已无 `.page.dark` 机制；`grep -c 'class="page dark"' deck.html` 应为 0）。
- [ ] **图（若有）为预渲染静态内联 SVG**：deck 内能搜到 `<svg`，无运行时 mermaid 脚本 / 无外链图片；图在 `.diagram` 容器内、随主题与暗页正常着色、未撑破页面（已过 `check-overflow.sh`）。仅在用图比用表更讲得清「关系/流程」时才有图。

## P2 · 收尾

- [ ] 封面 `<h1>`、作者、日期已填真实信息。
- [ ] 页脚页码与实际页序一致。
- [ ] 浏览器实开一遍：键盘 ↑↓/←→/数字键/Home/End 翻页正常，点右侧锚点能跳页，当前页锚点高亮。

## 快速命令
```bash
grep -c 'class="page"' deck.html                  # 页数
grep -oE 'id="[^"]+"' deck.html | sort | uniq -d  # 重复 id（应为空）
scripts/check-overflow.sh deck.html               # 溢出（必须全 ALL_OK）
```
