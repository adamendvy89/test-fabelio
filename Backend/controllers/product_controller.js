const Product = require ("../models/product")
const puppeteer = require ('puppeteer')
const $ = require ('cheerio')
const date = new Date()
const hour = date.getHours()
const mins = date.getMinutes()
const day = date.getDate()
const month = date.getMonth()
const year = date.getFullYear()


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

            let getPicUrl = await $('.fotorama__loaded--img', bodyHTML).attr('href')
            let productDescription = $('.product-info__description',bodyHTML).text().trim()

            console.log(productDescription)

            let clock = hour +"." + mins + ', ' + day + '-' + month + '-' + year

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

    updateHourly:()=>{
        Product.find({})
        .then(async allProducts=>{
            const currentDate = new Date()
            const currentMins = currentDate.getMinutes()
            for(const eachProduct of allProducts){
                console.log("AWAL LOOP",eachProduct.createdMinutes)
                console.log("Current mins",currentMins)

                var updateTime = hour +"." + mins + ', ' + day + '-' + month + '-' + year
                if(eachProduct.createdMinutes == currentMins){
                    console.log("CREATED MINS",eachProduct.createdMinutes)
                    console.log("MINS",mins)
                    const browser = await puppeteer.launch();
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