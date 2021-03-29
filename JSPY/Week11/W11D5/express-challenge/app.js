/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */

const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();
const csrfProtection = csrf({ cookie: true });

app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.setTimeout(1000, () => {
    res.status(500).end();
  });
  res.setTimeout(1000, () => {
    res.status(500).end();
  });
  next();
});

app.get('/pasta/create', csrfProtection, (req, res) => {
  res.render('new-pasta', { csrfToken: req.csrfToken() });
});

app.listen(8080, () => console.log('Listening on port 8080...'));

/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch(e) {
  exports.app = null;
}
