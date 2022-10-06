const express = require('express');
const app = express();
const { ExpressPeerServer } = require('peer');
const path = require('path');
const fs = require('fs');

const server = app.listen(9001);

let privateKey;
let certificate;
let credentials;

if (process.env.NODE_ENV === 'production') {
    const certs = '/etc/letsencrypt/live/draw.hawc.de/';

    privateKey = fs.readFileSync(path.join(certs, 'privkey.pem'));
    certificate = fs.readFileSync(path.join(certs, 'cert.pem'));

    credentials = {
        key: privateKey,
        cert: certificate,
    };
}

const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: process.env.NODE_ENV !== 'production',
    path: '/peer',
    ssl: process.env.NODE_ENV === 'production' ? credentials : {},
});

app.use(peerServer);

console.log('Listening.');

export default {
    path: '/peerjs',
    handler: peerServer,
};
