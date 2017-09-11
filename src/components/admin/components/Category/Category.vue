<template>
  <div class="container">
    <div class="row">
      <h4 class="primary--text">Create Category</h4>
    </div>
    <div class="form-group">
      <form @submit.prevent="onCreateCategory">
        <div class="row"> Category Name :
          <input type="text"
            v-model="categoryName"
            required class="form-control">
        </div>
        <div class="row"> Image Url :
            <input type="text"
              v-model="imageUrl"
              required class="form-control">
        </div>
        <div class="row">
            <button class="primary btn btn-primary" :disabled="!formIsValid" type="submit">Create Category</button>
        </div>
      </form>
    </div>
    <div class="row" v-for="cat in categories" :key="cat.id">
      <div>
        name : {{ cat.categoryName }}
      </div>
      <div>
        <img :src="cat.imageUrl" height="130px" alt="">
      </div>
    </div>
  </div>
</template>

  <script>
    export default {
      data () {
        return {
          categoryName: '',
          imageUrl: ''
        }
      },
      computed: {
        formIsValid () {
          return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
        },
        categories () {
          return this.$store.getters.getCategories
        }
      },
      methods: {
        onCreateCategory () {
          if (!this.formIsValid) {
            return
          }
          const cats = {
            categoryName: this.categoryName,
            imageUrl: this.imageUrl
          }
          this.$store.dispatch('CreateCategory', cats)
          this.$store.dispatch('loadCategories')
        }
      }
    }
  </script>
