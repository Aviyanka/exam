<template>
  <nav class="navbar navbar-dark bg-dark px-4 ">
      <img src="@/assets/logoCompany.png" width="60" height="50" alt="" />
      <button v-if="useAppStore().isAuthenticated" @click="logout" class="btn btn-outline-light btn-sm my-2 my-sm-0" type="submit">LogOut</button>
      <button v-if="!useAppStore().isAuthenticated && route.path !== '/'" @click="router.back()" class="btn btn-outline-light btn-sm my-2 my-sm-0" type="submit">Back</button>
  </nav>
</template>

<script setup>
  import { useAppStore } from "@/store/app";
  import { onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  const route = useRoute();
  const router = useRouter();
  //
  onMounted(() => {
    useAppStore().checkAuthentication();
    console.log( route.path)
  });
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
</script>
<style scoped>
/* navbar{
 position: absolute;
} */
</style>
