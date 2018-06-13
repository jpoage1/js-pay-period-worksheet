import React, { Component } from 'react';
import { Route, Switch,} from 'react-router-dom';

class SwitchRoutes extends Component {
  switchRoutes(routes, pathPrefix, k) {
    return routes.map(({ path, component: C, exact, routes }, i) => {
        const fullPath = pathPrefix ? `${pathPrefix}/${path}` : `/${path}`;
        const j = k ? k+i : i;
        if ( !C && routes ) return this.switchRoutes(routes, fullPath, j);
        const RoutesToMenu = fullPath === '/' ? this.props.routes : null;
        return (<Route
          path={fullPath}
          render={(props) => (<C {...props} session={this.props.session} routes={RoutesToMenu} />)}
          key={`route_${j}`}
          k={j}
          exact={exact === true ? true : false}
        />)
      })
  }
  render() {
    return (
      <Switch>
       {this.switchRoutes(this.props.routes)}
      </Switch>
    );
  }
}
export default SwitchRoutes;

