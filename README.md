# tech-ppt-skill

技术风、**高信息密度**的单文件 HTML deck skill。为「把一个模块在一页里讲透」而生，与 guizang-ppt-skill（叙事/视觉）、frontend-slides（探索式设计）互补。

## 特点

- **全程等宽字体**（Ubuntu Mono + 等宽 CJK 回退）—— 工程感、数字对齐、代码原生
- **信息密度优先、设计克制** —— 12 列网格塞满表格 / 定义列表 / 指标 / 代码，不靠装饰
- **零动效、可快速连续翻页** —— 原生 scroll-snap 瞬切，不卡
- **页数 ≤ 10**，一页一个模块 / 子问题
- **每页 `#anchor`** —— URL 直达任意页，右侧锚点索引
- **4 套主题**：IKB 蓝 / 安全橙 / 暗终端 / 墨黑（只换配色，不换字体/排版）
- **headless 溢出检测质量门** —— 交付前必须三视口全绿

## 用法

见 [SKILL.md](SKILL.md)。简版：

```bash
cp assets/template.html deck.html          # 1. 拷贝模板
# 2. 从 references/themes.md 选一套主题，替换 :root
# 3. 按 references/layouts.md 填 ≤10 页，每页一个 id
scripts/check-overflow.sh deck.html         # 4. 溢出检测，必须全 ALL_OK
# 5. 对照 references/checklist.md 自检
```

## 结构

```
SKILL.md                  主指令
assets/template.html      种子模板（等宽/零动效/锚点导航，完整可运行）
references/themes.md      4 套视觉基调
references/layouts.md     高密度版式骨架 L1–L7
references/checklist.md   交付前自检
scripts/check-overflow.sh headless 溢出检测
```
