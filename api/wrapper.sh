#!/bin/bash
set -e

yarn run migrate
yarn run init-es
yarn run load-data
node scripts/load-sources.js
node index.js