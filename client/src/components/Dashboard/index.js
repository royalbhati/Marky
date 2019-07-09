import React, { Component } from "react";
// import Card from "../Card";
import Add from "../AddCategory";
import { message } from "antd";
import Card from "../Card/";
import { connect } from "react-redux";
import actions from "../../store/Bookmarks/action";
import { CometSpinLoader } from "react-css-loaders";
import Auth from "../Auth/Auth";

const mapStateToProps = state => ({
  data: state.bookmark.data,
  loading: state.bookmark.loading,
  msg: state.bookmark.msg
});

const mapDispatchToProps = dispatch => ({
  fetchbookmarks: () => dispatch(actions.fetchBookmarks())
  // logout:()=>dispatch(loginActions.logout())
});
class Dashboard extends Component {
  state = {
    msg: ""
  };
  componentDidMount() {
    this.props.fetchbookmarks();
    // if (this.props.msg.length>0)
  }

  renderCards = () => {
    const data = this.props.data;
    let categories = [];

    data.forEach(element => {
      categories.push(element.category);
    });

    const set_cat = new Set(categories);

    categories = Array.from(set_cat);

    return categories.map((elem, i) => {
      let new_cat = data.filter(element => {
        return element.category === categories[i];
      });
      return <Card data={new_cat} category={categories[i]} />;
    });
  };

  render() {
    const { logout } = new Auth(this.props.history);
    return (
      <div>
        <div className='container'>
          <Add history={this.props.history} />
          <div className='cardBox'>
            {this.props.data ? (
              this.renderCards()
            ) : (
              <CometSpinLoader color='grey' size={80} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
