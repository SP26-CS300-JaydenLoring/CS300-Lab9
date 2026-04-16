const express            = require('express');
const router             = express.Router();
const entriesController  = require('../controllers/entriesController');
const authenticate       = require('../middleware/authenticate');   // <-- add this

router.get('/', authenticate, entriesController.getAll);   // <-- add authenticate here

module.exports = router;