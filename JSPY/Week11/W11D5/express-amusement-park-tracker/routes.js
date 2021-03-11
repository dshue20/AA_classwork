const express = require('express');
const db = require('./db/models');

const router = express.Router();

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/parks', asyncHandler(async (req, res) => {
  const parks = await db.Park.findAll({ order: [['parkName', 'ASC']] });
  res.render('park-list', { title: "Parks", parks });
}));

router.get('/park/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const park = await db.Park.findByPk(id);
  res.render('park-detail', { title: "Park Detail", park});
}));

router.get('/park/add', (req, res) => {
  const park = db.Park.build();
  res.render('park-add', { title: "Add Park", park });
});

router.post('/park/add', asyncHandler(async (req, res) => {

}));

if (process.env.NODE_ENV !== "production") {
  router.get("/error-test", () => {
    throw new Error("This is a test error.");
  });
}

module.exports = router;