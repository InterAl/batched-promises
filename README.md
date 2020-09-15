# batched-promises
Executes promises parallelly with a concurrency limit.

# Installation
```shell
$ npm i batched-promises
```

# Usage
```javascript
const batchPromises = require('batched-promises');

const fns = [
    () => new Promise(resolve => resolve()),
    () => new Promise(resolve => resolve()),
    () => new Promise(resolve => resolve()),
    () => new Promise(resolve => resolve()),
    () => new Promise(resolve => resolve()),
];

batchPromises(fns, {concurrencyLimit: 3})
    .then(() => console.log('done'));
```
