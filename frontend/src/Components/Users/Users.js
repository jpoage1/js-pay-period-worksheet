import React ,{ Component } from 'react';
import getIt from "../../Modules/getIt";
import postIt from "../../Modules/postIt";

class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			changes: [],
			form: [],
			formData: [],
		};
	}
	componentDidMount() {
		this.setState({
			isLoading: true,
			form: this.defaultFormValues(),
		});
		this.getUsers();
		this.getFormData();
	}
	getUsers() {
		this.getData(this.props.dataRoute, (users) => {
			const b1 = new Set(users);
			const changes = [...new Set([...this.state.users].filter(x => !b1.has(x)))];
			this.setState({
				isLoading: false,
				changes: changes,
				users: users,
		});});
	}
	getData(dataRoute, callback) {
		const data = Array.isArray(dataRoute)
			? dataRoute.map( (dataRoute) => {
				return getIt(dataRoute);
			})
			: [getIt(dataRoute)];
	
		Promise.all(data)
		.then((data) => {
			callback(data[0]);
		});
		return data;
	}
	performAction(event) {

	}
	onFocus(event) {
		const defaultValue = this.props.form[event.target.name].props.value;
		if ( event.target.value === defaultValue ) {
			let form = {};
			Object.keys(this.state.form).forEach( (key) => {
				if ( key === event.target.name ) {
					form[key] = '';
				} else {
					form[key] = this.state.form[key];
				}
			});
			this.setState({form: form});
		}
	}
	onBlur(event) {
		if ( event.target.value === '' ) {
			let form = {};
			Object.keys(this.state.form).forEach( (key) => {
				if ( key === event.target.name ) {
					form[key] = this.props.form[key].props.value;
				} else {
					form[key] = this.state.form[key];
				}
			});
			this.setState({form: form});
		}
	}
	onChange(event) {
		const setState = {form: {
			[event.target.name]: event.target.value,
		}};
		this.setState(setState);
	}
	parseNewData(newData) {
		let changes = {};
		Object.keys(this.props.form).forEach((key, i) => {
			const val = newData[key];
			changes[key] = val;
		});
		return changes;
	}
	defaultFormValues() {
		let form = {};
		Object.keys(this.props.form).forEach( (column) => {
			if ( this.props.form[column].props )
				form[column] = this.props.form[column].props.value
		});
		return form;
	}
	formAction(event) {
		let changes;
		if ( event.target.value === "1" ) {
			postIt(this.props.dataRoute, _=>null , this.state.form);
			const form = this.parseNewData(this.state.form);
			changes = [form].concat(this.state.changes);
		}
		else
		{
			changes = this.state.changes;
		}
		if ( event.target.value === "1" || event.target.value === "2") {
			this.setState({
				form: this.defaultFormValues(),
				changes: changes,
			});
		}
		event.target.value = "0";
	}

	drawElement(column, i) {
		const { form } = this.props;
		const { Tag } = form[column];
		const formProps = form[column].props;
		let props = {};
		let eventHandlers = {};
		let children;
		if ( formProps ) {
			children = form[column].children;
			[ 'onChange', 'onFocus', 'onBlur'].forEach( (eventType) => {
				if ( formProps.value && formProps[eventType] === undefined )
				{
					eventHandlers[eventType] = this[eventType] ? this[eventType].bind(this) : undefined;
				}
			});
			Object.keys(formProps).forEach( (prop) => {
				if ( prop === 'value') {
					props[prop] = this.state.form[column] || '';
				} else if ( formProps[prop] ) {
					props[prop] = formProps[prop];
				}
			});
		}
		if ( !children ) {
			if ( Tag === 'select') {
				const { header } = form[column];
				//move this to componentDidMount
				const options = this.state.formData[column]
				children = options
					? [
						(<option key={`${column}`}>{header}</option>),
						...(options.map( (option, i) =>
							(<option key={`${column}-${i}`} value={option[this.props.form[column].value]}>{option[this.props.form[column].label]}</option>))),
						]
					: undefined;
			}
		}
		return Array.isArray(children)
			? (<Tag name={column} {...eventHandlers} {...props}>{children}</Tag>)
			: (<Tag name={column} {...eventHandlers} {...props} />);
	}
	getFormData() {
		Object.keys(this.props.form).forEach( (column, i) =>
			this.getData(this.props.form[column].dataRoute, (options) =>
				this.setState({
					formData: {
						[column]: options,
					},
				})
			)
		);
	}
	form() {
		return(<tr>
			<td>&nbsp;</td>
			{
				Object.keys(this.props.form).map( (column, i) => {
					const drawElement = this.drawElement(column, i);
					return (<td key={`formItem-${i}`}>{drawElement}</td>);
				})
			}
			<td><select onChange={this.formAction.bind(this)}>
				<option value="0">Action</option>
				<option value="1">Add</option>
				<option value="2">Clear</option>
			</select></td>
		</tr>);
	}
	users() {
		const { users, changes } = this.state;
		const usersList = this.usersList(users);
		const changesList = changes ? this.usersList(changes) : changes;
		const form = this.form();
		return (<table>
				<thead>
				<tr>
					<th><input type="checkbox" /></th>
					<th>All</th>
					<th><select onChange={this.performAction.bind(this)} >
						<option>Action</option>
						<option>Edit</option>
						<option>Delete</option>
					</select></th>
				</tr>
				</thead>
				<tbody>
				{form}
				{changesList}
				</tbody>
				<tfoot>
				{usersList}
				</tfoot>
				</table>);
	}

	usersListItemColumns(user, i) {
		const { form } = this.props;
		return Object.keys(form).map( (column, i) => {
			return (<td key={`listItem-${user['id']}-${i}`}>{user[column]}</td>);
		});
	}
	usersListItem(user, i) {
		const usersListItemColumns = this.usersListItemColumns(user, i);
		return (<tr key={`user_${i}`}>
				<td><input type="checkbox" /></td>
				{usersListItemColumns}
				<td><select>
					<option value="0">Action</option>
					<option value="0">Edit</option>
					<option value="0">Delete</option>
				</select></td>
			</tr>);
	}
	usersList(users) {
		return users.map((user,i) => this.usersListItem(user, i));
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