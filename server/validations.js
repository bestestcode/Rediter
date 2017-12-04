const Joi = require('joi');
const db = require('./db');

const subredditBody = {
  title: Joi.string().min(3).required()
};

const checkCreate = (req, res, next) => {
  const { body } = req;
  if (db.subreddits.filter(subreddit => subreddit.title === body.title).length > 0) {
    res.status(409).end('Subreddit already exists.');
  } else {
    next();
  }
};

const checkDelete = (req, res, next) => {
  const { body } = req;
  if (db.subreddits.length == 1) {
    res.status(409).end('You should have at least one subreddit');
  } else {
    next();
  }
};

module.exports = {
  subreddit: {
    bodySpec: {
      body: subredditBody
    },
    checkCreate,
    checkDelete,
  }

};
