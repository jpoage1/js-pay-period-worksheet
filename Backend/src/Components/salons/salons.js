const salonCriteria = require("./salonCriteria");
const salons = (req, res, next) => {
	salonCriteria(req, res, 'SELECT *', 'FROM stores')
};
module.exports = salons;
