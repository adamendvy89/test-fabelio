var express = require('express');
var router = express.Router();

var {
    newComment,
    deleteComment,
    getCommentByPostId
  }=require('../controllers/comment_controller')


router.post('/new',newComment)
router.delete('/delete/:id',deleteComment)
router.get('/:productid',getCommentByPostId)   

module.exports = router;
