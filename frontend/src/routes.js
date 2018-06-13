import Menu from './Modules/Menu';
import Employees from "./Components/Employees";
import Employee from "./Components/Employee";
import PayPeriods from "./Components/PayPeriodWorksheet/PayPeriods";
import payPeriod from "./Components/PayPeriodWorksheet/PayPeriod";
import PayPeriodWorksheet from "./Components/PayPeriodWorksheet/Worksheet";

import Customers from './Components/POS/Customers';
import Inventory from './Components/POS/Inventory';
import Items from './Components/POS/Items';
import Groups from './Components/Groups';
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
  	header: 'Pay Period Worksheet',
  	path: 'ppw', 
  	component: PayPeriodWorksheet,
  	routes: [
  		{
  			header: 'Pay Periods',
  			path: 'PayPeriods',
  			component: PayPeriods,
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
			    component: Items,
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