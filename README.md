# @pnxdxt/shopify-wrapper
> Query and mutate shopfiy data easily and safely

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![GitHub workflow status](https://img.shields.io/github/workflow/status/pnxdxt/shopify-wrapper/CI)](https://github.com/pnxdxt/shopify-wrapper)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@pnxdxt/shopify-wrapper)](https://bundlephobia.com/package/@pnxdxt/shopify-wrapper)
[![npm downloads](https://img.shields.io/npm/dt/@pnxdxt/shopify-wrapper)](https://www.npmjs.com/package/@pnxdxt/shopify-wrapper)

## Install
```
$ npm install shopify-wrapper
```
## Import

This package is pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). It cannot be `require()`'d from CommonJS.

Use `import foo from 'foo'` instead of `const foo = require('foo')` to import the package.

```js
// Load entire build
import * as pkgName from 'shopify-wrapper';

// Load by method
import {main} from 'shopify-wrapper';
```
If the package is used in an async context, you could use [`await import(…)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) from CommonJS instead of `require(…)`.

**You also need to make sure you're on the latest minor version of Node.js. At minimum Node.js 12.20, 14.14, or 16.0.**

Read more here: [sindresorhus/esm-package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)


## Usage

```js

main([1,2,3], (element) => typeof element === 'string');
//=> false

main(['1', '2', '3'], (element) => typeof element === 'string');
//=> true
```

## License

MIT © [pnxdxt](https://pnxdxt.com)
