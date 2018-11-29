<template>
    <div class="postbody">
        <article  class="post">
            <div class="box content">
                    <h4>{{comment.title}}</h4>
                    <div class="media">
                        <div class="media-content">
                            <div v-html="comment.content" class="content">
                                <p></p>
                            </div>
                        </div>
                        <div class="media-right">
                           <!-- {{comment.userId._id}} and {{currentUser}} -->
                            <button type="button" @click="deleteComment(comment._id)" class="button"><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
            </div>
        </article><br>
    </div>
</template>

<script>


export default {
    props:['comment'],
    data:function(){
        return{
            
        }
    },
    methods:{
        deleteComment(commentid){
            console.log("KETRIGGER GA")
            let params = this.$route.params.id
            console.log("params",params)
            axios.delete(`https://fabelio-test.appspot.com/comment/delete/${commentid}`)
            .then(({data})=>{
                console.log("DATA DELETE COMMENT",data)
                window.location.reload()
                this.getDetails()
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>
h4{
    text-align: left;
}

</style>
