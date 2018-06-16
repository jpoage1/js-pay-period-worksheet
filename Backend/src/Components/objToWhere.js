const objToWhere = (criteria, params = []) => {
	const preparedStatement = criteria.map( (pair) => {
		return params && typeof pair[2] == 'string'
			? pair[2] ?
				`${pair[0]} ${pair[1]} '${params[pair[2]]}' AND `
				: ''
			: typeof pair[2] != 'string' && pair[2] ?
				`${pair[0]} ${pair[1]} '${pair[2]}' AND `
				: '';
	})
	console.log(preparedStatement)
	return `WHERE ${preparedStatement} 1=1`;
}
module.exports = objToWhere;