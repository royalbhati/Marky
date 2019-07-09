import React, { Component } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import jwtDecode from "jwt-decode";
import actions from "../../store/Bookmarks/action";
import { connect } from "react-redux";
import loginActions from "../../store/Login/action";

const mapStateToProps = state => ({
  token: state.login.token
});

const mapDispatchToProps = dispatch => ({
  addBookmarks: category => dispatch(actions.addBookmark(category)),
  logo: history => dispatch(loginActions.logout(history)),
  isAuthenticated: history => dispatch(loginActions.isAuth(history))
});
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class AddCat extends Component {
  state = {
    showModal: false,
    url: "",
    name: "",
    category: ""
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    window.location.reload();
  };
  onUrlChange = event => {
    this.setState({ url: event.target.value });
  };
  onNameChange = event => {
    this.setState({ name: event.target.value });
  };
  onCatChange = event => {
    this.setState({ category: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    const new_category = {
      name: this.state.name,
      url: this.state.url,
      category: this.state.category,
      token: this.props.token
    };
    this.props.addBookmarks(new_category);
    this.setState({
      url: " ",
      name: " ",
      category: " "
    });
  };

  logout = () => {
    this.props.logo(this.props.history);
    this.props.isAuthenticated(this.props.history);
    // window.location.redirect('/login')
  };

  render() {
    return (
      <div>
        <div className='largeAddButton'>
          <button
            className='button is-warning  is-large '
            onClick={this.handleOpenModal}>
            Add Category
          </button>
          <button
            onClick={this.logout}
            class='button is-danger is-medium is-outlined is-pulled-right logout'>
            Logout
          </button>
        </div>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel='Add category'
          style={customStyles}>
          <form onSubmit={this.onSubmit}>
            <div class='field'>
              <div class='control'>
                <label class='label'>Enter the URL</label>
                <input
                  class='input is-large'
                  value={this.state.url}
                  onChange={this.onUrlChange}
                  type='text'
                  placeholder='http://www.google.com'
                  autofocus=''
                />
              </div>
            </div>

            <div class='field'>
              <div class='control'>
                <label class='label'>Enter the Name</label>
                <input
                  class='input is-large'
                  value={this.state.name}
                  onChange={this.onNameChange}
                  type='text'
                  placeholder='Google'
                />
              </div>
            </div>
            <div class='field'>
              <div class='control'>
                <label class='label'>Enter the Category</label>
                <input
                  class='input is-large'
                  value={this.state.category}
                  onChange={this.onCatChange}
                  type='text'
                  placeholder='Social Media'
                />
              </div>
            </div>
            <div className='is-flex buttons'>
              <input
                type='Submit'
                value='Save Bookmark'
                name='btn'
                className='button is-block is-info is-medium is-halfwidth'
              />
              <button
                onClick={this.handleCloseModal}
                class='button is-block is-danger is-medium is-halfwidth'>
                {" "}
                &nbsp;&nbsp; Close&nbsp;&nbsp; &nbsp;
              </button>
            </div>
          </form>
        </ReactModal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCat);
