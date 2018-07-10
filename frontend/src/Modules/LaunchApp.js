import React, { Component } from 'react';

import SwitchRoutes from './SwitchRoutes';

class LaunchApp extends Component {
  render() {
    return (<SwitchRoutes session={this.props.session} routes={this.props.routes} />);
  }
}
export default LaunchApp ;