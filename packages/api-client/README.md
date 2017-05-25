# flambo API client

[![npm version](https://img.shields.io/npm/v/@flambo/api-client.svg?style=flat-square)](https://www.npmjs.com/package/@flambo/api-client)

The client is generated from the API swagger specification.
 
The generation is based upon `swagger.json` file and `bridge.json`, the *bridge* file
defines how you want to expose the API.

## Generating the client

``` sh
yarn run gen
```

## Generating the documentation

``` sh
yarn run doc
```

## Generating client & documentation

``` sh
yarn run build
```
