const express = require ('express');
const router = express.Router();

router.get('*', (req, res) => {
  res.send(req.path.substring(1).toUpperCase());
});

module.exports = router;