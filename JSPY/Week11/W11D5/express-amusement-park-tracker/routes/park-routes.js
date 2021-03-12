const express = require('express');
const db = require('../db/models');
const csrf = require('csurf');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const { check, validationResult } = require('express-validator');
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

router.get('/parks', asyncHandler(async (req, res) => {
  const parks = await db.Park.findAll({ order: [['parkName', 'ASC']] });
  res.render('park/park-list', { title: "Parks", parks });
}));

router.get('/park/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const park = await db.Park.findByPk(id, {
    include: {
      model: db.Attraction,
      as: 'attractions'
    }
  });
  console.log(park.attractions);
  res.render('park/park-detail', { title: "Park Detail", park});
}));

router.get('/park/add', csrfProtection, (req, res) => {
  const park = db.Park.build();
  res.render('park/park-add', { title: "Add Park", park, csrfToken: req.csrfToken() });
});

const parkValidators = [
  check('parkName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Park Name')
    .isLength({ max: 255 })
    .withMessage('Park Name must not be more than 255 characters long'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for City')
    .isLength({ max: 100 })
    .withMessage('City must not be more than 100 characters long'),
  check('provinceState')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Province/State')
    .isLength({ max: 100 })
    .withMessage('Province/State must not be more than 100 characters long'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Country')
    .isLength({ max: 100 })
    .withMessage('Country must not be more than 100 characters long'),
  check('opened')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Opened')
    .isISO8601()
    .withMessage('Please provide a valid date for Opened'),
  check('size')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Size')
    .isLength({ max: 100 })
    .withMessage('Size must not be more than 100 characters long'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Description'),
];

router.post('/park/add', csrfProtection, parkValidators, asyncHandler(async (req, res) => {
  const { parkName, city, provinceState, country, opened, size, description } = req.body;
  const park = db.Park.build({parkName, city, provinceState, country, opened, size, description});

  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()){
    await park.save();
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map(e => e.msg);
    res.render('park/park-add', { title: "Add Park", park, errors, csrfToken: req.csrfToken() });
  }
}));

router.get('/park/edit/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const park = await db.Park.findByPk(id);
  res.render('park/park-edit', { title: "Edit Park", park, csrfToken: req.csrfToken() });
}));

router.post('/park/edit/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const parkToUpdate = await db.Park.findByPk(id);

  const { parkName, city, provinceState, country, opened, size, description } = req.body;
  const park = {parkName, city, provinceState, country, opened, size, description};

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()){
    console.log('***********************************************');
    await parkToUpdate.update(park);
    res.redirect(`/park/${id}`);
  } else {
    const errors = validatorErrors.array().map(e => e.msg);
    park.id = id;
    res.render('park/park-edit', { title: 'Edit Park', park, errors, csrfToken: req.csrfToken() });
  }
}));

router.get('/park/delete/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
  const id = parseInt(req.params.id);
  const park = await db.Park.findByPk(id);
  res.render('park/park-delete', { title: 'Delete Park', park, csrfToken: req.csrfToken() });
}));

router.post('/park/delete/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
  const id = parseInt(req.params.id);
  const park = await db.Park.findByPk(id);
  await park.destroy();
  res.redirect('/parks');
}));

module.exports = router;