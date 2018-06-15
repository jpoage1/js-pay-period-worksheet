const regionCriteria = require("./regionCriteria");
const regions = (req, res, next) => {
	regionCriteria(req, res, 'SELECT *', 'FROM regions');
};
module.exports = regions;
