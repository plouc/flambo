[![flambo](./assets/flambo_logo.png)](http://flambo.co)

[![Travis CI][travis-image]][travis-url]

**flambo** is a content aggregation platform built upon Node.js.

## Features

- Groups to help grouping data by topic
- Collections to let users manage their very own feed
- Sources pull data from various providers, for now:
    - RSS feeds
    - Meetup
    - hoping to add more in the future (contributions are welcome :))


![workflow](./assets/workflow.png)


## Demo

Running the demo is quite easy:

``` sh
git clone git@github.com:plouc/flambo.git
cd flambo && DEMO=1 make up
open http://localhost:8090/webapp
```


## Components

**flambo** is made up of several components

| component         | directory                 | package |
| ----------------- | ------------------------- | ------- |
| **API**           | `/api`                    | *n/a*   |
| **bot**           | `/packages/bot`           | `@flambo/bot` [![npm version](https://img.shields.io/npm/v/@flambo/bot.svg?style=flat-square)](https://www.npmjs.com/package/@flambo/bot) |
| **CLI**           | `/packages/cli`           | `@flambo/cli` [![npm version](https://img.shields.io/npm/v/@flambo/cli.svg?style=flat-square)](https://www.npmjs.com/package/@flambo/cli) |
| **webapp**        | `/webapp`                 | *n/a*   |
| **RSS source**    | `/packages/source-rss`    | `@flambo/source-rss` [![npm version](https://img.shields.io/npm/v/@flambo/source-rss.svg?style=flat-square)](https://www.npmjs.com/package/@flambo/source-rss) |
| **Meetup source** | `/packages/source-meetup` | `@flambo/source-meetup` [![npm version](https://img.shields.io/npm/v/@flambo/source-meetup.svg?style=flat-square)](https://www.npmjs.com/package/@flambo/source-meetup) |
| **website**       | `/website`                | *n/a*   |

## Requirements

- docker (edge channel for volumes mount options) 
- docker-compose
- Node 7.6

[travis-image]: https://img.shields.io/travis/plouc/flambo.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/flambo
