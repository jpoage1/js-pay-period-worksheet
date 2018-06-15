const userCriteria = require("./userCriteria");
const users = (req, res, next) => {
	userCriteria(req, res, 'SELECT *', 'FROM users');
};
module.exports = users;
