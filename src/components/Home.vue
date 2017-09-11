<template>
 <div>
   <v-layout row>
     <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
       <v-progress-circular indeterminate class="primary--text" :width="7" :size="70" v-if="loading"></v-progress-circular>
     </v-flex>
   </v-layout>
   <v-layout row wrap v-if="!loading">
     <v-flex xs-12>
       <v-carousel>
         <v-carousel-item v-for="(slider,i) in sliders" v-bind:src="slider.imageUrl" :key="i" transition="fade"
                          reverseTransition="fade"></v-carousel-item>
       </v-carousel>
     </v-flex>
   </v-layout>
   <div class="col-xs-12 mt-3">
     <app-categories></app-categories>
   </div>
 </div>
</template>

<script>
  import Categories from './Category/Categories.vue'
export default {
    computed: {
      sliders () {
        return this.$store.getters.getSliders
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    components: {
      'app-categories': Categories
    }
}
</script>

