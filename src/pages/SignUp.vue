// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div>
    <v-container class="fill-height">
      <Toast :snackbar="true" text="asd" />
      <v-responsive class="align-center text-center fill-height">
        <h2 class="text-h2">SignUp</h2>
        <v-card variant="tonal" class="pa-4 my-10">
          <v-text-field
            v-model="state.full_name"
            :error-messages="v$.full_name.$errors.map((e) => e.$message)"
            :counter="10"
            label="Name"
            required
            @input="v$.full_name.$touch"
            @blur="v$.full_name.$touch"
          ></v-text-field>

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
          <v-text-field
            v-model="state.phone_number"
            :error-messages="v$.phone_number.$errors.map((e) => e.$message)"
            label="Phone"
            required
            @input="v$.phone_number.$touch"
            @blur="v$.phone_number.$touch"
          ></v-text-field>

          <v-text-field
            disabled
            v-model="state.role"
            :error-messages="v$.role.$errors.map((e) => e.$message)"
            label="Role"
            required
            @input="v$.role.$touch"
            @blur="v$.role.$touch"
          ></v-text-field>
          <v-btn
            color="success"
            :loading="btnLoader"
            class="me-4"
            @click="save"
          >
            submit
          </v-btn>
          <v-btn @click="clear" color="primary" variant="tonal"> clear </v-btn>
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
  import { useRoute, useRouter } from "vue-router";
  const show1 = ref(false);
  const isToast = ref(false);
  const btnLoader = ref(false);
  const msg = ref('')
  const colorToast = ref('')
  const router = useRouter();
  const route = useRoute()

  const initialState = {
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    role: route.params.type,
  };
  initialState.role = route.params.type
  const state = reactive({
    ...initialState,
  });

  const rules = {
    full_name: { required },
    email: { required, email },
    password: { required },
    phone_number: { required },
    role: {},
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
        let res = await signUpService.registration(state);
        if (res) {
          console.log(res);
          btnLoader.value = false;
          colorToast.value = 'success'
          msg.value = 'Registration Done'
          isToast.value = true
          setTimeout(()=>{
            router.push('/')
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