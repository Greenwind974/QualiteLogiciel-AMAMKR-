<template>
  <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center hero is-fullheight">
    <h1>Bienvenue sur LocaMat !</h1>
    <form class="is-flex is-flex-direction-column">
      <div class="is-flex is-flex-direction-column p-4">
        <label>Nom</label>
        <input placeholder="Entrez votre nom d'utilisateur" />
      </div>
      <div class="is-flex is-flex-direction-column p-4">
        <label>Adresse e-mail</label>
        <input type="email" v-model="email" placeholder="Entrez votre email" required />
      </div>
      <div class="is-flex is-flex-direction-column p-4">
        <label>Mot de passe</label>
        <input type="password" v-model="password" placeholder="Mot de passe" />
      </div>
      <button class="button is-link is-outlined">Connexion</button>
    </form>
  </div>
  <div>

  </div>
</template>

<script>
  export default {
    name: 'LoginPage',
  };
</script>
