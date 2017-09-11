<template>
  <div>
    <app-header></app-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Header from './Shared/Header.vue'
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    components: {
      'app-header': Header
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
