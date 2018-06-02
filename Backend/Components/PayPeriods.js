const payPeriodCriteria = require("./payPeriodCriteria");
const payPeriods = (req, res, next) => {
    payPeriodCriteria(req, res, 'SELECT DISTICT pp_date', 'FROM pay_period', 'ORDER BY pp_date DESC');
};
module.exports = payPeriods;
