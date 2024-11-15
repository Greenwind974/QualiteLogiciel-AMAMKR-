<template>
  <div class="is-flex is-align-items-center is-justify-content-center" id="app">
    <LoginPage />
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue';

export default {
  name : "App",
  components: {
    LoginPage
  }
}
</script>

<style>
/* Ajout des styles personnalisés ici si nécessaire*/
</style>
