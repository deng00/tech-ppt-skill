#!/usr/bin/env bash
# 检测 deck 每一页是否溢出（内容 scrollHeight > 视口 clientHeight）。
# 每页 overflow:hidden，溢出部分会被裁掉看不到 —— 这是本 skill 最常见、最致命的问题。
#
# 用法:  scripts/check-overflow.sh path/to/deck.html
# 输出:  每个视口一行；ALL_OK = 该视口全部页不溢出；
#        "overview:1100>768 | summary:..." = 这些 id 的页仍溢出（冒号后 scrollHeight>clientHeight）。
#
# 退出码: 0 = 三视口全 ALL_OK；1 = 有溢出或出错。
set -euo pipefail
F="${1:-}"; [ -f "$F" ] || { echo "usage: $0 deck.html"; exit 1; }
TMP="$(mktemp -t ovf).html"
python3 - "$F" "$TMP" <<'PY'
import sys
f,t=sys.argv[1],sys.argv[2]
src=open(f,encoding='utf-8').read()
inject=r'''<script>
function check(){var ss=document.querySelectorAll('.page');var R=[];
ss.forEach(function(s,i){if(s.scrollHeight>s.clientHeight+1)R.push((s.id||i)+':'+s.scrollHeight+'>'+s.clientHeight);});
document.body.setAttribute('data-of',R.length?R.join(' | '):'ALL_OK');}
if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){setTimeout(check,400);});}
else{addEventListener('load',function(){setTimeout(check,700);});}
</script></body>'''
open(t,'w',encoding='utf-8').write(src.replace('</body>',inject,1))
PY
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
fail=0
for size in 1366,768 1280,800 1440,900; do
  printf "[%s] " "$size"
  res="$("$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=$size \
        --virtual-time-budget=6000 --dump-dom "file://$TMP" 2>/dev/null \
        | grep -oE 'data-of="[^"]*"' | head -1 || true)"
  echo "${res:-(no result)}"
  [[ "$res" == *ALL_OK* ]] || fail=1
done
rm -f "$TMP"
exit $fail
