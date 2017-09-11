<template>
  <div class="card col-xs-3" style="width: 20rem; padding: 0px; margin: 0px 0px 10px 40px;">
    <img class="card-img-top" :src="product.imageUrl" style="width: 100%; height: 170px;" alt="Card image cap">
    <div class="card-block" style="padding: 10px;">
      <h4 class="card-title"><i>{{ product.productName }}</i></h4>
      <p class="card-text"><strong>Quantity : </strong><span>{{ product.quantity }}</span></p>
      <p class="card-text"><strong>Price : </strong><span class="text-center">{{ product.price }}</span></p>
      <span>Item(s):</span><input type="number" v-model="qnt" class="form-control" placeholder="Want More Than 1">
      <strong v-if="!product.quantity">Out Of Stock</strong>
      <br>
      <button class="btn btn-danger" @click="ItemAdded(product.id)" :disabled="!product.quantity" style="margin-left: 0px;">Add Item</button>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['product'],
    data () {
      return {
        qnt: ''
      }
    },
    methods: {
      ItemAdded (pid) {
        let qt = this.qnt
        if (qt === '') qt = 1
        console.log(qt)
        this.$store.dispatch('ItemAdded', {pid: pid, qnt: qt})
        this.$store.dispatch('AddToCart', {pid: pid, qnt: qt})
      }
    }
  }
</script>
