# 版式骨架（编辑式高密度 · 一页一焦点）

核心：**一页讲清一个模块，但要饱满到 ~85% 高度**。靠「主-辅分区 + 视觉焦点 + 多条目支撑」做出高密度，**不是**把字缩小、把块挤在一起堆砌。

## 每页通用结构

```html
<section class="page" id="语义id">
  <div class="page-head">
    <div class="head-meta"><span class="kicker">栏目英文</span><span class="anchor">#<b>语义id</b></span></div>
    <div class="head-title"><span class="num">02</span><h2>页标题</h2></div>
    <div class="head-rule"></div>
  </div>
  <p class="page-lead">一句话点明本页讲清的那个子问题。</p>
  <div class="page-body">
    <div class="grid fill">
      <div class="c5 col"><!-- 焦点区 --></div>
      <div class="c7 col"><!-- 支撑区 --></div>
    </div>
  </div>
  <div class="page-foot"><span>DECK · 章节</span><span>02 / 16</span></div>
</section>
```

四条铁律（违反就退回"平铺堆砌"）：
1. **标题醒目**：`page-head` = 大编号 `.num` + 大标题 `h2` + accent 粗线 `.head-rule`。
2. **每页一个视觉焦点**：焦点区放 `.statement`(核心论点，关键词 `.hi` 高亮) 或 `.bignum`(超大数字)，抢眼。
3. **主-辅分区**：焦点区(`.c5 .col`) + 支撑区(`.c7 .col`)。禁止 N 个等权小块平铺。
4. **块间大间距 + 填充**：`.col` 内各块靠大 `gap` 分隔（已在模板设好）；支撑区用「多条目」(表格行 / 定义项 / 要点) 填到 ~85%。

可用原子（定义见 `template.html`）：`.statement` `.bignum` `.h-sec` `.kv`(定义列表) `.tbl`(数据表) `.list`(要点) `.card` `.callout` `.code` `.steps`(流程/步骤带) `.diagram`(内联图)。

> **防雷同（最重要，先读）**：下面 L1–L12 是 12 种**骨架**，不是配色变体。**相邻两页不得用同一骨架**；L2（左右 5/7 分栏）最多连用 2 页就必须换别的（流程→L8、步骤/原则→L9、并列概念→L10、过渡/金句→L11、代码/大图→L12、对照→L3/L5、数据→L3/L4）。一份 ≥6 页的 deck **至少出现 4 种不同版式**。雷同的根因是"什么内容都套 L2"——先按内容性质选骨架，再填。

---

## L1 · 封面 `cover`
```html
<section class="page cover" id="cover">
  <div class="c-bar"></div>
  <div class="c-kicker">Tech Deck · 2026</div>
  <h1>主标题</h1>
  <p class="c-sub">一句话说明讲什么、给谁、解决什么。</p>
  <div class="c-meta"><div>作者<b>name</b></div><div>日期<b>2026-06</b></div><div>导航<b>↑↓ / 1-9 / #锚点</b></div></div>
</section>
```

## L2 · 焦点 + 支撑（基础版式 · 勿连用超 2 页）
左焦点（论点 + 大数字 + callout），右支撑（定义列表 + 数据表）。一页吃透一个模块。
**好用但最易雷同**：适合"概念剖析"，但流程/步骤/对比/并列/过渡类内容应改用下面对应骨架。
```html
<div class="grid fill">
  <div class="c5 col">
    <p class="statement">核心论点，<span class="hi">关键词高亮</span>。</p>
    <div class="bignum accent"><span class="lab">关键指标</span><span class="n">10<span class="u">K TPS</span></span><span class="note">注解</span></div>
    <div class="callout"><span class="lab">关键约束</span>……</div>
  </div>
  <div class="c7 col">
    <div><div class="h-sec">定义</div><dl class="kv" style="margin-top:.6rem"><dt>X</dt><dd>……</dd></dl></div>
    <div><div class="h-sec">数据</div><table class="tbl" style="margin-top:.6rem">……（4–6 行）</table></div>
  </div>
</div>
```

## L3 · 表格主体（表是焦点）
对照 / 区间 / 排名类。主体放大表(`c8`)，辅区(`c4`)放焦点数字 + 读表要点。
```html
<div class="grid fill">
  <div class="c8 col"><table class="tbl">……（多列多行）</table><div class="callout"><span class="lab">读表要点</span>……</div></div>
  <div class="c4 col">
    <div class="bignum accent"><span class="lab">当前</span><span class="n">$665</span></div>
    <ul class="list"><li>……</li><li>……</li></ul>
  </div>
</div>
```

