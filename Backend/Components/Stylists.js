
const stylistCriteria = require("./stylistCriteria");
const stylists = (req, res, next) => {
	styistCriteria(req, res, 'SELECT *', 'FROM stylists');
};
module.exports = stylists;
