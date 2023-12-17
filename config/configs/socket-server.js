'use strict';

const DEFAULT_WINDOWS_ENV = { HOST: '127.0.0.1', PORT: 3045 };
const DEFAULT_UNIX_ENV    = { HOST: '0.0.0.0',   PORT: 3045 };

const DEFAULT_ENV =  (/^win/.test(process.platform)) ? DEFAULT_WINDOWS_ENV : DEFAULT_UNIX_ENV;

module.exports = (env) => {
    const worker = env.SocketIO;

    return {
        SocketIO: {
            JobsInterceptor: {
                name: (worker && worker.SocketIO && worker.SocketIO.name)
                    ? worker.SocketIO.name
                    : 'socket-server',
                HOST: (worker && worker.SocketIO && worker.SocketIO.HOST)
                    ? worker.SocketIO.HOST
                    : DEFAULT_ENV.HOST,
                PORT: (worker && worker.SocketIO && worker.SocketIO.PORT)
                    ? worker.SocketIO.PORT
                    : DEFAULT_ENV.PORT,
                HOST_NAME: (worker && worker.SocketIO && worker.SocketIO.HOST_NAME)
                    ? worker.SocketIO.HOST_NAME
                    : "http://localhost",
            }
        }
    };
};
