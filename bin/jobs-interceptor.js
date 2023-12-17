'use strict';

require('app-module-path').addPath(`${__dirname}/..`);
require('config/configs/mongo-db-connection');

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const config = require('config');

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173'
}))

const Routes = require('src/jobs-interceptor/routes/index');
const SocketServer = require('src/jobs-interceptor/socket-server/index');

app.use(new Routes(express));

try {
    global.SocketServer = new SocketServer(config.SocketIO.JobsInterceptor.PORT);
} catch(error) {
    console.error(`[JobsInterceptor] error at socket-server: `, { error });
}

app.listen(config.JobsInterceptor.PORT, () => console.log(`[Jobs-Interceptor] started on PORT [${config.JobsInterceptor.PORT}]`));
