### eslint-config-custom

跨專案共用的 eslint-config，會在各專案下的 `.eslintrc.cjs` 引入。

```js
// root/
module.exports = {
  extends: ['custom']
};
```