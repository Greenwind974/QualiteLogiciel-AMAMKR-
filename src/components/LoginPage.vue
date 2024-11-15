<template>
  <div>
    <h1>Bienvenue sur LocaMat !</h1>
    <form>
      <div>
        <label>Nom</label>
        <input placeholder="Entrez votre nom d'utilisateur" />
      </div>
      <div>
        <label>Adresse e-mail</label>
        <input type="email" v-model="email" placeholder="Entrez votre email" required />
      </div>
      <div>
        <label>Mot de passe</label>
        <input type="password" v-model="password" placeholder="Mot de passe" />
      </div>
      <button>Connexion</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'LoginPage',
  };
</script>
