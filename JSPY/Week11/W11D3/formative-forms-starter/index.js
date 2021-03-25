const express = require("express");
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.get("/", (req, res) => {
  res.render('index', {users});
});

app.get("/create", csrfProtection, (req, res) => {
  console.log(req.csrfToken());
  res.render('create', { route: '/create/', csrfToken: req.csrfToken() });
});

const postValidations = (req, res, next) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;
  const errors = [];

  if (!firstName) errors.push("Please provide a first name.");
  if (!lastName) errors.push("Please provide a last name.");
  if (!email) errors.push("Please provide an email.");
  if (!password) errors.push("Please provide a password.");
  if (password !== confirmedPassword) errors.push("The provided values for the password and password confirmation fields did not match.");

  req.errors = errors;
  next();
}

app.post("/create", csrfProtection, postValidations, (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (req.errors.length) {
    res.render('create', { route: '/create/', firstName, lastName, email, errors: req.errors, csrfToken: req.csrfToken() });
  } else {
    const newUser = { id: users.length + 1, firstName, lastName, email };
    users.push(newUser);
    res.redirect('/');
  }
});

app.get("/create-interesting", csrfProtection, (req, res) => {
  res.render('create', { route: '/create-interesting', csrfToken: req.csrfToken() });
});

const interestingValidations = (req, res, next) => {
  const { age, favoriteBeatle, iceCream } = req.body;
  if (!age) req.errors.push("age is required");
  if (!parseInt(age) || parseInt(age) > 120 || parseInt(age) < 0) req.errors.push("age must be a valid age");
  if (!favoriteBeatle) req.errors.push("favoriteBeatle is required");
  if (favoriteBeatle === "Scooby-Doo") req.errors.push("favoriteBeatle must be a real Beatle member");
  next();
}

app.post("/create-interesting", csrfProtection, postValidations, interestingValidations, (req, res) => {
  const { firstName, lastName, email, age, favoriteBeatle, iceCream } = req.body;
  if (req.errors.length) {
    res.render('create', { route: '/create-interesting', firstName, lastName, email, age, favoriteBeatle, iceCream, errors: req.errors, csrfToken: req.csrfToken() });
  } else {
    const newUser = { id: users.length + 1, firstName, lastName, email, age, favoriteBeatle, iceCream: iceCream === 'on' };
    users.push(newUser);
    res.redirect('/');
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
