#!/usr/bin/env bash

cd /api

echo "installing node modules"
npm install -q

node initSchema.js

node loadData.js

nodemon -L api.js