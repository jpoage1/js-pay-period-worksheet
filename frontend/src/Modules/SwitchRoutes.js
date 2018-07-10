import React, { Component } from 'react';
import { Route, Switch,} from 'react-router-dom';
import Layout from './Layout'

class SwitchRoutes extends Component {
  routeSet (routeConfig) {
    const { path, render, key, k, exact } = routeConfig;
    return   (<Route
      path={path}
      render={render}
      key={key}
      k={k}
      exact={exact}
    />);
  };
  routeConfig(routes, pathPrefix, k) {
    return routes.map(({ path, component: C, exact, routes, routeProps }, i) => {
        const fullPath = pathPrefix ? `${pathPrefix}/${path}` : `/${path}`;
        // Route doesn't have a component attoached.
       // if ( !C && routes ) // Then dig deeper for more routes
         // return this.switchRoutes(routes, fullPath, j);
        const switchRoutes = routes !== undefined && routes.length > 0
          ? this.routeConfig(routes, fullPath, 0)
          : [];
       // console.log(switchRoutes)
        const RoutesToMenu = path === '' ? this.props.routes : undefined;
        const routeConfig = {
          path: fullPath,
          render: (props) => (<Layout component={C} {...this.props} {...props} {...routeProps} routes={RoutesToMenu} />),
          key: `route_${path}_${i}`,
          exact: exact === true ? true : false,
        }
        return switchRoutes.concat([routeConfig]);
      });
  }
  foldRoutes(routes) {
    if ( !Array.isArray(routes) )
      return routes;
    const reducer = (folded, moreRoutes) => 
      folded.concat(
        Array.isArray(moreRoutes)
          ? moreRoutes.reduce(reducer, [])
          : moreRoutes
      );
    const foldRoutes = routes.reduce(reducer, []);
    return foldRoutes;
  }
  switchRoutes(routes) {
    return this.foldRoutes(this.routeConfig(routes)).map(
      (routeConfig) => this.routeSet(routeConfig));
  }
  render() {
    const switchRoutes = this.switchRoutes(this.props.routes);
    return (
      <Switch>
      {switchRoutes}
      </Switch>
    );
  }
}
export default SwitchRoutes;

