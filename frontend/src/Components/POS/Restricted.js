import React,{ Component } from 'react';
        /*
        When adding inventory, if the product doesn't exist, provide ability to add products.
        Ability to add products from product manager as well, but doubtfully used, because we will only be adding new products based on random new inventories.
      */
export default class Restricted extends Component {
  render() {
      return (
          <div className="Restricted">
          	<h2>Restricted Access Area</h2>
          </div>
      );
  }
}
