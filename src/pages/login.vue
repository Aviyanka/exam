// eslint-disable-next-line vue/multi-word-component-names
<template>
  <section className="container-box">
    <div className="container">
      <div className="row">
        <div
          style="
            background: url('https://amentotech.com/htmls/doclist/images/slider/banner-img.png');
            background-size: cover;
            background-position: left;
          "
          className="col-12 col-lg-6 d-lg-flex d-none align-center"
        >
          <img
            src="https://amentotech.com/htmls/doclist/images/slider/img-01.png"
            alt=""
          />
        </div>
        <div className="col-12 col-lg-6">
          <div className="background-div">
            <div className="main-form">
              <div className="logo">
                <img width="100" src="@/assets/logoCompany.png" />
              </div>
              <div className="form-padding py-4">
                <input
                  v-model="state.email"
                  className="form-control"
                  type="text"
                  placeholder="Enter Email"
                  aria-label="default input example"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.email.$errors"
                  :key="error.$uid"
                >
                  <small class="p-error">{{
                    error.$validator == "required" ? "Email is required" : ""
                  }}</small>
                </div>
              </div>
              <div className="">
                <input
                  v-model="state.password"
                  className="form-control"
                  type="password"
                  placeholder="Enter Password"
                  aria-label="default input example"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.password.$errors"
                  :key="error.$uid"
                >
                  <small class="p-error">{{
                    error.$validator == "required" ? "Password is required" : ""
                  }}</small>
                </div>
              </div>
              <div className="d-flex row py-4 text-center check-box">
                <div className="form-check col-6 text-start">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label " for="flexCheckDefault">
                    Remember Me
                  </label>
                </div>
                <div className="py-4">
                  <div className="d-grid gap-2">
                    <button
                      @click="save"
                      class="btn btn-outline-primary my-2"
                      type="button"
                    >
                      <div
                        v-if="btnLoader"
                        class="spinner-border"
                        role="status"
                      >
                        <span class="sr-only"></span>
                      </div>
                      <span v-else> Login </span>
                    </button>
                    <button
                      @click="clear"
                      class="btn btn-outline-primary my-2"
                      type="button"
                    >
                      clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
  import { onMounted, reactive, ref } from "vue";
  import { toast } from "vue3-toastify";
  import { useVuelidate } from "@vuelidate/core";
  import { email, required } from "@vuelidate/validators";
  import signUpService from "@/services/authenticationService";
  import { useRouter } from "vue-router";
  const show1 = ref(false);
  const isToast = ref(false);
  const btnLoader = ref(false);
  const msg = ref("");
  const colorToast = ref("");
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
  onMounted(()=>{
    toast('Please Sign In', {
          autoClose: 1000,
          style: {
            opacity: "1",
          },
        });
  })
  const save = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) {
      return;
    } else {
      btnLoader.value = true;
      try {
        let res = await signUpService.getLogin(state);
        if (res.status == 200) {
          let token = res.data.access_token;
          let refresh_token = res.data.refresh_token;
          localStorage.setItem("token", token);
          localStorage.setItem("refresh_token", refresh_token);
          btnLoader.value = false;
          colorToast.value = "success";
          msg.value = "Login Done";
          router.push('/home')
        }
      } catch (err) {
        btnLoader.value = false;
        toast(err.response?.data?.detail, {
          autoClose: 1000,
          style: {
            opacity: "1",
          },
        });
      }
    }
  };
</script>