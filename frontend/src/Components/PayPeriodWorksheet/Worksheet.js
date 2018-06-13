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
			<div className="PayPeriodWorksheet">
				<h2>Pay Period Worksheet</h2>
				<div id="search_criteria">
					<form method="get" action="index.php">
						<input type="hidden" name="action" id="action" value="ppw" />
						<ul>
							{isLoading ? 'Loading...' : undefined}
							{dropMenus ? dropMenus : undefined}
						{/*
							<li><select name="pp_date" id="pp_date" onChange={this.setPayPeriod.bind(this)}>
								<option value="0">Select a Pay Date</option>
							if ( $result->num_rows > 0 )
							{
							while ( $row = $result->fetch_assoc() )
							{
							    <option value=".current($row).""";
							    if ( current($row) == $myWorkSheet->pp_date )
							    {
							        echo " selected="selected"";
							    }
							    >".current($row)."</option>";
							}
							}
							</select></li>

							<li>{this.dropMenu('Send Image to Stylist')}</li> 
						*/}
						</ul>
					</form>
				</div>
				<div id="ppw">
				</div>
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