const regionCriteria = require("./regionCriteria");
const region = (req, res, next) => {
    regionCriteria(req, res, 'SELECT *', 'FROM pay_period');
};
module.exports = region;
