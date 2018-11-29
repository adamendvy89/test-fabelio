<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Navbar></Navbar> -->
    <div class='container card'>
      <div class="card-content">
        <h1 class="title">Welcome to Fabelio Price Monitor</h1>
        <div class="field">
          <div class="container control">
            <input v-model ="productLink" class="input" type="text" placeholder="Input Fabelio product link"><br><br>
            <b><p v-if="loadingBar == true">Please wait....</p></b>
            <div v-if="loadingBar == true" class="loader"></div>
          </div>
        </div><br>
        <button @click="submitLink()" class="button is-warning">Submit Link</button>
      </div>
    </div>

    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Navbar
  },
  data: function (){
    return{
      productLink:'',
      loadingBar : false
    }
  },
  methods:{
    submitLink(){
      this.loadingBar = true
      axios.post('https://localhost:8000/product/new',{ productUrl: this.productLink })
      .then(({data})=>{
        console.log("product result",data)
        this.$router.push({ path: `/detail/${data._id}`})
        
      })
      .catch(err=>{
        this.loadingBar = false
        alert('Produk ini sudah ada')
      })
    }
  },
}
</script>
<style scoped>
.input{
  width: 900px;
}



.card{
  border-radius: 20px;
}


.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid hsl(48, 100%, 67%); 
    border-radius: 50%;
    margin-top: 20px;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>



