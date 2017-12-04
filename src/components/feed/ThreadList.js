import React, { Component } from 'react';

import Card from './Card';
import Pagination from './Pagination';

export class ThreadList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstItem: '',
      lastItem: ''
    };
  }

  // Assigns the 1st and last item in the array and binds it to state.
  componentWillReceiveProps(nextProps) {
    const { list } = nextProps.threads;
    if (list && list.length) {
      const lastItem = list.slice(-1).pop().data.id;
      const firstItem = list[0].data.id;

      if (this.state.firstItem !== firstItem || this.state.lastItem !== lastItem) {
        this.setState({
          firstItem,
          lastItem
        });
      }
    }
  }

  // maps threads to the props of Card component
  renderThread() {
    const { list } = this.props.threads;
    if (list && list.length) {
      return list.map((thread, index) => (
        <Card key={thread.data.id} thread={thread} />
      ));
    } else {
      return (
        <div className="progress-container col s12">
          {this.renderError()}
        </div>
      );
    }
  }

  // Show toast or progress
  renderError() {
    const { toast } = this.props;
    if (toast.length) {
      return <div><h4>{toast}</h4></div>;
    } else {
      return (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderThread()}

        {!this.props.toast &&
        <Pagination
          {...this.props}
          lastItem={this.state.lastItem}
          firstItem={this.state.firstItem}
          location={this.props.location}
          params={this.props.params}
        />}
      </div>
    );
  }
}

export default ThreadList;
