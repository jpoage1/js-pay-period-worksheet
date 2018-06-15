const tenantCriteria = require("./tenantCriteria");
const tenants = (req, res, next) => {
	tenantCriteria(req, res, 'SELECT *', 'FROM tenants');
};
module.exports = tenants;
