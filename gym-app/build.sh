#!/bin/sh
# Wraps greenrep.html (the app body) into a standalone page you can host anywhere.
set -e
cd "$(dirname "$0")"
mkdir -p dist
{
  printf '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><link rel="manifest" href="manifest.webmanifest"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style></head><body>\n'
  cat greenrep.html
  printf '\n</body></html>\n'
} > dist/index.html
cp manifest.webmanifest icon.svg dist/
echo "Built dist/index.html"
