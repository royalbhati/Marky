import React, { Component } from "react";
import Add from "../AddCategory";
import Card from "../Card/";
import { connect } from "react-redux";
import actions from "../../store/Bookmarks/action";
import { CometSpinLoader } from "react-css-loaders";


const mapStateToProps = state => ({
  data: state.bookmark.data,
  loading: state.bookmark.loading,
  msg: state.bookmark.msg
});

const mapDispatchToProps = dispatch => ({
  fetchbookmarks: () => dispatch(actions.fetchBookmarks())
});


class Dashboard extends Component {
  state = {
    msg: ""
  };
  componentDidMount() {
    this.props.fetchbookmarks();
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
      return <Card key={i} data={new_cat} category={categories[i]} />;
    });
  };

  render() {
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
