// Local path, route,  select, from, where, order 
module.exports = [
	{
		path: '/Api/Users',
		method: {
			get: {
				select: ['id','nickname'],
				from: ['users'],
				where: [],
				order: '', // asc, desc
				orderBy: [],
			},
			post: ['nickname'],
			put: '*',
			delete: ['id'],
		},
		table: {
			name: 'users',
			columns: {
				id: {
					type: 'integer',
					autoIncrement: true,
				},
				nickName: {
					type: 'string'
				},
				firstName: {
					type: 'string'
				},
				lastName: {
					type: 'string'
				},
			},
		},
		formDefaults: {
			nickname: 'Enter a nick name',
		},
	},
	{
		path: '/Api/Tenants',
		method: {
			get: {
				select: ['*'],
				from: ['tenants'],
				where: [],
				order: '', // asc, desc
				orderBy: [],
			},
			post: ['user','name'], // Group name and whom it belongs to.
			put: '*',
			delete: ['id'],
		},
		table: {
			id: {
				type: 'integer',
				autoIncrement: true,
			},
			user: {
				type: 'integer',
			},
		},
	},
	{
		path: '/Api/Groups',
		sql: {
			select: '*',
			from: 'groups',
		},
		new: {
			name: 'group_name',
		},
	},
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
		path: '/Api/Groups/:Group',
		sql: {
			select: '*',
			from: 'groups',
		},
	},
	{
		path: '/Api/Users/:User',
		sql: {
			select: '*',
			from: 'users',
		},
	},
	{
		path: '/Api/Tenants/:tenant',
		sql: {
			select: '*',
			from: 'tenants',
		},
	},
	{
		path: '/Api/Regions',
		sql: {
			select: '*',
			from: 'regions',
		},
	},
	{
		path: '/Api/Regions/:region',
		sql: {
			select: '*',
			from: 'regions',
		},
	},
	{
		path: '/Api/Districts',
		sql: {
			select: '*',
			from: 'districts',
		},
	},
	{
		path: '/Api/District/:district',
		sql: {
			select: '*',
			from: 'districts',
			where: [['district_id', '=', 'district']],
		},
	},
	{
		path: '/Api/Stores',
		sql: {
			select: '*',
			from: 'stores',
		},
	},
	{
		path: '/Api/Stores/:store',
		sql: {
			select: '*',
			from: 'stores',
			where: [['store_id', '=', 'store']],
		},
	},
	{
		path: '/Api/Employees',
		sql: {
			select: '*',
			from: 'employees',
		},
	},
	{
		path: '/Api/Employees/:employee',
		sql: {
			select: '*',
			from: 'employees',
			where: [['employee_id', '=', 'employee']],
		},
	},
	{
		path: '/Api/PayPeriods',
		sql: {
			select: '*',
			from: 'pay_period',
		},
	},
	{
		path: '/Api/PayPeriods/:payPeriodDate',
		sql: {
			select: '*',
			from: 'pay_periods',
			where: [['pp_date', '=', 'payPeriodDate']],
		},
	},
	{
		localPath: './Components/Worksheet',
		path: '/Api/Worksheet/:wsName',
	},
];