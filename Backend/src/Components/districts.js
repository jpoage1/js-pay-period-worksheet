const districtCriteria = require("./districtCriteria");
const districts = (req, res, next) => {
    districtCriteria(req, res, 'SELECT *', 'FROM districts');
};
module.exports = districts;
