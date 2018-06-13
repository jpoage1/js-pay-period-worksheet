import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
        /*
        When adding inventory, if the product doesn't exist, provide ability to add products.
        Ability to add products from product manager as well, but doubtfully used, because we will only be adding new products based on random new inventories.
      */
class Menu extends Component {
  render() {
      return (
          <ul className="Menu">
            {this.props.routes.map(({ header, path, hide, component, routes }, i) => 
              {
                const fullPath = this.props.pathPrefix ? `${this.props.pathPrefix}/${path}` : `/${path}`;
                const j = this.props.k ? this.props.k+i : i;
                const children = routes
                  ? (<Menu pathPrefix={fullPath} id={`link-${j}`} routes={routes} k={j} />)
                  : '';
                const nextChild = !component
                  ? (<label htmlFor={`link-${j}`}>{header}</label>)
                  : (<Link to={fullPath}>{header}</Link>);
                return (hide !== true) ? (<li key={ `link-${j}` }><p>{nextChild}</p><p>{children}</p></li>) : null; }
            )}
          </ul>
      );
  }
}
export default Menu;