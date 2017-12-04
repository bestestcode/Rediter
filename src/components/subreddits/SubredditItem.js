import React from 'react';
import { Link } from 'react-router-dom';

export const SubredditItem = ({
  subreddit, onDelete, onLike, isTheOnlyItem
}) => (
  <tr key={subreddit.id}>
    <td>{subreddit.title}</td>
    <td>
      <div className="text-right">
        <a onClick={onLike.bind(this, subreddit)} className="btn-icon"><i className="material-icons">{subreddit.favorite ? 'favorite' : 'favorite_border'}</i></a>
        {isTheOnlyItem == false && <a onClick={onDelete.bind(this, subreddit)} className="btn-icon"><i className="material-icons">delete</i></a>}
      </div>
    </td>
  </tr>
);
