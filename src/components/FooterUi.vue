<script setup>
</script>

<template>
  <!--
  Ici le code html correspondant au footer de notre site
  Le div de classe "horizontal" permet de faire se suivre les élments du footer de manière horizontale plutôt que verticale,
    et de les répartir de manière homogène
   -->
  <div class="hozizontal">
    <!--
    Chaque div de classe "container" correspond à une zone du footer contenant des élèments
    Ce sont les divs container qui sont répartis uniformément dans le div horizontal
    -->
    <div class="container">
      <!--
      Chaque div de classe "elements" est enfant direct d'un container et représente les éléments contenus dans celui-ci
      Cette organisation permet de centrer les élèments verticalement au sein du footer
      -->
      <div class="elements">
        <!-- TODO ajouter lien vers page correspondante ou supprimer-->
        <p>Légal</p>
      </div>
    </div>
    <div class="container">
      <div class="elements">
        <!-- TODO ajouter lien vers page correspondante ou supprimer (ou remplacer direct par la trademark)-->
        <p>Trademark</p>
      </div>
    </div>
    <div class="container">
      <div class="elements">
        <!-- TODO remplacer par numéro de version-->
        <p>Version</p>
      </div>
    </div>
    <div class="container">
      <div class="elements">
        <p>Contact</p>
        <br>
        <!-- TODO ajouter lien vers page correspondante ou supprimer-->
        <p>Administrateurs</p>
        <!-- TODO ajouter lien vers page correspondante ou supprimer-->
        <p>Développeurs</p>
      </div>
    </div>
    <div class="container">
      <div class="elements">
        <p>A propos</p>
        <br>
        <!-- TODO ajouter lien vers page correspondante ou supprimer-->
        <p>Ce site</p>
        <!-- TODO ajouter lien vers page correspondante ou supprimer-->
        <p>Notre entreprise</p>
      </div>
  </div>
  </div>
</template>

<style scoped>
/* Code CSS permettant de gérer le div horizontal et l'espacement de ses éléments */
.hozizontal {
  /* Définir la taille du footer (la même que celle définie dans App.vue) */
  height: inherit;
  width: inherit;

  /* Faire en sorte que les éléments s'organisent de manière horizontale et soient répartis de manière homogène */
  display: flex;
  justify-content: space-evenly;

  /*Eviter que les éléments touchent les bords de l'écran*/
  padding-inline: 1vw;


  /* Eviter que les textes du footer dépassent de celui-ci ("max-font-size") n'est pas reconnu
   TODO voir comment implémenter max-font-size
   Les textes du footer sont de couleur noir
   */
  font-size: 2.25vh;
  color: black;
}

/* Code CSS permettant de gérer les containers pour qu'ils centrent les éléments qu'ils contiennent */
.container {
  /* Il n'est pas nécéssaire de définir de taille pour les containers, ils prennent l'espace nécéssaire pour englober les élèments qu'ils contiennent*/

  display: inline-flex;
  align-items: center;
}

/* Code CSS permettant de gérer les élèments contenus dans un container */
.elements {

  /* Pas nécéssaire de définir la taille des élèments */

  /* Si les éléments d'un container débordent lu footer, permet de naviguer dans ces élèments au lieu de les faire disparaitre ou se superposer sur le contenu principal
   Il faut tout de même éviter de mettre trop d'élèments dans un container car même si cette solution fonctionne, cela nuit à l'ergonomie de la solution
   */
  overflow: scroll;
}

/* Code CSS permettant d'éviter qu'une image contenue dans le footer en dépasse et se superpose au contenu principal */
.container img{
  height: 100%;
}

</style>