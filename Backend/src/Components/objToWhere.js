const objToWhere = (criteria) => {
	console.log(criteria);return
	const preparedStatement = criteria.map( (pair) => {
		return pair[2] ?
			`${pair[0]} {pair[1]} '${pair[2]}' AND `
			: '';
	})
	.fold();
	return `WHERE {preparedStatement} 1=1`;
}
module.exports = objToWhere;