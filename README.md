![flambo](./assets/flambo_logo.png)

[![Travis CI][travis-image]][travis-url]

**flambo** is a content reader/aggregator.

## Features

- Groups to help grouping data by topic
- Collections to let users manage their very own feed
- Sources pull data from various providers, for now:
    - RSS feeds
    - Meetup
    - hoping to add more in the future (contributions are welcome :))

## Components

**flambo** is made up of several components

- an *API* `/api`
- a *bot* `/bot`
- a *cli* `/cli`
- a *webapp* `/webapp`
- Node.js packages on which top level components depend

## Requirements

- docker
- docker-compose
- Node 7.6

[travis-image]: https://img.shields.io/travis/plouc/flambo.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/flambo
