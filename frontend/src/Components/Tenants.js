import React ,{ Component } from 'react';

class Tenants extends Component {
	Tenants(label = '', id = '', onChangeHandler = '', children = [], sql_id = '', option_value = '')
	{
	    if ( arguments.length > 0 )
	    {
	        return (<table
	        		name={id} id={id}
	        		defaultValue={this.props[sql_id]}
	        		onChange={onChangeHandler.bind(this)}>
	            <option value="0">{label?label:'nbps;'}</option>
	            {children.map((row, i) => {
	            	return <option key={`${id}_${i}`} value={row[sql_id]}>{row[option_value]}</option>
	            })}
	        </table>);
	    } else
	        return (<select><option>&nbsp;</option></select>);
	}
	render() {
		const { children, dropMenusData } = this.props;
		return children.map((children, i) => {
			const row = dropMenusData[i];
			return (<li key={`dropMenu_${i}`}>{this.dropMenu(row[1],row[2],row[3], children, row[4],row[5] )}</li>)
		})
		/*return ( <div className="Tenants">
				<h2>Tenants</h2>
			</div> );*/
	}
}
export default  Tenants;