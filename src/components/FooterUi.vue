<script setup>
</script>

<template>
  <div class="hozizontal">
    <div class="container">
      <p>Légal</p>
    </div>
    <div class="container">
      <p>Trademark</p>
    </div>
    <div class="container">
      <p>Version</p>
    </div>
    <div class="container">
      <div class="containerListe">
        <p>Contact</p>
        <br>
        <p>Administrateurs</p>
        <p>Développeurs</p>
      </div>
    </div>
    <div class="container">
      <div class="containerListe">
        <p>A propos</p>
        <br>
        <p>Ce site</p>
        <p>Notre entreprise</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hozizontal {
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: space-evenly;
  padding: 1%;
  font-size: 2.25vh;
}

.containerListe {
  color: black;
  align-items: center;
  width: inherit;
  height: inherit;
  overflow: scroll;
}

.container {
  display: inline-flex;
  align-items: center;
  color: black;
  height: inherit;
  width: inherit;
}

.container img{
  height: 100%;
}

</style>