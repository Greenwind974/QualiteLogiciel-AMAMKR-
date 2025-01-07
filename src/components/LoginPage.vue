<template>
  <div class="columns is-centered is-vcentered" style="width: 100%; height: 100%; min-height: 100vh;">
    <div class="column is-narrow">
      <div class="box has-background" style="max-width: 450px; padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <section class="login-page">
          <h1 class="title has-text-centered">Bienvenue sur LocaMat !</h1>
          <form @submit.prevent="handleLogin">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                    v-model="email"
                    class="input"
                    type="email"
                    placeholder="Entrez votre email"
                    required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Mot de passe</label>
              <div class="control">
                <input
                    v-model="password"
                    class="input"
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    required
                />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary is-fullwidth mt-2" type="submit">Se connecter</button>
              </div>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 2rem;">
            <p>En partenariat avec :</p>
            <img src="../assets/Web_UnivToursPolytechTours.png" alt="Université de Tours"
                 style="max-width: 100%; height: auto;"/>
          </div>
          <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {signInAndRedirect} from "@/firebase/authService";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        await signInAndRedirect(this.email, this.password);
      } catch (error) {
        this.errorMessage = "Échec de la connexion. Veuillez vérifier vos identifiants.";
        console.error("Login error:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
