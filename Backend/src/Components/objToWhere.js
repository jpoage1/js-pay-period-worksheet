const objToWhere = (criteria, req = { body, params, query}) => {
	const { body, params, query } = req;
	const preparedStatement = criteria.map( (pair) => {
		// eq is for matching two table columns
		// = is for matching values
		if ( pair[1] == 'eq' ) {
			if ( pair[2].indexOf(':') === 0 )
			{
				const getParams = pair[2].substr(':'.length);
				const match = eval(getParams);
				return `${pair[0]} = ${match} AND `;
			}
			return `${pair[0]} = ${pair[2]} AND `;
		} else {
			return params && typeof pair[2] == 'string'
				? params[pair[2]]
					? `${pair[0]} ${pair[1]} ${params[pair[2]]}' AND `
					: ''
				: typeof pair[2] != 'string' && pair[2]
					? `${pair[0]} ${pair[1]} '${pair[2]}' AND `
					: '';
		}
	});
	return `WHERE ${preparedStatement} 1=1`;
}
module.exports = objToWhere;