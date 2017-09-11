<template>
  <div class="row">
    <div class="col-xs-9">
      <app-products-list v-for="(product, i) in products" v-if="product !== undefined" :product="product" :key="i"></app-products-list>
    </div>
    <div class="col-xs-3" v-if="subSum">
      <h4>Cart</h4>
      <h5>{{'Item' | pluralize(itemLength)}} Summary </h5>
      <shopping-cart-item  v-for="item in items" :item="item" :key="item.id"></shopping-cart-item>
      <app-products-summary :product="subSum" :taxes="taxes" :total="total"></app-products-summary>
      <button class="btn btn-success" :disabled="!itemLength" @click="onCheckOut">Check Out!</button>
    </div>
  </div>
</template>

<script>
  import ProductsSummary from './ProductsSummary.vue'
  import shoppingcartitem from './shoppingcartitem.vue'
  import ProductsList from './ProductsList.vue'
  export default {
    props: ['cid'],
    computed: {
      products () {
        console.log(this.cid)
        console.log(this.$store.getters.loadedProducts(this.cid))
        return this.$store.getters.loadedProducts(this.cid)
      },
      items () {
        console.log(this.$store.getters.getShopingCart)
        return this.$store.getters.getShopingCart
      },
      subSum () {
        return this.$store.getters.getSubtotal
      },
      taxes () {
        return this.$store.getters.getTaxes
      },
      total () {
        return this.$store.getters.getTotal
      },
      itemLength () {
        return this.$store.getters.itemLength
      }
    },
    components: {
      'app-products-summary': ProductsSummary,
      'shopping-cart-item': shoppingcartitem,
      'app-products-list': ProductsList
    },
    methods: {
      onCheckOut () {
        this.$router.push('/checkout')
      }
    },
    created () {
//      this.$store.dispatch('nullAddedArray')
    }
  }
</script>
