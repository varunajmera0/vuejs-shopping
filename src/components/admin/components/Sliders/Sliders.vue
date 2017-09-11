<template>
  <div class="container">
    <div class="row">
      <h4 class="primary--text">Create Slider</h4>
    </div>
    <div class="form-group">
      <form @submit.prevent="onCreateSliders">
        <div class="row">Title :
          <input type="text"
                 v-model="title"
                 required class="form-control">
        </div>
        <div class="row"> Image Url :
          <input type="text"
                 v-model="imageUrl"
                 required class="form-control">
        </div>
        <div class="row">
          <button class="primary btn btn-primary" :disabled="!formIsValid" type="submit">Create Slider</button>
        </div>
      </form>
    </div>
    <div class="row" v-for="slider in sliders" :key="slider.id">
      <div>
        Title : {{ slider.title }}
      </div>
      <div>
        <img :src="slider.imageUrl" height="130px" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        imageUrl: ''
      }
    },
    computed: {
      formIsValid () {
        return this.imageUrl !== ''
      },
      sliders () {
        return this.$store.getters.getSliders
      }
    },
    methods: {
      onCreateSliders () {
        if (!this.formIsValid) {
          return
        }
        const slider = {
          title: this.title,
          imageUrl: this.imageUrl
        }
        this.$store.dispatch('CreateSliders', slider)
        this.$store.dispatch('loadSliders')
        this.title = ''
        this.imageUrl = ''
      }
    }
  }
</script>
