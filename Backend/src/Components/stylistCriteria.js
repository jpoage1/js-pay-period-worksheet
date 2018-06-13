const objToWhere = require("./objToWhere");
const executeQuery = require("./executeQuery");
const stylistCriteria = (req, res, select, from, order) => {
	const { body, query, params } = req; console.log(req);
	const store_id = params.store_id

	const criteria = [['salon_id', '=', store_id]];

	executeQuery(res, select, from, objToWhere(criteria), order);
};
module.exports = stylistCriteria;