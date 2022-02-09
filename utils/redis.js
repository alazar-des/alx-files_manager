import { createClient } from 'redis';

const { promisify } = require('util');

class RedisClient {
  constructor() {
    this._client = createClient();

    this._setex = promisify(this._client.setex).bind(this._client);
    this._get = promisify(this._client.get).bind(this._client);

    this._client.on('error', (err) => {
      console.log('Redis client not connected to the server', err);
    });
  }

  isAlive() {
    return this._client.connected;
  }

  async get(key) {
    return this._get(key);
  }

  async set(key, value, exp) {
    await this._setex(key, exp, JSON.stringify(value));
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
