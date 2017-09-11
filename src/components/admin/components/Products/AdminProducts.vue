<template>
  <div class="container">
    <div class="row">
      <h4 class="primary--text">Create Product</h4>
    </div>
    <div class="form-group">
      <form @submit.prevent="onCreateProduct">
        <div class="row"> Category Name :
          <select name="subcat" v-model="subcat" class="form-control">
            <option v-for="cat in categories" :value="cat.id">{{cat.categoryName}}</option>
          </select>
        </div>
        <div class="row"> Product Name :
          <input type="text"
                 v-model="productName"
                 required class="form-control">
        </div>
        <div class="row"> Image Url :
          <input type="text"
                 v-model="imageUrl"
                 required class="form-control">
        </div>
        <div class="row"> Price :
          <input type="number"
                 name="price"
                 label="Price"
                 id="price"
                 v-model="price"
                 required class="form-control">
        </div>
        <div class="row"> Quantity :
          <input type="number"
                 v-model="quantity"
                 required class="form-control">
        </div>
        <div class="row">
          <button class="primary btn btn-primary" :disabled="!formIsValid" type="submit">Create Product</button>
        </div>
      </form>
    </div>
    <div class="row" v-for="product in products" :key="product.id">
      <div>
        categoryName : {{ product.categoryName.categoryName }}
      </div>
      <div>
        productName : {{ product.productName }}
      </div>
      <div>
        Price : {{ product.price }}
      </div>
      <div>
        Quantity : {{ product.quantity }}
      </div>
      <div>
        <img :src="product.imageUrl" height="130px" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        subcat: '',
        productName: '',
        imageUrl: '',
        price: '',
        quantity: ''
      }
    },
    computed: {
      formIsValid () {
        return this.productName !== '' && this.imageUrl !== '' && this.price !== '' && this.quantity !== ''
      },
      categories () {
        return this.$store.getters.getCategories
      },
      products () {
        return this.$store.getters.getProducts
      }
    },
    methods: {
      onCreateProduct () {
        if (!this.formIsValid) {
          return
        }
        const prodcats = {
          categoryId: this.subcat,
          productName: this.productName,
          imageUrl: this.imageUrl,
          price: this.price,
          quantity: this.quantity
        }
        this.$store.dispatch('CreateProduct', prodcats)
        this.$store.dispatch('loadProducts')
      }
    }
  }
</script>
