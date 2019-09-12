//加载 fibos-alive 模块
require('../lib')({
    backup_url: 'http://ghost.bp.fo'
});
const fs = require("fs");
const fibos = require('fibos');

let config = {
    p2paddress: [
        "p2p.eosays.com:37106",
        "p2p.amttothemoon.com:9801",
        "p2p.otclook.com:9870",
        "seed.bitze.site:9870",
        "47.74.181.212:27672",
        "api.xxq.pub:8888",
        "fibos.eosforum.one",
        "p2p.fibos.pw:59898",
        "p2p.fometa.io:59877",
        "p2p-mainnet.fibos123.com:9977",
        "p2p.eosas.io:37717",
        "p2p.fibos.fi:59595",
        "p2p-mainnet.fobp.pro:9873",
        "104.243.24.188:9870",
        "va-p2p.fibos.io:9870",
        "ca-p2p.fibos.io:9870",
        "sl-p2p.fibos.io:9870",
        "api.fibosgenesis.com:9870",
        "p2p-mainnet.fibosironman.io:9999",
        "fibosiseos.xyz:9870",
        "47.92.122.2:9870",
        "se-p2p.fibos.io:9870",
        "p2p.fophoenix.com:37398",
        "seed.fopool.xyz:9870",
        "p2p.fibospubg.top:9870",
        "seed.fibos.rocks:10100",
        "47.96.101.244:9898",
        "p2p.fospider.com:9933",
        "47.100.103.213:9870",
        "fibos.tokenasst.com:9870",
        "seed-mainnet.fibscan.io:9103",
        "p2p.mainnet.fibos.me:9870",
        "40.115.179.182:9870",
        "p2p.foshenzhenbp.com:9877",
        "p2p.xm.fo:10300"
    ],
    "config_dir": "./blockData/data",
    "data_dir": "./blockData/data"
}

fibos.config_dir = config.config_dir;
fibos.data_dir = config.data_dir;

fibos.load("http", {
    "http-server-address": "0.0.0.0:8870",
    "access-control-allow-origin": "*",
    "http-validate-host": false,
    "verbose-http-errors": true
});


fibos.load("net", {
    "p2p-peer-address": config.p2paddress,
    "max-clients": 100,
    "p2p-listen-endpoint": "0.0.0.0:9870",
    "agent-name": "FIBOS Seed"
});

let chain_config = {
    "contracts-console": true,
    'chain-state-db-size-mb': 8 * 1024,
};

if (!fs.exists(fibos.data_dir) && !fs.exists(fibos.config_dir)) {
    chain_config['genesis-json'] = "genesis.json";
}


fibos.load("producer", {
    'max-transaction-time': 3000
});

fibos.load("ethash");

fibos.load("chain", chain_config);
fibos.load("chain_api");


fibos.start();