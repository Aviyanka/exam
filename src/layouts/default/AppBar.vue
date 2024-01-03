<template>

  <v-app-bar :elevation="2" color=""
        density="compact">
    <v-app-bar-title>
      <!-- <v-icon icon="mdi-circle-slice-6" /> -->
      <div class="d-flex justfy-content-between">
        <v-btn
          v-if="route.path !== '/' && !useAppStore().isAuthenticated"
          class="ma-2"
          variant="text"
          @click="$router.back()"
          color="primary-lighten-2"
        >
          <v-icon icon="mdi-backburger"></v-icon> Back</v-btn
        >
        <v-btn
          v-if="useAppStore().isAuthenticated"
          class="ma-2"
          variant="text"
          @click="logout"
          color="red-lighten-2"
        >
          <v-icon icon="mdi-backburger"></v-icon> Logout</v-btn
        >
      </div>

      <!-- VENDOR FUllSTACK -->
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
  import { useAppStore } from "@/store/app";
  import { onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  const route = useRoute()
  const router = useRouter();
  //
  onMounted(() => {
    useAppStore().checkAuthentication();
  });
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
</script>
