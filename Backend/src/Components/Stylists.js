const stylistCriteria = require("./stylistCriteria");
const stylists = (req, res, next) => {
	stylistCriteria(req, res, 'SELECT *', 'FROM employees');
};
module.exports = stylists;
