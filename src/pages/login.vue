// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div>
    <v-container class="fill-height">
      <Toast :snackbar="true" text="asd" />
      <v-responsive class="align-center text-center fill-height">
        <h2 class="text-h2">Sign In</h2>
        <v-card variant="tonal" class="pa-4 my-10">
          <!-- <form> -->
          <v-text-field
            v-model="state.email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            label="E-mail"
            required
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
          ></v-text-field>
          <v-text-field
            v-model="state.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :error-messages="v$.password.$errors.map((e) => e.$message)"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
            color="success"
            :loading="btnLoader"
            class="me-4"
            @click="save"
          >
            Login
          </v-btn>
          <v-btn @click="clear" color="primary" variant="tonal"> clear </v-btn>
          <!-- </form> -->
        </v-card>
      </v-responsive>
    </v-container>
    <v-snackbar
      :timeout="1500"
      :color="colorToast"
      elevation="24"
      v-model="isToast"
      :top="true"
    >
      {{ msg }}
    </v-snackbar>
  </div>
</template>
<script setup>
  import { reactive, ref } from "vue";
  import { useVuelidate } from "@vuelidate/core";
  import { email, required } from "@vuelidate/validators";
  import signUpService from "@/services/authenticationService";
  import { useRouter } from "vue-router";
  const show1 = ref(false);
  const isToast = ref(false);
  const btnLoader = ref(false);
  const msg = ref('')
  const colorToast = ref('')
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };

  const state = reactive({
    ...initialState,
  });

  const rules = {
    email: { required, email },
    password: { required },
  };

  const v$ = useVuelidate(rules, state);

  function clear() {
    v$.value.$reset();

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value;
    }
  }
  const save = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) {
      return;
    } else {
      btnLoader.value = true;
      try {
        let res = await signUpService.getLogin(state);
        if (res.status == 200) {
          let token = res.data.access_token
          let refresh_token = res.data.refresh_token
          localStorage.setItem('token',token)
          localStorage.setItem('refresh_token',refresh_token)
          btnLoader.value = false;
          colorToast.value = 'success'
          msg.value = 'Login Done'
          isToast.value = true
          setTimeout(()=>{
            router.push('/home')
          },1500)
        }
      } catch (err) {
        // console.log(err.response.data.detail);
        btnLoader.value = false;
        colorToast.value = 'error'
        msg.value = err.response.data.detail
        isToast.value = true
      }
    }
  };
</script>