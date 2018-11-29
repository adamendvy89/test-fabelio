<template>
    <div class="detail">
        <!-- <Navbar></Navbar> -->
        <div class="container card">
            <header class="card-header"/>
                <p class="card-header-title title">
                    {{this.productName}}
                </p>
            <div class="card content">
                <div class="columns">
                    <div class="column">
                        <img v-bind:src="this.productImage" >
                        Harga : 
                       <b> {{this.productPrice[0].price}}</b>
                    </div>
                    <div class="column">
                        {{this.productDescription}}
                    </div>
                </div>
                <button class="button is-warning" @click="activateModal()" type="button">Add Comment</button><br><br>
                <table class="table container is-striped  is-fullwidth">
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(eachPrice, index) in productPrice" :key="index">
                            <td>{{eachPrice.price}}</td>
                            <td>{{eachPrice.time}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <h2  v-if="this.allComments.length !== 0" class="comment-title title"> Comments</h2>
        <h2  v-if="this.allComments.length == 0" class="comment-title title"> No comment in this post</h2>
        <Comment class="comment" v-for="(comment,index) in allComments" :key="index" :comment="comment" :index="index"></Comment>


        <!--Modal-->

        <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">New Comment</p>
                    <button @click="closeModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <div class="control">
                        Title : 
                        <input v-model="comment_title" class="input is-info" type="text" placeholder="Title">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                        Content : 
                        <textarea v-model="comment_content" class="textarea" placeholder="e.g. Hello world"></textarea>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button @click="addComment" class="button is-warning">Create Comment</button>
                    <button @click="closeModal" class="button">Cancel</button>
                </footer>
            </div>
        </div>


    <!--MODAL END-->
    </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Comment from '@/components/Comment.vue'

export default {
    components:{
        Navbar, Comment
    },
    data:function(){
        return{
            productName:'',
            productImage:'',
            productDescription:'',
            productLink:'',
            productPrice:[],
            loadingBar : false,
            allComments:[],
            comment_content:'',
            comment_title:''
        }
    },
    created:function() {
        console.log(this.$route.params)
        this.getDetail()
        this.getComment()

    },
    methods:{
        getDetail(){
            axios.get(`http://test-fabelio.appspot.com/product/${this.$route.params.id}`)
            .then(({data})=>{
                this.productPrice = data.productPrice
                this.productImage = data.picUrl
                this.productName = data.productName
                this.productDescription = data.productDescription
                this.productLink = data.productUrl
            })
            .catch(err=>{
                console.log('error in getting products detail',err)
            })
        },
        getComment(){
            var param = this.$route.params.id
            console.log(param)
            axios.get(`http://test-fabelio.appspot.com/comment/${param}`)
                .then(({data})=>{
                   this.allComments=data 
                   console.log("ALL COMMENTS GET COMMENTS",this.allComments)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        addComment(){
            console.log(this.$route.params.id, this.con)
            axios.post("http://test-fabelio.appspot.com/comment/new",{
                productId:this.$route.params.id,
                content:this.comment_content,
                title:this.comment_title
            })
            .then(({data})=>{
                this.getComment()
                this.comment_content=''
                this.comment_title=''
                this.closeModal()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        activateModal(){
            $(".modal").addClass("is-active")
        },
        closeModal(){
            $(".modal").removeClass("is-active")
        },
    }
}
</script>

<style scoped>

.card-header-title {
    align-items: center;
    color: #363636;
    display: block;
    flex-grow: 1;
    font-weight: 700;
    padding: .75rem;
}

.card{
    margin-top: 20px;
    margin-bottom: 20px;
    
}

.columns{
    padding:30px;
}

.comment{
    margin-left: 200px;
    margin-right: 200px;
}

.comment-title{
    margin-bottom: 90px;
    margin-top: 90px;
}

</style>
