import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Layout extends Component {
  render() {
    const C = this.props.component;
    const component = (<C {...this.props} />);
    return (<div className="App">
        <h1>{this.props.session.tenant.title}</h1>
        <h2>{this.props.header}</h2>
        <Link to="/">Main Menu</Link>
        {component} 
      </div>);
  }
}
export default Layout ;