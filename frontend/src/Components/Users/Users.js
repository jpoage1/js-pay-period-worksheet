import React ,{ Component } from 'react';
import getIt from "../../Modules/getIt";

class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
		}
	}
	componentDidMount() {
		this.setState({ isLoading: true });
		this.getUsers();
	}
	updateWithNewData(newData) {
		this.setState({ isLoading: false, ...newData });
	}
	getUsers() {
		const users = [getIt(this.props.dataRoute)];
	
		Promise.all(users)
		.then((users) => {
			this.updateWithNewData({users: users[0]});
		});
		return users;
	}
	users() {
		const { users } = this.state;
		//console.log(this.state)
		const usersList = this.usersList(users);
		//console.log(usersList)
		return (<table>
				<thead>
				<tr>
					<th><input type="checkbox" /></th>
					<th>All</th>
					<th><select>
						<option>Action</option>
						<option>Edit</option>
						<option>Delete</option>
					</select></th>
					<th><button>Go</button></th>
				</tr>
				</thead>
				<tbody>
				{usersList}
				</tbody>
				</table>);
	}
	usersList(users) {
		const { id, name } = this.props.field;
		return users.map((user,i) => (<tr key={`user_${i}`}>
				<td><input type="checkbox" name={`user[${user[id]}]`} /></td>
				<td>{user[name]}</td>
				<td><select>
					<option>Action</option>
					<option>Edit</option>
					<option>Delete</option>
				</select></td>
				<td><button>Go</button></td>
			</tr>)
		);
	}
	render() {
		const { isLoading, users } = this.state;
		const { header } = this.props;
		const usersList = this.users(users);
		return ( <div className="Users">
				<h2>{header}</h2>
				{isLoading ? 'Loading...' : undefined}
				{usersList}
			</div> );
	}
}
export default Users;