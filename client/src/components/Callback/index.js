import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/Login/action";

const mapDispatchToProps = dispatch => ({
  loginRequest: history => dispatch(actions.loginRequest(history))
});

class Callback extends Component {
  componentDidMount = () => {
    // Handle authentication if expected values are in the URL.
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.handleAuth();
    } else {
      throw new Error("Invalid callback URL.");
    }
  };
  render() {
    return <h1>Loading...</h1>;
  }
}

export default connect(mapDispatchToProps)(Callback);
