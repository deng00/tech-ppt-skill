# 版式骨架（高密度 · 一页一模块）

核心原则：**一页讲清一个模块 / 子问题**，但这一页要**塞满有效信息**——用 12 列网格把「定义 / 表格 / 指标 / 代码 / 流程」并排组合，而不是一页只讲一句话。信息密度要**明显高于** guizang / frontend 那类"大字 + 留白"的 deck。

所有页面共用结构：

```html
<section class="page" id="语义id">
  <header class="page-head">
    <div class="ph-l"><span class="ph-num">02</span><span class="ph-title">页标题</span></div>
    <span class="ph-anchor">#<b>语义id</b></span>
  </header>
  <p class="page-sub">本页讲清的那一个子问题（一句话）。</p>
  <div class="page-body"><!-- 主体网格 --></div>
  <footer class="page-foot"><span>DECK · 章节</span><span>02 / 10</span></footer>
</section>
```

- 每页 **必须有唯一 `id`**（kebab-case），页眉右侧显示 `#id`，并在底部 `.pager` 加一条 `<a href="#id">NN</a>`。
- 主体放进 `.page-body > .grid.rows-fill`，用 `.cN` 分配 12 列宽。
- 可用原子见 `template.html`：`kv`(定义列表) `tbl`(数据表) `metric`(指标大字) `card`(直角卡) `code`(代码块) `flow`(流程) `callout`(标注) `h-sec`(小节标题)。

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

## L2 · 模块剖析（左定义 + 中表格 + 右指标/代码）— 主力版式

一页吃透一个模块：是什么 / 关键对照 / 量化指标 / 接口片段。

```html
<div class="grid rows-fill">
  <div class="c5" style="display:flex;flex-direction:column;gap:1rem">
    <div class="h-sec">定义</div>
    <dl class="kv"><dt>字段</dt><dd>说明……</dd> …… </dl>
    <div class="callout"><span class="lab">关键约束</span>……</div>
  </div>
  <div class="c4">
    <div class="h-sec" style="margin-bottom:.6rem">对照</div>
    <table class="tbl"><thead><tr><th>维度</th><th>A</th><th class="num">值</th></tr></thead>
      <tbody><tr><td class="mark">…</td><td>…</td><td class="num">…</td></tr></tbody></table>
  </div>
  <div class="c3" style="display:flex;flex-direction:column;gap:1rem">
    <div class="metric"><span class="lab">指标</span><span class="n">9<span class="u">项</span></span></div>
    <div class="code"><span class="c-com"># 接口</span>
<span class="c-key">fn</span> <span class="c-fn">call</span>() -> T</div>
  </div>
</div>
```

## L3 · 全宽对照表

多维度横向对比（5–10 行最佳）。表格占满，左侧或上方留要点。

```html
<div class="grid rows-fill">
  <div class="c8">
    <table class="tbl">
      <thead><tr><th>方案</th><th>机制</th><th class="num">吞吐</th><th class="num">延迟</th><th>权衡</th></tr></thead>
      <tbody><tr><td class="mark">X</td><td>…</td><td class="num">…</td><td class="num">…</td><td>…</td></tr></tbody>
    </table>
  </div>
  <div class="c4" style="display:flex;flex-direction:column;gap:1rem">
    <div class="h-sec">读表要点</div>
    <ul class="body" style="padding-left:1.1em;line-height:1.7"><li>…</li><li>…</li></ul>
    <div class="callout"><span class="lab">结论</span>……</div>
  </div>
</div>
```

## L4 · 流程 / 管线（横向编号步骤）

```html
<div class="page-body" style="justify-content:center">
  <div class="flow">
    <div class="step"><span class="s-n">01</span><span class="s-t">阶段</span><span class="s-d">说明……</span></div>
    <div class="step"><span class="s-n">02</span><span class="s-t">阶段</span><span class="s-d">说明……</span></div>
    <!-- 3–6 步 -->
  </div>
  <div class="grid" style="margin-top:1.4rem">
    <div class="c4"><div class="callout"><span class="lab">硬依赖</span>A → B → C</div></div>
    <div class="c4"><div class="callout"><span class="lab">失败处理</span>……</div></div>
    <div class="c4"><div class="metric"><span class="lab">端到端</span><span class="n">2<span class="u">s</span></span></div></div>
  </div>
</div>
```

## L5 · 指标墙（多个大数字 + 注解）

```html
<div class="grid rows-fill" style="align-content:center">
  <div class="c3"><div class="metric"><span class="lab">TPS</span><span class="n">10<span class="u">K</span></span><span class="note">目标值</span></div></div>
  <div class="c3"><div class="metric"><span class="lab">最终性</span><span class="n">12<span class="u">s</span></span><span class="note">现状</span></div></div>
  <!-- 4 个一行；下方可接一行表格或要点解释这些数字 -->
  <div class="c12"><hr class="rule"></div>
  <div class="c12"><p class="small">数字口径与来源……（信息密度：别让大数字页空着，补一行注解/表格）</p></div>
</div>
```

## L6 · 双栏对比（旧 vs 新 / A vs B）

```html
<div class="grid rows-fill">
  <div class="c6"><div class="card" style="height:100%"><div class="t">旧模式</div><dl class="kv">……</dl><div class="small">问题：……</div></div></div>
  <div class="c6"><div class="card accent" style="height:100%"><div class="t">新模式</div><dl class="kv">……</dl><div class="small">收益：……</div></div></div>
</div>
```

## L7 · 总结 / 下一步

```html
<div class="grid rows-fill">
  <div class="c4"><div class="card fill" style="height:100%"><div class="t">要点一</div><div class="small">…</div></div></div>
  <div class="c4"><div class="card fill" style="height:100%"><div class="t">要点二</div><div class="small">…</div></div></div>
  <div class="c4"><div class="card accent" style="height:100%"><div class="t">下一步</div><div class="small">…</div></div></div>
</div>
```

---

## 密度与节奏规则

- **页数 ≤ 10**（硬约束）。封面 + 收尾各 1 页，中间 ≤ 8 页，每页一个模块。
- **每页尽量塞 2–4 个信息块**（定义 + 表格 + 指标/代码并排）。单块独占一页 = 密度不足，合并或加料。
- **dark 页节奏**：用 `.page.dark` 制造呼吸，但连续同色不超过 2 页；纯 light 也别一镜到底。
- **绝不溢出**：每页 `overflow:hidden`，超出即被裁。写完**必须跑 SKILL.md 的 headless 溢出检测**，三视口全 `ALL_OK` 才算完成。塞不下就精简文案 / 降一档字号，不要硬塞。
