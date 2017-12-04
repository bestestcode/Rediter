import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    };
  }

  // Resets the page number when the user changes route.
  componentWillReceiveProps(nextProps) {
    if (nextProps.sub !== this.props.sub) {
      this.setState({ currentPage: 1 });
    }
  }

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  prevPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }

  formatPathForBefore() {
    const { location } = this.props;
    return `${location.pathname}?before=t3_`;
  }

  formatPathForAfter() {
    const { location } = this.props;
    return `${location.pathname}?after=t3_`;
  }

  render() {
    return (
      <ul className="pagination col s12">
        {this.state.currentPage > 1 &&
        <li className="previous">
          <Link to={`${this.formatPathForBefore()}${this.props.firstItem}`} onClick={this.prevPage}>
            <i className="material-icons">chevron_left</i>
          </Link>
        </li>}

        <li className="middle">Page {this.state.currentPage}</li>

        <li className="next">
          <Link to={`${this.formatPathForAfter()}${this.props.lastItem}`} onClick={this.nextPage}>
            <i className="material-icons">chevron_right</i>
          </Link>
        </li>
      </ul>
    );
  }
}

export default withRouter(Pagination);
