import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import Dashboard from "../Dashboard/";
import Auth from "../Auth/Auth";
import Landing from "../Landing";
import "../../App.css";
import Callback from "../Callback";
import { connect } from "react-redux";
import actions from "../../store/Login/action";
import { message } from "antd";

const mapStateToProps = state => ({
  isAuth: state.login.isAuth,
  login: state.login.login,
  msg: state.bookmark.msg
});

const mapDispatchToProps = dispatch => ({
  isAuthenticated: history => dispatch(actions.isAuth(history))
});

class App extends Component {
  componentDidMount() {
    this.props.isAuthenticated(this.props.history);
  }
  render() {
    const { handleAuthentication, login } = new Auth(this.props.history);

    return (
      <>
        <div className='body'>
          <Route
            path='/'
            exact
            render={props =>
              this.props.isAuth ? (
                <Redirect to='/dashboard' />
              ) : (
                <Landing login={login} {...props} />
              )
            }
          />
          <Route
            path='/callback'
            render={props => (
              <Callback handleAuth={handleAuthentication} {...props} />
            )}
          />
          <Route
            path='/dashboard'
            render={props =>
              this.props.isAuth ? <Dashboard {...props} /> : <Redirect to='/' />
            }
          />
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
