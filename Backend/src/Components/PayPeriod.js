const payPeriodCriteria = require("./payPeriodCriteria");
const payPeriod = (req, res, next) => {
    payPeriodCriteria(req, res, 'SELECT *', 'FROM pay_period');
};
module.exports = payPeriod;
