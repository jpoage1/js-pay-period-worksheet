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
      password: event.target.password.value
    };
    const processData = (data) => {
      console.log(data);
    console.log("test2")
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
        <label htmlFor="alias">Login Name</label> <input type="text" name="alias" ref={this.alias} />
       </p>
	     <p><label htmlFor="password">Password</label> <input type="text" name="password" /></p>
	     <p><button type="submit">Login</button></p>
       </form>
      </div>
    );
  }
}
export default Authentication;