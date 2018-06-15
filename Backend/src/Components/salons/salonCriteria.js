const objToWhere = require("../objToWhere");
const executeQuery = require("../executeQuery");
const salonCriteria = (req, res, select, from, order) => {
	const { body, query, params } = req;
	const salon_id = params.salon_id

	const criteria = ( salon_id )
		? [['salon_id', '=', salon_id]]
		: [];
	executeQuery(res, select, from, objToWhere(criteria), order);
};
module.exports = salonCriteria;