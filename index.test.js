const batchPromises = require('./index');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const delayWithMessage = ms => delay(ms);
let fns = [];
for (let i = 0; i < 1000; i++) {
    const delayRange = [100, 8000];
    const d = delayRange[0] + Math.random() * (delayRange[1] - delayRange[0]);
    fns.push(() => delayWithMessage(d));
}

batchPromises(fns, {concurrencyLimit: 250}).then(() => console.log('done'));
