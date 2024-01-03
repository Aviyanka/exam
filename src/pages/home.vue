<template>
  <div>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <h1>home page</h1>
      </v-responsive>
    </v-container>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useAppStore } from "@/store/app";
onMounted(()=>{
  useAppStore().checkAuthentication();
})
</script>