## L4 · 指标墙
3–4 个大数字并排 + 下方一张表/一组要点解释这些数字（别让大数字页空着）。
```html
<div class="grid fill">
  <div class="c3"><div class="bignum"><span class="lab">市值</span><span class="n">$11<span class="u">B</span></span></div></div>
  <!-- ×3–4，再接 c12 一张表或要点 -->
</div>
```

## L5 · 双栏对比（旧 vs 新 / A vs B）
```html
<div class="grid fill">
  <div class="c6"><div class="card" style="height:100%"><div class="t">A</div><dl class="kv">……</dl></div></div>
  <div class="c6"><div class="card accent" style="height:100%"><div class="t">B</div><dl class="kv">……</dl></div></div>
</div>
```

## L6 · 总结 / 下一步
焦点=结论金句 `.statement`；支撑=要点卡 + 关键日历表。
```html
<div class="grid fill">
  <div class="c5 col"><p class="statement">结论金句。</p><div class="bignum"><span class="lab">建议仓位</span><span class="n">5–10<span class="u">%</span></span></div></div>
  <div class="c7 col">
    <div class="grid"><div class="c6"><div class="card fill">入场……</div></div><div class="c6"><div class="card accent">必盯……</div></div></div>
    <div><div class="h-sec">催化剂日历</div><table class="tbl">……</table></div>
  </div>
</div>
```

## L7 · 图解页（流程图 / 架构图 / 时序图）
焦点=一张预渲染内联 SVG（生成见 `references/diagrams.md`）；支撑=图例 / 关键路径要点 / 读图结论。
**仅在用图比用表更讲得清「关系/流程」时才用；图也要过溢出检测。**
```html
<div class="grid fill" style="height:100%">
  <div class="c8 col"><div class="diagram framed"><!-- 粘贴 scripts/mermaid-svg.mjs 输出的 <svg>…</svg> --></div></div>
  <div class="c4 col">
    <div><div class="h-sec">关键路径</div><ul class="list"><li>……</li><li>……</li></ul></div>
    <div class="callout"><span class="lab">读图要点</span>……</div>
  </div>
</div>
```
- 横向图 `flowchart LR` 配右侧文字栏（图 `c7/c8` + 文字 `c4/c5`）；纵向高图 `flowchart TD` 建议整宽 `c12`，文字放图下方。
- 图高由容器 `--dia-h`（默认 `58vh`）限制、等比缩放、随所选主题（全局浅/深背景）自动适配；该页若溢出，给本页加 `style="--dia-h:48vh"` 或精简节点/文字。

## L8 · 横向流程带 / 演进时间线（全宽）
**流程 / 阶段 / 生命周期 / 演进**——一条横向 step 链（编号在上、step 间 → 箭头），骨架与左右分栏完全不同。
```html
<div class="grid fill">
  <div class="c12"><div class="steps">
    <div class="step"><span class="sn">01</span><div class="sb"><span class="st">提议 Propose</span><span class="sd">出块者广播 payload 承诺。</span></div></div>
    <div class="step"><span class="sn">02</span><div class="sb"><span class="st">证明 Attest</span><span class="sd">PTC 对承诺投票。</span></div></div>
    <div class="step"><span class="sn">03</span><div class="sb"><span class="st">揭示 Reveal</span><span class="sd">builder 揭示完整 payload。</span></div></div>
    <div class="step"><span class="sn">04</span><div class="sb"><span class="st">最终 Finalize</span><span class="sd">下一槽确认。</span></div></div>
  </div></div>
  <!-- 横向带只占一行高，必须配下方补充区填满，否则大片留白 -->
  <div class="c12"><div class="h-sec">各阶段产物与时延</div>
    <table class="tbl" style="margin-top:.6rem">
      <thead><tr><th>阶段</th><th>输入</th><th>产出</th><th class="num">时延</th></tr></thead>
      <tbody><tr><td class="mark">提议</td><td>父块头</td><td>承诺 + bid</td><td class="num">t+0s</td></tr><!-- …每阶段一行 --></tbody>
    </table>
  </div>
</div>
```
- 4–6 步最佳；步多则拆两行或换 L9。每步说明压到 1 句。
- **横向带天生只占一行高 → 必须配下方 `c12` 补充区（表格/指标/要点）把页填到 ~85%**；内容确实少时才退而用 `.grid.fill.center` 居中。

