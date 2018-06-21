<template>
  <div id="app">
    <nav-header>
      <div slot="routerLink" class="header__routerWrapper">
        <router-link class="router-link" to="/">HOME</router-link>
        <router-link class="router-link" to="/order">ORDERS</router-link>
        <router-link class="router-link" to="/product">PRODUCT</router-link>
      </div>
    </nav-header>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    this.$store.commit('CREATE_FAKE_ORDER_LIST');
  },
  components: {
    'nav-header': Header
  }
}
</script>

<style lang="scss">
@import "./assets/styles/all.scss";
</style>
