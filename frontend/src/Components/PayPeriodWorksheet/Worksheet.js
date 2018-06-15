import React , { Component } from 'react';
import DropMenus from "../Modules/DropMenus";
import getIt from "../../Modules/getIt";
class PayPeriodWorksheet extends Component {
	constructor() {
		super();
		this.state = {
			region: 0,
			district: 0,
			store: 0,
			payPeriod: 0,
			worksheetData: {
				stylists: [],
			},
			worksheet: [],
			dropMenus: [],
		}
	}
	componentDidMount() {
		this.setState({ isLoading: true });
		this.dropMenus();
		this.getWorksheet();
	}
	updateWithNewData(newData) {
		this.setState({ isLoading: false, ...newData });
		//this.setState({ isLoading: false, worksheetData: worksheetData });
	}
	getWorksheet() {
		const worksheetData = [getIt('http://127.0.0.1:5000/Api/PayPeriods')];
	
		Promise.all(worksheetData)
		.then((worksheet) => {
			this.updateWithNewData({worksheet: worksheet});
			console.log(worksheet)
		});
		return worksheetData;
	}
	dropMenus() {
		const dropMenusData = [
			['http://127.0.0.1:5000/Api/Regions', 'Select Your Region', 'region_id', () => '', 'region_id', 'region_name'],
			['http://127.0.0.1:5000/Api/Districts', 'Select Your District', 'district_id', () => '', 'district_id', 'district_name'],
			['http://127.0.0.1:5000/Api/Salons', 'Select a Salon', 'store_id', this.showStylists(this.value, true), 'store_id', 'store_name'],
			['http://127.0.0.1:5000/Api/Stylists', 'Select a Stylist', 'stylist_id', this.showPayPeriods(this.value, true), 'stylist_id', 'stylist_name'],
			['http://127.0.0.1:5000/Api/PayPeriods', 'Select a Pay Period', 'pp_date', this.showPayPeriods(this.value, true), 'pp_date', 'pp_date'],
		]
		const dropMenusPromise = dropMenusData.map((row, i) => {
			return getIt(row[0]);
		});
		Promise.all(dropMenusPromise)
		.then((children) => {
			this.updateWithNewData({dropMenus: (<DropMenus dropMenusData={dropMenusData} children={children} />)});
		});
		return dropMenusPromise;
	}

	safelyDivideTwoNumbers(a,b) {
	  if ( b !== 0 ) {
	    return a / b
	  } else {
	    return 0;
	  }
	}

	safelyFindPercentage(a,b) {
	  return this.safelyDivideTwoNumbers(a, b) * 100;
	}

	getCappedValue(a, max) {
	  if (a > max) {
	    return a;
	  } else {
	    return max;
	  }
	}

	tier(sales, limit) {
	  return sales <= limit ? 0 : sales - limit;
	}

