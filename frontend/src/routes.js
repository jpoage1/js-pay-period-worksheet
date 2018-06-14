import Menu from './Modules/Menu';
import Tenants from "./Components/Tenants";
import Tenant from "./Components/Tenant";
import Employees from "./Components/Employees";
import Employee from "./Components/Employee";
import PayPeriods from "./Components/PayPeriodWorksheet/PayPeriods";
import PayPeriod from "./Components/PayPeriodWorksheet/PayPeriod";
import PayPeriodWorksheetSearch from "./Components/PayPeriodWorksheet/WorksheetSearch";

import Customers from './Components/POS/Customers';
import Inventory from './Components/POS/Inventory';
import Items from './Components/POS/Items';
import Item from './Components/POS/Item';
import Groups from './Components/Groups';
import Group from './Components/Group';
import Purchases from './Components/POS/Purchases';
import Shipments from './Components/POS/Shipments';
import Users from './Components/POS/Users';
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
    routes: [
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
  			header: 'Groups',
  			path: 'groups',
  			component: Groups,
  			routes: [
		  		{
		  			header: 'Group',
		  			path: ':group_id',
		  			component: Group,
		  		},
  			]
  		},
	],
  },
  {
  	header: 'Pay Period Worksheet',
  	path: 'ppw', 
  	component: PayPeriodWorksheetSearch,
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
	    header: 'Customers',
	    path: 'customers',
	    component: Customers,
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