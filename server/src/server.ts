import http from 'http';
import https from 'https';

import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/calc';

const fs = require('fs')

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
//router.use(cors);
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        //res.header('Access-Control-Allow-Methods', 'GET PUT DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const path = require('path');

/** Server */
/** http */
/*
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
*/

/** https */
const httpsServer = https
.createServer(
  {
    key: fs.readFileSync(__dirname+"/keys/key.pem"),
    cert: fs.readFileSync(__dirname+"/keys/cert.pem"),
  },
  router
);
const PORT_s: any = process.env.PORT ?? 3000;
httpsServer.listen(PORT_s, () => console.log(`The server is running on port ${PORT_s}`));
