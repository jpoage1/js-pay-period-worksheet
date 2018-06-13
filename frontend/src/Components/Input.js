import React , { Component } from 'react';

import SearchBox from './SearchBox';


class Input extends Component {
  state = { typed: '' };
  render() {
    if ( this.props.search === true )
    {
      // Search while typing
    }
    const id = 'search'+this.props.name;
    return (
      <div>
        <input {...this.props} id={id} />
        <SearchBox id={id} />
      </div>
    );
  }
}
export default Input;