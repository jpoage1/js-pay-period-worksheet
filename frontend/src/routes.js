import Menu from './Modules/Menu';
import PayPeriods from "./Components/PayPeriodWorksheet/PayPeriods";
import PayPeriod from "./Components/PayPeriodWorksheet/PayPeriod";
import PayPeriodWorksheet from "./Components/PayPeriodWorksheet/Worksheet";

import Inventory from './Components/POS/Inventory';
import Items from './Components/POS/Items';
import Item from './Components/POS/Item';
import Purchases from './Components/POS/Purchases';
import Shipments from './Components/POS/Shipments';


import Users from './Components/Users/Users';
import User from './Components/Users/User';
import Group from './Components/Users/Group';
//import Groups from './Components/Users/Groups';
import Tenants from "./Components/Users/Tenants";
import Tenant from "./Components/Users/Tenant";
import Employees from "./Components/Users/Employees";
import Employee from "./Components/Users/Employee";
import Customers from './Components/Users/Customers';
import Customer from './Components/Users/Customer';
const routes = 
[
  {
    header: 'Menu',
    path: '',
    component: Menu,
    exact: true,
    hide: true,
  },
  {
    header: 'Users',
    path: 'users',
    component: Users,
    routeProps: {
		dataRoute: 'http://127.0.0.1:5000/Api/Users',
		field: {
			id: 'user_id',
			name: 'user_nick',
		},
	},
    routes: [
  		{
  			header: 'User',
  			path: ".:user",
  			component: User,
  			exact: true,
  		},
  		{
  			header: 'Groups',
  			path: 'groups',
  			component: Users,
  			routeProps: {
				dataRoute: 'http://127.0.0.1:5000/Api/Groups',
	  			field: {
	  				id: 'group_id',
	  				name: 'group_name',
	  			},
	  		},
  			routes: [
		  		{
		  			header: 'Group',
		  			path: ':group_id',
		  			component: Group,
		  		},
  			],
  		},
		{
		  	header: 'Tenants',
		  	path: 'tenants', 
		  	component: Tenants,
		  	routes: [
				{
				  	header: 'Tenant',
				  	path: ':tenant_id', 
				  	component: Tenant,
				  	routes: [],
				},
			],
		},
		{
			header: 'Employees',
		  	path: 'employees', 
		  	component: Employees,
		  	routes: [
		  		{
		  			header: 'Employee',
		  			path: ':employee_id',
		  			component: Employee,
		  		},
		  	],
		},
	  {
	    header: 'Customers',
	    path: 'customers',
	    component: Customers,
	    routes: [
	    	{
			    header: 'Customer',
			    path: 'customer',
			    component: Customer,
	    	}
	    ]
	  },
	],
  },
  {
  	header: 'Pay Period Worksheet',
  	path: 'ppw', 
  	component: PayPeriodWorksheet,
  	routes: [
  		{
  			header: 'Pay Periods',
  			path: 'payPeriods',
  			component: PayPeriods,
		  	routes: [
		  		{
		  			header: 'Pay Period',
		  			path: ':pp_date',
		  			component: PayPeriod,
		  		},
		  	],
  		},
  	],
  },
  {
    header: 'POS',
    path: 'pos',
    component: null,
    hide: true,
	routes:
	[
	  {
	    header: 'Items',
	    path: 'items',
	    component: Items,
	    routes: [
	    	{
			    header: 'Items',
			    path: 'items/:barcode',
			    component: Item,
			    hide: true,
	    	}
	    ],
	  },
	  {
	    header: 'Inventory',
	    path: 'inventory',
	    component: Inventory,
	  },
	  {
	    header: 'Shipments',
	    path: 'shipments',
	    component: Shipments,
	  },
	  {
	    header: 'Purchases',
	    path: 'purchases',
	    component: Purchases,
	  },
	],
  },
];
export default routes;