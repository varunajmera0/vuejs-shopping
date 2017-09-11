<template>
  <div>
   <div v-if="subSum">
     <div class="col-xs-9">
       <shopping-cart-item  v-for="item in items" :item="item" :key="item.productId"></shopping-cart-item>
     </div>
     <div class="col-xs-3">
       <app-products-summary :product="subSum" :taxes="taxes" :total="total"></app-products-summary>
       <button :disabled="!subSum">
         <form action="/" method="GET">
           <stripe-checkout
             :stripe-key="key"
             :product="iis" >
           </stripe-checkout>
         </form>
       </button>
     </div>
   </div>
    <div v-else class="col-xs-12">
      <h1 class="text-center" style="margin-top: 15%"> Sorry! No Item is in the Cart! :( </h1>
    </div>
  </div>
</template>
<script>
  import shoppingcartitem from '../Products/shoppingcartitem.vue'
  import ProductsSummary from '../Products/ProductsSummary.vue'
  export default {
    data () {
      return {
        key: 'pk_test_T2HRLKE8vjFD2EqwPyGiyiGd'
      }
    },
    computed: {
      items () {
        return this.$store.getters.getShopingCart.map(function (obj) {
          return {
            productId: obj.id,
            imageUrl: obj.imageUrl,
            productName: obj.productName,
            quantity: obj.quantity
          }
        })
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
      iis () {
        return this.$store.getters.getShopingCart.map(function (obj) {
          return {
            productId: obj.id,
            image: obj.imageUrl
          }
        })
      }
    },
    components: {
      'shopping-cart-item': shoppingcartitem,
      'app-products-summary': ProductsSummary
    },
    methods: {
      gotToken (token) {

      }
    }
  }
</script>
