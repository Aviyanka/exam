<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <!-- <v-icon icon="mdi-circle-slice-6" /> -->
      <v-btn
        class="ma-2"
        variant="text"
        @click="$router.back()"
        color="primary-lighten-2"
      > <v-icon icon="mdi-backburger"></v-icon> Back</v-btn>
      <!-- VENDOR FUllSTACK -->
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
  //
</script>
