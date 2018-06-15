const Criteria = require("./userCriteria");
const user = (req, res, next) => {
    userCriteria(req, res, 'SELECT *', 'FROM users');
};
module.exports = user;
