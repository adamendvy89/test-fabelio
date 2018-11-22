const Product = require ("../models/product")
const puppeteer = require ('puppeteer')
const $ = require ('cheerio')

module.exports = {
    getAllProducts:(req,res,next)=>{
        Product.find({})
        .sort({year:'desc'})
        .then(products=>{
            // console.log(products)
            res.status(200).send(products)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    getProductById:(req,res,next)=>{
        Product.findById(req.params.id)
        .then(products=>{
            res.status(200).send(products)
        })
        .catch(err=>{
            res.status(404).send(err)
        })
    },

    addNewProduct:async(req,res,next)=>{
        // (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(req.body.productUrl)
            let bodyHTML = await page.evaluate(() => document.body.innerHTML);

            let getProductName = $('.page-title',bodyHTML).text()
            console.log("Product Name",getProductName)

            //get product Id
            let htmlFinalPrice = $('.price-final_price',bodyHTML)
            let productId = $(htmlFinalPrice).data('product-id')

            //get product price
            let productPrice = $(`#product-price-${productId}`, bodyHTML).text()
            console.log("PRODUCT PRICE",productPrice)

            //slice the price, get final price
            // let halfProductPriceLength = productPrice.length/2
            // let finalProductPrice = productPrice.slice(0, halfProductPriceLength)

            let getPicUrl = await $('.fotorama__loaded--img', bodyHTML).attr('href')
            let productDescription = $('.product-info__description',bodyHTML).text().trim()

            console.log(productDescription)

            var date = new Date()
            var hour = date.getHours()
            var mins = date.getMinutes()
            var day = date.getDate()
            var month = date.getMonth()
            var year = date.getFullYear()
            var clock = hour +"." + mins + ', ' + day + '-' + month + '-' + year

            let productData = {
                productName: getProductName,
                productDescription: productDescription,
                productPrice: [{
                    price: productPrice,
                    time: clock
                }],
                productUrl: req.body.productUrl,
                picUrl: getPicUrl
            }


            await browser.close();
            
        // })();

        let newProduct = new Product(productData)
        console.log(JSON.stringify(newProduct))

        newProduct.save()
        .then(product=>{
            res.status(200).json(product)
        })
        .catch(err=>{
            console.log(err)
            res.status(400).send(err)
        })

    },

    deleteProduct:(req,res,next)=>{
        Product.findByIdAndRemove(req.params.id)
        .then(product=>{
            res.status(200).json({message:"this product deleted",deleted:product})
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    updateProduct: async (req,res,next)=>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(req.body.productUrl)
        let bodyHTML = await page.evaluate(() => document.body.innerHTML);

        //get product Id
        let htmlFinalPrice = $('.price-final_price',bodyHTML)
        let productId = $(htmlFinalPrice).data('product-id')

        //get product price
        let productPrice = $(`#product-price-${productId}`, bodyHTML).text()

        //ini array of object

        var date = new Date()
        var hour = date.getHours()
        var mins = date.getMinutes()
        var day = date.getDate()
        var month = date.getMonth()
        var year = date.getFullYear()
        var clock = hour +"." + mins + ', ' + day + '-' + month + '-' + year

        console.log(clock)

        let newProductPriceData = {
            price: productPrice,
            time: clock
        }

        let newProductPrice = req.body.productPrice
        newProductPrice.push(newProductPriceData)

        let newProductData = {
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: newProductPrice ,
            productUrl: req.body.productUrl,
            picUrl: req.body.picUrl
        }

        Product.findByIdAndUpdate(req.params.id, newProductData)
        .then(product=>{
            res.status(200).json(product)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    }

}