# @shopify-wrapper

> Query and mutate shopfiy data easily and safely

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![WIP](https://img.shields.io/badge/status-wip-yellow)](https://github.com/pnxdxt/shopify-wrapper)
[![GitHub workflow status](https://img.shields.io/github/workflow/status/pnxdxt/shopify-wrapper/CI)](https://github.com/pnxdxt/shopify-wrapper/actions/)
[![npm version](https://img.shields.io/npm/v/shopify-wrapper)](https://www.npmjs.com/package/shopify-wrapper)
[![npm downloads](https://img.shields.io/npm/dt/shopify-wrapper)](https://www.npmjs.com/package/shopify-wrapper)

### Install

```
$ npm install shopify-wrapper
```

or

```
$ yarn add shopify-wrapper
```

### Usage

```js
import shopifyWrapper from 'shopify-wrapper'

const config = {
	domain: process.env.domain,
	token: process.env.token
}

const product = await shopifyWrapper.product.find({handle:'my-super-product', config})
```

## License

MIT © [pnxdxt](https://pnxdxt.com)
