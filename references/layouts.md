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
  <div class="page-foot"><span>DECK · 章节</span><span>02 / 10</span></div>
</section>
```

四条铁律（违反就退回"平铺堆砌"）：
1. **标题醒目**：`page-head` = 大编号 `.num` + 大标题 `h2` + accent 粗线 `.head-rule`。
2. **每页一个视觉焦点**：焦点区放 `.statement`(核心论点，关键词 `.hi` 高亮) 或 `.bignum`(超大数字)，抢眼。
3. **主-辅分区**：焦点区(`.c5 .col`) + 支撑区(`.c7 .col`)。禁止 N 个等权小块平铺。
4. **块间大间距 + 填充**：`.col` 内各块靠大 `gap` 分隔（已在模板设好）；支撑区用「多条目」(表格行 / 定义项 / 要点) 填到 ~85%。

可用原子（定义见 `template.html`）：`.statement` `.bignum` `.h-sec` `.kv`(定义列表) `.tbl`(数据表) `.list`(要点) `.card` `.callout` `.code`。

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

## L2 · 焦点 + 支撑（主力版式）
左焦点（论点 + 大数字 + callout），右支撑（定义列表 + 数据表）。一页吃透一个模块。
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

---

## 节奏与硬约束
- **≤10 页**：封面 + ≤8 内容 + 收尾，一页一模块。
- **dark 节奏**：`.page.dark` 制造呼吸，连续同色不超 2 页。
- **填充 ~85%**，下半不留大块空白；但不注水——内容用真实数据/论据。
- **绝不溢出**：写完跑 `scripts/check-overflow.sh deck.html`，三视口全 `ALL_OK` 才算完成。塞不下就精简文案 / 收紧"标题到表"的小间距（不是收紧块间大间距），或拆页。
