<template>
  <!--
  Le div app englobe la totalité de la page du navigateur
  -->
  <div id="app">
    <!--
    Code html permettant d'afficher le header
    NE PAS MODIFIER ICI
    -->
    <div id="header">
      <HeaderUi />
    </div>
    <!--
    Code html permettant d'afficher le contenu principal
    TODO Devra être modifié pour pouvoir afficher les différentes pages, à gérer aussi dans le script
    -->
    <div id="content">
      <view-material />
    </div>
    <!--
    Code html permettant d'afficher le footer
    NE PAS MODIFIER ICI
    -->
    <div id="footer">
      <FooterUi />
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
/* Variables permettant de modifier la taille du header et du footer */
:root{
  --tailleHeader : 10vh;
  --tailleFooter : 15vh;
}

/* Code CSS permettant de faire englober la page par le div app */
#app{
  background-color: #f9f9f9;
  position: relative;
  min-height: 100vh;
  min-width: 100vw;
}

/* Code CSS permettant de faire s'afficher le header correctement */
#header {
  height: var(--tailleHeader);
  background-color: lightgray;
  position: fixed;
  top: 0;
  width: 100%;
}

/* Code CSS permettant de gérer la zone contenant le contenu principal */
#content {
  /* Pouvoir scroller dans le contenu principal et éviter que le contenu dépasse de l'écran sur le côté droit*/
  overflow: scroll;
  overflow-wrap: break-word;

  width: 100%;
  top: var(--tailleHeader);
  bottom: var(--tailleFooter);
  position: fixed;
  padding: 10px;
}

/* Code CSS permettant de faire s'afficher le footer correctement */
#footer{
  height: var(--tailleFooter);
  background-color: lightgray;
  position: fixed;
  bottom: 0;
  width: 100%;
}



</style>
