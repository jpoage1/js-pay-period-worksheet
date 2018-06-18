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

const routes = 
[
  {
    path: '',
    component: Menu,
    exact: true,
    hide: true,
    routeProps: {
    	header: 'Menu',
    },
  },
  {
    path: 'users',
    component: Users,
    routeProps: {
    	header: 'Users',
		dataRoute: 'http://127.0.0.1:5000/Api/Users',
    	form: {
    		nickname: {
    			Tag: 'input',
    			props: {
	    			type: 'text',
    				value: 'Create a new user',
    			},
    		},
    		firstname: {
    			Tag: 'input',
    			props: {
	    			type: 'text',
    				value: 'First Name',
    			},
    		},
    		lastname: {
    			Tag: 'input',
    			props: {
	    			type: 'text',
    				value: 'Last Name',
    			},
    		},
    	},
	},
    routes: [
  		{
  			path: ".:user",
  			component: User,
  			exact: true,
  			hide: true,
  			routeProps: {
	  			header: 'User',
  			},
  		},
		{
		  	path: 'tenants', 
		  	component: Users,
  			routeProps: {
			  	header: 'Tenants',
				dataRoute: 'http://127.0.0.1:5000/Api/Tenants',
		    	form: { //get the list of users to select tenant
		    		user: {
		    			Tag: 'select',
						dataRoute: 'http://127.0.0.1:5000/Api/Users',
		    			header: 'Select Tenant By User',
		    			label: 'nickname',
		    			value: 'id,'
		    		},
		    	},
	  		},
		  	routes: [
				{ 
				  	path: ':tenant_id', 
				  	component: User,
				  	hide: true,
		  			routeProps: {
			  			header: 'Tenant',
		  			}
				},
			],
	  	},
  		{
  			path: 'groups',
  			component: Users,
  			routeProps: {
  				header: 'Groups',
				dataRoute: 'http://127.0.0.1:5000/Api/Groups',
		    	form: {
		    		name: {
		    			Tag: 'input',
		    			props: {
			    			type: 'text',
		    				value: 'Create a new group',
		    			},
		    		},
		    	},
	  		},
  			routes: [
		  		{
		  			path: ':group_id',
		  			component: User,
		  			hide: true,
		  			routeProps: {
			  			header: 'Group',
		  			},
		  		},
  			],
  		},
		{
		  	path: 'employees', 
		  	component: Users,
  			routeProps: {
				header: 'Employees',
				dataRoute: 'http://127.0.0.1:5000/Api/Employees',
	  			field: {
	  				id: 'employee_id',
	  				name: 'employee_name',
	  			},
	  		},
		  	routes: [
		  		{
		  			path: ':employee_id',
		  			component: User,
		  			hide: true,
					routeProps: {
						header: 'Employee',
					},
		  		},
		  	],
		},
	  {
	    path: 'customers',
	    component: Users,
		routeProps: {
		    header: 'Customers',
			dataRoute: 'http://127.0.0.1:5000/Api/Customers',
  			field: {
  				id: 'customer_id',
  				name: 'customer_name',
  			},
  		},
	    routes: [
	    	{
			    path: 'customer',
			    component: Users,
			    hide: true,
				routeProps: {
					header: 'Customer',
				},
	    	},
	    ],
	  },
	],
  },
  {
  	path: 'ppw', 
  	component: PayPeriodWorksheet,
  	routeProps: {
  	  	header: 'Pay Period Worksheet',
  	},
  	routes: [
  		{
  			path: 'payPeriods',
  			component: PayPeriods,
  			routeProps: {
	  			header: 'Pay Periods',
	  		},
		  	routes: [
		  		{
		  			path: ':pp_date',
		  			component: PayPeriod,
		  			hide: true,
		  			routeProps: {
			  			header: 'Pay Period',
			  		},
		  		},
		  	],
  		},
  	],
  },
  {
    path: 'pos',
    component: null,
    hide: true,
    routeProps: {
	    header: 'POS',
    },
	routes:
	[
	  {
	    header: 'Items',
	    path: 'items',
	    component: Items,
	    routes: [
	    	{
			    path: 'items/:barcode',
			    component: Item,
			    hide: true,
			    routeProps: {
				    header: 'Items',
			    },
	    	},
	    ],
	  },
	  {
	    path: 'inventory',
	    component: Inventory,
	    routeProps: {
	    	header: 'Inventory',
		},
	  },
	  {
	    path: 'shipments',
	    component: Shipments,
	    routeProps: {
	    	header: 'Shipments',
	    },
	  },
	  {
	    path: 'purchases',
	    component: Purchases,
	    routeProps: {
		    header: 'Purchases',
		},
	  },
	],
  },
];
export default routes;