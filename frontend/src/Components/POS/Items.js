import React ,{ Component } from 'react';
import Input from './../Input';

export default class Items extends Component {
  constructor() {
    super();
    this.state = this.setDefaultState(true);
  }
  setDefaultState(initialize = false) {
    const default_state = {
      barcode: 'Scan Barcode',
      company: '',
      distributor: '',
      brand: '',
      line: '',
      product: '',
      item: '', 
    };
    return initialize === true ? default_state : this.setState(default_state);
  }
  onChangeHandler = (event) => {
    this.setState({ [this.props.name]: event.target.value});

  }
  render() {
    const item_properties =
    [
      {
        label: 'Scan Barcode',
        name: 'barcode',
        type: 'text',
        search: 'false',
      },
      {
        label: 'Company',
        name: 'company',
        type: 'text',
        search: 'true',
      },
      {
        label: 'Distributor',
        name: 'distributor',
        type: 'text',
        search: 'true',
      },
      {
        label: 'Brand',
        name: 'brand',
        type: 'text',
        search: 'true',
      },
      {
        label: 'Line',
        name: 'line',
        type: 'text',
        search: 'true',
      },
      {
        label: 'Product',
        name: 'product',
        type: 'text',
        search: 'true',
      },
      {
        label: 'Item',
        name: 'item',
        type: 'text',
        search: 'true',
      },
    ];
    return (
      <div className="Items">
        <h2>Item Manager</h2>
        <table>
        <tbody>
          {item_properties.map(({label, name, type, search }, i) => (
                <tr key={i}>
                  <th>{label}</th>
                  <td><Input type={type} name={name} onChange={this.onChangeHandler.bind(this)} search={search} /></td>
                </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/*Brands
companies
config
env
group_permissions
groups
inventory
inventory_items
inventory_slots
masters
permits
product_lines
product_lines
sales_items
sales
session
shipment
shipment_item
stores
user_groups
user_permissions
users*/