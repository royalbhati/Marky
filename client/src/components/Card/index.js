import React, { Component } from "react";
import { List, Avatar, Button, Skeleton, Divider, message } from "antd";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { Card, Icon, Popconfirm } from "antd";
import axios from "axios";
import actions from "../../store/Bookmarks/action";
const { Meta } = Card;

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
const mapStateToProps = state => ({
  token: state.login.token,
  msg:state.bookmark.msg
});

const mapDispatchToProps = dispatch => ({
  addBookmarks: category => dispatch(actions.addBookmark(category)),
  deleteCategory: param => dispatch(actions.deleteCategory(param))
});

class BookmarkCard extends Component {
  state = {
    showModal: false,
    url: "",
    name: "",
    category: "",
    msg:"",
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    window.location.reload();
    // window.location.reload()
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
      category: this.props.category,
      token: this.props.token
    };
    console.log(new_category);
    this.props.addBookmarks(new_category);

    this.setState({
      url: " ",
      name: " "
    });
  };
  onDelete = e => {
    console.log("confirm");
    const param = {
      token: this.props.token,
      category: this.props.category
    };
    this.props.deleteCategory(param)
    this.setState({msg:"sfsdfsf"})
    this.setState();
        // message.success("Deleted! Please refresh to view Changes");
      // .catch(err => message.error(err));
    // this.props.history.push("/");
  };

  render() {
    const list = this.props.data;
    console.log("props data", list);

    const category = this.props.category;
    // const colors = ["#e0f7fa", "#e1f5fe", "#e8eaf6", "#ffebee", "#FFC107"];
    return (
      <div class='cardOuter'>
        {/* <div class='card'> */}
        <Card
          hoverable
          style={{
            marginTop: "20px"
            // background: colors[Math.ceil(Math.random(0, 4) * 4)]
          }}>
          <Meta
            title={
              <div>
                <div className='cardtitle'>
                  <span
                    style={{
                      fontSize: "25px",
                      fontFamily: " Raleway, sans-serif"
                    }}>
                    {category}
                  </span>
                  <Popconfirm
                    title='Are you sure you want to delete this?'
                    onConfirm={this.onDelete}
                    onCancel={this.cancel}
                    okText='Yes'
                    cancelText='No'>
                    <Icon
                      type='delete'
                      style={{ color: "red" }}
                      // onClick={this.onDelete}
                    />
                    {/* <div
                      style={{ color: "red" }}
                      class='fas fa-trash-alt'
                      onClick={this.onDelete}
                    /> */}
                  </Popconfirm>
                </div>
                <Divider type='horizontal' />
              </div>
            }
            description={
              <div>
                <List
                  className='demo-loadmore-list'
                  itemLayout='horizontal'
                  dataSource={this.props.data}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Icon type='edit' />,
                        <Popconfirm
                          title='Are you sure you want to delete this?'
                          onConfirm={this.confirm}
                          onCancel={this.cancel}
                          okText='Yes'
                          cancelText='No'>
                          <Icon type='delete' onClick={this.onDelete} />
                        </Popconfirm>
                      ]}>
                      <Skeleton
                        avatar
                        title={false}
                        loading={item.loading}
                        active>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={
                                item.url.split(":")[0].slice(0, 4) === "http"
                                  ? `http://www.${
                                      item.url.split(".")[1]
                                    }.com/favicon.ico`
                                  : `http://www.${
                                      item.url.split(".")[0]
                                    }.com/favicon.ico`
                              }
                            />
                          }
                          title={item.name}
                          // description={item.url}
                        />
                        {/* <div>{item.name}</div> */}
                      </Skeleton>
                    </List.Item>
                  )}
                />
                <div
                  style={{ marginTop: "30px" }}
                  onClick={this.handleOpenModal}
                  class='button is-info is-outlined is-fullwidth'>
                  Add new bookmark
                </div>
              </div>
            }
          />
        </Card>

        {/* <div class='list'>{
                this.props ? this.list() : null}</div> */}

        {/* </div> */}

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel='Add category'
          style={customStyles}>
          <label class='label label1'>
            Add bookmark in {this.props.category}
          </label>
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
)(BookmarkCard);
