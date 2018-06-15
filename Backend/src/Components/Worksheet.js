const objToWhere = require("./objToWhere");
const executeQuery = require("./executeQuery");
const pool = require("./pool");
/*
const payPeriodCriteria = (req, res, select, from, order) => {
	const { body, query, params } = req; console.log(req);
	const { pp_date } = params;
	const { region_id, district_id, store_id, employee_id } = query;
console.log(query)
	const criteria = [
		['pay_period.employee_id','=','employees.employee_id']
		['region_id', '=', region_id],
		['district_id', '=', district_id],
		['store_id', '=', store_id],
		['employee_id', '=', employee_id],
		['pp_date', '=', pp_date],
	];

    executeQuery(res, select, from, objToWhere(criteria), order);
};
module.exports = payPeriodCriteria;

const worksheet = (req, res, next) => {
    payPeriodCriteria(req, res, 'SELECT pp_date', 'FROM pay_period, employees', 'ORDER BY pp_date DESC');
};
module.exports = payPeriods;
const worksheetData = ( wsName, force = false, wsData ) => {

};
*/
const worksheet = (req, res, next) => {
	const { body, query, params } = req;
    const { tenant, region, district, store, employee, payPeriodDate } = query;
    const { wsName } = params;
    let wsConfig = {};
    let requirePayPeriodDate = true;
    switch ( wsName )
    {
        case 'region':
            wsConfig.district = '';
        case 'district':
            wsConfig.store = '';
        case 'store_gross':
            wsConfig.employee = '';
            wsConfig.payPeriod = '';
            requirePayPeriodDate = false;
            break;
        case 'store_period':
            wsConfig.employee = '';
            requirePayPeriodDate = true;
            break;
        case 'recent':
            if ( requirePayPeriodDate && !payPeriodDate )
            {
            	const where = [
            		(`pay_period.employee_id = employees.employee_id`),
            		(tenant ? ` AND tenant_id = '${tenant}'` : ''),
            		(region ? ` AND region_id = '${region}'` : ''),
            		(district ? ` AND district_id = '${district}'` : ''),
            		(store ? ` AND store_id = '${store}'` : ''),
            		(employee ? ` AND employee_id = '${employee_id}' ` : ''),
            	];
                // Get the most recent pay period for the selected criteria
                sql = `SELECT pp_date FROM pay_period, employees
                    WHERE ${where}
                    ORDER BY pp_date DESC
                    `;
                result = pool.query(sql);
                if ( result.num_rows > 0 )
                {
                    row = result.fetch_assoc();
                    payPeriodDate = current(row);
                }
            }
        case 'employee':
            wsConfig.payPeriod = '';
            requirePayPeriodDate = false;
        case 'employees':
            wsConfig.employee_id = employee;
            break;
    }
    const where = [
    	(`pay_period.employee_id = employees.employee_id`),
    	(payPeriodDate && requirePayPeriodDate ? `AND pp_date = '${payPeriodDate}'` : ''),
    	(store ? `AND pay_period.store_id = '${store}'` : ''),
    	(employee ? `AND pay_period.employee_id = '${employee}'` : ''),
    ].join(' ');
    // Populate worksheet array
    executeQuery(res, `SELECT * FROM pay_period, employees`, `WHERE ${where}`);
}
module.exports = worksheet;
