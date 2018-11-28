<template>
    <div class="post">
        <div class="box content">
            <article class="post">
                <h4>{{product.productName}}</h4>
                <div class="media">
                    <div class="media-left">
                        <p class="image is-128x128">
                            <img v-bind:src="product.picUrl" >
                        </p>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                {{product.productPrice[product.productPrice.length -1].price}}
                                
                            </p>
                            Link: <a @click="toDetail(product._id)">
                                {{product.productUrl}}>
                            </a>
                            <p>
                                {{product.productDescription}}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
export default {
    props:['product'],
    methods:{
        toDetail(productid){
            this.$router.push({ path: `/detail/${productid}`})
        }
    }

}
</script>

<style>

</style>
