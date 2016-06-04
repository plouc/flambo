#!/usr/bin/env bash


cd /api

echo "installing node modules"
npm install

echo "waiting for rethinkdb..."
until curl -s "$RETHINKDB_HOST:8080" > /dev/null; do
    echo "rethinkdb is unavailable - sleeping"
    sleep 1
done
echo "rethinkdb is ready!"

echo "initialize DB"
node initSchema.js
node loadData.js

echo "waiting for elastic..."
until curl -s "$ELASTIC_HOST:$ELASTIC_PORT" > /dev/null; do
    echo "elastic is unavailable - sleeping"
    sleep 1
done
echo "elastic is ready!"

echo "initialize elastic index"
node initIndex.js
node collect.js

nodemon -L api.js