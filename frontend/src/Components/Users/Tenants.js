import React ,{ Component } from 'react';

class Tenants extends Component {
	constructor() {
		super();
		this.state = {
			tenants: undefined,
		}
	}
	componentDidMount() {
		this.setState({ isLoading: true });
		this.getTenants();
	}
	updateWithNewData(newData) {
		this.setState({ isLoading: false, ...newData });
		//this.setState({ isLoading: false, worksheetData: worksheetData });
	}
	getTenants() {
		return (<table>
				<thead>
				<tr>
					<th>Select</th>
					<th>Action</th>
					<th>Name</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td></td>
				</tr>
				</tbody>
				</table>);
	}
	render() {
		const { tenants } = this.state;
		return ( <div className="Tenants">
				<h2>Tenants</h2>
				{tenants}
			</div> );
	}
}
export default Tenants;