<template>
  <div id="app">
    <div id="header">
      <HeaderUi />
    </div>
    <div id="belowHeader">
      <div id="content">
        <view-material />
      </div>
      <div id="footer">
        <FooterUi />
      </div>
    </div>
  </div>
</template>

<script>
import ViewMaterial from './components/ViewMaterial.vue';
import FooterUi from "@/components/FooterUi.vue";
import HeaderUi from "@/components/HeaderUi.vue";

export default {
  name : "App",
  components: {
    HeaderUi,
    FooterUi,
    ViewMaterial
  }
}
</script>

<style>
/* Ajout des styles personnalisés ici si nécessaire*/
:root{
  --tailleHeader : 10vh;
  --tailleFooter : 15vh;
  --tailleBody : 75vh;
}

#app{
  background-color: #f9f9f9;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#header {
  height: var(--tailleHeader);
  background-color: lightgray;
  position: fixed;
  top: 0;
  width: 100%;
}

#belowHeader{
  display: flex;
  overflow: scroll;
  width: 100%;
  top: var(--tailleHeader);
  position: fixed;
  padding-top: 3vh;
}

#content {
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

#footer{
  height: var(--tailleFooter);
  background-color: lightgray;
  position: fixed;
  bottom: 0;
  width: 100%;
}



</style>
