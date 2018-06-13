const salonCriteria = require("./salonCriteria");
const salon = (req, res, next) => {
	styistCriteria(req, res, 'SELECT *', 'FROM salons')
};
module.exports = salon;
