<template>
  <button type="button" class="close"
          @click="removeFromCart">
    &times;
  </button>
</template>
<script>
  export default {
    props: {
      product: Object
    },
    methods: {
      removeFromCart () {
        this.$store.dispatch('removeFromCart', {product: this.product})
      }
    }
  }
</script>
