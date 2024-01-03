<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Home />
</template>

<script setup>
  import { useAppStore } from "@/store/app";
  import { onMounted } from "vue";
  import Home from "@/components/HelloWorld.vue";
  onMounted(() => {
    useAppStore().checkAuthentication();
  });
</script>
