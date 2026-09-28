#!/bin/sh
# Builds the public web app into ../docs/greenrep (served by GitHub Pages).
# greenrep.html is the app body; this wraps it in a full page with the
# install manifest, icons and offline service worker.
set -e
cd "$(dirname "$0")"
OUT=../docs/greenrep
mkdir -p "$OUT"
STAMP=$(date +%Y%m%d%H%M%S)
{
  printf '<!doctype html><html lang="en"><head><meta charset="utf-8">'
  printf '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  printf '<meta name="description" content="Simple gym and food tracker with animated exercise demos.">'
  printf '<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icon-192.png">'
  printf '<link rel="apple-touch-icon" href="apple-touch-icon.png">'
  printf '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">'
  printf '<meta name="apple-mobile-web-app-title" content="GreenRep"><meta name="apple-mobile-web-app-status-bar-style" content="default">'
  printf '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>'
  printf '</head><body>\n'
  cat greenrep.html
  printf '\n<script>if("serviceWorker" in navigator&&location.protocol==="https:"){navigator.serviceWorker.register("sw.js")}</script>\n</body></html>\n'
} > "$OUT/index.html"
sed "s/__BUILD__/$STAMP/" sw.js > "$OUT/sw.js"
cp manifest.webmanifest "$OUT/"
if [ -f icons/icon-512.png ]; then cp icons/*.png "$OUT/"; fi
touch ../docs/.nojekyll
cat > ../docs/index.html <<'HTML'
<!doctype html><meta charset="utf-8"><title>GreenRep</title><meta http-equiv="refresh" content="0; url=greenrep/"><a href="greenrep/">Open GreenRep</a>
HTML
echo "Built $OUT"
