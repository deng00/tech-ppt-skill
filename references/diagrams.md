# 图解（流程图 / 架构图 / 时序图）

需要**解释结构、流程、分支、状态、时序、层级关系**时，用一张图比一段文字讲得清。
本 skill 用 [lukilabs/beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) 把 mermaid
**预渲染成静态内联 SVG**，再粘进 deck —— 不在浏览器跑任何运行时。

## 何时画（判断型 · 宁缺勿滥）

- **画**：架构分层、请求/数据流转、状态机、调用时序、模块依赖 —— 这些「关系」用表格列不清。
- **不画**：能用 `dl.kv`（定义）/ `table.tbl`（对照、指标）说清的，一律用表，别画图。
- 一份 deck 通常 **0–2 张图**。图是焦点，不是装饰；每页仍「一页一焦点」。

## 为什么预渲染（而非浏览器运行时渲染）

契合本 skill 的硬约束：**单文件、离线可用、零运行时依赖、零动效、可被 `check-overflow.sh` 精确量尺寸**。
mermaid → SVG 是确定性转换，交给脚本一次跑完，比在每次打开时跑布局引擎更稳、更快、更可控。
渲染出的 SVG 颜色已映射到 deck 的 `--paper/--ink/--accent`，**随所选主题自动着色**（深色主题下自动转深）——换主题无需重渲。

## 三步：mermaid → 内联 SVG → 粘进 deck

```bash
# 1. 写 mermaid 源码（存成 .mmd，或直接管道）
cat > /tmp/flow.mmd <<'MMD'
flowchart LR
  A[客户端] --> B{鉴权}
  B -->|否| R[401]
  B -->|是| C{命中缓存?}
  C -->|是| H[返回]
  C -->|否| D[(数据库)] --> E[写缓存] --> H
MMD

# 2. 渲染成干净 SVG（脚本会删掉多余字体请求、映射主题色、去掉写死尺寸）
node <SKILL_ROOT>/scripts/mermaid-svg.mjs /tmp/flow.mmd -o /tmp/flow.svg
#   也可管道：  cat /tmp/flow.mmd | node <SKILL_ROOT>/scripts/mermaid-svg.mjs -

# 3. 把 /tmp/flow.svg 的 <svg>…</svg> 整段粘进图解页的 .diagram 容器（见 layouts.md L7）
```
> 首次运行若提示缺依赖，脚本会自动在 skill 根目录 `npm install` 一次（需联网，幂等）。

## 支持的图类型

`flowchart` / `graph`（流程、架构、依赖）、`sequenceDiagram`（时序）、`stateDiagram-v2`（状态机）、
`classDiagram`、`erDiagram` 等 mermaid 主流类型。技术 deck 里最常用 **flowchart** 和 **sequenceDiagram**。

## 写图的密度约束（避免溢出 + 看得清）

- **节点 ≤ ~10**，label 短（2–6 字/词）。节点太多就拆成两张图，或退回用表格。
- **方向按版面选**：
  - `flowchart LR`（横向）→ 配文字侧栏，图占 `c7/c8`、侧栏 `c4/c5`；
  - `flowchart TD`（纵向、分支多、偏高）→ 建议**整宽 `c12`**，文字放图下方，别硬塞侧栏。
- **风格克制**：图默认中性灰线条（beautiful-mermaid 风格），与 deck 的「单一 accent、弱装饰」一致。
  要强调，靠**侧栏文字**的 `.hi` / `.callout`，不要给图堆颜色。

## 版式与质量门

- SVG 必须放进 `.diagram`（或 `.diagram.framed` 加边框底色）容器 —— 容器 CSS 已限高 `--dia-h`（默认 `58vh`）、等比缩放、随主题/暗页适配。**不要**给 `<svg>` 内联尺寸样式（会覆盖容器约束导致撑破页面）。
- 图解页同样跑 `scripts/check-overflow.sh deck.html`。若该页溢出：
  1. 调小本页高度上限 —— `<section ... style="--dia-h:48vh">`；
  2. 或精简侧栏文字 / 减少图节点；
  3. 高图改 `c12` 整宽。
