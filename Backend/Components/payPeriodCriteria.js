const executeQuery = require("./executeQuery");
const payPeriodCriteria = (req, res, select, from, order) => {
	const { body, query, params } = req; console.log(req);
	const { pp_date } = params;
	const { salon_id, stylist_id } = query;

	const criteria = [
		['pp_date', '=', pp_date]
		['salon_id', '=', salon_id]
		['stylist_id', '=', stylist_id]
	];

    executeQuery(res, select, from, whereCriteria(criteria), order);
};
module.exports = payPeriodCriteria;