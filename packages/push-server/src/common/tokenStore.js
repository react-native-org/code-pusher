const lodash = require('lodash');

class MemoryTokenStore {
  constructor() {
    this.tokenMap = new Map();
  }
  async get(key) {
    const data = this.tokenMap.get(key);
    if (!data || data.expries > Date.now()) {
      this.tokenMap.delete(key);
      return null;
    }
    return data.value;
  }

  async set(key, value, options) {
    const data = {
      expries: Date.now() + lodash.isNumber(options.ttl) ? options.ttl : Infinity,
      value
    };
    return this.tokenMap.set(key, data);
  }

  async delete(key) {
    return this.tokenMap.delete(key, value);
  }
}

class RedisTokenStore {}

class TokenStore {
  constructor(store) {
    this.store = store;
  }
  async get(key) {
    return await this.store.get(key);
  }

  async set(key, value, options = { ttl: 1000 * 3600 * 2 }) {
    return await this.store.set(key, value);
  }

  async delete(key) {
    return await this.store.delete(key);
  }
}

module.exports = new TokenStore(new MemoryTokenStore());
