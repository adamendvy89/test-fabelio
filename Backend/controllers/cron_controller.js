const Product = require ("../models/product")
const puppeteer = require ('puppeteer')
const $ = require ('cheerio')

module.exports={
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
                    console.log("CREATED MINS",eachProduct.createdMinutes)
                    console.log("MINS",mins)
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