<template>
  <!-- <button type="button" class="btn btn-primary">Primary</button> -->
  <!-- <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/vendor.webp" />
      <v-img height="100" src="@/assets/logoCompany.png"></v-img>
      <h1 class="text-h2 font-weight-bold"></h1>

      <div class="py-14"/>

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="tonal"
            @click="router.push('/login')"
          >
            <v-icon icon="mdi-speedometer" size="large" start />

            Sign-In
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            color="primary"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            size="large"
            variant="flat"
            @click="router.push('/sign-up/vendor')"
          >
            <v-icon icon="mdi-view-dashboard" size="large" start />

            Vendor Registration
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            color="primary"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            size="large"
            variant="tonal"
            @click="router.push('/sign-up/host')"
          >
            <v-icon icon="mdi-view-dashboard" size="large" start />

            User Registration
          </v-btn>

        </v-col>
      </v-row>
    </v-responsive>
  </v-container> -->
  <div class="row">
    <div class="col-lg-6 col-md-12 background-1">
      <!-- <img class="card-img-top" src=".../100px180/" alt="Card image cap" /> -->
      <div class="card-body">
        <h5 class="">Welcome To Events</h5>
        <p class="text-white">
          This is a wider card with supporting text below as a<br />
          natural lead-in to additional content.<br />
          This content is a little bit longer.
        </p>
        <div class="d-flex d-lg-none flex-column btn-box">
            <button @click="router.push('/login')" class="btn btn-light" type="submit">Sign In</button>
            <button @click="router.push('/sign-up/vendor')" class="btn btn-outline-primary my-2" type="submit">
              Register As Vendor
            </button>
            <button @click="router.push('/sign-up/host')" class="btn btn-outline-primary" type="submit">
              Register As User
            </button>
          </div>
      </div>
      <div class="curve"></div>
    </div>
    <div class="col-lg-6 col-md-12 d-md-flex d-none background-2">
      <div class="d-flex flex-column align-items-center">
        <div>
          <img width="200" src="@/assets/logoCompany.png" alt="" />
        </div>
        <div>
          <p class="card-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
            ipsum earum<br />
            doloribus pariatur obcaecati rem dignissimos accusamus error totam
            nostrum!
          </p>
          <div class="d-flex flex-column btn-box">
            <button @click="router.push('/login')" class="btn btn-light" type="submit">Sign In</button>
            <button @click="router.push('/sign-up/vendor')" class="btn btn-outline-primary my-2" type="submit">
              Register As Vendor
            </button>
            <button @click="router.push('/sign-up/host')" class="btn btn-outline-primary" type="submit">
              Register As User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";

  const router = useRouter();
</script>