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
                <button class="button is-warning" @click="fetchNewPrice()" type="button">Fetch new price</button><br><br>
                <b><p v-if="loadingBar == true">Fetching new price...</p></b><br>
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
    </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'

export default {
    components:{
        Navbar
    },
    data:function(){
        return{
            productName:'',
            productImage:'',
            productDescription:'',
            productLink:'',
            productPrice:[],
            loadingBar : false
        }
    },
    created:function() {
        console.log(this.$route.params)
        this.getDetail()

    },
    methods:{
        getDetail(){
            axios.get(`http://localhost:5000/product/${this.$route.params.id}`)
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
        fetchNewPrice(){
            this.loadingBar = true
            let newProductUpdate = {
                productPrice : this.productPrice,
                picUrl : this.productImage,
                productName : this.productName,
                productDescription : this.productDescription,
                productUrl: this.productLink
            }
            console.log(newProductUpdate)
            axios.post(`http://localhost:5000/product/change/${this.$route.params.id}`,newProductUpdate)
            .then(({data})=>{
                this.loadingBar = false
                this.getDetail()
                console.log(data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
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
    margin-bottom: 40px;
    
}

.columns{
    padding:30px;
}

</style>
