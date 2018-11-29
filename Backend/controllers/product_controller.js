const Product = require ("../models/product")
const puppeteer = require ('puppeteer')
const $ = require ('cheerio')


module.exports = {
    getAllProducts:(req,res,next)=>{
        Product.find({})
        .sort({year:'desc'})
        .then(products=>{
            // console.log(products)
            console.log(products)
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

            const browser = await puppeteer.launch({
                args: ['--no-sandbox']
            });
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

            let getPicUrl = await $('.fotorama__loaded--img', bodyHTML).attr('href')
            let productDescription = $('.product-info__description',bodyHTML).text().trim()

            console.log(productDescription)

            let date = new Date()
            let hour = date.getHours()
            let mins = date.getMinutes()
            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()
            

            let clock = hour +"." + mins + ', ' + day + '-' + month + '-' + year
            console.log(clock)

            let productData = {
                productName: getProductName,
                productDescription: productDescription,
                productPrice: [{
                    price: productPrice,
                    time: clock
                }],
                productUrl: req.body.productUrl,
                createdMinutes: mins,
                picUrl: getPicUrl
            }
            await browser.close();
            

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
        const browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(req.body.productUrl)
        let bodyHTML = await page.evaluate(() => document.body.innerHTML);

        //get product Id
        let htmlFinalPrice = $('.price-final_price',bodyHTML)
        let productId = $(htmlFinalPrice).data('product-id')

        //get product price
        let productPrice = $(`#product-price-${productId}`, bodyHTML).text()

        let date = new Date()
        let hour = date.getHours()
        let mins = date.getMinutes()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()


        let clock = hour +"." + mins + ', ' + day + '-' + month + '-' + year

        console.log(clock)

        let newProductPriceData = {
            price: productPrice,
            time: clock
        }

        let newProductPrice = req.body.productPrice
        newProductPrice.push(newProductPriceData)

        Product.findById(req.params.id)
        .then(product=>{
            product.set({ productPrice: newProductPrice})
            product.save()
            .then(updated=>{
                res.status(200).send(updated)
            })
            .catch(err=>{
                res.status(400).send(err)
            })

        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    updateHourly:(req,res,next)=>{
        Product.find({})
        .then(async allProducts=>{
            const currentDate = new Date()
            const currentMins = currentDate.getMinutes()
            for(const eachProduct of allProducts){
                let date = new Date()
                let hour = date.getHours()
                let mins = date.getMinutes()
                let day = date.getDate()
                let month = date.getMonth()
                let year = date.getFullYear()
                var updateTime = hour +"." + mins + ', ' + day + '-' + month + '-' + year
                if(eachProduct.createdMinutes == currentMins){
                    const browser = await puppeteer.launch({
                        args: ['--no-sandbox']
                    });
                    const page = await browser.newPage();

                    await page.goto(eachProduct.productUrl)
                    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
                    let htmlFinalPrice = await $('.price-final_price',bodyHTML)
                    let productId = await $(htmlFinalPrice).data('product-id')
                    let productPrice = await $(`#product-price-${productId}`, bodyHTML).text()

                    let newProductPriceData = {
                        price: productPrice,
                        time: updateTime
                    }

                    let newProductPrice = eachProduct.productPrice
                    newProductPrice.push(newProductPriceData)
                    console.log("each product id".eachProduct._id)
                    Product.findById(eachProduct._id)
                    .then(product=>{
                        product.set({ productPrice: newProductPrice})
                        product.save()
                        .then(updated=>{
                            console.log("updated")
                        })
                        .catch(err=>{
                            console.log("error while finding by id",err)
                        })
                    })
                    .catch(err=>{
                        console.log("error .find",err)
                    })
            
                }
                else{
                    res.send("do nothing")
                    console.log("do nothing", eachProduct._id)
                }
            }
            // res.send("done")
        })
        .catch(err=>{
            console.log(err)
            // res.send(err)
        })
    }


}