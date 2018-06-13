import React , { Component } from 'react';
class DropMenus extends Component {
	dropMenu(label = '', id = '', onChangeHandler = '', children = [], sql_id = '', option_value = '')
    {
        if ( arguments.length > 0 && children.length )
        {
        	onChangeHandler = onChangeHandler ? onChangeHandler : _ => '';
            return (<select
            		name={id} id={id}
            		defaultValue={this.props[sql_id]}
            		onChange={onChangeHandler.bind(this)}>
	            <option value="0">{label?label:'nbps;'}</option>
	            {children.map((row, i) => {
                	return <option key={`${id}_${i}`} value={row[sql_id]}>{row[option_value]}</option>
                })}
            </select>);
        } else
            return (<select><option>&nbsp;</option></select>);
    }
	render() {
		const { children, dropMenusData } = this.props;
		return children.map((children, i) => {
			const row = dropMenusData[i];
			return (<li key={`dropMenu_${i}`}>{this.dropMenu(row[1],row[2],row[3], children, row[4],row[5] )}</li>)
		})
	}
}
export default DropMenus;