#!/usr/bin/bash

refrescador \
  -w . \
  -e "js" \
  -e "css" \
  -e "html" \
  -e "sh" \
  -e "json" \
  -i '**/dist/**' \
  -i '**/*.dist.*' \
  -i '**/*-dist.*' \
  -i '**/nowatch/**' \
  -i '**/*.nowatch.*' \
  -i '**/*-nowatch.*' \
  -x 'bash build-compiler.sh' \
  -x 'bash build.sh' \
  -x 'node pak_modules/bin/cli.js build currently -e bin' \
  -x 'node pak_modules/bin/cli.js build currently -e main' \
  -x 'node pak_modules/bin/cli.js build currently -e server' \
  -x 'node pak_modules/bin/cli.js build currently -e client' \
  -x 'node pak_modules/bin/cli.js build currently -e gui' \
