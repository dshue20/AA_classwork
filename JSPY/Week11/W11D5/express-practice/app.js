/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */

const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const { HairColor, Person } = require('./models');

const csrfProtection = csrf({ cookie: true });

const app = express();

app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

app.get('/new-person', csrfProtection, async (req, res) => {
  const hairColors = await HairColor.findAll();
  res.render('form', { hairColors, csrfToken: req.csrfToken() });
});

app.post('/new-person', csrfProtection, asyncHandler(async (req, res) => {
  const { firstName, lastName, age, biography, hairColorId } = req.body;
  await Person.create({ firstName, lastName, age, biography, hairColorId });
  res.redirect('/');
}));

app.get('/', csrfProtection, asyncHandler(async (req, res) => {
  const people = await Person.findAll({ include: HairColor });
  res.render('list', { people })
}));

app.listen(8080, console.log('Listening...'));

/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch(e) {
  exports.app = null;
}
