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
}

#app{
  background-color: #f9f9f9;
  position: relative;
  min-height: 100vh;
  min-width: 100vw;
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
  box-sizing: border-box;
}



</style>
