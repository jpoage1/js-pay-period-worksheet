const pool = require("./pool");
executeQuery = (res, select, from, where, order) => {
	sql = `{select} {from} {whereCriteria(criteria)} {order}`;
	pool.query(sql)
	.then( result => res.send(result.rows) )
	.catch( e => res.status(403).send(e.stack) );
}
module.exports = executeQuery;