## L9 · 纵向编号步骤 / 设计原则（左编号）
**按序步骤 / 设计原则 / 清单**——纵向 `.steps.col`（大编号在左），比 `ul.list` 更有节奏。常配右侧一段论点。
```html
<div class="grid fill">
  <div class="c7 col"><div class="steps col">
    <div class="step"><span class="sn">01</span><div class="sb"><span class="st">原则一</span><span class="sd">说明……</span></div></div>
    <div class="step"><span class="sn">02</span><div class="sb"><span class="st">原则二</span><span class="sd">说明……</span></div></div>
    <div class="step"><span class="sn">03</span><div class="sb"><span class="st">原则三</span><span class="sd">说明……</span></div></div>
  </div></div>
  <div class="c5 col"><p class="statement">为什么这样设计的<span class="hi">一句话论点</span>。</p><div class="callout"><span class="lab">注</span>……</div></div>
</div>
```
- **填到 ~85%**：step 取 4–6 个、或每条说明给 2 行；右侧支撑区放足（论点 + 对比/要点）。内容确实只有 3 条且撑不满，就缩窄列宽或换别的骨架，别留半页空白。

## L10 · 卡片网格（并列概念矩阵）
**多个彼此等权、无主辅的并列项**（模块清单 / 特性矩阵 / 角色分工）——2×3 / 3×2 / 2×2 等权网格。⚠️ 仅当各项**真的等权**时用；有主次就回 L2。
```html
<div class="grid fill">
  <div class="c4"><div class="card fill" style="height:100%"><div class="num-pre">A</div><div class="t">模块 A</div><div class="small">职责说明……</div></div></div>
  <div class="c4"><div class="card fill" style="height:100%"><div class="num-pre">B</div><div class="t">模块 B</div><div class="small">……</div></div></div>
  <div class="c4"><div class="card fill" style="height:100%"><div class="num-pre">C</div><div class="t">模块 C</div><div class="small">……</div></div></div>
  <!-- 第二行再 3 个 c4，凑 2×3；用 .card.accent 标出其中一个重点 -->
</div>
```

## L11 · 居中金句 / 章节过渡
**章节切换 / 核心论断 / 转折**——大留白居中一句 `.statement`，在密集页之间插一页喘息、给 deck 做出节奏。**整份 1–2 页足矣**，多了显空。
```html
<div class="grid fill center">
  <div class="c12" style="text-align:center">
    <div class="c-kicker" style="justify-content:center">PART 02 · 共识层</div>
    <p class="statement" style="max-width:26ch; margin:1rem auto 0">真正的瓶颈不在带宽，<span class="hi">而在状态增长</span>。</p>
  </div>
</div>
```

## L12 · 全宽主导（大代码 / 大图 + 旁注）
**协议细节 / 配置 / 伪代码 / 单张大图**——主体 `c8` 放一个大 `.code` 或 `.diagram`，旁边 `c4` 放逐行/逐点旁注。
```html
<div class="grid fill">
  <div class="c8 col"><div class="code">……（10–16 行代码/伪码，关键处 .k/.s/.hi 高亮）……</div></div>
  <div class="c4 col"><div class="h-sec">逐行注释</div><dl class="kv"><dt>L3</dt><dd>……</dd><dt>L7</dt><dd>……</dd></dl></div>
</div>
```

---

## 节奏与硬约束
- **版式轮换（防雷同 · 最重要）**：相邻两页**不得用同一骨架**；L2 最多连用 2 页就换；≥6 页的 deck 至少 4 种版式。先按内容性质选骨架（流程/步骤/并列/对比/过渡/代码），别一律套 L2。
- **≤16 页**：封面 + ≤14 内容 + 收尾，一页一模块。
- **背景统一**：整份 deck 要么全浅、要么全深（见 `themes.md` 选 light / 暗终端），**不得逐页深浅混用**；呼吸靠留白与表格，不靠反色页。
- **填充 ~85%**，下半不留大块空白；但不注水——内容用真实数据/论据。
- **绝不溢出**：写完跑 `scripts/check-overflow.sh deck.html`，三视口全 `ALL_OK` 才算完成。塞不下就精简文案 / 收紧"标题到表"的小间距（不是收紧块间大间距），或拆页。
