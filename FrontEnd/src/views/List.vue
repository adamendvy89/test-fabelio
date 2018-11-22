<template>
    <div class="product-list">
        <table class="table container is-striped  is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Price</th>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="index">
                    <td><b>{{index+1}}</b></td>
                    <td>{{product.productPrice[product.productPrice.length -1].price}}</td>
                    <td>{{product.productName}}</td>
                    <td @click="toDetail(product._id)"><a>{{product.productUrl}}</a></td>
                    <td>{{product.productDescription}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data:function(){
        return{
            products:[]
        }
    },
    created:function(){
        axios.get("http://localhost:5000/product")
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

</style>
