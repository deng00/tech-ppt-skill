#!/usr/bin/env node
// mermaid 源码 → 干净内联 SVG（供 tech-ppt-skill 的单文件 deck 直接粘贴）。
//
// 用 lukilabs/beautiful-mermaid 渲染（自带解析+ELK 布局，输出 SVG 字符串，零 DOM 依赖）。
// 本脚本只做「确定性转换」：mermaid → SVG，并把 SVG 处理成契合本 skill 的形态：
//   1) 删掉 SVG 内联的 @import 字体请求 —— 字体由 deck <head> 统一加载，保持单文件/离线/不重复请求；
//   2) 图内文字改吃 deck 的 --mono 等宽栈（中文回退正确）；
//   3) 根 <svg> 的 --bg/--fg/--accent 映射为 deck 的 var(--paper/--ink/--accent)
//      —— 图自动跟随所选主题，且在 .page.dark 上自动反色；
//   4) 去掉根 <svg> 的 width/height（只留 viewBox），尺寸交给 .diagram 容器 CSS。
//
// 用法:
//   node scripts/mermaid-svg.mjs <input.mmd>            # 输出到 stdout
//   node scripts/mermaid-svg.mjs <input.mmd> -o out.svg
//   echo "flowchart LR; A-->B" | node scripts/mermaid-svg.mjs -   # 从 stdin 读
//
// 选项:
//   -o, --out <file>   写入文件（默认 stdout）
//   --padding <n>      画布内边距 px（默认 8）
//   --font <name>      字体 family（默认 "Ubuntu Mono"，仅作 fallback；最终吃 deck --mono）
//
// 依赖缺失时本脚本会自动在 skill 根目录 `npm install` 一次（幂等）。

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ---- 解析参数 ----
const argv = process.argv.slice(2);
let input = null, out = null, padding = 8, font = 'Ubuntu Mono';
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '-o' || a === '--out') out = argv[++i];
  else if (a === '--padding') padding = Number(argv[++i]);
  else if (a === '--font') font = argv[++i];
  else if (a === '-h' || a === '--help') { printHelp(); process.exit(0); }
  else if (!input) input = a;
}
if (!input) { printHelp(); process.exit(1); }

function printHelp() {
  console.error('用法: node scripts/mermaid-svg.mjs <input.mmd|-> [-o out.svg] [--padding 8] [--font "Ubuntu Mono"]');
}

// ---- 读源码（文件 或 stdin） ----
const src = input === '-' ? readFileSync(0, 'utf8') : readFileSync(input, 'utf8');

// ---- 加载 beautiful-mermaid（缺失则自动安装一次） ----
let renderMermaidSVG;
try {
  ({ renderMermaidSVG } = await import('beautiful-mermaid'));
} catch {
  console.error('[mermaid-svg] 未找到 beautiful-mermaid，正在 npm install …');
  execSync('npm install', { cwd: ROOT, stdio: 'inherit' });
  ({ renderMermaidSVG } = await import('beautiful-mermaid'));
}

// ---- 渲染 ----
// bg/fg/accent 只作 fallback：随后会被映射为 deck 的 CSS 变量。
let svg = renderMermaidSVG(src, {
  bg: '#ffffff', fg: '#0a0a0a', accent: '#002FA7',
  font, transparent: true, padding,
});

// ---- 处理成契合 skill 的形态 ----
// 1) 删掉内联 @import 字体请求行（字体由 deck <head> 提供）
svg = svg.replace(/\s*@import url\([^)]*\);?/g, '');

// 2) 图内文字吃 deck 的 --mono 等宽栈（含中文回退）；保留单名作为 fallback
svg = svg.replace(
  /text\s*\{[^}]*font-family:[^}]*\}/,
  "text { font-family: var(--mono, 'Ubuntu Mono','JetBrains Mono','Sarasa Mono SC','Noto Sans Mono CJK SC',monospace); }"
);

// 3) 根 <svg>：颜色变量映射到 deck 主题；去掉写死的 width/height。
//    注意：只内联颜色变量，绝不内联尺寸样式 —— 尺寸由 .diagram svg{} 外部 CSS 控制，
//    这样页面级 --dia-h 才能真正约束高度（内联 style 会覆盖外部表，导致约束失效）。
svg = svg.replace(/<svg\b[^>]*>/, (tag) => {
  let t = tag
    .replace(/\s+width="[^"]*"/, '')
    .replace(/\s+height="[^"]*"/, '')
    .replace(/style="[^"]*"/, 'style="--bg:var(--paper);--fg:var(--ink);--accent:var(--accent)"');
  if (!/style=/.test(t)) {
    t = t.replace(/<svg\b/, '<svg style="--bg:var(--paper);--fg:var(--ink);--accent:var(--accent)"');
  }
  return t;
});

// ---- 输出 ----
if (out) { writeFileSync(out, svg); console.error(`[mermaid-svg] 写入 ${out}（${svg.length} bytes）`); }
else process.stdout.write(svg);
