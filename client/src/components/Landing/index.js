import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/Login/action";

const mapDispatchToProps = dispatch => ({
  loginRequest: history => dispatch(actions.loginRequest(history))
});

class Landing extends Component {
  login = () => {
    this.props.login();
  };
  render() {
    return (
      <div>
        <section className='hero is-info is-fullheight'>
          <div className='hero-head'>
            <nav className='navbar'>
              <div className='container'>
                <div className='navbar-brand'>
                  <a className='navbar-item logo' href='../'>
                    <i className='fa fa-bookmark' />
                    &nbsp;arky
                  </a>
                  <span
                    className='navbar-burger burger'
                    data-target='navbarMenu'>
                    
                  </span>
                </div>
                <div id='navbarMenu' className='navbar-menu'>
                  <div className='navbar-end'>
                    <span className='navbar-item'>
                      <span className='button is-white is-outlined'>
                        <span className='icon'>
                          <i className='fa fa-home' />
                        </span>
                        <span>Home</span>
                      </span>
                    </span>

                    <span className='navbar-item'>
                      <Link
                        className='button is-white is-outlined'
                        to='https://github.com/'>
                        <span className='icon'>
                          <i className='fa fa-github' />
                        </span>
                        <span>View Source</span>
                      </Link>
                    </span>
                    <span className='navbar-item'>
                      <button
                        className='button is-white is-outlined'
                        onClick={this.login}>
                        <span className='icon'>
                          <i className='fa fa-user' />
                        </span>
                        <span>Login</span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className='hero-body'>
            <div className='container has-text-centered'>
              <div className='column is-6 is-offset-3'>
                <h1 className='title logo'>Marky</h1>
                <h2 className='subtitle'>
                  Take your bookmarks around the world.
                </h2>

                <span className='button is-white is-outlined is-large' href='#'>
                  <span className='icon '>
                    <i className='fa fa-bookmark' />
                  </span>
                  <span>
                    <span>Get Started</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default connect(mapDispatchToProps)(Landing);
