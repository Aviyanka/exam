<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/vendor.webp" />

      <!-- <div class="text-body-2 font-weight-light mb-n1">Welcome to</div> -->
      <v-img height="100" src="@/assets/logoCompany.png"></v-img>
      <h1 class="text-h2 font-weight-bold"></h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            Sign-In
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            color="primary"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            size="x-large"
            variant="flat"
            @click="router.push('/sign-up')"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            Sign-Up
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";

  const router = useRouter()
</script>
