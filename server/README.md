# @shopify-wrapper/server

> Query and mutate shopfiy data easily and safely

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![GitHub workflow status](https://img.shields.io/github/workflow/status/pnxdxt/shopify-wrapper/CI)](https://github.com/pnxdxt/shopify-wrapper/actions/)
[![npm downloads](https://img.shields.io/npm/dt/@shopify-wrapper/server)](https://www.npmjs.com/package/@shopify-wrapper/server)

## About

This packages uses node-fetch and is meant to be run on node environnements or nextjs backends / SSR

## Install

```
$ npm install @shopify-wrapper/server
```

or

```
$ yarn add @shopify-wrapper/server
```

## Usage

```js
import shopifyWrapper from '@shopify-wrapper/server'

const config = {
	domain: process.env.domain,
	token: process.env.token
}

const product = await shopifyWrapper.product.find({handle:'my-super-product', config})
```

## License

MIT © [pnxdxt](https://pnxdxt.com)
