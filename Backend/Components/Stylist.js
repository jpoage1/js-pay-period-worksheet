const stylistCriteria = require("./stylistCriteria");
const stylist = (req, res, next) => {
	styistCriteria(req, res, 'SELECT stylist_commission, stylist_base', 'FROM stylists')
};
module.exports = stylist;
