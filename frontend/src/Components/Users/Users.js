import React ,{ Component } from 'react';
import getIt from "../../Modules/getIt";
import postIt from "../../Modules/postIt";
class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			changes: [],
			form: [],
			formData: [],
			showPopup: false,
		};
	}
	componentDidMount() {
		if ( Object.prototype.toString.call(this.props.form).indexOf('Object') === -1 ) return;
		this.setState({
			isLoading: true,
			form: this.defaultFormValues(),
		});
		this.getUsers();
		this.getFormData();
	}
	togglePopup() {
		this.setState({
		  showPopup: !this.state.showPopup
		});
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
		let newState = this.state.form;
		newState[event.target.name] = event.target.value
		this.setState(newState);
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
	performAction() {

	}
	formAction(event) {
		let changes;
		if ( event.target.value === "1" ) {
			postIt(this.props.dataRoute, this.state.form);
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
		children = form[column].children;
		['onChange', 'onFocus', 'onBlur'].forEach( (eventType) => {
			const checkFormProps = formProps === undefined || formProps[eventType] === undefined;
			if ( checkFormProps && eventType === 'onChange' && Tag === 'select' ) {
				eventHandlers[eventType] = this[eventType] ? this[eventType].bind(this) : undefined;
			} else if ( formProps && formProps[eventType] === undefined && formProps.value )
			{
				eventHandlers[eventType] = this[eventType] ? this[eventType].bind(this) : undefined;
			}
		});
		if ( formProps ) Object.keys(formProps).forEach( (prop) => {
			if ( prop === 'value') {
				props[prop] = this.state.form[column] || '';
			} else if ( formProps[prop] ) {
				props[prop] = formProps[prop];
			}
		});
		if ( !children ) {
			// use data route
			if ( Tag === 'select') {
				const { header } = form[column];
				const options = this.state.formData[column]
				children = options
					? [
						(<option key={`${column}`}>{header}</option>),
						...(options.map( (option, i) =>  {
							return (<option key={`${column}-${i}`} value={option[this.props.form[column].value]}>{option[this.props.form[column].label]}</option>)
						}))
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
				{
					let newState = this.state;
					newState.formData[column] = options
					this.setState(newState);
				}
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
		const filterColumns = this.filterColumns();
		const changesHeader = changesList.length > 0
			? (_ => {
				return (<tr>
					<th></th>
					<th colSpan={Object.keys(this.props.form).length}>Recent Changes</th>
					<th></th>
					<th></th>
				</tr>);
			})()
			: undefined;
		return (<table>
				<thead>
					<tr>
						<th></th>
						<th colSpan={Object.keys(this.props.form).length}>Add New</th>
						<th></th>
					</tr>
					{form}
					{changesHeader}
					{changesList}
				</thead>
				<tbody>
					<tr>
						<th></th>
						<th colSpan={Object.keys(this.props.form).length}>Search</th>
						<th></th>
					</tr>
					<tr>
						<th></th>
						{filterColumns}
						<th></th>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th><input type="checkbox" /></th>
						<th>Select All</th>
						<th colSpan={Object.keys(this.props.form).length-1}>Results</th>
						<th><select onChange={this.performAction.bind(this)}>
							<option>Action</option>
							<option>Edit</option>
							<option>Delete</option>
						</select></th>
					</tr>
					{usersList}
				</tfoot>
				</table>);
	}

	usersListItemColumns(user, i) {
		const { form } = this.props;
		//console.log(this.state)
		return Object.keys(form).map( (column, i) => {
			const { label } = this.props.form[column];
			return (<td key={`listItem-${user['id']}-${i}`}>{user[label]}</td>);
		});
	}
	filterColumns() {
		const { form } = this.props;
		return Object.keys(form).map( (column, i) => {
			let label;
			if ( this.props.form[column].props ) label = this.props.form[column].props.value;
			return (<td key={`filterItem-${i}`}>{label}</td>);
		});
	}
	usersListItem(user, i) {
		const usersListItemColumns = this.usersListItemColumns(user, i);
		const hidden = {
			hidden: "hidden"
		};
		return (<tr key={`user_${i}`}>
				<td><input type="checkbox" /></td>
				{usersListItemColumns}
				<td><select>
					<option value="0">Action</option>
					<option value="0">Edit</option>
					<option value="0">Delete</option>
				</select></td>
				<th><span className={hidden}><button>Confirm</button></span></th>
			</tr>);
	}
	usersList(users) {
		if ( !Array.isArray(users) ) return;
		return users.map((user,i) => this.usersListItem(user, i));
	}
	render() {
		const { isLoading } = this.state;
		let usersList, error;
		if ( Object.prototype.toString.call(this.props.form).indexOf('Object') === -1 ) error = "Config error. Please check route.js";
		else usersList = this.users();
		return ( <div className="Users">
				{isLoading ? 'Loading...' : undefined}
				{usersList}
				{error}
				{this.state.showPopup ? 
		          <Popup
		            text='Close Me'
		            closePopup={this.togglePopup.bind(this)}
		          />
		          : null
		        }
			</div> );
	}
}
export default Users;