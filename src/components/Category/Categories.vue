<template>
  <div>
    <div class="row">
      <div class="card col-xs-3" style="width: 22rem;  margin: 0px 0px 10px 60px; padding: 0px;"  v-for="cat in categories" :key="cat.id" v-if="cat.id" @click="onLoadProduct(cat.id)">
        <img class="card-img-top" :src="cat.imageUrl" alt="Card image cap" height="200" width="100%">
        <div class="card-block">
          <h6 class="card-title text-center">{{ cat.categoryName }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      categories () {
        return this.$store.getters.getCategories
      }
    },
    methods: {
      onLoadProduct (catId) {
        this.$router.push('/products/' + catId)
      }
    }
  }
</script>
