// Local path, route,  select, from, where, order 
module.exports = [
	{
		path: '/Api/Users',
		method: {
			get: {
				select: ['id','nickname','firstname','lastname'],
				from: ['users'],
				where: [['id','eq',':query.id']],
				order: '', // asc, desc
				orderBy: [],
			},
			post: {
				table: 'users',
				insert: ['nickname', 'firstname', 'lastname'],
			},
			put: '*',
			delete: {
				table: 'users',
				where: ['id','eq',':id'],
			},
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
				select: ['tenants.id','user','name','nickname'],
				from: ['tenants'],
				join: {
					type: 'inner',
					table: 'users',
					on: ['tenants.user','eq','users.id'],
				},
				where: [],
				order: '', // asc, desc
				orderBy: [],
			},
			post: {
				table: 'tenants',
				insert: ['user', 'name'],
			},
			put: '*',
			delete: ['id'],
		},
		table: {
			id: {
				type: 'serial',
				autoIncrement: true,
			},
			user: {
				type: 'integer',
			},
			name: {
				type: 'text',
			},
		},
	},

	{
		path: '/Api/Employees',
		method: {
			get: {
				select: ['*'],
				from: ['employees'],
				join: {
					type: 'inner',
					table: 'users',
					on: ['employees.user','eq','users.id'],
				},
				where: [],
				order: '', // asc, desc
				orderBy: [],
			},
			post: {
				table: 'employees',
				insert: ['tenant', 'user'],
			},
			put: '*',
			delete: ['id'],
		},
		table: {
			id: {
				type: 'serial',
				autoIncrement: true,
			},
			tenant: {
				type: 'integer',
			},
			user: {
				type: 'integer',
			},
		},
	},
	{
		path: '/Api/Groups',
		method: {
			get: {
				select: ['g1.*','g2.name AS parent'],
				from: ['groups g1','groups g2'],
				where: [
					['g1.parent','eq','g2.id'],
				],
				order: '', // asc, desc
				orderBy: [],
			},
			post: {
				table: 'groups',
				insert: ['parent', 'name'],
			},
			put: '*',
			delete: ['id'],
		},
		table: {
			id: {
				type: 'integer',
				autoIncrement: true,
			},
			parent: {
				type: 'integer',
			},
			name: {
				type: 'text',
			},
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