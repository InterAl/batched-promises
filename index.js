module.exports = function batchPromises(promiseFns, options) {
    return new Promise((resolve) => {
        if (!promiseFns)
            throw Error('no promiseFns');

        const queue = promiseFns.slice();
        let executing = 0;

        (function recur() {
            if (queue.length === 0 && executing === 0)
                resolve();

            if (executing < options.concurrencyLimit && queue.length > 0) {
                const batch = queue.splice(0, options.concurrencyLimit - executing);
                executing += batch.length;

                batch.forEach(promiseFn => {
                    promiseFn()
                        .then(r => {
                            setTimeout(recur, 0);
                            executing--;
                            return r;
                        })
                        .catch(r => {
                            setTimeout(recur, 0);
                            executing--;
                            return Promise.reject(r);
                        });
                });
            }
        })();
    });
};
