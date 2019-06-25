import React ,{ Component } from 'react';

class Popup extends Component {
	save() {
		return this.props.save();
	}
	close() {
		this.props.closePopup();
	}
	saveAndClose() {
		this.save();
		this.close();
	}
	snc() {
		return this.saveAndClose();
	}
  render() {
  	return ( <div className="popup">
  			<div className="popup_inner">
	  			<h3>{this.props.header}</h3>
	  			<button onClick={this.save.bind(this)}>Save</button>
	  			<button onClick={this.snc.bind(this)}>Save and Close</button>
	  			<button onClick={this.close.bind(this)}>Close</button>
	  		</div>
  		</div> );
  }
}
export default Popup;