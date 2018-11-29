var express = require('express');
var router = express.Router();
var { addNewProduct,getAllProducts,getProductById, updateProduct, updateHourly } = require ('../controllers/product_controller')


const cron = require ("node-cron")


router.post('/new',addNewProduct)
router.get('/',getAllProducts)
router.get('/:id',getProductById)
router.post('/change/:id',updateProduct)
cron.schedule("* * * * *", updateHourly)


module.exports = router;    