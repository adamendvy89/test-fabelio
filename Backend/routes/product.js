var express = require('express');
var router = express.Router();
var { addNewProduct,getAllProducts,getProductById, updateProduct } = require ('../controllers/product_controller')
// const rp = require('request-promise');

// const url = 'https://fabelio.com/ip/tromso-dining-table-c.html'

router.post('/new',addNewProduct)
router.get('/',getAllProducts)
router.get('/:id',getProductById)
router.post('/change/:id',updateProduct)



module.exports = router;    