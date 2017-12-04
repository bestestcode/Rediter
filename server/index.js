const jsonServer = require('json-server');
const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const validate = require('express-validation');
const validations = require('./validations');
const stream = require('./reddit-stream');

const app = jsonServer.create();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/subreddits', (req, res, next) => {
  next();
  stream.setRedditStream();
});

app.post('/api/subreddits', validate(validations.subreddit.bodySpec));

app.post('/api/subreddits', validations.subreddit.checkCreate, (req, res, next) => {
  next();
  stream.setRedditStream();
});

app.delete('/api/subreddits/:id', validations.subreddit.checkDelete, (req, res, next) => {
  next();
  stream.setRedditStream();
});

app.put('/api/subreddits/:id', validate(validations.subreddit.bodySpec), (req, res, next) => {
  next();
  stream.setRedditStream();
});

app.use('/api', jsonServer.router(db));
app.use(jsonServer.defaults());

app.listen(8081);

stream.setRedditStream();
