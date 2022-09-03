const redis = require('ioredis');

const conn = {
    port: 6379,
    host: "127.0.0.1",
    db: 0,
    password: process.env.REDIS_AUTH
    // password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
};
// 41b8615d1d67e5318ef45e81cc01296d93ecea868050f7d9c2fcedde4a85ef85

const redisDb = new redis(conn);
module.exports = redisDb;




