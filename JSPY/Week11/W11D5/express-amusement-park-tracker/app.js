const express = require('express');
const morgan = require('morgan')
const routes = require('./routes.js');

const app = express();

const { environment, port } = require('./config/index.js');

app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(routes);

app.use((req, res, next) => {
  const err = new Error("The requested page could not be found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (environment === 'development'){
    console.error(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404){
    res.status(404);
    res.render('page-not-found', { title: 'Page Not Found' });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status !== 404){
    res.status(err.status || 500);
    let message;
    let stack;
    if (environment !== 'production'){
      message = err.message;
      stack = err.stack;
    }
    res.render('error', { title: 'Server Error', message, stack })
  }
});

module.exports = app;