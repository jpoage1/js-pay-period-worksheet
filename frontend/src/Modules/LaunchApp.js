import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SwitchRoutes from './SwitchRoutes';

class LaunchApp extends Component {
  render() {
    return (<div className="App">
        <h1>{this.props.session.tenant.title}</h1>
        <Link to="/">Main Menu</Link>
        <SwitchRoutes session={this.props.session} routes={this.props.routes} /> 
      </div>);
  }
}
export default LaunchApp ;