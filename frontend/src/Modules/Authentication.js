import React ,{ Component } from 'react';

import LaunchApp from "./LaunchApp";
//import fetchIt from "./BackendOperations/fetchIt";
//import getIt from "./BackendOperations/getIt";
import postIt from "./postIt";
import state from "../state";

import routes from "../routes";
class Authentication extends Component {
  constructor() {
    super();
    this.alias = React.createRef();
    this.state = state;
  }
  authenticate(event) {
    event.preventDefault();
    const uri = "http://localhost:5000/Api/Authenticate";
    const data = {
      alias: event.target.alias.value,
      alias_type: event.target.alias_type.value,
      password: event.target.password.value
    };
    const processData = (data) => {
      console.log(data);
    };
    postIt(uri, processData, data);
  }
  setAliasType() {
    this.alias.current.focus();
  }
  render() {
    if ( this.state.session.user.user_id !== 0 )
    	return this.loginForm();
    else {
      return (<LaunchApp routes={routes} session={this.state.session} />);
    }
  }
  loginForm() {
    return (
      <div className="Authentication">
      <h3>Restricted</h3>
      <form onSubmit={this.authenticate.bind(this)}>
	     <p>
        <select name="alias_type" onChange={this.setAliasType.bind(this)}>
          <option value="email">Email</option>
          <option value="nick">Nickname</option>
        </select>
        <input type="text" name="alias" ref={this.alias} />
       </p>
	     <p><label htmlFor="password">Password</label> <input type="text" name="password" /></p>
	     <p><button>Login</button></p>
       </form>
      </div>
    );
  }
}
export default Authentication;