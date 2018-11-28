const Comment = require ('../models/comment')

module.exports={

    getCommentByPostId:(req,res,next)=>{
        Comment.find({"productId":req.params.productid})
        .sort({createdAt:'desc'})
        .populate('productId')
        .exec()
        .then(comment=>{
            res.status(200).json(comment)
        })
        .catch(err=>{
            console.log(err)
            res.status(400).send(err)
        })
    },

    newComment:(req,res,next)=>{
        let newComment = new Comment({
            productId:req.body.productId,
            content:req.body.content,
            title:req.body.title
        })

        newComment.save()
        .then(comment=>{
            res.status(200).json(comment)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    deleteComment:(req,res,next)=>{
        Comment.findByIdAndRemove(req.params.id)
        .then(comment=>{
            res.status(200).json(comment)
            console.log(comment)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    }

}