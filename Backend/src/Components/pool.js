const Pool = require('pg').Pool
const config = {
  user: 'pos',
  host: '127.0.0.1',
  database: 'pos',
  password: 's00p3r.s3cr37',
  port: 3301,
};
const pool = new Pool(config);
module.exports =  pool;