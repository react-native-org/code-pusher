const uuid = require('uuid');

class Util {
  generateToken(num) {
    const val = uuid.v4().replace(/-/g, '');
    return val.substring(0, num);
  }
}

module.exports = new Util();
