import React, { Component } from "react";
import { List, Avatar, Skeleton, Divider, message } from "antd";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { Card, Icon, Popconfirm } from "antd";
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
  msg: state.bookmark.msg
});

const mapDispatchToProps = dispatch => ({
  addBookmarks: category => dispatch(actions.addBookmark(category)),
  deleteCategory: param => dispatch(actions.deleteCategory(param)),
  deleteSingle: id => dispatch(actions.deleteSingle(id))
});

class BookmarkCard extends Component {
  state = {
    showModal: false,
    url: "",
    name: "",
    category: "",
    msg: "",
    delId: ""
  };
  componentDidMount(){
    ReactModal.setAppElement("body");
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
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
    const param = {
      token: this.props.token,
      category: this.props.category
    };
    this.props.deleteCategory(param);
    message.success("deleted");
  };

  deleteSingleItem = data => {
    this.props.deleteSingle(this.state.delId);
  };

  edit = () => {
    this.handleOpenModal();
  };

  render() {
    const category = this.props.category;
    return (
      <div className='cardOuter'>
        <Card
          hoverable
          style={{
            marginTop: "20px"
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
                    <Icon type='delete' style={{ color: "red" }} />
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
                        <Icon type='edit' onClick={this.edit} />,
                        <Popconfirm
                          title='Are you sure you want to delete this?'
                          onConfirm={this.deleteSingleItem}
                          onCancel={this.cancel}
                          okText='Yes'
                          cancelText='No'>
                          <Icon
                            type='delete'
                            onClick={() => this.setState({ delId: item._id })}
                          />
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
                        />
                      </Skeleton>
                    </List.Item>
                  )}
                />
                <div
                  style={{ marginTop: "30px" }}
                  onClick={this.handleOpenModal}
                  className='button is-info is-outlined is-fullwidth'>
                  Add new bookmark
                </div>
              </div>
            }
          />
        </Card>

        {/* <div className='list'>{
                this.props ? this.list() : null}</div> */}

        {/* </div> */}

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel='Add category'
          style={customStyles}>
          <label className='label label1'>
            Add bookmark in {this.props.category}
          </label>
          <form onSubmit={this.onSubmit}>
            <div className='field'>
              <div className='control'>
                <label className='label'>Enter the URL</label>
                <input
                  className='input is-large'
                  value={this.state.url}
                  onChange={this.onUrlChange}
                  type='text'
                  placeholder='http://www.google.com'
                  
                />
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <label className='label'>Enter the Name</label>
                <input
                  className='input is-large'
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
                onChange={()=>{}}
                value='Save Bookmark'
                name='btn'
                className='button is-block is-info is-medium is-halfwidth'
              />
              <button
                onClick={this.handleCloseModal}
                className='button is-block is-danger is-medium is-halfwidth'>
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
