const mongoose = require ("mongoose")
const Schema = mongoose.Schema
const time = new Date()
const CommentPost = require ("./comment")

const productSchema = new Schema({
    productName:{type:String, required:true},
    productDescription:{type:String, required:true},
    picUrl:{type:String, required:true},
    productPrice:[],
    productUrl:{type: String, required: true, unique:true},
    createdMinutes:{type:Number, required: true}
},{timestamps: true})

// productSchema.pre('remove',function(next){
//     CommentPost.remove({})
//     .then(post=>{
//         next()
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })


mongoose.model('product',productSchema)

const product = mongoose.model('product',productSchema)

module.exports = product