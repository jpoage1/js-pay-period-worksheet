const Criteria = require("./tenantCriteria");
const tenant = (req, res, next) => {
    tenantCriteria(req, res, 'SELECT *', 'FROM tenants');
};
module.exports = tenant;
