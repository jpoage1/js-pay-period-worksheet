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
            {this.props.routes.map(({ path, hide, component, routes, routeProps }, i) => 
              {
                let header;
                if ( !routeProps || !routeProps.header ) {
                  console.log(`Route Config Error. Check route.js near path: ${path}`);
                } else {
                  header = routeProps.header;
                }
                //const { header } = routeProps;
                const fullPath = this.props.pathPrefix ? `${this.props.pathPrefix}/${path}` : `/${path}`;
                const j = this.props.k ? this.props.k+i : i;
                const children = routes
                  ? (<Menu pathPrefix={fullPath} id={`link-${j}`} routes={routes} k={j} />)
                  : '';
                const nextChild = !component
                  ? (<label htmlFor={`link-${j}`}>{header}</label>)
                  : (<Link to={fullPath}>{header}</Link>);
                return (hide !== true) ? (<li key={ `link-${j}` }><span>{nextChild}</span><br /><span>{children}</span></li>) : null; }
            )}
          </ul>
      );
  }
}
export default Menu;