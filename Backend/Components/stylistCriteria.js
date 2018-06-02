const executeQuery = require("./executeQuery");
const stylistCriteria = (req, res, select, from, order) => {
	const { body, query, params } = req; console.log(req);
	const stylist_id = params.stylist_id

	const criteria = [['salon_id', '=', salon_id]];

	executeQuery(res, select, from, whereCriteria(criteria), order);
};
module.exports = stylistCriteria;