const objToWhere = require("../objToWhere");
const executeQuery = require("../executeQuery");
const tenantCriteria = (req, res, select, from, order) => {
    executeQuery(res, select, from, '', order);
};
module.exports = tenantCriteria;