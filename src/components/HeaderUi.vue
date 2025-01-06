<script setup>

</script>

<template>
  <!--
  Ici le code html correspondant au header de notre site
  Le div de classe "horizontal" permet de faire se suivre les élments du header de manière horizontale plutôt que verticale,
    et de les répartir de manière homogène
   -->
 <div class="hozizontal" id="header">
   <!--
   Chaque div de classe "container" correspond à une zone du header contenant des élèments
   Ce sont les divs container qui sont répartis uniformément dans le div horizontal
   -->
   <div class="container">
     <!--
     Chaque div de classe "elements" est enfant direct d'un container et représente les éléments contenus dans celui-ci
     Cette organisation permet de centrer les élèments verticalement au sein du header
     -->
     <div class="elements">
      <p>Paramètres</p>
     </div>
   </div>
   <!--
   Ce container doit se placer le plus à droîte possible dans le header
   -->
   <div class="container droite">
     <!--
     Utiliser un div elements n'est pas adapté pour contenir une image, il faut directement le mettre en enfant d'un container !
     Si on place l'image dans un div elements, il peut déborder du header.
     Cela s'explique par le fait que les divs elements n'ont pas connaissance de la taille du header, si ils adoptent la même hauteur, les éleéments contenus ne sont plus centrés
     -->
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLeor7Lf4ePn6eqrsbW5vsHIzM7a3d60ur3BxsjR1NbN0dPX2tzr7O29wsX2DjRMAAADaUlEQVR4nO2bW3LkIAwADYi3be5/25iZZB4bxyDZgqkt+ivZn+0SQgahTNNgMBgMBoPBYDAYDAaDwWCaAGBSG/mn3i53AFQMxt8xdpm6ewE466XU4getpZlVVy9YjHgKPcRE6Ke1KclfRnct2UkLprATpWe05g5W4PzfShmZVHOneGh0D1ZjK5j/yKZ3lpZLCPZ46R7Bcu2sKuN0i1Uzp1gXpxvN8qpeSQjTyMkgAiV0aJFWMGOctnrVpLZXJ/k3DRYQAi5Q2wJGdqkFqZThXj98oHKouK2wGZVhzqra78s/oXK8VobgxF2rHMVpY+WUipSU2goo5/pBoqTUtn6cZ+OV5sScVLTV4y0Kjhgp4fmOVajT3TuMUshTyxPG8kmr5xnGmnBCiu8C8b9JMS7fRyY6vSQwSi0fWDwn9YmfGaBKBUap1dOctGU8JVC3H29LaCGePHnvWKT104lVCgIpUMwXd1JR4KxSGcr+Y917NwhFXTIrTYQ7coNeHjhsVnFnVGZFtTyZL6IPFM7Js/YRfgBcWWduAz2sEN082e55prrPwV+iXii89T3i1NKp8tWhzWsDzqpxnDKlO6AW7J3q38BymFjSdHlvP3pu12LuYHRjdUHuaWlhew5xgApe6Fex7RffLUoPrWmxRkipM1KKNLv+IzjfuBjnuOTv3GcYAawvQN8Rqvy/K7dEG5L5Po4ak4KdF9dpvAtWtdhkvL5l02ue538RPoWoYG0oBpOKQUh9WNJz3pvZqSYRg9VZL3bL017B8iFyxwsmZ2uFniFLC2MpBYh7024VWt4yVQpQ9jiLDr1kYGhaHw+71WiJdHGTaosSMpP2kOnKWwTMlWfyAvq63ic4T+2//ta66L4M9iqju1Y6Xx+Kk5N4q9NTJhDP7bl9rZOZZS/Lple2S8UJJ+IYQhEt6ImF7EShoJasq1P8DeIjBGecMoRYAbeT0Ohsh8Cy797AdmjpT9gItEEtIL4vTULiPoTEx0YsGpHslLlJGr5eqs3iZRCN2tTKSVTPMNGnDwjoVPcgQX1SJ1pVherE7AhJqq6t3Wzr3amq67hHqvPImtMxceiVjimn+koaWT5DTaq3zahMcf2A8ucC5yhXdfqEG51UWrx23+InvphSLb97PxQz3cv2FN++VQeKyzcYDAaDwaA9XxcLKh2A6JUdAAAAAElFTkSuQmCC" alt="Photo de Profil">
     <!--
     On peut mettre une zone de texte à côté d'une image
     -->
     <div class="elements">
       <p>Menu</p>
     </div>
   </div>
 </div>
</template>

<style scoped>
/* Code CSS permettant de gérer le div horizontal et l'espacement de ses éléments */
.hozizontal {
  /* Définir la taille du header (la même que celle définie dans App.vue) */
  height: inherit;
  width: inherit;

  /* Faire en sorte que les éléments s'organisent de manière horizontale et soient répartis de manière homogène */
  display: flex;
  justify-content: space-evenly;

  /*Eviter que les éléments touchent les bords de l'écran*/
  padding-inline: 1vw;


  /* Eviter que les textes du header dépassent de celui-ci ("max-font-size") n'est pas reconnu
   TODO voir comment implémenter max-font-size
   Les textes du header sont de couleur noir
   */
  font-size: 3vh;
  color: black;
}

  /* Permet de forcer le dernier container du header à se coller au côté droit du header */
  .droite {
    justify-content: end;
  }

  /* Code CSS permettant de gérer les containers pour qu'ils centrent les éléments qu'ils contiennent */
  .container {
    /* Il n'est pas nécéssaire de définir de taille pour les containers, ils prennent l'espace nécéssaire pour englober les élèments qu'ils contiennent*/
    display: inline-flex;
    align-items: center;
  }

  /* Code CSS permettant de gérer les élèments contenus dans un container */
  .elements {
    /* Si les éléments d'un container débordent lu header, permet de naviguer dans ces élèments au lieu de les faire disparaitre ou se superposer sur le contenu principal
     Il faut tout de même éviter de mettre trop d'élèments dans un container car même si cette solution fonctionne, cela nuit à l'ergonomie de la solution
     */
    //overflow: scroll;
  }

  /* Code CSS permettant d'éviter qu'une image contenue dans le header en dépasse et se superpose au contenu principal */
  .container img{
    height: 100%;
    margin-right: 1vw;
  }

</style>