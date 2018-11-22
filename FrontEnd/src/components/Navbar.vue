<template>
    <div id="nav">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/" class="navbar-item">
                        Home
                    </router-link>
                    <router-link to="/list" class="navbar-item">
                        Product List
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

// .navbar{
//     margin-bottom: 30px;
// }

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
