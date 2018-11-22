const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName:{type:String, required:true},
    productDescription:{type:String, required:true},
    picUrl:{type:String, required:true},
    productPrice:[],
    productUrl:{type: String, required: true}
},{timestamps: true})

mongoose.model('product',productSchema)

const product = mongoose.model('product',productSchema)

module.exports = product