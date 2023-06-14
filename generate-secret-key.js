const { randomBytes } = require('crypto');

const secretKey = randomBytes(32).toString('hex');
console.log(secretKey);
