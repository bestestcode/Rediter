import React, { Component } from 'react';
import Timestamp from 'react-timestamp';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  // convert str to HTML node
  htmlDecode = (input) => {
    const e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }

  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  // render expand or view
  renderExpandControls() {
    const { data } = this.props.thread;
    if (data.post_hint === 'image' || data.post_hint === 'rich:video') {
      if (this.state.expanded) {
        return (
          <a className="waves-effect waves-light" onClick={this.handleExpand}>
            <i className="material-icons right">expand_less</i>Compress
          </a>
        );
      } else {
        return (
          <a className="waves-effect waves-light" onClick={this.handleExpand}>
            <i className="material-icons right">expand_more</i>Expand
          </a>
        );
      }
    } else {
      return (
        <a className="waves-effect waves-light" href={data.url} target="_blank">
          <i className="material-icons right">visibility</i>View
        </a>
      );
    }
  }

  // render Expanded Content - either image or iframe video.
  renderExpandContent() {
    const { data } = this.props.thread;

    if (data.post_hint === 'image') {
      return <img src={data.url} className="img-responsive" alt={data.title} />;
    } else if (data.post_hint === 'rich:video') {
      return <div className="iframe-responsive" dangerouslySetInnerHTML={{ __html: this.htmlDecode(data.secure_media_embed.content) }} />;
    }
  }

  render() {
    const { data } = this.props.thread;

    // Show placeholder for non-image(string) thumbnails
    switch (data.thumbnail) {
      case 'self':
      case 'nsfw':
      case 'spoiler':
      case 'default':
      case '':
        data.thumbnail = './assets/images/placeholder.png';
        break;

      default:
        break;
    }

    return (
      <div key={data.id} className="col s12">
        <div className="card hoverable horizontal">
          <div className="card-image rf-vertical-center">
            <img src={data.thumbnail} alt={data.title} />
          </div>

          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title-text">
                <a href={`http://reddit.com${data.permalink}`} target="_blank" rel="noopener">
                  {data.title}
                </a>
              </span>

              <div className="card-meta">
                Posted by <a
                  className="card-author"
                  href={`https://www.reddit.com/user/${data.author}`}
                  target="_blank"
                  rel="noopener"
                >{data.author}</a>
                <Timestamp className="rf-timestamp" time={data.created_utc} />
              </div>

              <div className="chip-list">
                <span className="action rf-vertical-center">
                  {this.renderExpandControls()}
                </span>
                <div className="chip">/r/{data.subreddit}</div>
                {data.over_18 && <div className="chip">nsfw</div>}
                {data.post_hint && <div className="chip">{data.post_hint == 'rich:video' ? 'video' : data.post_hint}</div>}
              </div>
            </div>
          </div>

          {this.state.expanded &&
          <div className="card-expand">
            {this.renderExpandContent()}
          </div>}
        </div>
      </div>
    );
  }
}

export default Card;