	getCommissions(sales) {
	  const tiers = [
	    this.getCappedValue(sales, 250),
	    this.getCappedValue(this.tier(sales,250)),
	    this.getCappedValue(this.tier(sales, 500)),
	  ];

	  const rates = [
	    0.15,
	    0.2,
	    0.25,
	  ];

	  return tiers.map( (tierAmount, i) => (tierAmount * rates[i]));
	}
	getPreflightCalcs(employee, productCommission) {
	  const totalEarnedService  =  productCommission + employee.service_commission;
	  const actualPaycheck      =  employee.nonproduct_wages + (employee.service_commission > employee.hourly_gross ? totalEarnedService : employee.hourly_gross);
	  const grossRevenue        =  employee.pp_commissionable_service + employee.pp_product_sales;

	  return {
	    productCommission,
	    totalEarnedService,
	    actualPaycheck,
	    grossRevenue,
	  };
	}
	fillEmployee(employee) {
	  const comissions = this.getCommissions(employee.pp_product_sales);

	  const productCommission = comissions.reduce(function(accumulator, amount) {
	    return accumulator + amount;
	  }, 0);

	  const preflightCalculations = this.getPreflightCalcs(employee, productCommission);

	  //const { totalEarnedService, grossRevenue, actualPaycheck, } = preflightCalculations;
	  const { actualPaycheck, } = preflightCalculations;

	  const employeeData = {
	    total_hourly_pay           : this.safelyDivideTwoNumbers(actualPaycheck             , employee.pp_product_hours),
	    pp_hourly_base             : this.safelyDivideTwoNumbers(employee.hourly_gross       , employee.pp_product_hours),
	    pp_service_commission_rate : this.safelyDivideTwoNumbers(employee.service_commission , employee.pp_commissionable_service),
	    percent_product_sales      : this.safelyFindPercentage(employee.pp_product_sales   , employee.gross_revenue),
	    percent_service_commission : this.safelyFindPercentage(actualPaycheck             , employee.pp_commissionable_service),
	    percent_product_commission : this.safelyFindPercentage(employee.product_commission , employee.pp_product_sales),
	    divide_product_hours       : employee.pp_product_hours,
	  };

	  return {
	    ...preflightCalculations,
	    ...employeeData,
	  };
	}
	fillEmployees(employees) {
	  return employees.map(function(employee) {
	    return this.fillEmployee(employee);
	  });
	}
	fillWorksheet(employees) {
	  if (Array.isArray(employees)) {
	    return this.fillEmployees(employees);
	  }
	  else {
	    return this.fillEmployees([employees]);
	  }
	}

