<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <h1>Bienvenue sur LocaMat !</h1>
    <form>
      <div class="is-flex is-flex-direction-column">
        <label>Nom</label>
        <input placeholder="Entrez votre nom d'utilisateur" />
      </div>
      <div class="is-flex is-flex-direction-column">
        <label>Adresse e-mail</label>
        <input type="email" v-model="email" placeholder="Entrez votre email" required />
      </div>
      <div class="is-flex is-flex-direction-column">
        <label>Mot de passe</label>
        <input type="password" v-model="password" placeholder="Mot de passe" />
      </div>
      <button class="button is-link is-outlined">Connexion</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'LoginPage',
  };
</script>
