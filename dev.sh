#!/usr/bin/bash

# -x 'node pak_modules/bin/cli.js build currently -e bin' \
# -x 'node pak_modules/bin/cli.js build currently -e main' \
# -x 'node pak_modules/bin/cli.js build currently -e server' \
# -x 'node pak_modules/bin/cli.js build currently -e client' \
# -x 'node pak_modules/bin/cli.js build currently -e gui' \
# -x 'bash build.sh' \

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
  -x 'node pak_modules/bin/cli.js test --all' \
  -x 'node pak_modules/bin/cli.js test test/src/cem/tester/TestCollection.js' \
  
