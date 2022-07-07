# pkg-template
> Small js package I use to help me to create npm packages

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![GitHub workflow status](https://img.shields.io/github/workflow/status/pnxdxt/pkg-template/CI)](https://github.com/pnxdxt/package-template)
[![npm bundle size](https://img.shields.io/bundlephobia/min/pkg-template)](https://bundlephobia.com/package/pkg-template)
[![npm downloads](https://img.shields.io/npm/dt/pkg-template)](https://www.npmjs.com/package/pkg-template)

## Install
```
$ npm install pkg-template
```
## Import

This package is pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). It cannot be `require()`'d from CommonJS.

Use `import foo from 'foo'` instead of `const foo = require('foo')` to import the package.

```js
// Load entire build
import * as pkgName from 'pkg-template';

// Load by method
import {main} from 'pkg-template';
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

MIT © [Paul Nodet](https://pnodet.com)
