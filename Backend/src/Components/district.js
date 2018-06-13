const districtCriteria = require("./districtCriteria");
const district = (req, res, next) => {
    regionCriteria(req, res, 'SELECT *', 'FROM district');
};
module.exports = district;
