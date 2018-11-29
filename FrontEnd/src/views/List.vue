<template>
    <div class="product-list">
        <div class="content">
            <Post v-for="(product, index) in products" :key="index" :product='product' :index="index" class="post"></Post>
        </div>
    </div>
</template>

<script>

import Post from '@/components/Post.vue'


export default {
    data:function(){
        return{
            products:[]
        }
    },
    components:{
        Post
    },
    created:function(){
        axios.get("https://localhost:8000/product")
        .then(({data})=>{
            this.products = data
        })
        .catch(err=>{
            console.log(err)
        })
    },
    methods:{
        toDetail(productid){
            this.$router.push({ path: `/detail/${productid}`})
        }
    }
    
}
</script>

<style scoped>
.table{
    margin-top:30px;
    margin-bottom: 60px;
}

.post{
    margin-left: 150px;
    margin-right: 150px;
    
}
.content{
    margin-bottom: 50px !important
}

</style>
