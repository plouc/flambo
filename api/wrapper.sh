#!/bin/bash
set -e

yarn run migrate
yarn run init-elastic
yarn run load-data
yarn run load-sources
node index.js
