const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    productId:{type:Schema.Types.ObjectId, ref:'product'},
    title: {type:String, required:true},
    content : {type:String, required:true},
},{timestamps:true})

mongoose.model('comment',commentSchema)

const comment = mongoose.model('comment',commentSchema)

module.exports = comment

