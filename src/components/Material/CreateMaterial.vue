<script setup>

</script>

<template>
  <v-dialog max-width="500px" >

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn

          rounded="lg"  size="regular"  color="primary"
          class="text-none font-weight-regular bouton2"
          prepend-icon="mdi-plus"
          text="Nouveau matériel"
          v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card
        prepend-icon="mdi-folder"
        title="Nouveau matériel"
    >
      <v-divider></v-divider>
      <v-card-text>
        <v-row dense>
          <v-col
              cols="12"
              md="4"
              sm="6"
          >
            <v-text-field
                label="Nom*"
                hint="Nom du matériel"
                required
            ></v-text-field>
          </v-col>

          <v-col
              cols="12"
              md="4"
              sm="6"
          >
            <v-text-field
                label="Version*"
                hint="Version du matériel (ex: V3.0)"
                required
            ></v-text-field>
          </v-col>

          <v-col
              cols="12"
              md="4"
              sm="6"
          >
            <v-text-field
                label="Réference*"
                hint="Réference du matériel (ex : AN159 pour android, AP951 pour apple...)"
                required
            ></v-text-field>
          </v-col>

          <v-col
              cols="12"
              md="4"
              sm="6"
          >
            <v-text-field
                label="Numéro"
                hint="Numéro de téléphone"
            ></v-text-field>
          </v-col>

          <v-col
              cols="12"
              md="4"
              sm="6"
          >
            <v-text-field
                label="URL Photo"
                hint="URL de la photo du matériel"
            ></v-text-field>
          </v-col>

<!--
          <v-col
              cols="12"
              sm="6"
          >
            <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
            ></v-select>
          </v-col>

          <v-col
              cols="12"
              sm="6"
          >
            <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                auto-select-first
                multiple
            ></v-autocomplete>
          </v-col>-->
        </v-row>

        <small class="text-caption text-medium-emphasis">*Champs requis</small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
        ></v-btn>

        <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
        ></v-btn>
      </v-card-actions>
    </v-card>



  </v-dialog>
</template>

<style scoped>
.bouton2{
  padding:3px;
  margin-top:20px;
}

</style>