import React , { Component } from 'react';
import DropMenus from "../Modules/DropMenus";
import getIt from "../../Modules/getIt";
class PayPeriodWorksheet extends Component {
	render() {
		return (<div className="PayPeriodWorksheet"></div>);
	}
}
class PayPeriodWorksheetSearch extends Component {
	constructor() {
		super();
		this.state = {
			region: 0,
			district: 0,
			store: 0,
			payPeriod: 0,
		}
	}
	componentDidMount() {
		this.setState({ isLoading: true });
		this.dropMenus();
	}
	updateWithNewData(dropMenus) {
		this.setState({ isLoading: false, dropMenus: dropMenus });
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
			this.updateWithNewData(<DropMenus dropMenusData={dropMenusData} children={children} />)
		});
		return dropMenusPromise;
	}
	render() {
		const { isLoading, dropMenus } = this.state;
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
				<PayPeriodWorksheet />
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
export default PayPeriodWorksheetSearch;