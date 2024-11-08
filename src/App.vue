<template>
  <div id="app">
    <FirestoreExample />
    <AuthExemple />
  </div>

</template>

<script>
import FirestoreExample from './components/FirestoreExample.vue';
import AuthExemple from './components/AuthExample.vue';

export default {
  name : "App",
  component: {
    FirestoreExample,
    AuthExample,
  }
};
</script>
<style>
/* Ajout des styles personnalisés ici si nécessaire*/
</style>
