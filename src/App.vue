<template>
  <div class="is-flex is-align-items-center is-justify-content-center" id="app">
    <view-material />
  </div>
</template>

<script>
import ViewMaterial from './components/ViewMaterial.vue';

export default {
  name : "App",
  components: {
    ViewMaterial
  }
}
</script>

<style>
/* Ajout des styles personnalisés ici si nécessaire*/
#app{
  background-color: #f9f9f9;
  height: 100vh;
}



</style>
