const pool = require("./pool");
executeQuery = (res, select, from, where = '', order = '', join = '') => {
	sql = `SELECT ${select} FROM ${from} ${join} ${where} ${order}`;
	console.log(sql)
	pool.query(sql)
	.then( result => res.send(result.rows) )
	.catch( e => res.status(403).send(e.stack) );
}
module.exports = executeQuery;