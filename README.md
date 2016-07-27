# flambo

[![Travis CI][travis-image]][travis-url]

## Features

- Collect data from several data sources:
    - Twitter
    - RSS feeds
    - Meetup
    - …
- Create topics and attach data sources
- Create custom collections

## Requirements

- Docker
- docker-compose
- Node 6 (only for development)

## Stack/Tools/Libs

- Rethinkdb
- elasticsearch
- rabbitmq
- Node.js
- Express
- Cucumber
- Reactjs
- Redux
- Postcss
- webpack
- …

## Run it

First, you'll have to provide twitter API tokens in order to be able to use the twitter source.
Simply copy `.env.sample` (inside `api/`directory and rename it to `.env`, and replace the required properties. 

```sh
make run
```

Now you can acces the app at [http://localhost:3000/](http://localhost:3000/)

```
login: admin@flambo.io
password: admin
```

## Development mode

Launch rethinkdb, elasticsearch and the api and start the webapp dev server.

```sh
make run-dev
```

You should now be able to access the api at [http://localhost:3000/](http://localhost:3000/) and the webapp at [http://localhost:8081/](http://localhost:8081/)

## Accessing services

- **rethinkdb ui** [http://localhost:8080/](http://localhost:8080/)
- **elasticsearch** [http://localhost:9200/](http://localhost:9200/), I strongly encourage you to install the [sense chrome extension](https://chrome.google.com/webstore/detail/sense-beta/lhjgkmllcaadmopgmanpapmpjgmfcfig)
- **rabbitmq management console** [http://localhost:15672/](http://localhost:15672/) 

## Swagger

This repository provides a swagger file to play with the API, `flambo-api.yml`.


## Operations

Reloading default data:

```sh
make data-reset
```

Collecting and indexing from existing sources

```sh
docker-compose exec api /bin/ash -c "cd /flambo/api && node collect.js"
```

Running api functional tests

```sh
make test-api-bdd
```

## Documentation

You can generate several documentations (Node.js required on the host):

- **API** `make doc-api`
- **CSS styleguide** `make doc-css-styleguide`
- **webapp** `make doc-webapp`

If you want to build all docs at once `make doc`


[travis-image]: https://img.shields.io/travis/plouc/flambo.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/flambo
