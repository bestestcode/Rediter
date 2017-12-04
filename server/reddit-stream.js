const db = require('./db');
const RedditStream = require('reddit-stream');
const io = require('socket.io')(3001);

let commentStream = null;

const setRedditStream = () => {
  // Stops stream that was running
  if (commentStream != null) {
    commentStream.stop();
  }

  // Build query by concatenating subreddits by '+'
  const subredditsQuery = db.subreddits
    .filter(item => item.favorite)
    .reduce((str, item) => `${str}+${item.title}`, '');
  console.log(subredditsQuery);

  commentStream = new RedditStream('posts', subredditsQuery);

  commentStream.start();

  // We ignore 1st posts detected...
  let initialPostsDetected = false;
  commentStream.on('new', (posts) => {
    if (initialPostsDetected) {
      console.log('found', posts.length, 'post(s)');
      console.log(posts);
      io.emit('action', { type: 'NOTIFICATION_THREAD_NEW', newPosts: posts.length });
    }
    initialPostsDetected = true;
  });
};

//For ease of test
// setInterval(() => {
//   console.log('Sending Notification');
//   io.emit('action', { type: 'NOTIFICATION_THREAD_NEW', newPosts: 7 });
// }, 15 * 1000);

module.exports = {
  setRedditStream,
};
