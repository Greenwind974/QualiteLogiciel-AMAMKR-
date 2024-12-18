<template>
  <div class="columns is-centered is-vcentered" style="min-height: 100vh; background-color: #f9f9f9;">
    <div class="column is-narrow">
      <div class="box" style="max-width: 450px; padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h1 class="title has-text-centered">Bienvenue sur LocaMat !</h1>
        <form>
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <input class="input" type="text" placeholder="Entrez votre nom d'utilisateur" />
            </div>
          </div>

          <div class="field">
            <label class="label">Mot de passe</label>
            <div class="control">
              <input class="input" type="password" placeholder="Mot de passe" />
            </div>
          </div>

          <div class="field">
            <button class="button is-link is-fullwidth">Connexion</button>
          </div>
        </form>

        <div class="has-text-centered" style="margin-top: 1.5rem;">
          <p>Ou</p>
          <button class="button is-light is-fullwidth mt-2">
            <img
                src="../assets/Google__G__logo.svg.webp"
                alt="Google Icon"
                style="width: 20px; margin-right: 8px;"
            />
            Connecte toi avec Google
          </button>
          <button class="button is-light is-fullwidth mt-2">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple Icon"
                style="width: 20px; margin-right: 8px;"
            />
            Connecte toi avec Apple
          </button>
        </div>

        <div class="has-text-centered" style="margin-top: 2rem;">
          <p>En partenariat avec :</p>
          <img src="../assets/Web_UnivToursPolytechTours.png" alt="Université de Tours" style="max-width: 100%; height: auto;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
