<script setup>

</script>

<template>
  <v-dialog max-width="350px" >

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn

          rounded="lg"  size="regular"  color="primary"
          class="text-none font-weight-regular bouton"
          prepend-icon="mdi-pencil"
          text="Modifier"
          v-bind="activatorProps"
      ></v-btn>
    </template>
  </v-dialog>
</template>

<style scoped>

.bouton{
  padding:3px;
  margin-top:30px;
}

</style>