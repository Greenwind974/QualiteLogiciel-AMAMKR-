<template>
  <v-app>
    <v-layout>
      <v-app-bar
          color="primary"
      >
        <router-link class="title" :to='"/"'><v-app-bar-title >LocaMat</v-app-bar-title></router-link>
        <template v-slot:append>
          <v-btn icon="mdi-account-circle" :to='"/profile"'></v-btn>
          <v-btn icon="mdi-logout"></v-btn>
        </template>
      </v-app-bar>
      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          color="primary"
          theme="dark">
        <v-list>
          <v-list-item
              title="LocaMat"
              prepend-icon="mdi-menu"
              @click.stop="rail = !rail"
              nav>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-folder" title="Matériels" value="materiels" to="/material"></v-list-item>
          <v-list-item prepend-icon="mdi-folder-edit" title="Gérer les Matériels" value="manage-materiels" to="/material/manage"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Gérer les Utilisateurs" value="manage-users"  to="/manage-users"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Reservations" value="reservations" to="/material/new"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main scrollable style="height: 100% ">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-app>

</template>

<script>
//import LoginPage from './components/LoginPage.vue';


export default {
  name : "App",
  components: {
  },
  data () {
    return {
      drawer: true,
      rail: true,
    }
  },
}

</script>

<style>

.title {
  text-decoration: none;
  padding: 0.5em 0.75em 0;

}

</style>
