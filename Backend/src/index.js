//const pool = require("./Components/pool")
const express = require("express");
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const routes = require("./routes");
routes.forEach( (route) => {
	//console.log(route[0])
	const { sql, localPath } = route;
	let module;
	if ( sql ) {
		module = (req, res) => {
			const { select, from, where, order } = sql;
		 	executeQuery(res, select, from, where, order);
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
});
// Start listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));