    showStylistAverage()
    {
        if ( this.state.worksheetData.stylists.length === 1 )
        {
            return true;
        }
        return false;
    }
    showPeriodSalonAverage()
    {
        if ( this.state.payPeriod === 0 )
        {
            return false;
        }
        return true;
    }
	insertRow(rowName, row = '', rowClass = '', i) {
		const { worksheetData } = this.state;
		const { stylist, payPeriod } = this.props;

        let showPeriodSalonAverage,
        	showStylistAverage,
        	salonPeriodTotal,
        	salonGrossAverage,
        	stylists,
        	showPeriodSalonTotal;
		if ( row !== "" )
        {
        	stylists = Array.isArray(worksheetData.stylists) && worksheetData.stylists.length > 0
        		? worksheetData.stylists.map( ( column, i) =>
        			(<td class="stylistColumn">column[row]</td>))
        		: undefined;
            if ( this.showPeriodSalonAverage(payPeriod) )
            {
                showPeriodSalonAverage = (<td>{worksheetData.salonPeriodAverage[row]}</td>);
                showStylistAverage = this.showStylistAverage()
                	? (<td>{worksheetData.stylistAverage[row]}</td>)
                	: undefined;
            	salonPeriodTotal = stylist === 0
            		? (<td>{worksheetData.salonPeriodTotal[row]}</td>)
            		: undefined;
                salonGrossAverage = (<td>{worksheetData.salonGrossAverage[row]}</td>);
            }
            showPeriodSalonTotal = !this.showPeriodSalonAverage() && stylist === 0 && worksheetData.stylists.length !== 0
            	? (<td>{worksheetData.salonPeriodTotal[row]}</td>)
            	: undefined;
        }
        const columns = [
  	      (<th key={`${row}_${i}`} className="rowName">{rowName}</th>),
        	stylists,
        	showPeriodSalonAverage,
        	showStylistAverage,
        	salonPeriodTotal,
        	salonGrossAverage,
        	showPeriodSalonTotal,
        ];
        return (<tr className={rowClass} key={row}>
	        	{columns}
        	</tr>);
    }
    worksheetHeader() {
    	const { stylist, worksheetData } = this.state;
    	const { stylists } = worksheetData;
    	let showPeriodSalonAverage,
            showStylistAverage,
            salonAverage,
        	periodTotal;
        if ( this.showPeriodSalonAverage() )
        {
            showPeriodSalonAverage = (<th>Period Average</th>);
            showStylistAverage = this.showStylistAverage()
            	? (<th>Stylist Average</th>)
            	: undefined;
            salonAverage = (<th>Salon Average</th>);
        	periodTotal = stylist === 0
        		? (<th>Period Total</th>)
        		: undefined;
        } else {
        	showPeriodSalonAverage = undefined;
            showStylistAverage = undefined;
            salonAverage = undefined;
        	periodTotal = undefined;
        }
        const salonTotal = this.showPeriodSalonAverage() && stylist === 0 && this.worksheetdata.stylists.length !== 0
        	? (<th>Salon Total</th>)
        	: undefined;
        const statHeaders = [
        	showPeriodSalonAverage,
        	showStylistAverage,
        	salonAverage,
        	periodTotal,
        	salonTotal,
        ];
        const headers = [
        	(<th key="stylistName" className="rowName">&nbsp;</th>),
        	stylists.map( (column, i) => (<th key={`stylistName_${i}`}>{column['stylist_name']}</th>)),
        	...statHeaders,
	    ];
    	return(<tr>{headers}</tr>);
    }
	worksheet() {
        const rows = [
        	["Stylist Gross Revenue",'gross_revenue', 'stylistColumn'],
        	["Total Product Hours",'pp_product_hours', 'stylistColumn'],
        	["Hourly Base Pay",'pp_hourly_base'],
    		["Gross Pay based on Hourly Pay",'hourly_gross', 'stylistColumn'],
        	["Commissionable Service Total",'pp_commissionable_service', 'stylistColumn'],
        	["Service Commission Rate",'pp_service_commission_rate'],
        	["Service Commission Earned",'service_commission', 'stylistColumn'],
        	["Product Sales",'pp_product_sales', 'stylistColumn'],
        	["Sales from $1  to $250 earns 15% commission",'product_commission_15'],
        	["Sales from $250.01  to $500 earns 20% commission",'product_commission_20'],
        	["Sales above $500 earns 25% commission",'product_commission_25'],
        	["Product Commission",'product_commission', 'stylistColumn'],
        	["Total Earned Service ",'total_earned_service', 'stylistColumn'],
        	["Non Productive Hours ",'pp_nonproduct_hours'],
        	["Non Productive Wages ",'nonproduct_wages'],
        	["Actual Paycheck",'actual_paycheck', 'stylistColumn'],
        	["Divide by Numbers of Production Hours", 'divide_product_hours'],
        	["Total Hourly Pay Earned",'total_hourly_pay', 'stylistColumn'],
        ];
        /*
        $	[("% of Product Sales from Gross Revenue", 'percent_product_sales'],
        $	[("% of Service Commissions from Gross Revenue", 'percent_service_commission'],
        $	[("% Product Commission from Gross Service Revenue", 'percent_product_commission'],
        */
        const worksheetHeader = this.worksheetHeader();
        return (<table id="PayPeriodWorksheet">
			<thead>
			 {worksheetHeader}
			</thead>
        	<tbody>
        	 {rows.map( (row, i) => this.insertRow(row[0], row[1], row[2], i))}
        	</tbody>
        </table>);
	}
	render() {
		const { isLoading, dropMenus } = this.state;
		const worksheet = this.worksheet();
		return (
			<div className="PayPeriodWorksheetSearch">
				<h2>Pay Period Worksheet</h2>
				<div id="search_criteria">
					<form method="get" action="index.php">
						<input type="hidden" name="action" id="action" value="ppw" />
						<ul>
							{isLoading ? 'Loading...' : undefined}
							{dropMenus ? dropMenus : undefined}
						</ul>
					</form>
				</div>
				{worksheet}
			</div>
		);
	}

	setPayPeriod(event) {
		const newState = {
			[event.name]: event.value,
		};
		console.log(newState)
		this.setState(newState);
	}
	showStylists() {

	}
	showPayPeriods() {

	}
}
export default PayPeriodWorksheet;