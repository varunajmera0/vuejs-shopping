<template>
  <div>
    <div class="card media mb-2" style="width: 80%; padding: 0px">
    <div class="media-left">
      <img class="media-object rounded" :src="item.imageUrl" height="100" width="100">
    </div>
    <div class="media-body">
      <h6 class="d-block">{{item.productName}}</h6>
      <strong>Quantity: {{item.quantity}} <br> Amount: {{item.quantity * item.price}}</strong>
    </div>
    <div class="media-right align-middle">
      <remove-from-cart :product="item"></remove-from-cart>
    </div>
  </div>
  </div>
</template>
<script>
  import RemoveCart from './removecart.vue'
  export default {
    props: ['item'],
    components: {
      'remove-from-cart': RemoveCart
    }
  }
</script>
