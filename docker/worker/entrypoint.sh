#!/usr/bin/env bash

cd /flambo

echo "installing node modules"
npm install

echo "waiting for rethinkdb..."
until curl -s "$RETHINKDB_HOST:8080" > /dev/null; do
    echo "rethinkdb is unavailable - sleeping"
    sleep 1
done
echo "rethinkdb is ready!"

echo "waiting for elastic..."
until curl -s "$ELASTIC_HOST:$ELASTIC_PORT" > /dev/null; do
    echo "elastic is unavailable - sleeping"
    sleep 1
done
echo "elastic is ready!"

nodemon -L collectWorker.js