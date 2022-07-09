# @shopify-wrapper

> Query and mutate shopfiy data easily and safely

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![WIP](https://img.shields.io/badge/status-wip-yellow)](https://github.com/pnxdxt/shopify-wrapper)
[![GitHub workflow status](https://img.shields.io/github/workflow/status/pnxdxt/shopify-wrapper/CI)](https://github.com/pnxdxt/shopify-wrapper/actions/)

# Packages

## Client side
[![npm version](https://img.shields.io/npm/v/@shopify-wrapper/client)](https://www.npmjs.com/package/@shopify-wrapper/client)
[![npm downloads](https://img.shields.io/npm/dt/@shopify-wrapper/client)](https://www.npmjs.com/package/@shopify-wrapper/client)

### Install

```
$ npm install @shopify-wrapper/client

OR

$ yarn add @shopify-wrapper/client

```

### Usage

```js
import {getProduct} from @shopify-wrapper/client

const config = {
	domain: process.env.domain,
	token: process.env.token
}

const product = await getProduct.byHandle('my-super-product', config)
```

## Server side
[![npm version](https://img.shields.io/npm/v/@shopify-wrapper/server)](https://www.npmjs.com/package/@shopify-wrapper/server)
[![npm downloads](https://img.shields.io/npm/dt/@shopify-wrapper/server)](https://www.npmjs.com/package/@shopify-wrapper/server)

### Install

```
$ npm install @shopify-wrapper/server

OR

$ yarn add @shopify-wrapper/server

```

### Usage

```js
import {getProduct} from @shopify-wrapper/server

const config = {
	domain: process.env.domain,
	token: process.env.token
}

const product = await getProduct.byHandle('my-super-product', config)
```

## License

MIT © [pnxdxt](https://pnxdxt.com)
