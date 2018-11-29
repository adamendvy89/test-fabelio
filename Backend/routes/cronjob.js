var express = require('express');
var router = express.Router();
var {updateHourly} = require ('../controllers/cron_controller')

/* GET users listing. */
router.get('/', updateHourly);

module.exports = router;
