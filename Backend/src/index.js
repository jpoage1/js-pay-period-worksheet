//const pool = require("./Components/pool")
const express = require("express");
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const pool = require("./Components/pool");
const objToWhere = require("./Components/objToWhere");
const routes = require("./routes");
routes.forEach( (route) => {
	//console.log(route[0])
	const { localPath } = route;
	let module;
	if ( route.method && route.method.get ) {
		module = (req, res) => {
			const sql = route.method.get;
			const x = (x) => (x && Array.isArray(x) ? x.join(', ') : x);
			const select = x(sql.select);
			const from = x(sql.from);
			const where = sql.where && Array.isArray(sql.where) ? objToWhere(sql.where, req) : sql.where;
			const order = sql.order ? sql.order : '';
			const orderBy = [
					x(sql.orderBy),
					order,
				].join(' ');
			const join = ( _ => {
				if ( !sql.join || !sql.join.type || !sql.join.table || !sql.join.on ) return;
				const type = {
					'inner': 'INNER',
					'left': 'LEFT',
					'right': 'RIGHT',
					'full': 'FULL',
				}[sql.join.type];
				const on = sql.join.on.join(' ');
				return `${type} JOIN ${sql.join.table} ON ${on}`;
			})();
		 	executeQuery(res, select, from, where, order, join);
		};
	} else if (localPath) {
		module = require(route.localPath);
	} else {
		module = (req, res) => {
			console.log("Warning: route.js config error. Please verify that your 'route.js' routes are propely defined and assigned.");
			res.send([]);
		}
	}
	app.get(route.path, module);

	app.post(route.path, (req, res) => {
		const { body, params, query } = req;
		const { table, insert } = route.method.post;
		const sqlColumns = insert.map( (column, i) => {
			return `"${column}", `
		}).join(' ').slice(0,-2);;
		const sqlValues = insert.map( (column, i) => {
			if ( isNaN(body[column]) )	{
				return `'${body[column]}', `
			}
			return `${body[column]}, `
		}).join(' ').slice(0,-2);
		const sql = `INSERT INTO ${table}\n(${sqlColumns})\nVALUES\n(${sqlValues}) `;
		console.log(sql)
		pool.query(sql)
		.then( result => res.send(JSON.stringify(result)) )
		.catch( e => res.status(403).send(e.stack) );
	});
	app.put(route.path, (req, res) => {

	});
	app.delete(route.path, (req, res) => {
		const { body, params, query } = req;
		const { table, id } = route.method.delete;
		const sqlColumns = id.map( (column, i) => {
			return `"${column}", `
		}).join(' ').slice(0,-2);;
		const sqlValues = id.map( (column, i) => {
			if ( isNaN(body[column]) )	{
				return `'${body[column]}', `
			}
			return `${body[column]}, `
		}).join(' ').slice(0,-2);
		const sql = `DELETE FROM ${table}\n(${sqlColumns})\nVALUES\n(${sqlValues}) `;
		console.log(sql)
		pool.query(sql)
		.then( result => res.send(JSON.stringify(result)) )
		.catch( e => res.status(403).send(e.stack) );

	});
});
// Start listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));