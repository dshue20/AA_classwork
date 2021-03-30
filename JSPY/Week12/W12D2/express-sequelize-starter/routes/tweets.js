const express = require('express');
const { check, validationResult } = require('express-validator');

const { Tweet } = require('../db/models');

const router = express.Router();

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler(async (req, res) => {
  const tweets = await Tweet.findAll();
  res.json({ tweets });
}));

const tweetNotFoundError = () => {
  const err = new Error();
  err.title = "Tweet not found";
  err.status = 404;
  err.message = "Tweet not found";
  return err;
}

router.get('/:id', asyncHandler(async (req, res, next) => {
  const tweet = await Tweet.findByPk(req.params.id);
  tweet ? res.json({ tweet }) : next(tweetNotFoundError());
}));

const validateTweet = [
  check("message")
    .exists({ checkFalsy: true })
    .withMessage("Tweet can't be empty."),
  check("message")
    .isLength({ max: 280 })
    .withMessage("Tweet can't be longer than 280 characters."),
];

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    return next(err);
  }
  next();
};

router.post('/', validateTweet, handleValidationErrors, asyncHandler(async (req, res) => {
  const { message } = req.body;
  const tweet = await Tweet.create({ message });
  res.json({ tweet });
}));

router.put('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const tweet = await Tweet.findByPk(id);
  if (tweet){
    const updatedTweet = tweet.update({ message: req.body.message });
    res.json({ tweet });
  } else {
    next(tweetNotFoundError());
  }
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const tweet = await Tweet.findByPk(id);
  if (tweet){
    await tweet.destroy();
    res.status(204).end();
  } else {
    next(tweetNotFoundError());
  }
}));

module.exports = router;