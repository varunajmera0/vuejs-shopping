<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/">FLIPKART</router-link>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!userIsAuthenticated"><router-link to="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</router-link></li>
          <li v-if="!userIsAuthenticated"><router-link to="/signin"><span class="glyphicon glyphicon-lock"></span> Sign In</router-link></li>
          <li><router-link to="/checkout"><span class="glyphicon glyphicon-shopping-cart"></span> <span id="cart-badge">{{itemLength}} {{'item' | pluralize(itemLength)}}</span> </router-link></li>
          <li v-if="total"><a href="#"><span>Total Amt:</span> {{total}}</a></li>
          <li v-if="userIsAuthenticated"><a href="#" @click="onLogout"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    computed: {
      total () {
        return this.$store.getters.getTotal
      },
      itemLength () {
        return this.$store.getters.itemLength
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
<style>

  #cart-badge{
    font-size: 12px;
    background: red;
    color: #fff;
    padding: 0 5px;
    vertical-align: top;
  }
</style>
