// Local path, route,  select, from, where, order 
module.exports = [
	{
		localPath: './Components/Session',
		path: '/Api/Authentication/Session',
	},
	{
		localPath: './Components/Login',
		path:'/Api/Authentication/Login',
	},
	{
		localPath: './Components/Logout',
		path: '/Api/Authentication/Logout',
	},
	{
		path: '/Api/Groups',
		sql: {
			select: 'SELECT *',
			from: 'FROM groups',
		},
	},
	{
		path: '/Api/Groups/:Group',
		sql: {
			select: 'SELECT *',
			from: 'FROM groups',
		},
	},
	{
		path: '/Api/Users',
		sql: {
			select: 'SELECT *',
			from: 'FROM users',
		},
	},
	{
		path: '/Api/Users/:User',
		sql: {
			select: 'SELECT *',
			from: 'FROM users',
		},
	},
	{
		path: '/Api/Tenants',
		sql: {
			select: 'SELECT *',
			from: 'FROM tenants',
		},
	},
	{
		path: '/Api/Tenants/:tenant',
		sql: {
			select: 'SELECT *',
			from: 'FROM tenants',
		},
	},
	{
		path: '/Api/Regions',
		sql: {
			select: 'SELECT *',
			from: 'FROM regions',
		},
	},
	{
		path: '/Api/Regions/:region',
		sql: {
			select: 'SELECT *',
			from: 'FROM regions',
		},
	},
	{
		path: '/Api/Districts',
		sql: {
			select: 'SELECT *',
			from: 'FROM districts',
		},
	},
	{
		path: '/Api/District/:district',
		sql: {
			select: 'SELECT *',
			from: 'FROM districts',
			where: [['district_id', '=', 'district']],
		},
	},
	{
		path: '/Api/Stores',
		sql: {
			select: 'SELECT *',
			from: 'FROM stores',
		},
	},
	{
		path: '/Api/Stores/:store',
		sql: {
			select: 'SELECT *',
			from: 'FROM stores',
			where: [['store_id', '=', 'store']],
		},
	},
	{
		path: '/Api/Employees',
		sql: {
			select: 'SELECT *',
			from: 'FROM employees',
		},
	},
	{
		path: '/Api/Employees/:employee',
		sql: {
			select: 'SELECT *',
			from: 'FROM employees',
			where: [['employee_id', '=', 'employee']],
		},
	},
	{
		path: '/Api/PayPeriods',
		sql: {
			select: 'SELECT *',
			from: 'FROM pay_period',
		},
	},
	{
		path: '/Api/PayPeriods/:payPeriodDate',
		sql: {
			select: 'SELECT *',
			from: 'FROM pay_periods',
			where: [['pp_date', '=', 'payPeriodDate']],
		},
	},
	{
		localPath: './Components/Worksheet',
		path: '/Api/Worksheet/:wsName',
	},
];