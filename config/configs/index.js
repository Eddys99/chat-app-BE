'use strict';

const configs = [
    require('./jobs-interceptor'),
    require('./socket-server')
];

module.exports = {
    load: (env) => {
        const result = {};

        configs.map(config => config(env))
            .forEach(config => Object.assign(result, config));

        return result;
    }
};
