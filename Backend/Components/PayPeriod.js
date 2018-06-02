const payPeriodCriteria = require("./payPeriodCriteria");
const payPeriod = (req, res, next) => {
    payPeriodRaw(req, res, 'SELECT *', 'FROM pay_period');
};
module.exports = payPeriod;
