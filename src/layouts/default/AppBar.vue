<template>
  <nav class="navbar navbar-light bg-light px-4 ">
      <img src="@/assets/logoCompany.png" width="60" height="50" alt="" />
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
