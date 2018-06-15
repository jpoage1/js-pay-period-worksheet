const objToWhere = require("../objToWhere");
const executeQuery = require("../executeQuery");
const payPeriodCriteria = (req, res, select, from, order) => {
	const { body, query, params } = req; console.log(req);
	const { pp_date } = params;
	const { region_id, district_id, salon_id, stylist_id } = query;
console.log(query)
	const criteria = [
		['region_id', '=', region_id],
		['district_id', '=', district_id],
		['salon_id', '=', salon_id],
		['stylist_id', '=', stylist_id],
		['pp_date', '=', pp_date],
	];

    executeQuery(res, select, from, objToWhere(criteria), order);
};
module.exports = payPeriodCriteria;